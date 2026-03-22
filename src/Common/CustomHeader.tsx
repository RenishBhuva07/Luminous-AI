import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { Colors } from '../Assets/StyleUtilities/Colors';
import { Typography } from '../Theme/Typographys';

interface HeaderOption {
    icon?: any;
    customIcon?: React.ReactNode;
    onPress?: () => void;
    color?: string;
}

interface CustomHeaderProps {
    headerTitle?: string;
    headerTitleColor?: string;
    headerBackgroundColor?: string;
    headerLeft?: HeaderOption;
    headerRight?: HeaderOption;
    showHeader?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
    headerTitle = "Header Title",
    headerTitleColor = Colors.MidnightInkText,
    headerBackgroundColor,
    headerLeft,
    headerRight,
    showHeader = false
}) => {

    if (!showHeader) return null;

    const renderLeftOption = () => {
        if (!headerLeft) return <View style={styles.placeholder} />;

        return (
            <TouchableOpacity
                style={styles.iconContainer}
                onPress={headerLeft?.onPress}
                activeOpacity={0.7}
            >
                {headerLeft?.customIcon ? (
                    headerLeft.customIcon
                ) : (
                    <Image
                        source={headerLeft?.icon}
                        style={{ width: ResponsivePixels.size24, height: ResponsivePixels.size24, tintColor: headerLeft?.color }}
                        resizeMode="contain"
                    />
                )}
            </TouchableOpacity>
        );
    };

    const renderRightOption = () => {
        if (!headerRight) return <View style={styles.placeholder} />;

        return (
            <TouchableOpacity
                style={styles.iconContainer}
                onPress={headerRight?.onPress}
                activeOpacity={0.7}
            >
                {headerRight?.customIcon ? (
                    headerRight.customIcon
                ) : (
                    <Image
                        source={headerRight?.icon}
                        style={{ width: ResponsivePixels.size24, height: ResponsivePixels.size24, tintColor: headerRight?.color }}
                        resizeMode="contain"
                    />
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.headerContainer, { backgroundColor: headerBackgroundColor }]}>
            <SafeAreaView edges={['top']}>
                <View style={styles.headerContent}>
                    <View style={styles.leftSection}>
                        {renderLeftOption()}
                    </View>

                    <View style={styles.centerSection}>
                        <Text style={[styles.titleText, { color: headerTitleColor }]}>
                            {headerTitle}
                        </Text>
                    </View>

                    <View style={styles.rightSection}>
                        {renderRightOption()}
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: ResponsivePixels.size12,
        paddingVertical: ResponsivePixels.size15,
        minHeight: ResponsivePixels.size56,
    },
    leftSection: {
        flex: 1,
        alignItems: 'flex-start',
    },
    centerSection: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightSection: {
        flex: 1,
        alignItems: 'flex-end',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        color: Colors.MidnightInkText,
        textAlign: 'center',

        ...Typography.h6PoppinsSemiBold,
    },
    placeholder: {
        // width: ResponsivePixels.size40,
        // height: ResponsivePixels.size40,
    },
});

export default CustomHeader;
