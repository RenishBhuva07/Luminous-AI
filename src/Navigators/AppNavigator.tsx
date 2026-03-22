import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./Navigator";
import Splash from "../Screens/Splash/Splash";
import Intro from "../Screens/Intro/Intro";
import Login from "../Screens/Login/Login";
import CreateAccount from "../Screens/CreateAccount/CreateAccount";
import BottomTabs from "./BottomTabs";
import Notifications from "../Screens/Notifications/Notifications";
import PrivacySecurity from "../Screens/PrivacySecurity/PrivacySecurity";
import Language from "../Screens/Language/Language";
import Premium from "../Screens/Premium/Premium";

const Stack = createNativeStackNavigator()

export default function AppNavigator() {

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Intro" component={Intro} />
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="CreateAccount" component={CreateAccount} />
                <Stack.Screen name="BottomTabs" component={BottomTabs} />
                <Stack.Screen name="Notifications" component={Notifications} />
                <Stack.Screen name="PrivacySecurity" component={PrivacySecurity} />
                <Stack.Screen name="Language" component={Language} />
                <Stack.Screen name="Premium" component={Premium} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}