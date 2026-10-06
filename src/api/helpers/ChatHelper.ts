class ChatHelper {
  static formatMessageTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  static sortMessages(messages: any[]): any[] {
    return messages.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  }
}

export default ChatHelper;
