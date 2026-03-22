import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Switch, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { resetNavigation } from "../../Navigators/Navigator";
import { ChevronRight, Bookmark, Archive, Smartphone, Bell, Lock, Globe, Moon, Crown, LogOut } from "lucide-react-native";
import { Colors } from "../../Assets/StyleUtilities/Colors";
import ResponsivePixels from "../../Assets/StyleUtilities/ResponsivePixels";
import { Typography } from "../../Theme/Typographys";
import { IMAGES } from "../../Assets/Images";

export default function Setting() {
    const navigation = useNavigation<any>();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

    const handleLogout = () => {
        setIsLogoutModalVisible(false);
        resetNavigation("Login");
    };

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
            <View style={styles.profileSection}>
                <Image source={IMAGES.Luminous_Face} style={styles.profilePic} />
                <Text style={styles.userName}>Zachery Williamson</Text>
                <Text style={styles.userEmail}>zachery.williamson94@gmail.com</Text>
            </View>
        </View>
    );

    const renderMenuItem = (
        title: string,
        IconComponent: any,
        iconBgColor: string,
        rightElement?: React.ReactNode,
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
                    {rightElement}
                    <ChevronRight color={Colors.MutedSteelText} size={20} />
                </View>
            </TouchableOpacity>
            {showBorder && <View style={styles.separator} />}
        </View>
    );

    const renderToggleItem = (
        title: string,
        IconComponent: any,
        iconBgColor: string,
        value: boolean,
        onValueChange: (val: boolean) => void,
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

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {renderHeader()}

                {/* Group 1 */}
                <View style={styles.cardGroup}>
                    {renderMenuItem('Save Messages', Bookmark, '#4A8BFF')}
                    {renderMenuItem('Archive Chat', Archive, '#FF5B65')}
                    {renderMenuItem('Devices', Smartphone, '#42CBE9', null, false)}
                </View>

                {/* Group 2 */}
                <View style={styles.cardGroup}>
                    {renderMenuItem('Notification', Bell, '#FF5B65', null, true, () => navigation.navigate('Notifications'))}
                    {renderMenuItem('Privacy and Security', Lock, '#A3A8B1', null, true, () => navigation.navigate('PrivacySecurity'))}
                    {renderMenuItem(
                        'Language', 
                        Globe, 
                        '#9E57E5',
                        <View style={styles.languageBadge}>
                            <Text style={styles.languageBadgeText}>English</Text>
                        </View>,
                        true,
                        () => navigation.navigate('Language')
                    )}
                    {renderToggleItem('Appearance', Moon, '#21AF85', isDarkMode, setIsDarkMode, false)}
                </View>

                {/* Group 3 */}
                <View style={styles.cardGroup}>
                    {renderMenuItem('Luminous Premium', Crown, '#826EEA', null, false, () => navigation.navigate('Premium'))}
                </View>

                {/* Group 4 */}
                <View style={styles.cardGroup}>
                    {renderMenuItem('Log Out', LogOut, '#FF4B55', null, false, () => setIsLogoutModalVisible(true))}
                </View>

            </ScrollView>

            {/* Logout Modal */}
            <Modal
                visible={isLogoutModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsLogoutModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Log Out</Text>
                        <Text style={styles.modalText}>Are you sure you want to log out?</Text>
                        <View style={styles.modalActions}>
                            <TouchableOpacity 
                                style={[styles.modalButton, styles.cancelButton]} 
                                onPress={() => setIsLogoutModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.modalButton, styles.logoutButton]} 
                                onPress={handleLogout}
                            >
                                <Text style={styles.logoutButtonText}>Log Out</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8F9', // Light gray background for contrast against white cards
    },
    scrollContent: {
        paddingTop: ResponsivePixels.size60,
        paddingBottom: ResponsivePixels.size120, // Extra padding for the bottom tab
        paddingHorizontal: ResponsivePixels.size20,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: ResponsivePixels.size32,
    },
    editButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 10,
    },
    editText: {
        ...Typography.bodyLargePoppinsMedium,
        color: '#4A8BFF', // Blue link color
    },
    profileSection: {
        alignItems: 'center',
        marginTop: ResponsivePixels.size20,
    },
    profilePic: {
        width: ResponsivePixels.size100,
        height: ResponsivePixels.size100,
        borderRadius: ResponsivePixels.size50,
        backgroundColor: Colors.IvoryMist,
        marginBottom: ResponsivePixels.size16,
    },
    userName: {
        ...Typography.h1RanadeBold,
        fontSize: ResponsivePixels.size22,
        color: Colors.MidnightInkText,
        marginBottom: ResponsivePixels.size4,
    },
    userEmail: {
        ...Typography.bodyMediumPoppinsRegular,
        color: Colors.MutedSteelText,
    },
    cardGroup: {
        backgroundColor: Colors.DefaultWhite,
        borderRadius: ResponsivePixels.size20,
        marginBottom: ResponsivePixels.size20,
        overflow: 'hidden',
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
        gap: ResponsivePixels.size8,
    },
    separator: {
        height: 1,
        backgroundColor: Colors.FogGrey,
        opacity: 0.4,
        marginHorizontal: ResponsivePixels.size16,
    },
    languageBadge: {
        backgroundColor: '#F0F5FF', // Light blue bg
        paddingHorizontal: ResponsivePixels.size10,
        paddingVertical: ResponsivePixels.size4,
        borderRadius: ResponsivePixels.size12,
    },
    languageBadgeText: {
        ...Typography.bodySmallPoppinsMediumLoose,
        color: '#4A8BFF',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: Colors.DefaultWhite,
        borderRadius: ResponsivePixels.size20,
        padding: ResponsivePixels.size24,
        alignItems: 'center',
    },
    modalTitle: {
        ...Typography.h1RanadeBold,
        fontSize: ResponsivePixels.size22,
        color: Colors.MidnightInkText,
        marginBottom: ResponsivePixels.size12,
    },
    modalText: {
        ...Typography.bodyMediumPoppinsRegular,
        color: Colors.MutedSteelText,
        textAlign: 'center',
        marginBottom: ResponsivePixels.size24,
    },
    modalActions: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        gap: ResponsivePixels.size12,
    },
    modalButton: {
        flex: 1,
        paddingVertical: ResponsivePixels.size12,
        borderRadius: ResponsivePixels.size12,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: Colors.FogGrey,
    },
    logoutButton: {
        backgroundColor: '#FF4B55',
    },
    cancelButtonText: {
        ...Typography.bodyLargePoppinsMedium,
        color: Colors.MidnightInkText,
    },
    logoutButtonText: {
        ...Typography.bodyLargePoppinsMedium,
        color: Colors.DefaultWhite,
    },
});
