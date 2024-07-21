import React from "react";
import { Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";

type Props = {
  placeholder: string;
  keyboardType?: any;
};

export default function NumberInput({ placeholder, keyboardType}: Props) {
  return (
    <TextInput
              style={styles.input}
              placeholder={placeholder}
              keyboardType={keyboardType}
            />
  );
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        color: "#2A2A2A",
        height: 50,
        borderColor: "#9D9D9D",
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
      },
});