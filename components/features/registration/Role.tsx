import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import LightButton from "../../../shared/ui/Button/LightButton";
import DarkButton from "../../../shared/ui/Button/DarkButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
    Role: undefined;
    RegistrationScreen: undefined;
  };
  
  export default function Role() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
    const handleEmployeeButton = () => {
      navigation.navigate('RegistrationEmployee' as never);
    };
    const handleClientButton = () => {
      navigation.navigate('RegistrationClient' as never);
    };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Image
        style={styles.image}
        source={require("../../../assets/logo.png")}
      />
      <View style={styles.selectButton}>
        <DarkButton title="Клиент"  onPress={handleClientButton}/>
        <LightButton title="Сотрудник" onPress={handleEmployeeButton}/>
      </View>
      <View style={styles.downText}>
        <Text style={{ fontSize: 14, fontWeight: "400" }}>
          Связаться с поддержкой
        </Text>
        <Text style={{ fontSize: 10, fontWeight: "400" }}>
          Версия приложения 1.01
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white"
  },
  image: {
    width: 163,
    height: 162,
    marginTop: 80,
  },
  selectButton: {
    width: "100%",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    gap: 15,
  },
  downText: {
    gap: 15,
    alignItems: "center",
    marginBottom: 70,
  },
});