import { StyleSheet, Text, View } from "react-native";
import CustomRadioButton from "../../../../shared/ui/CustomRadioButton/RadioButton";
import { useState } from "react";

interface AddServ {
  title: string;
  price: string | number;
  checked: boolean;
  onPress: () => void;
}

export default function AddServices({ title, price, onPress, checked }: AddServ) {
    // const [checked, setChecked] = useState(false);

    // const handlePress = () => {
    //     setChecked(!checked);
    //   };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.radioBtnText}>{title}</Text>
        <Text style={styles.radioBtnText}>{price} ₽</Text>
      </View>
      <CustomRadioButton checked={checked} onPress={onPress}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    gap: 10,
    borderRadius: 16,
    padding: 15,
    width: 156,
  },
  radioBtnText: {
    fontSize: 16,
    fontWeight: 500,
  },
});
