import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { Check } from "lucide-react-native";
import MainContainer from "../../Common/MainContainer";
import { useTheme } from "../../Theme/ThemeContext";
import { Typography } from "../../Theme/Typographys";
import ResponsivePixels from "../../Assets/StyleUtilities/ResponsivePixels";
import { usePremium } from "../../Context/PremiumContext";

export default function PaymentDone() {
    const { Colors } = useTheme();
    const styles = getStyles(Colors);
    const navigation = useNavigation();
    const { completePayment } = usePremium();

    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        completePayment();

        Animated.sequence([
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 5,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleContinue = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "BottomTabs" }],
            })
        );
    };

    return (
        <MainContainer showHeader={false}>
            <View style={styles.container}>
                <Animated.View style={[styles.iconCircle, { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }]}>
                    <Check color={Colors.MidnightInkText} size={48} strokeWidth={3} />
                </Animated.View>

                <Animated.View style={{ opacity: opacityAnim, alignItems: "center" }}>
                    <Text style={styles.title}>Payment Successful!</Text>
                    <Text style={styles.subtitle}>You are now a Luminous Premium member. Enjoy all the advanced features.</Text>
                </Animated.View>

                <TouchableOpacity style={styles.continueButton} onPress={handleContinue} activeOpacity={0.8}>
                    <Text style={styles.continueText}>Start Exploring</Text>
                </TouchableOpacity>
            </View>
        </MainContainer>
    );
}

const getStyles = (Colors: any) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: ResponsivePixels.size24,
    },
    iconCircle: {
        width: ResponsivePixels.size120,
        height: ResponsivePixels.size120,
        borderRadius: ResponsivePixels.size60,
        backgroundColor: Colors.LuminousGreen,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: ResponsivePixels.size32,
        shadowColor: Colors.LuminousGreen,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 10,
    },
    title: {
        ...Typography.h1RanadeBold,
        fontSize: ResponsivePixels.size28,
        color: Colors.MidnightInkText,
        marginBottom: ResponsivePixels.size12,
        textAlign: "center",
    },
    subtitle: {
        ...Typography.bodyLargePoppinsRegular,
        color: Colors.MutedSteelText,
        textAlign: "center",
        lineHeight: 24,
        marginBottom: ResponsivePixels.size40,
    },
    continueButton: {
        width: "100%",
        backgroundColor: Colors.MidnightInkText,
        paddingVertical: ResponsivePixels.size16,
        borderRadius: ResponsivePixels.size16,
        alignItems: "center",
        position: "absolute",
        bottom: ResponsivePixels.size40,
    },
    continueText: {
        ...Typography.bodyLargePoppinsSemiBold,
        color: Colors.DefaultWhite,
    },
});
