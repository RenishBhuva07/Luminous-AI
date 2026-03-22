import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Check } from "lucide-react-native";
import MainContainer from "../../Common/MainContainer";
import { Colors } from "../../Assets/StyleUtilities/Colors";
import { Typography } from "../../Theme/Typographys";
import ResponsivePixels from "../../Assets/StyleUtilities/ResponsivePixels";

export default function Language() {
    const navigation = useNavigation();

    const [selectedLanguage, setSelectedLanguage] = useState("English (US)");

    const languages = [
        "English (US)",
        "English (UK)",
        "Spanish",
        "French",
        "German",
        "Italian",
        "Portuguese",
        "Russian",
        "Japanese",
        "Korean",
    ];

    const renderLanguageItem = (language: string, index: number) => {
        const isSelected = selectedLanguage === language;
        const isLast = index === languages.length - 1;

        return (
            <View key={language}>
                <TouchableOpacity 
                    style={styles.languageItem} 
                    activeOpacity={0.7} 
                    onPress={() => setSelectedLanguage(language)}
                >
                    <Text style={[styles.languageText, isSelected && styles.selectedLanguageText]}>
                        {language}
                    </Text>
                    
                    {isSelected && (
                        <View style={styles.checkContainer}>
                            <Check color="#4A8BFF" size={20} />
                        </View>
                    )}
                </TouchableOpacity>
                {!isLast && <View style={styles.separator} />}
            </View>
        );
    };

    return (
        <MainContainer
            showHeader={true}
            header={{
                headerTitle: "Language",
                headerLeft: {
                    customIcon: <ArrowLeft color={Colors.MidnightInkText} size={24} />,
                    onPress: () => navigation.goBack()
                }
            }}
        >
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Suggested Languages</Text>
                        <View style={styles.cardGroup}>
                            {renderLanguageItem(languages[0], 0)}
                            {renderLanguageItem(languages[1], 1)}
                        </View>
                    </View>

                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Other Languages</Text>
                        <View style={styles.cardGroup}>
                            {languages.slice(2).map((lang, idx) => renderLanguageItem(lang, idx))}
                        </View>
                    </View>

                </ScrollView>
            </View>
        </MainContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8F9',
    },
    scrollContent: {
        paddingTop: ResponsivePixels.size24,
        paddingBottom: ResponsivePixels.size60,
        paddingHorizontal: ResponsivePixels.size20,
    },
    sectionContainer: {
        marginBottom: ResponsivePixels.size24,
    },
    sectionTitle: {
        ...Typography.bodyLargePoppinsSemiBold,
        color: Colors.MidnightInkText,
        marginBottom: ResponsivePixels.size12,
        marginLeft: ResponsivePixels.size8,
    },
    cardGroup: {
        backgroundColor: Colors.DefaultWhite,
        borderRadius: ResponsivePixels.size20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    languageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: ResponsivePixels.size18,
        paddingHorizontal: ResponsivePixels.size20,
    },
    languageText: {
        ...Typography.bodyLargePoppinsMedium,
        color: Colors.MidnightInkText,
    },
    selectedLanguageText: {
        color: '#4A8BFF',
    },
    checkContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        height: 1,
        backgroundColor: Colors.FogGrey,
        opacity: 0.4,
        marginHorizontal: ResponsivePixels.size20,
    },
});
