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

type SmsRegistrationRouteProp = RouteProp<
  RootStackParamList,
  "SmsRegistration"
>;
type SmsRegistrationNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SmsRegistration"
>;

export default function SmsRegistration() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<SmsRegistrationNavigationProp>();
  const route = useRoute<SmsRegistrationRouteProp>();

  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [timer, setTimer] = useState<number>(60);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [codeError, setCodeError] = useState<string>("");

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerRef.current!);
    };
  }, []);

  const handleResendCode = () => {
    setTimer(60);
  };

  const handleChangeCode = (index: number, value: string) => {
    setCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = value;
      return newCode;
    });

    if (value.length === 1) {
      setFocusedIndex(index + 1);
    }
  };

  const handleKeyPress = (index: number, event: any) => {
    if (event.nativeEvent.key === "Backspace") {
      setCode((prevCode) => {
        const newCode = [...prevCode];
        newCode[index] = "";
        return newCode;
      });

      if (index > 0) {
        setFocusedIndex(index - 1);
      }
    }
  };

  useEffect(() => {
    if (code.join("") === "4444") {
     
      setCodeError("");
      navigation.navigate("DatingWindow");
      
    } else if (
      code.every((digit) => digit !== "") &&
      code.join("") !== "4444"
    ) {
    
      setCodeError("Код неверен");
    } else {
      
      setCodeError("");
    }
  }, [code]);

const handleBack = () => {
  navigation.goBack();
}

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={{ alignItems: "center", width: "100%", flex: 1 }}>
          <Image
            style={styles.image}
            source={require("../../../../assets/logo.png")}
          />
          <Text style={styles.title}>Введите код из СМС</Text>
          <View style={styles.form}>
            <View style={styles.fourInput}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  style={styles.input}
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  onChangeText={(value) => handleChangeCode(index, value)}
                  onKeyPress={(event) => handleKeyPress(index, event)}
                  onSubmitEditing={() => {
                    if (index < 3) {
                      setFocusedIndex(index + 1);
                    }
                  }}
                  ref={(ref) => {
                    if (index === focusedIndex) {
                      ref?.focus();
                    }
                  }}
                />
              ))}
            </View>
            {codeError && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{codeError}</Text>
              </View>
            )}
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 14, fontWeight: 400, color: "#2A2A2A" }}>
                Код отправлен на номер {route.params.phoneNumber}
              </Text>
              <TouchableOpacity onPress={() => handleBack}>
                <Text
                  style={{ fontSize: 14, fontWeight: 500, color: "#2A2A2A" }}
                >
                  Изменить номер
                </Text>
              </TouchableOpacity>
            </View>

            {timer === 0 ? (
              <TouchableOpacity onPress={handleResendCode}>
                <Text>Получить код еще раз</Text>
              </TouchableOpacity>
            ) : (
              <Text style={{ fontSize: 14, fontWeight: 400, color: "#2A2A2A" }}>
                Получить новый код можно через {timer}
              </Text>
            )}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
  downText: {
    gap: 15,
    alignItems: "center",
    marginBottom: 70,
  },
  errorContainer: {
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
});
