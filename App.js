import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ClientMapsScreen from './pages/Client/ClientMapsScreen.js';
import HomeScreen from './pages/Home/HomeScreen.js';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, Image,TouchableOpacity } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
  clientId: '1023607094536-i7qtl36lptt6pr2o5npd8fc5ne9qcsf4.apps.googleusercontent.com'  
});

const Stack = createStackNavigator();


class App extends React.Component {

  
  state = {
    userInfo: null
  }

  constructor(props) {
    super(props);
    this.getCurrentUserInfo();
  }
   
  componentDidMount(){
  }
   
  getCurrentUserInfo = async ( ) => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo }); 
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
      }
    }
  };  

  render(){ 
    return (
      <NavigationContainer>
        <MyStack initialParams={{ userInfo: this.state.userInfo }} />  
      </NavigationContainer>
    );
 }

};

export default App;

function MyStack( data ) {  
  return (
    <Stack.Navigator>
      { !data.userInfo && <Stack.Screen name="Home" component={HomeScreen} /> }
      <Stack.Screen name="ClientMaps" component={ClientMapsScreen} />
    </Stack.Navigator>
  );
}