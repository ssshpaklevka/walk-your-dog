import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../../shared/types/typesRegistrationNavigations";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import DarkButton from "../../../../shared/ui/Button/DarkButton";
import { MaterialIcons } from "@expo/vector-icons";

export default function DatingWindowClient() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleFormMe = () => {
    navigation.navigate("RegistrationPeople");
  };

  const handleFormAnimal = () => {
    navigation.navigate("RegistrationAnimals");
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={handleGoBack}>
          <MaterialIcons name="keyboard-backspace" size={24} color="black" />
        </TouchableOpacity> */}
        <Text
          style={{
            textAlign: "center",
            width: "100%",
            fontSize: 24,
            fontWeight: 500,
            color: "#2A2A2A",
          }}
        >
          Давайте знакомиться!
        </Text>
      </View>

      <View style={{ gap: 25, width: "100%" }}>
        <View style={styles.aboutMe}>
          <Text style={{fontSize: 18, fontWeight: 400}}>Расскажите о себе</Text>
          <DarkButton title="Добавить пользователя" onPress={handleFormMe} />
        </View>
        <View style={styles.aboutPet}>
          <Text style={{fontSize: 18, fontWeight: 400}}>Расскажите о питомцах</Text>
          <DarkButton title="Добавить питомца" onPress={handleFormAnimal} />
        </View>
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
    paddingHorizontal: 15,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    padding: 10,
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    gap: 70,
  },
  image: {
    marginTop: 80,
    width: 169,
    height: 162,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
  },
  form: {
    alignItems: "center",
    width: "100%",
    paddingTop: 15,
    paddingHorizontal: 15,
    gap: 15,
  },
  fourInput: {
    flexDirection: "row",
    gap: 5,
  },
  input: {
    width: 32,
    height: 45,
    borderWidth: 1,
    borderColor: "#9D9D9D",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 24,
  },
  aboutMe: {
    alignItems: "center",
    gap: 15
  },
  aboutPet: {
    alignItems: "center",
    gap: 15
  },
  downText: {
    gap: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  errorContainer: {
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
});
