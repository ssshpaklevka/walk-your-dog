import { Image, Text, View, StyleSheet } from "react-native";

interface RecordProps {
  title: string;
  description: string;
}

export default function Record({ title, description }: RecordProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/napominanie.png")}
        style={styles.image}
      />
      <View style={styles.overlay}>
        <Text style={styles.textTitle}>{title}</Text>
        <Text style={styles.textDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 328,
    height: 150,
    borderRadius: 16,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  textTitle: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    fontWeight: "bold"
  },
  textDescription: {
    textAlign: "center",
    color: "white",
    fontSize: 14,
    fontWeight: "normal"
  },
});
