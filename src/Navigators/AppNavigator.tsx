import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./Navigator";
import Splash from "../Screens/Splash/Splash";
import Intro from "../Screens/Intro/Intro";

const Stack = createNativeStackNavigator()

export default function AppNavigator() {

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Intro" component={Intro} />
                <Stack.Screen name="Splash" component={Splash} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}