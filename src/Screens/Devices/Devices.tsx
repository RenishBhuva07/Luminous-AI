import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Smartphone, Laptop, Tablet, Clock, ChevronRight } from "lucide-react-native";
import MainContainer from "../../Common/MainContainer";
import { useTheme } from "../../Theme/ThemeContext";
import { Typography } from "../../Theme/Typographys";
import ResponsivePixels from "../../Assets/StyleUtilities/ResponsivePixels";

export default function Devices() {
    const { Colors } = useTheme();
    const styles = getStyles(Colors);
    const navigation = useNavigation();

    const linkedDevices = [
        {
            id: 1,
            title: "iPhone 15 Pro",
            status: "Current device",
            lastActive: "Active now",
            icon: Smartphone,
            iconBg: "#42CBE9"
        },
        {
            id: 2,
            title: "MacBook Pro",
            status: "Linked device",
            lastActive: "Last active 2 hours ago",
            icon: Laptop,
            iconBg: "#4A8BFF"
        },
        {
            id: 3,
            title: "iPad Air",
            status: "Linked device",
            lastActive: "Last active yesterday",
            icon: Tablet,
            iconBg: "#9E57E5"
        }
    ];

    const renderDeviceItem = (device: any, index: number) => {
        const isLast = index === linkedDevices.length - 1;

        return (
            <View key={device.id}>
                <TouchableOpacity style={styles.deviceItem} activeOpacity={0.7}>
                    <View style={[styles.iconContainer, { backgroundColor: device.iconBg }]}>
                        <device.icon color={Colors.DefaultWhite} size={20} />
                    </View>
                    <View style={styles.deviceContent}>
                        <Text style={styles.deviceTitle}>{device.title}</Text>
                        <Text style={styles.deviceStatus}>{device.status}</Text>
                        <View style={styles.lastActiveRow}>
                            <Clock color={Colors.MutedSteelText} size={14} />
                            <Text style={styles.lastActiveText}>{device.lastActive}</Text>
                        </View>
                    </View>
                    <ChevronRight color={Colors.MutedSteelText} size={20} />
                </TouchableOpacity>
                {!isLast && <View style={styles.separator} />}
            </View>
        );
    };

    return (
        <MainContainer
            showHeader={true}
            header={{
                headerTitle: "Devices",
                headerLeft: {
                    customIcon: <ArrowLeft color={Colors.MidnightInkText} size={24} />,
                    onPress: () => navigation.goBack()
                }
            }}
        >
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Linked Devices</Text>
                        <View style={styles.cardGroup}>
                            {linkedDevices.map((device, index) => renderDeviceItem(device, index))}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </MainContainer>
    );
}

const getStyles = (Colors: any) => StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingTop: ResponsivePixels.size24,
        paddingBottom: ResponsivePixels.size60,
    },
    sectionContainer: {
        marginBottom: ResponsivePixels.size24,
    },
    sectionTitle: {
        ...Typography.bodyLargePoppinsSemiBold,
        color: Colors.MidnightInkText,
        marginBottom: ResponsivePixels.size12,
        marginHorizontal: ResponsivePixels.size12,
    },
    cardGroup: {
        backgroundColor: Colors.DefaultWhite,
        borderRadius: ResponsivePixels.size20,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    deviceItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: ResponsivePixels.size16,
        paddingHorizontal: ResponsivePixels.size12,
    },
    iconContainer: {
        width: ResponsivePixels.size40,
        height: ResponsivePixels.size40,
        borderRadius: ResponsivePixels.size12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: ResponsivePixels.size16,
    },
    deviceContent: {
        flex: 1,
    },
    deviceTitle: {
        ...Typography.bodyLargePoppinsMedium,
        color: Colors.MidnightInkText,
        marginBottom: ResponsivePixels.size4,
    },
    deviceStatus: {
        ...Typography.bodyMediumPoppinsRegular,
        color: Colors.MidnightInkText,
        opacity: 0.75,
        marginBottom: ResponsivePixels.size6,
    },
    lastActiveRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    lastActiveText: {
        ...Typography.bodySmallPoppinsRegular,
        color: Colors.MutedSteelText,
        marginLeft: ResponsivePixels.size4,
    },
    separator: {
        height: 1,
        backgroundColor: Colors.FogGrey,
        opacity: 0.4,
        marginHorizontal: ResponsivePixels.size16,
    },
});
