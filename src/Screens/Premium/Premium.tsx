import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Crown, CheckCircle2 } from "lucide-react-native";
import MainContainer from "../../Common/MainContainer";
import { Colors } from "../../Assets/StyleUtilities/Colors";
import { Typography } from "../../Theme/Typographys";
import ResponsivePixels from "../../Assets/StyleUtilities/ResponsivePixels";

export default function Premium() {
    const navigation = useNavigation();

    const features = [
        "Unlimited messages and interactions",
        "Access to advanced AI models (GPT-4.0)",
        "Priority customer support",
        "Exclusive premium badges and themes"
    ];

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
                <View style={styles.iconContainer}>
                    <Crown color={Colors.DefaultWhite} size={64} />
                </View>

                <Text style={styles.title}>Luminous Premium</Text>
                <Text style={styles.subtitle}>Supercharge your experience with our advanced AI capabilities.</Text>

                <View style={styles.featuresCard}>
                    {features.map((feature, index) => (
                        <View key={index} style={styles.featureItem}>
                            <CheckCircle2 color={'#826EEA'} size={24} />
                            <Text style={styles.featureText}>{feature}</Text>
                        </View>
                    ))}
                </View>

                <TouchableOpacity style={styles.subscribeButton} activeOpacity={0.8}>
                    <Text style={styles.subscribeText}>Subscribe Now - $9.99/mo</Text>
                </TouchableOpacity>
            </ScrollView>
        </MainContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        paddingHorizontal: ResponsivePixels.size24,
        paddingTop: ResponsivePixels.size40,
        paddingBottom: ResponsivePixels.size40,
        backgroundColor: '#F7F8F9',
    },
    iconContainer: {
        width: ResponsivePixels.size120,
        height: ResponsivePixels.size120,
        borderRadius: ResponsivePixels.size60,
        backgroundColor: '#826EEA',
        justifyContent: "center",
        alignItems: "center",
        marginBottom: ResponsivePixels.size24,
        shadowColor: '#826EEA',
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
        marginBottom: ResponsivePixels.size40,
        lineHeight: 24,
    },
    featuresCard: {
        width: '100%',
        backgroundColor: Colors.DefaultWhite,
        borderRadius: ResponsivePixels.size20,
        padding: ResponsivePixels.size24,
        marginBottom: ResponsivePixels.size40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: ResponsivePixels.size16,
    },
    featureText: {
        ...Typography.bodyMediumPoppinsRegular,
        color: Colors.MidnightInkText,
        marginLeft: ResponsivePixels.size12,
        flex: 1,
    },
    subscribeButton: {
        width: '100%',
        backgroundColor: '#826EEA',
        paddingVertical: ResponsivePixels.size16,
        borderRadius: ResponsivePixels.size16,
        alignItems: 'center',
        shadowColor: '#826EEA',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 8,
    },
    subscribeText: {
        ...Typography.bodyLargePoppinsSemiBold,
        color: Colors.DefaultWhite,
    }
});
