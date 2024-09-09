import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Map from "../../../../shared/ui/Map/Map";
import useUserStore from "../../../../stores/userStore";
import DarkButton from "../../../../shared/ui/Button/DarkButton";
import Stories from "./components/stories/Stories";
import Vig from "./components/stories/Vig";
import Events from "./components/events/Events";

export default function Home() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const { user } = useUserStore();

  return (
    <View style={styles.container}>
      <View style={styles.fullWidthBackground}>
        <View style={styles.paddedContent}>
          <View style={styles.balance}>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>
              Ваш баланс: {user?.balance} ₽
            </Text>
          </View>
          <Events />
        </View>
      </View>
      <View style={styles.paddedContent}>
        <Stories />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  fullWidthBackground: {
    backgroundColor: "#EDEDED",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  paddedContent: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    gap: 20,
  },
  balance: {
    backgroundColor: "white",
    paddingVertical: 15,
    borderRadius: 13,
    alignItems: "center",
    width: "100%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
