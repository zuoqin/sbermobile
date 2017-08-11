/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  Picker,
  View
} from 'react-native';

import { StackNavigator } from 'react-navigation';

//export default class SberPB extends Component {
class PositionsScreen extends React.Component{
  static navigationOptions = {
    title: 'Клиент',
  };
  constructor(props) {
    super(props);
    this.username='zuoqin';
    this.password='Qwerty123';
    this.state = {
      language: "js",
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        {/*<Text>Hello, Chat App!</Text>*/}
        <Picker
          selectedValue={this.state.language}
          onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>        
        <Button
          onPress={() => navigate('Chat', { user: 'Lucy' })}
          title="Chat with Lucy"
        />
      </View>
    );
  }
}

class ChatScreen extends React.Component {
  // Nav options can be defined as a function of the screen's props:
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${navigation.state.params.user}`,
  });
  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Chat with {params.user}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const SberPB = StackNavigator({
  Positions: { screen: PositionsScreen },
  Chat: { screen: ChatScreen },
});


AppRegistry.registerComponent('SberPB', () => SberPB);
