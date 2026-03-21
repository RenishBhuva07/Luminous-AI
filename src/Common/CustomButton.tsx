import React, { useRef } from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle, View, StyleSheet } from 'react-native';
import { Colors } from '../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import * as LucideIcons from 'lucide-react-native';
import { Typography } from '../Theme/Typographys';
import { Fonts } from '../Theme/fonts';

type ButtonVariant = 'primary' | 'outlined' | 'google' | 'facebook' | 'apple';

type CustomButtonProps = {
    title: string;
    onPress: () => void;
    bordered?: boolean;
    variant?: ButtonVariant;
    disabled?: boolean;
    style?: ViewStyle;
    buttonTextStyle?: TextStyle;
    disableAllCaps?: boolean;
    debouncePress?: boolean;
    icon?: string;
};

const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    onPress,
    bordered = false,
    variant,
    disabled = false,
    style,
    buttonTextStyle,
    disableAllCaps = false,
    debouncePress = true,
    icon,
}) => {

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleDebouncedPress = async () => {
        if (timeoutRef.current) return;

        onPress();
        timeoutRef.current = setTimeout(() => {
            timeoutRef.current = null;
        }, 3000);
    };

    const handlePress = debouncePress ? handleDebouncedPress : onPress;

    const resolvedVariant: ButtonVariant = variant ?? (bordered ? 'outlined' : 'primary');
    const variantStyles = getVariantStyles(resolvedVariant);
    const hasIconSlot = resolvedVariant === 'google' || resolvedVariant === 'facebook' || resolvedVariant === 'apple' || Boolean(icon);

    const iconName = icon === 'Cart' ? 'ShoppingCart' : icon;
    const IconComponent = iconName ? (LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType) : null;
    const iconColor = variantStyles.iconColor;
    const brandIcon = getBrandIcon(resolvedVariant);

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={disabled ? undefined : handlePress}
            style={[
                styles.containerBase,
                variantStyles.container,
                disabled && styles.disabled,
                style,
            ]}
            disabled={disabled}
        >
            {hasIconSlot && (
                <View style={styles.iconWrapper}>
                    {IconComponent ? (
                        <IconComponent color={iconColor} size={ResponsivePixels.size20} strokeWidth={2.5} />
                    ) : brandIcon ? (
                        brandIcon
                    ) : null}
                </View>
            )}
            <Text
                style={[
                    styles.textBase,
                    variantStyles.text,
                    { textTransform: disableAllCaps ? 'none' : variantStyles.textTransform },
                    buttonTextStyle,
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const getBrandIcon = (variant: ButtonVariant) => {
    if (variant === 'google') {
        return (
            <Text style={styles.googleIconText}>G</Text>
        );
    }

    if (variant === 'facebook') {
        return (
            <LucideIcons.Facebook color={Colors.DefaultWhite} size={ResponsivePixels.size18} strokeWidth={2.8} />
        );
    }

    if (variant === 'apple') {
        return (
            <LucideIcons.Apple color={Colors.DefaultWhite} size={ResponsivePixels.size20} strokeWidth={2.6} />
        );
    }

    return null;
};

const getVariantStyles = (variant: ButtonVariant): {
    container: ViewStyle;
    text: TextStyle;
    iconColor: string;
    textTransform: TextStyle['textTransform'];
} => {
    switch (variant) {
        case 'outlined':
            return {
                container: styles.outlinedContainer,
                text: styles.outlinedText,
                iconColor: Colors.LuminousGreen,
                textTransform: 'none',
            };
        case 'google':
            return {
                container: styles.googleContainer,
                text: styles.googleText,
                iconColor: Colors.MidnightInkText,
                textTransform: 'none',
            };
        case 'facebook':
            return {
                container: styles.facebookContainer,
                text: styles.socialLightText,
                iconColor: Colors.DefaultWhite,
                textTransform: 'none',
            };
        case 'apple':
            return {
                container: styles.appleContainer,
                text: styles.socialLightText,
                iconColor: Colors.DefaultWhite,
                textTransform: 'none',
            };
        case 'primary':
        default:
            return {
                container: styles.primaryContainer,
                text: styles.primaryText,
                iconColor: Colors.DefaultWhite,
                textTransform: 'none',
            };
    }
};

const styles = StyleSheet.create({
    containerBase: {
        borderRadius: ResponsivePixels.size14,
        // height: ResponsivePixels.size52,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: ResponsivePixels.size16,
        paddingVertical: ResponsivePixels.size14,
    },
    primaryContainer: {
        backgroundColor: Colors.LuminousGreen,
        borderWidth: 0,
    },
    outlinedContainer: {
        backgroundColor: Colors.DefaultWhite,
        borderWidth: 1,
        borderColor: Colors.LuminousGreen,
    },
    googleContainer: {
        backgroundColor: Colors.IvoryMist,
    },
    facebookContainer: {
        backgroundColor: '#2374E1',
    },
    appleContainer: {
        backgroundColor: Colors.TrueBlackText,
    },
    disabled: {
        opacity: 0.45,
    },
    textBase: {
        ...Typography.h6Bold,
        fontFamily: Fonts.ranade.bold,
        fontSize: 16,
        textAlign: 'center',
    },
    primaryText: {
        color: Colors.PureWhiteText,
    },
    outlinedText: {
        color: Colors.LuminousGreen,
    },
    googleText: {
        color: Colors.MidnightInkText,
    },
    socialLightText: {
        color: Colors.PureWhiteText,
    },
    iconWrapper: {
        marginRight: ResponsivePixels.size10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    googleIconText: {
        ...Typography.h6Bold,
        color: '#DB4437',
        fontSize: ResponsivePixels.size20,
        lineHeight: ResponsivePixels.size22,
    },
});

export default CustomButton;
