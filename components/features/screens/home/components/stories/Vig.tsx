import { Image, StyleSheet, Text, View } from "react-native";

export default function Vig () {
    return (
        <View style={{justifyContent: "center", alignItems: "center"}}>
            <Image source={require("../../../../../../assets/vigoda.png")} />
            {/* <Text style={styles.text} numberOfLines={2}>
                Выгода до 40%
              </Text> */}
        </View>
    )
}

const styles = StyleSheet.create ({
    text: {
        fontSize: 9,
        position: "absolute",
        bottom: 0,
        left: 180,
        right: 0,
        padding: 10,
        paddingBottom: 25,
        color: "#fff",
        textAlign: "left",
      },
})