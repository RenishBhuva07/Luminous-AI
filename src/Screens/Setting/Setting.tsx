import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Switch, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { resetNavigation } from "../../Navigators/Navigator";
import { ChevronRight, Bookmark, Archive, Smartphone, Bell, Lock, Globe, Moon, Crown, LogOut, Pencil } from "lucide-react-native";
import { Colors } from "../../Assets/StyleUtilities/Colors";
import ResponsivePixels from "../../Assets/StyleUtilities/ResponsivePixels";
import { Typography } from "../../Theme/Typographys";
import { IMAGES } from "../../Assets/Images";
import { useTheme } from '../../Theme/ThemeContext';
import { usePremium } from "../../Context/PremiumContext";
import PremiumBadge from "../../Common/PremiumBadge";

export default function Setting() {
    const { Colors, isDarkMode, toggleTheme } = useTheme();
    const { isPremium } = usePremium();
    const navigation = useNavigation<any>();
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

    const handleLogout = () => {
        setIsLogoutModalVisible(false);
        resetNavigation("Login");
    };

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <View style={styles.profileSection}>
                <View style={styles.profilePicContainer}>
                    <Image source={IMAGES.Luminous_Face} style={styles.profilePic} />
                    <TouchableOpacity style={styles.editIconButton} onPress={() => navigation.navigate('Profile')}>
                        <Pencil color={Colors.DefaultWhite} size={20} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.userName}>Renish Patel</Text>
                <Text style={styles.userEmail}>renish.patel.07@gmail.com</Text>
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
        <View style={[styles.container, { backgroundColor: Colors.LightWhite }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {renderHeader()}
                {isPremium && (
                    <View style={styles.premiumBadgeContainer}>
                        <PremiumBadge />
                    </View>
                )}

                {/* Group 1 */}
                <View style={styles.cardGroup}>
                    {renderMenuItem('Save Messages', Bookmark, '#4A8BFF', null, true, () => navigation.navigate('SaveMessages'))}
                    {renderMenuItem('Archive Chat', Archive, '#FF5B65', null, true, () => navigation.navigate('ArchiveChat'))}
                    {renderMenuItem('Devices', Smartphone, '#42CBE9', null, false, () => navigation.navigate('Devices'))}
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
                    {renderToggleItem('Appearance', Moon, '#21AF85', isDarkMode, toggleTheme, false)}
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
    },
    scrollContent: {
        paddingTop: ResponsivePixels.size60,
        paddingBottom: ResponsivePixels.size120,
        paddingHorizontal: ResponsivePixels.size12,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: ResponsivePixels.size24,
    },
    premiumBadgeContainer: {
        position: "absolute",
        right: ResponsivePixels.size12,
        top: ResponsivePixels.size70,
        zIndex: 20,
    },
    profileSection: {
        alignItems: 'center',
        marginTop: ResponsivePixels.size16,
    },
    profilePicContainer: {
        position: 'relative',
        marginBottom: ResponsivePixels.size16,
    },
    profilePic: {
        width: ResponsivePixels.size100,
        height: ResponsivePixels.size100,
        borderRadius: ResponsivePixels.size50,
        backgroundColor: Colors.IvoryMist,
    },
    editIconButton: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: Colors.LuminousGreen,
        width: ResponsivePixels.size36,
        height: ResponsivePixels.size36,
        borderRadius: ResponsivePixels.size18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Colors.DefaultWhite,
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
        paddingVertical: ResponsivePixels.size12,
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
