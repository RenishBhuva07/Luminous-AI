import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./Navigator";
import Splash from "../Screens/Splash/Splash";
import Intro from "../Screens/Intro/Intro";
import Login from "../Screens/Login/Login";
import CreateAccount from "../Screens/CreateAccount/CreateAccount";
import CompleteProfile from "../Screens/CompleteProfile/CompleteProfile";
import BottomTabs from "./BottomTabs";
import Notifications from "../Screens/Notifications/Notifications";
import PrivacySecurity from "../Screens/PrivacySecurity/PrivacySecurity";
import Language from "../Screens/Language/Language";
import Premium from "../Screens/Premium/Premium";
import Profile from "../Screens/Profile/Profile";
import SaveMessages from "../Screens/SaveMessages/SaveMessages";
import ArchiveChat from "../Screens/ArchiveChat/ArchiveChat";
import Devices from "../Screens/Devices/Devices";
import Payment from "../Screens/Payment/Payment";
import PaymentDone from "../Screens/PaymentDone/PaymentDone";
import { AuthContext } from "../Context/AuthContext";

const Stack = createNativeStackNavigator()

export default function AppNavigator() {
    const { isLoading, isAuthenticated, requiresProfileCompletion } = useContext(AuthContext);

    if (isLoading) {
        return (
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Splash" component={Splash} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isAuthenticated ? (
                    // Not logged in Auth Stack
                    <>
                        <Stack.Screen name="Intro" component={Intro} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="CreateAccount" component={CreateAccount} />
                    </>
                ) : requiresProfileCompletion ? (
                    // Logged in but profile incomplete
                    <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
                ) : (
                    // Fully logged in Main Stack
                    <>
                        <Stack.Screen name="BottomTabs" component={BottomTabs} />
                        <Stack.Screen name="Notifications" component={Notifications} />
                        <Stack.Screen name="PrivacySecurity" component={PrivacySecurity} />
                        <Stack.Screen name="Language" component={Language} />
                        <Stack.Screen name="Premium" component={Premium} />
                        <Stack.Screen name="Profile" component={Profile} />
                        <Stack.Screen name="SaveMessages" component={SaveMessages} />
                        <Stack.Screen name="ArchiveChat" component={ArchiveChat} />
                        <Stack.Screen name="Devices" component={Devices} />
                        <Stack.Screen name="Payment" component={Payment} />
                        <Stack.Screen name="PaymentDone" component={PaymentDone} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}