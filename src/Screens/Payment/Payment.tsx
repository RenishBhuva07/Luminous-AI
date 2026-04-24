import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, CreditCard, Smartphone, Wallet } from "lucide-react-native";
import MainContainer from "../../Common/MainContainer";
import { useTheme } from "../../Theme/ThemeContext";
import { Typography } from "../../Theme/Typographys";
import ResponsivePixels from "../../Assets/StyleUtilities/ResponsivePixels";

export default function Payment() {
    const { Colors } = useTheme();
    const styles = getStyles(Colors);
    const navigation = useNavigation();
    const [selectedMethod, setSelectedMethod] = useState("card");

    const paymentMethods = [
        { id: "card", title: "Credit Card", icon: (selected: boolean) => <CreditCard color={selected ? Colors.MidnightInkText : Colors.MidnightInkText} size={22} /> },
        { id: "apple", title: "Apple Pay", icon: (selected: boolean) => <Smartphone color={selected ? Colors.MidnightInkText : Colors.MidnightInkText} size={22} /> },
        { id: "wallet", title: "Google Pay", icon: (selected: boolean) => <Wallet color={selected ? Colors.MidnightInkText : Colors.MidnightInkText} size={22} /> },
    ];

    const handlePay = () => {
        navigation.navigate("PaymentDone" as never);
    };

    return (
        <MainContainer
            showHeader={true}
            header={{
                headerTitle: "Payment",
                headerLeft: {
                    customIcon: <ArrowLeft color={Colors.MidnightInkText} size={24} />,
                    onPress: () => navigation.goBack()
                }
            }}
        >
            <View style={styles.container}>
                <View style={styles.summaryContainer}>
                    <Text style={styles.summaryTitle}>Luminous Premium</Text>
                    <Text style={styles.summaryAmount}>$9.99<Text style={styles.summaryDuration}>/mo</Text></Text>
                </View>

                <Text style={styles.sectionTitle}>Select Payment Method</Text>

                <View style={styles.methodsContainer}>
                    {paymentMethods.map((method) => (
                        <TouchableOpacity
                            key={method.id}
                            style={[
                                styles.methodCard,
                                selectedMethod === method.id && styles.methodCardSelected,
                            ]}
                            onPress={() => setSelectedMethod(method.id)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.methodLeft}>
                                <View style={[
                                    styles.methodIconWrapper,
                                    selectedMethod === method.id && { backgroundColor: Colors.LuminousGreen }
                                ]}>
                                    {method.icon(selectedMethod === method.id)}
                                </View>
                                <Text style={styles.methodTitle}>{method.title}</Text>
                            </View>
                            <View style={[styles.radioOutline, selectedMethod === method.id && { borderColor: Colors.LuminousGreen }]}>
                                {selectedMethod === method.id && <View style={[styles.radioInner, { backgroundColor: Colors.LuminousGreen }]} />}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.payButton} onPress={handlePay} activeOpacity={0.8}>
                    <Text style={styles.payText}>Confirm Payment</Text>
                </TouchableOpacity>
            </View>
        </MainContainer>
    );
}

const getStyles = (Colors: any) => StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: ResponsivePixels.size20,
        paddingTop: ResponsivePixels.size20,
    },
    summaryContainer: {
        backgroundColor: Colors.LuminousGreen,
        padding: ResponsivePixels.size24,
        borderRadius: ResponsivePixels.size20,
        alignItems: "center",
        marginBottom: ResponsivePixels.size32,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.06)",
        borderBottomWidth: 4,
        borderBottomColor: "rgba(0,0,0,0.12)",
        shadowColor: Colors.LuminousGreen,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.45,
        shadowRadius: 16,
        elevation: 10,
    },
    summaryTitle: {
        ...Typography.bodyMediumPoppinsSemiBold,
        color: Colors.MidnightInkText,
        marginBottom: ResponsivePixels.size8,
        opacity: 0.7,
    },
    summaryAmount: {
        ...Typography.h1RanadeBold,
        fontSize: ResponsivePixels.size40,
        lineHeight: ResponsivePixels.size50,
        color: Colors.MidnightInkText,
    },
    summaryDuration: {
        ...Typography.bodyLargePoppinsRegular,
        color: Colors.MidnightInkText,
        opacity: 0.6,
    },
    sectionTitle: {
        ...Typography.bodyLargePoppinsSemiBold,
        color: Colors.MidnightInkText,
        marginBottom: ResponsivePixels.size16,
    },
    methodsContainer: {
        gap: ResponsivePixels.size16,
    },
    methodCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: ResponsivePixels.size16,
        backgroundColor: Colors.DefaultWhite,
        borderRadius: ResponsivePixels.size16,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.06)",
        borderBottomWidth: 3,
        borderBottomColor: "rgba(0,0,0,0.09)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 5,
    },
    methodCardSelected: {
        borderColor: Colors.LuminousGreen,
        borderBottomColor: Colors.LuminousGreen,
        backgroundColor: Colors.DefaultWhite,
        shadowColor: Colors.LuminousGreen,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 7,
    },
    methodLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: ResponsivePixels.size12,
    },
    methodIconWrapper: {
        width: ResponsivePixels.size40,
        height: ResponsivePixels.size40,
        borderRadius: ResponsivePixels.size20,
        backgroundColor: Colors.FogGrey,
        alignItems: "center",
        justifyContent: "center",
    },
    methodTitle: {
        ...Typography.bodyLargePoppinsMedium,
        color: Colors.MidnightInkText,
    },
    radioOutline: {
        width: ResponsivePixels.size24,
        height: ResponsivePixels.size24,
        borderRadius: ResponsivePixels.size12,
        borderWidth: 2,
        borderColor: Colors.FogGrey,
        alignItems: "center",
        justifyContent: "center",
    },
    radioInner: {
        width: ResponsivePixels.size12,
        height: ResponsivePixels.size12,
        borderRadius: ResponsivePixels.size6,
    },
    footer: {
        padding: ResponsivePixels.size20,
        paddingBottom: ResponsivePixels.size40,
    },
    payButton: {
        width: "100%",
        backgroundColor: Colors.LuminousGreen,
        paddingVertical: ResponsivePixels.size16,
        borderRadius: ResponsivePixels.size16,
        alignItems: "center",
        shadowColor: Colors.LuminousGreen,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    payText: {
        ...Typography.bodyLargePoppinsSemiBold,
        color: Colors.MidnightInkText,
    },
});
