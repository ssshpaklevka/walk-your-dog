import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { Controller } from "react-hook-form";

const SelectableOption = ({ name, title, options, control }: any) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const position = new Animated.Value(0);

  const handleOptionSelect = (option: any, onChange: any) => {
    onChange(option);

    Animated.timing(position, {
      toValue: option === options[0] ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const optionStyle = (option: any) => ({
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: value === option ? "white" : "#ccc",
          color: value === option ? "black" : "white",
          borderTopLeftRadius: 26,
          borderBottomLeftRadius: 26,
          borderBottomRightRadius: 26,
          borderTopRightRadius: 26,
          ...(value === option && {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          }),
        });

        const translateX = position.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        });

        return (
          <View style={{ gap: 10, alignItems: "center" }}>
            <Text style={{ fontSize: 18 }}>{title}</Text>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#ccc",
                borderRadius: 26,
                elevation: 5,
              }}
            >
              <Animated.View
                style={[
                  { flexDirection: "row", width: "100%" },
                  { transform: [{ translateX }] },
                ]}
              >
                {options.map((option: any) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => handleOptionSelect(option, onChange)}
                    style={[styles.optionButton, optionStyle(option)]}
                  >
                    <Text style={{ paddingVertical: 20 }}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </Animated.View>
            </View>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  optionButton: {},
});

export default SelectableOption;
