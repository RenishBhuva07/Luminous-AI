import { Fonts } from "./fonts";


export const Typography = {
    ranade: {
        bold26_32: {
            fontFamily: Fonts.ranade.bold,
            fontSize: 26,
            lineHeight: 32,
        },
        bold20_20: {
            fontFamily: Fonts.ranade.bold,
            fontSize: 20,
            lineHeight: 20,
        },
        bold16_16: {
            fontFamily: Fonts.ranade.bold,
            fontSize: 16,
            lineHeight: 16,
        },
        bold14_14: {
            fontFamily: Fonts.ranade.bold,
            fontSize: 14,
            lineHeight: 14,
        },
        bold10_10: {
            fontFamily: Fonts.ranade.bold,
            fontSize: 10,
            lineHeight: 10,
        },
        medium14_14: {
            fontFamily: Fonts.ranade.medium,
            fontSize: 14,
            lineHeight: 14,
        },
        regular16_16: {
            fontFamily: Fonts.ranade.regular,
            fontSize: 16,
            lineHeight: 16,
        },
        regular14_14: {
            fontFamily: Fonts.ranade.regular,
            fontSize: 14,
            lineHeight: 14,
        },
    },
    poppins: {
        semiBold18_18: {
            fontFamily: Fonts.poppins.semiBold,
            fontSize: 18,
            lineHeight: 18,
        },
        semiBold16_16: {
            fontFamily: Fonts.poppins.semiBold,
            fontSize: 16,
            lineHeight: 16,
        },
        semiBold14_14: {
            fontFamily: Fonts.poppins.semiBold,
            fontSize: 14,
            lineHeight: 14,
        },
        semiBold12_12: {
            fontFamily: Fonts.poppins.semiBold,
            fontSize: 12,
            lineHeight: 12,
        },
        medium16_16: {
            fontFamily: Fonts.poppins.medium,
            fontSize: 16,
            lineHeight: 16,
        },
        medium14_20: {
            fontFamily: Fonts.poppins.medium,
            fontSize: 14,
            lineHeight: 20,
        },
        medium14_14: {
            fontFamily: Fonts.poppins.medium,
            fontSize: 14,
            lineHeight: 14,
        },
        medium13_27: {
            fontFamily: Fonts.poppins.medium,
            fontSize: 13,
            lineHeight: 27,
        },
        regular16_24: {
            fontFamily: Fonts.poppins.regular,
            fontSize: 16,
            lineHeight: 24,
        },
        regular16_16: {
            fontFamily: Fonts.poppins.regular,
            fontSize: 16,
            lineHeight: 16,
        },
        regular14_14: {
            fontFamily: Fonts.poppins.regular,
            fontSize: 14,
            lineHeight: 14,
        },
        regular12_18: {
            fontFamily: Fonts.poppins.regular,
            fontSize: 12,
            lineHeight: 18,
        },
        regular12_12: {
            fontFamily: Fonts.poppins.regular,
            fontSize: 12,
            lineHeight: 12,
        },
        regular11_16_5: {
            fontFamily: Fonts.poppins.regular,
            fontSize: 11,
            lineHeight: 16.5,
        },
    },
};

import { Platform } from 'react-native';
import { Colors } from "../Assets/StyleUtilities/Colors";

export const ShadowStyles = {
    shadow: {
        shadowColor: Platform.OS === 'android' ? Colors.FogGrey : "rgba(0,0,0,0.07)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 7,
    }
};
