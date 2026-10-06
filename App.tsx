import { LogBox, StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/Navigators/AppNavigator';

import { ThemeProvider } from './src/Theme/ThemeContext';
import { useEffect } from 'react';
import { PremiumProvider } from './src/Context/PremiumContext';
import { AuthProvider } from './src/Context/AuthContext';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/Common/ToastConfig';

function App() {
  useEffect(() => {
    LogBox.ignoreAllLogs(true);
  }, []);

  return (
    <ThemeProvider>
      <PremiumProvider>
        <AuthProvider>
          <SafeAreaProvider>
            <StatusBar
              barStyle="light-content"
              translucent
              backgroundColor="transparent"
            />
            <AppNavigator />
            <Toast config={toastConfig} />
          </SafeAreaProvider>
        </AuthProvider>
      </PremiumProvider>
    </ThemeProvider>
  );
}

export default App;
