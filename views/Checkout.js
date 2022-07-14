import React, { useState,useEffect,useRef} from 'react';
import { View,Text } from 'react-native';
import { css } from '../assets/css/css';
import config from '../config/index.json';
import {WebView} from 'react-native-webview'

export default function Checkout(props) {

const [url,setUrl]= useState(null)

    useEffect(() =>{
        async function sendServer(){
            let response=await fetch(config.urlRoot,{
                method:'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    price: 10
                })
            })
            let json=await response.json();
            setUrl(json)
        }
        sendServer()
    })
async function stateChange(state) {
    let url= state.url;
    if (state.canGoBack == true && !url.includes('mercadopago')){
if(url.includes('approved')){
    props.navigation.navigate('Tracking')
}else{
    props.navigation.navigate('Home')
}
    }
}


    return(
    
           

              <WebView 
      style={css.checkoutmp}
      originWhitelist={['*']}
      source={{ uri: url}}
      startInLoadingState={true} 
      onNavigationStateChange={state=>stateChange(state)}
      /> 
       
             
          
  
       
           

    )
}