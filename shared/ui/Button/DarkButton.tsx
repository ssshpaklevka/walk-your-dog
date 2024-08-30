import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";

type Props = {
  title: string;
  onPress?: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
};

export default function DarkButton({
  title,
  onPress,
  buttonStyle,
  textStyle,
}: Props) {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#262626",
    borderRadius: 48,
    borderWidth: 1,
    padding: 15,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
