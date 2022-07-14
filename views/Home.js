import React, { useState,useEffect,useRef } from 'react';
import { Alert, Button, PermissionsAndroid, Text, View } from 'react-native';
import { css } from '../assets/css/css';
import MapView from 'react-native-maps';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



import config from '../config/index.json'



export default function Home(props) {

  
const [origin,setOrigin] = useState(null)
const [destination,setDestination] = useState(null)

useEffect(() => {

  (async function(){

    const {status,permission} = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND)

if(status === 'granted'){
let location = await Location.getCurrentPositionAsync({enbleHighAccuracy: true})
setOrigin({latitude: location.coords.latitude,
  longitude: location.coords.longitude,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}
)
}else{
  throw new Error('Location permission not granted')
}

  })()

},[])



  return (
    <View style={css.container}>
   <MapView style={css.map}
   initialRegion={origin}
   showsUserLocation={true}
   loadingEnabled={true}
   
   >

   </MapView>
      <View style={css.search}>
  
      <GooglePlacesAutocomplete
      placeholder='Para Onde Vamos?'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        setDestination({
          latitude: details.geometry.location.lat,
  longitude: details.geometry.location.lng,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
        })
        console.log(destination)
      }}
      query={{
        key: config.googleApi,
        language: 'pt-br',
      }}
      fetchDetails={true}
      styles={{listView:{height:100}}}
    />
    <Button
     title="Checkout"
     onPress={() => props.navigation.navigate('Checkout')}
    
    />

    
  
  
     </View>
    </View>
  );
}