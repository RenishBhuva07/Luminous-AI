import { LogBox, StatusBar, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/Navigators/AppNavigator";

import { ThemeProvider } from "./src/Theme/ThemeContext";
import { useEffect } from "react";

function App() {

    useEffect(() => {
        LogBox.ignoreAllLogs(true);
    }, [])

    return (
        <ThemeProvider>
            <SafeAreaProvider>
                <StatusBar
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                />
                <AppNavigator />
            </SafeAreaProvider>
        </ThemeProvider>
    );
}

export default App;
