/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

const Login = require('./Login');
//const Positions = require('./Positions');

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  Picker,
  View,
  Linking,
  AsyncStorage,
  Alert,
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import PositionsScreen from './PositionsScreen';

GLOBAL = require('./global');


//const API_PATH = "http://10.10.246.131:3000/"; //"https://api.sberpb.com/"
//export default class SberPB extends Component {
class SelectionScreen extends React.Component{
  static navigationOptions = {
    title: 'Select Action',
  };
  constructor(props) {
    super(props);
    this.state = {
      clients: ['AANDF', 'AAOYF'],
      securities: ['GAZP', 'LKOH']
    }
  };


  componentDidMount() {
  {/*
    Linking.getInitialURL().then((url) => {
      AsyncStorage.removeItem('SberPBAppState');
      //AsyncStorage.setItem('UIExplorerAppState', JSON.stringify({isLoggedIn: false}));
      AsyncStorage.getItem('SberPBAppState', (err, storedString) => {
        const moduleAction = URIActionMap(this.props.appFromAppetizeParams);
        const urlAction = URIActionMap(url);
        const launchAction = moduleAction || urlAction;
        if (err || !storedString) {
          const initialAction = launchAction || {type: 'InitialAction'};
     
          this.setState(UIExplorerNavigationReducer(null, initialAction));
          this.setState({isLoggedIn: false});
          return;
        }
        const storedState = JSON.parse(storedString);
        if (launchAction) {
          if( storedState.isLoggedIn === undefined || storedState.isLoggedIn === null){
            storedState.isLoggedIn = false;
          }          
          this.setState(UIExplorerNavigationReducer(storedState, launchAction));
          return;
        }
        if( storedState.isLoggedIn === undefined ){
          storedState.isLoggedIn = false;
        }
        this.setState(storedState);
      });
    });*/}
  }

  setSecuritiesList(responsedata){
    //this._showAlert('Download', 'Logged in successfull: ' + responsedata.access_token);
    const { navigate } = this.props.navigation;
    this.setState(
      {
        securities: responsedata,
      },
      () => AsyncStorage.setItem('SberPBAppState', JSON.stringify(this.state))
    );

    navigate('Positions', {token: this.state.token, clients: this.state.clients, securities: this.state.securities});
  };



  requestSecurities(){

    var authorization = 'Bearer ' + this.state.token;
    
    console.log('trying to login with token: ' + this.state.token);
    var settings = {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'authorization': authorization,
      },      
    };      
    fetch(GLOBAL.API_PATH + "api/security", settings)
      .then((response) => response.json())
      .then((responseData) => {
        this.setSecuritiesList(responseData);
        console.log(responseData[0]);
      })
      .catch((error) => {
        this._showAlert('GET Securities', 'Retrieve securities error: ' + error.message);
      })    
  }


  setClientsList(responsedata){
    //this._showAlert('Download', 'Logged in successfull: ' + responsedata.access_token);
    const { navigate } = this.props.navigation;
    this.setState(
      {
        clients: responsedata,
      },
      () => AsyncStorage.setItem('SberPBAppState', JSON.stringify(this.state))
    );

    //navigate('Positions', {token: this.state.token, clients: this.state.clients, securities: this.state.securities});
    this.requestSecurities();
  };



  requestClients(){

    var authorization = 'Bearer ' + this.state.token;
    
    console.log('trying to login with token: ' + this.state.token);
    var settings = {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'authorization': authorization,
      },      
    };      
    fetch(GLOBAL.API_PATH + "api/client", settings)
      .then((response) => response.json())
      .then((responseData) => {
        this.setClientsList(responseData);
        console.log(responseData[0]);
      })
      .catch((error) => {
        this._showAlert('GET Clients', 'Retrieve clients error: ' + error.message);
      })    
  }


  setLoginUser(responsedata){
    //this._showAlert('Download', 'Logged in successfull: ' + responsedata.access_token);
    const { navigate } = this.props.navigation;
    this.setState(
      {
        isLoggedIn: true,
        token: responsedata.access_token
      },
      () => AsyncStorage.setItem('SberPBAppState', JSON.stringify(this.state))
    );
    this.requestClients();
    //navigate('Positions', {token: this.state.token, clients: this.state.clients, securities: this.state.securities});
  };

  _showAlert(title, message) {
    //console.log('1111111Ask me later pressed');
    // Works on both iOS and Android
    Alert.alert(
      title,
      message,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    )    
  }

  onLogin(){

    var body = 'grant_type=password&username=' + this.username + '&password=' + this.password;

    console.log('trying to login with body: ' + body);
    var settings = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body,
    };      
    fetch(GLOBAL.API_PATH + "token", settings)
      .then((response) => response.json())
      .then((responseData) => {
        this.setLoginUser(responseData);
        console.log(responseData);
      })
      .catch((error) => {
        this._showAlert('Login', 'Logged in with error: ' + error.message);
        this.state.isLoading = false;
        this.state.resultsData = this.setPageGetResult([]);//this.getDataSource([])
      })    
  }


  render() {
    const { navigate } = this.props.navigation;

    if(this.state.isLoggedIn === true){
      return (
        <View>
          {/*<Text>Hello, Chat App!</Text>*/}
          <Text>Logged in: {this.state.username}</Text>
        </View>
      )
    } else{
      return(<View style={[styles.listContainer, this.props.style]}>
        <Login
          onLogin = {(event) => {
            this.onLogin(event);
            
            console.log('on login in index.android');
          }}
          
          onEndUserNameEditing={(event) => {
            console.log('user name finished change');
            var username = event.nativeEvent.text;
            console.log(username);

            this.username = username;
          }}

          onPasswordChange={(event) => {
            console.log('password finished editing');
            var password = event.nativeEvent.text;
            console.log(password);

            this.password = password;
          }}        
        />        
      </View>)
    }
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
  Selection: {screen: SelectionScreen},
  Positions: { screen: PositionsScreen },
  Chat: { screen: ChatScreen },
  
});


AppRegistry.registerComponent('SberPB', () => SberPB);
