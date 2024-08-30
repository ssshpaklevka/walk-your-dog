import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, FlatList, Dimensions, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useUserStore from "../../../../stores/userStore";

interface AnimalSelect {
  onAnimalSelect: (animal:any) => void
}

const { width } = Dimensions.get("window");

export default function SelectPets({onAnimalSelect}:AnimalSelect) {
  const { animals } = useUserStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnimalIndex, setSelectedAnimalIndex] = useState(0);

  const onViewRef = useRef(({ viewableItems }:any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
      setSelectedAnimalIndex(viewableItems[0].index);
    }
  });

  useEffect(() => {
    if (animals.length > 0) {
      onAnimalSelect(animals[selectedAnimalIndex]);
    }
  }, [selectedAnimalIndex, animals, onAnimalSelect]);

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
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
    <View>
      <FlatList
        data={animals}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.blockPeet}>
            <Image
              source={{ uri: item.avatar }}
              style={{ width: 50, height: 50, borderRadius: 9999 }}
            />
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>{item.name}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <Text style={{ fontSize: 14, fontWeight: "400", color: "grey" }}>
                  {item.petType}
                </Text>
                <Ionicons name="ellipse" size={4} color="grey" />
                <Text style={{ fontSize: 14, fontWeight: "400", color: "grey" }}>
                {item.birthday ? calculateAge(item.birthday.toISOString()) : ''}
                </Text>
              </View>
            </View>
          </View>
        )}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />

      {/* Индикатор пагинации (точки) */}
      <View style={styles.pagination}>
        {animals.map((_, index) => (
          <Ionicons
            key={index}
            name="ellipse"
            size={8}
            color={index === currentIndex ? "black" : "grey"}
            style={{ margin: 3 }}
          />
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    blockPeet: {
      width: width - 30,
        gap: 10,
        alignItems: "center",
        padding: 10,
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 16,
      },
      pagination: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
      },
})