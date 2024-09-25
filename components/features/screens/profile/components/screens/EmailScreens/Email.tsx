import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DarkButton from "../../../../../../../shared/ui/Button/DarkButton";

export default function Email() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };
  const smsScreen = () => { 
    navigation.navigate('SmsEmail' as never)
  }
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <MaterialIcons name="keyboard-backspace" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Информация о событии</Text>
      </View>
      <View style={{alignItems: "center", gap: 20, paddingTop: 15}}>
        <Text>Введите новую почту</Text>
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Промокод при его наличии"
        />
        <DarkButton title="Получить код" onPress={smsScreen}/>
      </View>
    </View>
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
    color: "#2A2A2A",
    height: 50,
    borderColor: "#9D9D9D",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    width: "100%",
  },
});
