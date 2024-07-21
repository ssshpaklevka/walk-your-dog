import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Events () {
    const insets = useSafeAreaInsets();
    return (
        <View style={{ paddingTop: insets.top }}>
            <Text>Events</Text>
        </View>
    )
}