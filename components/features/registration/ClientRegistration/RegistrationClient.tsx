import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DarkButton from "../../../../shared/ui/Button/DarkButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type RootStackParamList = {
  Role: undefined;
  RegistrationScreen: undefined;
  SmsRegistration: { phoneNumber: string };
};

export default function RegistrationClient() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [phoneNumber, setPhoneNumber] = React.useState<string>("+7");

  const handlePhoneNumberChange = (text: string) => {

    if (!text.startsWith("+7")) {
      text = "+7" + text.replace(/^\+7/, "");
    }

    const phoneNumberPattern = /^\+7\d{0,10}$/;
    if (phoneNumberPattern.test(text)) {
      setPhoneNumber(text);
    }
  };

  const handleSmsButton = () => {
    navigation.navigate("SmsRegistration", { phoneNumber });
  };

  // const handleGoBack = () => {
  //   navigation.goBack();
  // };

  

  return (
    <KeyboardAwareScrollView
    style={{ flex: 1 }}
    contentContainerStyle={{ flexGrow: 1 }}
    enableOnAndroid={false}
    extraScrollHeight={100}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* <TouchableOpacity onPress={handleGoBack}>
          <MaterialIcons name="keyboard-backspace" size={24} color="black" />
        </TouchableOpacity> */}
        <View style={{ alignItems: "center", width: "100%", flex: 1 }}>
          <Image
            style={styles.image}
            source={require("../../../../assets/logo.png")}
          />
          <Text style={styles.title}>{`Войдите или \n зарегистрируйтесь`}</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Номер телефона"
              keyboardType="phone-pad"
              onChangeText={handlePhoneNumberChange}
              value={phoneNumber}
            />
            <TextInput
              style={styles.input}
              keyboardType="default"
              placeholder="Промокод при его наличии"
            />
            <DarkButton title="Войти" onPress={handleSmsButton} />
            <Text
              style={{
                fontSize: 12,
                fontWeight: 300,
                maxWidth: 350,
                textAlign: "center",
              }}
            >
              Нажимая на кнопку, вы даете свое согласие на{" "}
              <Text style={{ fontWeight: "500" }}>
                обработку персональных данных
              </Text>
              , соглашаетесь с{" "}
              <Text style={{ fontWeight: "500" }}>
                политикой конфиденциальности и пользовательским соглашением
              </Text>
            </Text>
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
    </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
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
  input: {
    color: "#2A2A2A",
    height: 50,
    borderColor: "#9D9D9D",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    width: "100%",
  }, 
  downText: {
    gap: 15,
    alignItems: "center",
    marginBottom: 70,
  },
});
