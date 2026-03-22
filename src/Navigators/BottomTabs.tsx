import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CustomTabBar } from "./CustomTabBar";

// Temporary Dummy Screens
const HomeScreen = () => (
    <View style={styles.screen}>
        <Text>Home Screen</Text>
    </View>
);
const HistoryScreen = () => (
    <View style={styles.screen}>
        <Text>History Screen</Text>
    </View>
);
const MiddleScreen = () => (
    <View style={styles.screen}>
        <Text>Middle Screen Action</Text>
    </View>
);
const NewsScreen = () => (
    <View style={styles.screen}>
        <Text>News Screen</Text>
    </View>
);
const SettingScreen = () => (
    <View style={styles.screen}>
        <Text>Setting Screen</Text>
    </View>
);

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
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="History" component={HistoryScreen} />
            <Tab.Screen name="Middle" component={MiddleScreen} options={{ tabBarLabel: "" }} />
            <Tab.Screen name="News" component={NewsScreen} />
            <Tab.Screen name="Setting" component={SettingScreen} />
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
