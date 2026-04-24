import React from "react";
import { View, StyleSheet } from "react-native";
import { Crown } from "lucide-react-native";
import ResponsivePixels from "../Assets/StyleUtilities/ResponsivePixels";
import { useTheme } from "../Theme/ThemeContext";

export default function PremiumBadge() {
    const { Colors } = useTheme();

    return (
        <View style={[styles.badge, { backgroundColor: Colors.LuminousGreen }]}>
            <Crown size={18} strokeWidth={2.6} color={Colors.DefaultWhite} />
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,
        width: ResponsivePixels.size34,
        height: ResponsivePixels.size34,
    },
});
