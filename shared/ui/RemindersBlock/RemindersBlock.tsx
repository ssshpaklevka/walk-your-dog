import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Reminders {
  title: string;
  img: any;
  onPress?: () => void;
}

export default function RemindersBlock({ title, img, onPress }: Reminders) {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={img}
          style={{ width: 156, height: 86, borderRadius: 16 }}
          alt="aye"
        />
        <View style={styles.overlay}>
          <Text
            style={{
              color: "white",
              fontSize: 14,
            }}
          >
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
