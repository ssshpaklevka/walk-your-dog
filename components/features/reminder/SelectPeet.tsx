import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RemindersBlock from "../../../shared/ui/RemindersBlock/RemindersBlock";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../shared/types/typesRegistrationNavigations";
import useUserStore from "../../../stores/userStore";
import DarkButton from "../../../shared/ui/Button/DarkButton";
import { useState } from "react";
import { AnimalInterface } from "../../../shared/types/animal";

export default function SelectPeet() {
  const insets = useSafeAreaInsets();
  const { animals } = useUserStore();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  // const handleGoBack = () => {
  //   navigation.goBack();
  // };
  const [selectedPet, setSelectedPet] = useState<AnimalInterface | null>(null);;
  const handleSelectPet = (pet:AnimalInterface) => {
    setSelectedPet(pet);
    console.log(pet)
  };

  const goNext = () => {
    if (selectedPet) {
      navigation.navigate("InfoEvent", { 
        serviceName: serviceName, 
        selectedPet: selectedPet 
      });
    }
  };

  const handleBack = () => { 
    navigation.goBack()
  }



  const { serviceName } = route.params as { serviceName: string };

  const calculateAge = (dateOfBirth: string): string => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    const months = (today.getMonth() + 12 - birthDate.getMonth()) % 12;
  
    if (age === 0) {
      return `${months} мес.`;
    } else if (age === 1) {
      return `${age} год, ${months} мес.`;
    } else if (age >= 2 && age <= 4) {
      return `${age} года, ${months} мес.`;
    } else {
      return `${age} лет, ${months} мес.`;
    }
  };
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <MaterialIcons name="keyboard-backspace" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Выберите питомца</Text>
      </View>
      <View style={{ paddingTop: 25, flex: 1, gap: 20 }}>
        {animals.map((animal, index) => (
          <TouchableOpacity style={styles.blockPeet} key={index} onPress={(event) => handleSelectPet(animal)}>
            <Image
              source={{ uri: animal.avatar }}
              style={{ width: 50, height: 50, borderRadius: 9999 }}
            />
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 16, fontWeight: 500 }}>
                {animal.name}
              </Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text style={{ fontSize: 14, fontWeight: 400, color: "grey" }}>
                  {animal.petType}
                </Text>
                <Ionicons name="ellipse" size={4} color="grey" />
                <Text style={{ fontSize: 14, fontWeight: 400, color: "grey" }}>
                {animal.birthday ? calculateAge(animal.birthday.toISOString()) : ''}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
          justifyContent: "flex-end",
          paddingBottom: 30,
        }}
      >
        <DarkButton title="Далее" onPress={goNext}/>
        <View style={{ alignItems: "center", paddingTop: 20 }}>
          <Text style={{ color: "#777777", fontSize: 16, fontWeight: 500 }}>
            Не выбирать питомца
          </Text>
          <Text style={{ color: "#777777", fontSize: 14 }}>
            (Если хотите поставить общее напоминание)
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: "white",
    flex: 1,
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
  blockPeet: {
    gap: 10,
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#F4F4F4",
    borderRadius: 16,
  },
});
