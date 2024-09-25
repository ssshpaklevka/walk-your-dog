import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import useUserStore from "../../../../../../../stores/userStore";

export default function SmsEmail() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { user } = useUserStore();

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
      navigation.navigate("Email" as never);
    } else if (
      code.every((digit) => digit !== "") &&
      code.join("") !== "4444"
    ) {
      setCodeError("Код неверен");
    } else {
      setCodeError("");
    }
  }, [code]);

  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <MaterialIcons name="keyboard-backspace" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Главное безопасность</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flex: 1,
          }}
        >
          <View style={styles.form}>
            <Text style={{fontSize: 20, fontWeight: 500}}>Введите код из e-mail</Text>
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
                Код отправлен на почту {user?.email}
              </Text>
              <TouchableOpacity>
                <Text
                  style={{ fontSize: 14, fontWeight: 500, color: "#2A2A2A" }}
                >
                  Изменить номер
                </Text>
              </TouchableOpacity>
            </View>

            {timer === 0 ? (
              <TouchableOpacity>
                <Text>Получить код еще раз</Text>
              </TouchableOpacity>
            ) : (
              <Text style={{ fontSize: 14, fontWeight: 400, color: "#2A2A2A" }}>
                Получить новый код можно через {timer}
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingHorizontal: 15,
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
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
  form: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 15,
    gap: 15,
  },
  fourInput: {
    flexDirection: "row",
    gap: 5,
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
