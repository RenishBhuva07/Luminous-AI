import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CustomTabBar } from "./CustomTabBar";
import Home from "../Screens/Home/Home";
import History from "../Screens/History/History";
import News from "../Screens/News/News";
import Setting from "../Screens/Setting/Setting";
import Chat from "../Screens/Chat/Chat";

// Temporary Dummy Screens

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
            }}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="History" component={History} />
            <Tab.Screen name="Middle" component={Chat} options={{ tabBarLabel: "" }} />
            <Tab.Screen name="News" component={News} />
            <Tab.Screen name="Setting" component={Setting} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
    },
});
