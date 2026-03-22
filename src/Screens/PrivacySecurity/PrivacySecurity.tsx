import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Lock, Shield, EyeOff, UserX, Key, ChevronRight } from "lucide-react-native";
import MainContainer from "../../Common/MainContainer";
import { Colors } from "../../Assets/StyleUtilities/Colors";
import { Typography } from "../../Theme/Typographys";
import ResponsivePixels from "../../Assets/StyleUtilities/ResponsivePixels";

export default function PrivacySecurity() {
    const navigation = useNavigation();

    const [settings, setSettings] = useState({
        appLock: false,
        readReceipts: true,
        twoStepVar: false,
    });

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const renderToggleItem = (
        title: string,
        IconComponent: any,
        iconBgColor: string,
        value: boolean,
        onValueChange: () => void,
        showBorder: boolean = true
    ) => (
        <View>
            <View style={styles.menuItem}>
                <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
                    <IconComponent color={Colors.DefaultWhite} size={20} />
                </View>
                <Text style={styles.menuTitle}>{title}</Text>

                <View style={styles.rightContainer}>
                    <Switch
                        value={value}
                        onValueChange={onValueChange}
                        trackColor={{ false: Colors.FogGrey, true: Colors.LuminousGreen }}
                        thumbColor={Colors.DefaultWhite}
                    />
                </View>
            </View>
            {showBorder && <View style={styles.separator} />}
        </View>
    );

    const renderMenuItem = (
        title: string,
        IconComponent: any,
        iconBgColor: string,
        showBorder: boolean = true,
        onPress?: () => void
    ) => (
        <View>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={onPress}>
                <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
                    <IconComponent color={Colors.DefaultWhite} size={20} />
                </View>
                <Text style={styles.menuTitle}>{title}</Text>

                <View style={styles.rightContainer}>
                    <ChevronRight color={Colors.MutedSteelText} size={20} />
                </View>
            </TouchableOpacity>
            {showBorder && <View style={styles.separator} />}
        </View>
    );

    return (
        <MainContainer
            showHeader={true}
            header={{
                headerTitle: "Privacy and Security",
                headerLeft: {
                    customIcon: <ArrowLeft color={Colors.MidnightInkText} size={24} />,
                    onPress: () => navigation.goBack()
                }
            }}
        >
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Security</Text>
                        <View style={styles.cardGroup}>
                            {renderToggleItem('App Lock (Face ID/Passcode)', Lock, '#4A8BFF', settings.appLock, () => toggleSetting('appLock'))}
                            {renderToggleItem('Two-Step Verification', Shield, '#21AF85', settings.twoStepVar, () => toggleSetting('twoStepVar'))}
                            {renderMenuItem('Change Default Password', Key, '#9E57E5', false)}
                        </View>
                    </View>

                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Privacy</Text>
                        <View style={styles.cardGroup}>
                            {renderToggleItem('Read Receipts', EyeOff, '#FF5B65', settings.readReceipts, () => toggleSetting('readReceipts'))}
                            {renderMenuItem('Blocked Contacts', UserX, '#A3A8B1', false)}
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
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: ResponsivePixels.size16,
        paddingHorizontal: ResponsivePixels.size16,
    },
    iconContainer: {
        width: ResponsivePixels.size40,
        height: ResponsivePixels.size40,
        borderRadius: ResponsivePixels.size12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: ResponsivePixels.size16,
    },
    menuTitle: {
        flex: 1,
        ...Typography.bodyLargePoppinsMedium,
        color: Colors.MidnightInkText,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    separator: {
        height: 1,
        backgroundColor: Colors.FogGrey,
        opacity: 0.4,
        marginHorizontal: ResponsivePixels.size16,
    },
});
