import React, { useState,useEffect,useRef } from 'react';
import { Alert, PermissionsAndroid, Text, View } from 'react-native';
import { css } from './assets/css/css'
import MapView from 'react-native-maps';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home,Checkout,Tracking } from './views';
import config from './config/index.json'


const Stack = createNativeStackNavigator();

export default function App() {

  



  return (
  
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
      <Stack.Screen name="Checkout" component={Checkout} options={{headerShown:false}}/>
      <Stack.Screen name="Tracking" component={Tracking} options={{headerShown:false}}/>


    </Stack.Navigator>
  </NavigationContainer>
    
  
  );
}