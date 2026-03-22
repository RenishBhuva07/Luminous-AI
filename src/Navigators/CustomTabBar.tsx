import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions, Text } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Home, Clock, Inbox, Settings } from "lucide-react-native";
import Svg, { Path } from "react-native-svg";
import { Image } from "react-native";
import { IMAGES } from "../Assets/Images";
import { Colors } from "../Assets/StyleUtilities/Colors";
import ResponsivePixels from "../Assets/StyleUtilities/ResponsivePixels";
import { Typography } from "../Theme/Typographys";

const { width: W } = Dimensions.get("window");
const TAB_BAR_HEIGHT = ResponsivePixels.size80;
const HUMP_HEIGHT = ResponsivePixels.size30;

export const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    return (
        <View style={styles.container}>
            {/* Custom SVG Background */}
            <View style={styles.svgContainer}>
                <Svg width={W} height={TAB_BAR_HEIGHT + HUMP_HEIGHT} viewBox={`0 0 ${W} ${TAB_BAR_HEIGHT + HUMP_HEIGHT}`} fill="none">
                    <Path
                        d={`M 0 ${HUMP_HEIGHT} L ${W / 2 - 65} ${HUMP_HEIGHT} C ${W / 2 - 35} ${HUMP_HEIGHT}, ${W / 2 - 45} 5, ${W / 2} 5 C ${W / 2 + 45} 5, ${W / 2 + 35} ${HUMP_HEIGHT}, ${W / 2 + 65} ${HUMP_HEIGHT} L ${W} ${HUMP_HEIGHT} L ${W} ${TAB_BAR_HEIGHT + HUMP_HEIGHT} L 0 ${TAB_BAR_HEIGHT + HUMP_HEIGHT} Z`}
                        fill="#FFFFFF"
                    />
                </Svg>
            </View>

            <View style={styles.tabContent}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: "tabLongPress",
                            target: route.key,
                        });
                    };

                    if (route.name === "Middle") {
                        return (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.8}
                                onPress={onPress}
                                style={styles.middleButtonContainer}
                            >
                                <View style={styles.middleButton}>
                                    <Image
                                        source={IMAGES.Luminous_Face}
                                        style={styles.middleIcon}
                                        resizeMode="contain"
                                    />
                                </View>
                            </TouchableOpacity>
                        );
                    }

                    return (
                        <TouchableOpacity
                            key={index}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarButtonTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.tabItem}
                        >
                            {/* Top Indicator */}
                            {isFocused && (
                                <View style={styles.indicatorContainer}>
                                    <View style={styles.indicator} />
                                </View>
                            )}

                            <View style={styles.iconContainer}>
                                {route.name === "Home" && (
                                    <Home color={isFocused ? Colors.LuminousGreen : Colors.MutedSteelText} size={26} strokeWidth={isFocused ? 2.5 : 2} />
                                )}
                                {route.name === "History" && (
                                    <Clock color={isFocused ? Colors.LuminousGreen : Colors.MutedSteelText} size={26} strokeWidth={isFocused ? 2.5 : 2} />
                                )}
                                {route.name === "News" && (
                                    <Inbox color={isFocused ? Colors.LuminousGreen : Colors.MutedSteelText} size={26} strokeWidth={isFocused ? 2.5 : 2} />
                                )}
                                {route.name === "Setting" && (
                                    <Settings color={isFocused ? Colors.LuminousGreen : Colors.MutedSteelText} size={26} strokeWidth={isFocused ? 2.5 : 2} />
                                )}
                            </View>
                            <Text style={[styles.tabLabel, { color: isFocused ? Colors.LuminousGreen : Colors.MutedSteelText }]}>
                                {label as string}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        width: W,
        height: TAB_BAR_HEIGHT + HUMP_HEIGHT,
        zIndex: 8,
        justifyContent: "flex-end",
    },
    svgContainer: {
        position: "absolute",
        bottom: 0,
        width: W,
        height: TAB_BAR_HEIGHT + HUMP_HEIGHT,
        shadowColor: Colors.DefaultBlack,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 10,
    },
    tabContent: {
        flexDirection: "row",
        height: TAB_BAR_HEIGHT,
        paddingBottom: 10,
    },
    tabItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        // height: TAB_BAR_HEIGHT,
    },
    indicatorContainer: {
        position: "absolute",
        top: 0,
        width: 30,
        height: 6,
        alignItems: "center",
    },
    indicator: {
        width: 30,
        height: 8,
        backgroundColor: Colors.LuminousGreen,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        shadowColor: Colors.LuminousGreen,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 6,
    },
    iconContainer: {
        width: ResponsivePixels.size30,
        height: ResponsivePixels.size30,
        justifyContent: "center",
        alignItems: "center",
    },
    tabLabel: {
        ...Typography.bodySuperSmallPoppinsSemiBoldLoose
    },
    middleButtonContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        zIndex: 10,
    },
    middleButton: {
        width: ResponsivePixels.size64,
        height: ResponsivePixels.size64,
        borderRadius: 50,
        backgroundColor: Colors.DefaultWhite,
        justifyContent: "center",
        alignItems: "center",
        bottom: 20,
        borderWidth: 1,
        borderColor: Colors.LuminousGreen,
        shadowColor: Colors.LuminousGreen,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    middleIcon: {
        width: ResponsivePixels.size64,
        height: ResponsivePixels.size64,
        tintColor: Colors.LuminousGreen,
    },
});
