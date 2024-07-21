import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";

type Interface = {
    title: string;
    info: string;
}

export default function InfoInput({title, info}: Interface) {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={{fontSize: 12, fontWeight: 500}}>{title}</Text>
                <Text style={{fontSize: 14, fontWeight: 500}}>{info}</Text>
            </View>
            <View>
                <MaterialCommunityIcons  name="chevron-right" color={"#545454"} size={16}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    info: { 
        flexDirection: "column",
        gap: 5
    },
})