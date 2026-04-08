import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import { Colors } from '../Assets/StyleUtilities/Colors';

export const lightColors = {
    // Highlights
    LuminousGreen: "#21AF85",
    Success: "#008552",
    Misty: "#BAEBCB",
    CrimsonPulse: "#FF3B30",
    BurntEmber: "#D92A0F",

    // Backgrounds
    DefaultBlack: "#000000",
    DefaultWhite: "#FFFFFF",
    IvoryMist: "#EEEEED",
    MoltenRust: "#D92A0F",
    BlushVeil: "#D6D6D6",
    FreshSage: "#92D08D",
    MintHaze: "#BAEBCB",
    UrbanGrey: "#B9B9B9",
    CloudSilk: "#E4E4E4",

    LightWhite: "#F3F5F8",

    // Foregrounds (Text)
    MidnightInkText: "#0F1721",
    PureWhiteText: "#FFFFFF",
    SlateGraphiteText: "#3F454D",
    MutedSteelText: "#6F747A",
    TrueBlackText: "#000000",

    // Others (Neutrals / Surfaces)
    SilverDust: "#CBCBCA",
    SoftLinen: "#EEEEEB",
    FogGrey: "#D9D9D9",

    // Rare
    CarbonSlate: "#2C3035",

    // Missing colors from other components
    SteelMist: "#A3A8B1",
    NoirBlack: "#111111",
    SunburstFlame: "#FF5B65",
    MoonDust: "#F0F0F0",

    PrimaryBlue: "#165DFF",
};

export const darkColors = {
    ...lightColors,
    // Dark mode overrides
    DefaultWhite: Colors.CarbonSlate, // White backgrounds become dark
    MidnightInkText: Colors.DefaultWhite, // Dark text becomes white
    TrueBlackText: Colors.DefaultWhite,
    IvoryMist: Colors.SlateGraphiteText,
    DefaultBlack: Colors.DefaultWhite,
    SilverDust: "#444A52",
    SoftLinen: "#3A3F46",
    FogGrey: "#4A5058",
};

interface ThemeContextType {
    isDarkMode: boolean;
    Colors: typeof lightColors;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    isDarkMode: false,
    Colors: lightColors,
    toggleTheme: () => { },
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const systemTheme = useColorScheme();
    const [isDarkMode, setIsDarkMode] = useState(systemTheme === 'dark');

    const toggleTheme = () => setIsDarkMode(prev => !prev);
    const Colors = isDarkMode ? darkColors : lightColors;

    return (
        <ThemeContext.Provider value={{ isDarkMode, Colors, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
