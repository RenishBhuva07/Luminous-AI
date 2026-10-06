import apiClient from '../apiClient';
import { API_ENDPOINTS } from '../endpoints';

class ChatController {
  static async sendMessage(message: string) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.CHAT.MESSAGES, {
        message,
      });
      return response.data;
    } catch (error) {
      console.error('ChatController.sendMessage error:', error);
      throw error;
    }
  }
}

export default ChatController;
