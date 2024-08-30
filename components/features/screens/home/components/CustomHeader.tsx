import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomHeader({props}:any) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const navMap = () => {
    navigation.navigate("Map" as never)
  }
  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <TouchableOpacity onPress={navMap}>
        <MaterialCommunityIcons
          name="map-marker"
          size={29}
          color="#000"
          // onPress={() => navigation.navigate("Map")}
        />
      </TouchableOpacity>
      <MaterialCommunityIcons name="bell-outline" size={29} color="#000" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 17
  },
});
