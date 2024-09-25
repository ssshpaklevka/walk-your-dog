import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DarkButton from "../Button/DarkButton";
import { useState } from "react";
import Geocoder from 'react-native-geocoding';




export default function Map() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [region, setRegion] = useState({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    const [address, setAddress] = useState('');
    
    const handleGoBack = () => {
      navigation.goBack();
    };
  
    const handleMarkerPress = async () => {
      let addressResult = await Geocoder.from({
        latitude: region.latitude,
        longitude: region.longitude,
      });
      setAddress(addressResult.results[0].formatted_address);
    };
    const handleAddressSelect = () => {
        console.log(region)
      };
  return (
    <>
     <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={handleGoBack}>
          <MaterialIcons name="keyboard-backspace" size={25} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 500 }}>Выбрать адрес</Text>
        <TouchableOpacity onPress={handleGoBack}>
          <MaterialIcons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <MapView
        style={{ flex: 1 }}
        customMapStyle={require('./StyleMap.json')}
        onRegionChangeComplete={(region) => setRegion(region)}
        region={region}
      >
        <Marker
          coordinate={{latitude: region.latitude, longitude: region.longitude}}
          onPress={handleMarkerPress}
        />
      </MapView>
      <View style={styles.footer}>
        <Text>{JSON.stringify(region)}</Text>
        <DarkButton title="Выбрать этот адрес" onPress={handleAddressSelect}/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  footer: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    gap: 40,
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 40,
    borderTopLeftRadius: 16,
  },
});
