import { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function Stories() {
  const stories = [
    {
      id: 1,
      src: require("../../../../../../assets/stories/stories1.png"),
      text: "Как подружить кота с собакой?",
    },
    {
      id: 2,
      src: require("../../../../../../assets/stories/stories2.png"),
      text: "Может ли змея сьесть хозяина, пока он спит?",
    },
    {
      id: 3,
      src: require("../../../../../../assets/stories/stories3.png"),
      text: "Как подготовить собаку к полету?",
    },
    {
      id: 4,
      src: require("../../../../../../assets/stories/stories2.png"),
      text: "Может ли змея сьесть хозяина, пока он спит?",
    },
    {
      id: 5,
      src: require("../../../../../../assets/stories/stories3.png"),
      text: "Как подготовить собаку к полету?",
    },
    {
      id: 6,
      src: require("../../../../../../assets/stories/stories1.png"),
      text: "Как подружить кота с собакой?",
    },
  ];

  const [selectedStory, setSelectedStory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 5000); 

      return () => clearTimeout(timer); 
    }
  }, [showModal]);

  const handlePress = (story: any) => {
    setSelectedStory(story);
    setShowModal(true);
  };

  return (
    <>
      <FlatList
        data={stories}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <View style={styles.story}>
              <Image source={item.src} style={styles.image} />
              <Text style={styles.text} numberOfLines={2}>
                {item.text}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        horizontal={true} 
        showsHorizontalScrollIndicator={false} 
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  story: {},
  image: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 9,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    paddingBottom: 25,
    color: "#fff",
    textAlign: "left",
  },
});
