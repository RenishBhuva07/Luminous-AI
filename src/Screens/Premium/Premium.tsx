import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Crown, CheckCircle2 } from "lucide-react-native";
import MainContainer from "../../Common/MainContainer";
import { useTheme } from "../../Theme/ThemeContext";
import { Typography } from "../../Theme/Typographys";
import ResponsivePixels from "../../Assets/StyleUtilities/ResponsivePixels";
import { usePremium } from "../../Context/PremiumContext";

export default function Premium() {
    const { Colors } = useTheme();
    const styles = getStyles(Colors);
    const navigation = useNavigation();
    const { isPremium } = usePremium();

    const features = [
        "Unlimited messages and interactions",
        "Access to advanced AI models (Luminous Pro)",
        "Priority customer support",
        "Exclusive premium badges and themes"
    ];

    const renderFeatureItem = ({ item }: { item: string }) => (
        <View style={styles.featureItem}>
            <CheckCircle2 color={Colors.LuminousGreen} size={24} />
            <Text style={styles.featureText}>{item}</Text>
        </View>
    );


    return (
        <MainContainer
            showHeader={true}
            header={{
                headerTitle: "Premium",
                headerLeft: {
                    customIcon: <ArrowLeft color={Colors.MidnightInkText} size={24} />,
                    onPress: () => navigation.goBack()
                }
            }}
        >
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <Crown color={Colors.DefaultWhite} size={64} />
                    </View>

                    <Text style={styles.title}>Luminous Premium</Text>
                    <Text style={styles.subtitle}>Supercharge your experience with our advanced AI capabilities.</Text>

                    <View style={styles.featuresCard}>
                        <FlatList
                            data={features}
                            renderItem={renderFeatureItem}
                            keyExtractor={(item) => item}
                            scrollEnabled={false}
                            ItemSeparatorComponent={() => <View style={styles.featureSeparator} />}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.subscribeButton, isPremium && styles.subscribedButton]}
                    activeOpacity={0.8}
                    onPress={() => !isPremium && navigation.navigate("Payment" as never)}
                >
                    <Text style={styles.subscribeText}>
                        {isPremium ? "Payment Done - You are Premium" : "Subscribe Now - $9.99/mo"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>


        </MainContainer>
    );
}

const getStyles = (Colors: any) => StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "space-between",
        paddingHorizontal: ResponsivePixels.size12,
        paddingTop: ResponsivePixels.size20,
        paddingBottom: ResponsivePixels.size40,
    },
    content: {
        width: "100%",
        alignItems: "center",
    },
    iconContainer: {
        width: ResponsivePixels.size120,
        height: ResponsivePixels.size120,
        borderRadius: ResponsivePixels.size60,
        backgroundColor: Colors.LuminousGreen,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: ResponsivePixels.size24,
        shadowColor: Colors.SecondaryPurple,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
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
    },
    featuresCard: {
        width: '100%',
        backgroundColor: Colors.DefaultWhite,
        borderRadius: ResponsivePixels.size20,
        padding: ResponsivePixels.size24,
        marginVertical: ResponsivePixels.size40,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.9)",
        shadowColor: "#111827",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.18,
        shadowRadius: 20,
        elevation: 10,
        transform: [{ perspective: 900 }, { rotateX: "3deg" }],
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    featureSeparator: {
        height: ResponsivePixels.size16,
    },
    featureText: {
        ...Typography.bodyMediumPoppinsRegular,
        color: Colors.MidnightInkText,
        marginLeft: ResponsivePixels.size12,
        flex: 1,
    },
    subscribeButton: {
        width: '100%',
        backgroundColor: Colors.LuminousGreen,
        paddingVertical: ResponsivePixels.size16,
        borderRadius: ResponsivePixels.size16,
        alignItems: 'center',
        shadowColor: Colors.SecondaryPurple,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 8,
    },
    subscribeText: {
        ...Typography.bodyLargePoppinsSemiBold,
        color: Colors.DefaultWhite,
    },
    subscribedButton: {
        opacity: 0.9,
    },
});
