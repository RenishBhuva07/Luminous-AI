import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_KEY = '@luminous_access_token';
const REFRESH_TOKEN_KEY = '@luminous_refresh_token';

class AuthHelper {
  static async setTokens(
    accessToken: string,
    refreshToken: string,
  ): Promise<void> {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    } catch (error) {
      console.error('Error setting tokens', error);
    }
  }

  static async getAccessToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting access token', error);
      return null;
    }
  }

  static async getRefreshToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting refresh token', error);
      return null;
    }
  }

  static async setAccessToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
    } catch (error) {
      console.error('Error setting access token', error);
    }
  }

  static async clearTokens(): Promise<void> {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
      await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error clearing tokens', error);
    }
  }
}

export default AuthHelper;
