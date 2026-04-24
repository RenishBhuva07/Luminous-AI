import { LogBox, StatusBar, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/Navigators/AppNavigator";

import { ThemeProvider } from "./src/Theme/ThemeContext";
import { useEffect } from "react";
import { PremiumProvider } from "./src/Context/PremiumContext";

function App() {

    useEffect(() => {
        LogBox.ignoreAllLogs(true);
    }, [])

    return (
        <ThemeProvider>
            <PremiumProvider>
                <SafeAreaProvider>
                    <StatusBar
                        barStyle="light-content"
                        translucent
                        backgroundColor="transparent"
                    />
                    <AppNavigator />
                </SafeAreaProvider>
            </PremiumProvider>
        </ThemeProvider>
    );
}

export default App;
