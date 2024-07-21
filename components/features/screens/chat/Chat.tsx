import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Chat () {
    const insets = useSafeAreaInsets();
    return (
        <View style={{ paddingTop: insets.top }}>
            <Text>Chat</Text>
        </View>
    )
}