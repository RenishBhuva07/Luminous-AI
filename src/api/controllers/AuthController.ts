import apiClient from '../apiClient';
import { API_ENDPOINTS } from '../endpoints';
import AuthHelper from '../helpers/AuthHelper';

class AuthController {
  static async register(data: {
    email: string;
    password: string;
    acceptedTerms: boolean;
  }) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, data);

      const responseData = response.data?.data;
      if (responseData?.accessToken && responseData?.refreshToken) {
        await AuthHelper.setTokens(
          responseData.accessToken,
          responseData.refreshToken,
        );
      }

      return response.data;
    } catch (error) {
      console.error('AuthController.register error:', error);
      throw error;
    }
  }

  static async login(data: { email: string; password: string }) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, data);

      const responseData = response.data?.data;
      if (responseData?.accessToken && responseData?.refreshToken) {
        await AuthHelper.setTokens(
          responseData.accessToken,
          responseData.refreshToken,
        );
      }

      return response.data;
    } catch (error) {
      console.error('AuthController.login error:', error);
      throw error;
    }
  }

  static async updateProfile(data: { name: string }) {
    try {
      const response = await apiClient.patch(API_ENDPOINTS.AUTH.PROFILE, data);
      return response.data;
    } catch (error) {
      console.error('AuthController.updateProfile error:', error);
      throw error;
    }
  }

  static async logout() {
    try {
      await AuthHelper.clearTokens();
    } catch (error) {
      console.error('AuthController.logout error:', error);
    }
  }

  static async getProfile() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.AUTH.PROFILE);
      return response.data;
    } catch (error) {
      console.error('AuthController.getProfile error:', error);
      throw error;
    }
  }
}

export default AuthController;
