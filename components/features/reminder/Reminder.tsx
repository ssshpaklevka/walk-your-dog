import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RemindersBlock from "../../../shared/ui/RemindersBlock/RemindersBlock";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../shared/types/typesRegistrationNavigations";

export default function Reminder() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

const navigationSelectPeet = (serviceName: string) => {
  navigation.navigate("SelectPeet", { serviceName });
}

  const handleGoBack = () => {
    navigation.navigate('Home' as never);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <MaterialIcons name="keyboard-backspace" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Напоминание</Text>
      </View>
      <View style={{ paddingTop: 15 }}>
        <Text style={{ fontSize: 24, fontWeight: 600 }}>Важные события</Text>
        <View style={{ gap: 10, paddingTop: 15 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <RemindersBlock
              title={"Записаться на услугу"}
              img={require("../../../assets/reminder/record.png")}
              onPress={() => navigationSelectPeet("Записаться на услугу")}
            />
            <RemindersBlock
              title={"Вакцинация"}
              img={require("../../../assets/reminder/vaccination.png")}
              onPress={() => navigationSelectPeet("Вакцинация")}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <RemindersBlock
              title={"Прививки от клещей и глистов"}
              img={require("../../../assets/reminder/inoculation.png")}
              onPress={() => navigationSelectPeet("Прививки от клещей и глистов")}
            />
            <RemindersBlock
              title={"Ветеринар"}
              img={require("../../../assets/reminder/veterinarian.png")}
              onPress={() => navigationSelectPeet("Ветеринар")}
            />
          </View>
        </View>
      </View>
      <View style={{ paddingTop: 15 }}>
        <Text style={{ fontSize: 24, fontWeight: 600 }}>Забота о друге</Text>
        <View style={{ gap: 10, paddingTop: 15 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <RemindersBlock
              title={"Купание"}
              img={require("../../../assets/reminder/swimming.png")}
              onPress={() => navigationSelectPeet("Купание")}
            />
            <RemindersBlock
              title={"Груминг"}
              img={require("../../../assets/reminder/grooming.png")}
              onPress={() => navigationSelectPeet("Груминг")}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <RemindersBlock
              title={"Чистка ушей"}
              img={require("../../../assets/reminder/cleaning.png")}
              onPress={() => navigationSelectPeet("Чистка ушей")}
            />
            <RemindersBlock
              title={"Стрижка когтей"}
              img={require("../../../assets/reminder/haircut.png")}
              onPress={() => navigationSelectPeet("Стрижка когтей")}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    justifyContent: "space-between",
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
});
