import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/Navigators/AppNavigator";

function App() {
    const isDarkMode = useColorScheme() === "dark";

    return (
        <SafeAreaProvider>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            <AppNavigator />
        </SafeAreaProvider>
    );
}

export default App;
