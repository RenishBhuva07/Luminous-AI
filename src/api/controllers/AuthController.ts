import apiClient from '../apiClient';
import { API_ENDPOINTS } from '../endpoints';
import AuthHelper from '../helpers/AuthHelper';

class AuthController {
  static async register(data: {
    email: string;
    password: string;
    acceptedTerms: boolean;
    deviceName?: string;
    deviceType?: string;
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

  static async login(data: {
    email: string;
    password: string;
    deviceName?: string;
    deviceType?: string;
  }) {
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

  static async updateProfile(data: { name?: string; avatar?: any }) {
    try {
      let payload: any = data;
      let headers: any = {};

      if (data.avatar) {
        payload = new FormData();
        if (data.name) payload.append('name', data.name);
        payload.append('avatar', {
          uri: data.avatar.uri,
          type: data.avatar.type || 'image/jpeg',
          name: data.avatar.fileName || 'avatar.jpg',
        } as any);
        headers['Content-Type'] = 'multipart/form-data';
      }

      const response = await apiClient.patch(
        API_ENDPOINTS.AUTH.PROFILE,
        payload,
        { headers },
      );
      return response.data;
    } catch (error) {
      console.error('AuthController.updateProfile error:', error);
      throw error;
    }
  }

  static async logout() {
    try {
      const refreshToken = await AuthHelper.getRefreshToken();
      if (refreshToken) {
        await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken });
      }
    } catch (error) {
      console.error('AuthController.logout API error:', error);
    } finally {
      try {
        await AuthHelper.clearTokens();
      } catch (err) {
        console.error('AuthController.logout clearTokens error:', err);
      }
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
  static async changePassword(data: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) {
    try {
      const response = await apiClient.patch(
        API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
        data,
      );
      return response.data;
    } catch (error) {
      console.error('AuthController.changePassword error:', error);
      throw error;
    }
  }
  static async getSessions() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.AUTH.SESSIONS);
      return response.data;
    } catch (error) {
      console.error('AuthController.getSessions error:', error);
      throw error;
    }
  }

  static async deleteSession(sessionId: string) {
    try {
      const response = await apiClient.delete(
        `${API_ENDPOINTS.AUTH.SESSIONS}/${sessionId}`,
      );
      return response.data;
    } catch (error) {
      console.error('AuthController.deleteSession error:', error);
      throw error;
    }
  }
  static async deleteAccount(data: { password?: string; reason?: string }) {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.AUTH.ACCOUNT, {
        data,
      });
      await AuthHelper.clearTokens();
      return response.data;
    } catch (error) {
      console.error('AuthController.deleteAccount error:', error);
      throw error;
    }
  }

  static async forgotPassword(data: { email: string }) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
      return response.data;
    } catch (error) {
      console.error('AuthController.forgotPassword error:', error);
      throw error;
    }
  }

  static async verifyResetOtp(data: { email: string; otp: string }) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.VERIFY_RESET_OTP, data);
      return response.data;
    } catch (error) {
      console.error('AuthController.verifyResetOtp error:', error);
      throw error;
    }
  }

  static async resetPassword(data: { email: string; resetToken: string; newPassword: string; confirmNewPassword: string }) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
      return response.data;
    } catch (error) {
      console.error('AuthController.resetPassword error:', error);
      throw error;
    }
  }
}

export default AuthController;
