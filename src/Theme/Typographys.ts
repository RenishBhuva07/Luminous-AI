import { Fonts } from "./fonts";


export const Typography = {

    // ─────────────────────────────────────────────────────────────────────────
    // 🔷 RANADE
    // ─────────────────────────────────────────────────────────────────────────

    // H1  ·  26 / 32
    h1RanadeBold: {
        fontFamily: Fonts.ranade.bold,
        fontSize: 26,
        lineHeight: 32,
    },

    // Body Large  ·  16
    bodyLargeRanadeRegular: {
        fontFamily: Fonts.ranade.regular,
        fontSize: 16,
        lineHeight: 16,
    },

    // Body Medium  ·  14
    bodyMediumRanadeBold: {
        fontFamily: Fonts.ranade.bold,
        fontSize: 14,
        lineHeight: 14,
    },
    bodyMediumRanadeMedium: {
        fontFamily: Fonts.ranade.medium,
        fontSize: 14,
        lineHeight: 14,
    },
    bodyMediumRanadeRegular: {
        fontFamily: Fonts.ranade.regular,
        fontSize: 14,
        lineHeight: 14,
    },

    // Body Small  ·  10
    bodySmallRanadeBold: {
        fontFamily: Fonts.ranade.bold,
        fontSize: 10,
        lineHeight: 10,
    },

    // Display  ·  20  (between H1 and Body Large — no standard bucket)
    displayRanadeBold: {
        fontFamily: Fonts.ranade.bold,
        fontSize: 20,
        lineHeight: 20,
    },


    // ─────────────────────────────────────────────────────────────────────────
    // 🔶 POPPINS
    // ─────────────────────────────────────────────────────────────────────────

    // H6  ·  18
    h6PoppinsSemiBold: {
        fontFamily: Fonts.poppins.semiBold,
        fontSize: 18,
        lineHeight: 18,
    },

    // Body Large  ·  16
    bodyLargePoppinsSemiBold: {
        fontFamily: Fonts.poppins.semiBold,
        fontSize: 16,
        lineHeight: 16,
    },
    bodyLargePoppinsMedium: {
        fontFamily: Fonts.poppins.medium,
        fontSize: 16,
        lineHeight: 16,
    },
    bodyLargePoppinsRegular: {
        fontFamily: Fonts.poppins.regular,
        fontSize: 16,
        lineHeight: 16,
    },
    bodyLargePoppinsRegularLoose: {
        fontFamily: Fonts.poppins.regular,
        fontSize: 16,
        lineHeight: 24,
    },

    // Body Medium  ·  14
    bodyMediumPoppinsSemiBold: {
        fontFamily: Fonts.poppins.semiBold,
        fontSize: 14,
        lineHeight: 14,
    },
    bodyMediumPoppinsMedium: {
        fontFamily: Fonts.poppins.medium,
        fontSize: 14,
        lineHeight: 14,
    },
    bodyMediumPoppinsMediumLoose: {
        fontFamily: Fonts.poppins.medium,
        fontSize: 14,
        lineHeight: 20,
    },
    bodyMediumPoppinsRegular: {
        fontFamily: Fonts.poppins.regular,
        fontSize: 14,
        lineHeight: 14,
    },

    // Body Small  ·  13
    bodySmallPoppinsMediumLoose: {
        fontFamily: Fonts.poppins.medium,
        fontSize: 13,
        lineHeight: 27,
    },

    // Body Small  ·  12
    bodySmallPoppinsSemiBold: {
        fontFamily: Fonts.poppins.semiBold,
        fontSize: 12,
        lineHeight: 12,
    },
    bodySmallPoppinsRegular: {
        fontFamily: Fonts.poppins.regular,
        fontSize: 12,
        lineHeight: 12,
    },
    bodySmallPoppinsRegularLoose: {
        fontFamily: Fonts.poppins.regular,
        fontSize: 12,
        lineHeight: 18,
    },

    // Body Super Small  ·  11
    bodySuperSmallPoppinsRegularLoose: {
        fontFamily: Fonts.poppins.regular,
        fontSize: 11,
        lineHeight: 16.5,
    },
    bodySuperSmallPoppinsSemiBoldLoose: {
        fontFamily: Fonts.poppins.semiBold,
        fontSize: 11,
        lineHeight: 16.5,
    },
};


// ─────────────────────────────────────────────────────────────────────────────
// Shadow
// ─────────────────────────────────────────────────────────────────────────────

import { Platform } from "react-native";
import { Colors } from "../Assets/StyleUtilities/Colors";

export const ShadowStyles = {
    shadow: {
        shadowColor: Platform.OS === "android" ? Colors.FogGrey : "rgba(0,0,0,0.07)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 7,
    },
};