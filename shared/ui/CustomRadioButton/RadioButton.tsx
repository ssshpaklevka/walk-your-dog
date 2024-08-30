import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CustomRadioButton = ({ checked, onPress }: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.radioButtonContainer}>
      <View style={[styles.radioButton, checked && styles.radioButtonChecked]}>
        {checked && (
          <MaterialCommunityIcons name="check" size={16} color="white" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#51582F",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonChecked: {
    backgroundColor: "#51582F",
  },
});

export default CustomRadioButton;