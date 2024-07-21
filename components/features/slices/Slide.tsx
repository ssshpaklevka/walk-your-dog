import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Role from "../registration/Role";

interface Slide {
  key: string;
  title: string;
  image: ImageSourcePropType;
}

const slides: Slide[] = [
  {
    key: "one",
    title: "Walk Your Dog",
    image: require("../../../assets/slide/OneSlide.png"),
  },
  {
    key: "two",
    title: "Walk Your Dog",
    image: require("../../../assets/slide/TwoSlide.png"),
  },
  {
    key: "three",
    title: "Walk Your Dog",
    image: require("../../../assets/slide/ThreeSlide.png"),
  },
  {
    key: "four",
    title: "Walk Your Dog",
    image: require("../../../assets/slide/FourSlide.png"),
  },
];

export default function Slide() {
  const [showRealApp, setShowRealApp] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<any>(null);

  const _renderItem = ({ item }: { item: Slide }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  };

  const insets = useSafeAreaInsets();

  const _onDone = () => {
    setShowRealApp(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex + 1 === slides.length) {
          setShowRealApp(true);
          return prevIndex;
        }
        const newIndex = (prevIndex + 1) % slides.length;
        if (sliderRef.current) {
          sliderRef.current.goToSlide(newIndex, true);
        }
        return newIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (showRealApp) {
    return <Role />;
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppIntroSlider
        ref={sliderRef}
        renderItem={_renderItem}
        data={slides}
        onDone={_onDone}
        onSlideChange={(index: number) => setCurrentIndex(index)}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        showNextButton={false}
        showPrevButton={false}
        showDoneButton={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 24,
    color: "black",
    textAlign: "center",
    marginTop: 20,
  },
  dotStyle: {
    width: 50,
    height: 5,
    borderRadius: 100,
    backgroundColor: "#E7E7E7",
  },
  activeDotStyle: {
    width: 50,
    height: 5,
    borderRadius: 100,
    backgroundColor: "black",
  },
});
