import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, SafeAreaView } from 'react-native';

const LocationScreen = ({ navigation }) => {

  const [mapRegion, setMapRegion] = useState({
    latitude: 30.033333,
    longitude: 31.233334,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') { alert("Permission to access location was denied"); }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    console.log(location.coords.latitude, location.coords.longitude);
  }

  useEffect(() => {
    userLocation();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView style={styles.map} region={mapRegion}>
          <Marker coordinate={mapRegion} title='Marker' />
        </MapView>
      </View>
      <TouchableOpacity style={styles.button} onPress={userLocation}>
        <Text style={styles.buttonText}>Get Location</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: "#964B00",
    width: "30%",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 50,
    marginLeft: "25%",
    position: 'absolute',
    bottom: 20,
    zIndex: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default LocationScreen;