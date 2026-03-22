import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./Navigator";
import Splash from "../Screens/Splash/Splash";
import Intro from "../Screens/Intro/Intro";
import Login from "../Screens/Login/Login";
import CreateAccount from "../Screens/CreateAccount/CreateAccount";
import BottomTabs from "./BottomTabs";

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
            </Stack.Navigator>
        </NavigationContainer>
    )
}