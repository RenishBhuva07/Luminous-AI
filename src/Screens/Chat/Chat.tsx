import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Modal,
  Animated,
} from 'react-native';
import {
  Send,
  Mic,
  ScanLine,
  Wand2,
  MoreHorizontal,
  Sliders,
} from 'lucide-react-native';
import { Colors } from '../../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../../Assets/StyleUtilities/ResponsivePixels';
import { Typography } from '../../Theme/Typographys';
import { IMAGES } from '../../Assets/Images';
import { usePremium } from '../../Context/PremiumContext';
import PremiumBadge from '../../Common/PremiumBadge';
import { AuthContext } from '../../Context/AuthContext';
import { sendMessage } from '../../controllers/chatController';
import Markdown from 'react-native-markdown-display';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  suggestions?: string[];
};

const SUGGESTIONS = [
  'What are the latest AI trends?',
  'List the five best cafes in Ahmedabad.',
  'How to improve communication skill?',
];

export default function Chat() {
  const { isPremium } = usePremium();
  const { user } = React.useContext(AuthContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [inputText, setInputText] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [conversationStyle, setConversationStyle] = useState('Creative');
  const [isStylePopupVisible, setIsStylePopupVisible] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);

  const lastOffsetY = useRef(0);
  const headerVisible = useRef(true);
  const headerAnim = useRef(new Animated.Value(1)).current;

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY <= 0) {
      // Reached top
      if (!headerVisible.current) {
        headerVisible.current = true;
        Animated.timing(headerAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
      lastOffsetY.current = offsetY;
      return;
    }

    const diff = offsetY - lastOffsetY.current;

    if (diff > 10 && headerVisible.current) {
      // Scrolling down the content (finger moving UP) -> hide header
      headerVisible.current = false;
      Animated.timing(headerAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    } else if (diff < -10 && !headerVisible.current) {
      // Scrolling up the content (finger moving DOWN) -> show header
      headerVisible.current = true;
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }

    lastOffsetY.current = offsetY;
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || isBotTyping) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
    };
    setMessages(prev => [...prev, newUserMsg]);
    setInputText('');
    setIsBotTyping(true);
    setStatusText('Generating answers for you...');
    Keyboard.dismiss();

    try {
      const data = await sendMessage(text);

      setIsBotTyping(false);
      setStatusText('');

      const newId = (Date.now() + 1).toString();

      let responseText = '';
      if (data.data?.message?.content) {
        responseText = data.data.message.content;
      } else {
        responseText =
          data.message ||
          data.text ||
          data.response ||
          (typeof data === 'string' ? data : JSON.stringify(data));
      }

      const sourcesArr = data.sources || data.data?.sources || [];
      const suggestions = data.suggestions || data.data?.suggestions || [];

      // Stream the text word by word
      const words = String(responseText).split(' ');
      let accumulated = '';

      setMessages(prev => [
        ...prev,
        { id: newId, sender: 'bot', text: '', suggestions },
      ]);
      setIsAnimating(true);

      let wordIndex = 0;
      const interval = setInterval(() => {
        if (wordIndex < words.length) {
          accumulated += (wordIndex === 0 ? '' : ' ') + words[wordIndex];
          setMessages(prev =>
            prev.map(m => (m.id === newId ? { ...m, text: accumulated } : m)),
          );
          wordIndex++;
        } else {
          clearInterval(interval);
          setIsAnimating(false);
        }
      }, 40);
    } catch (error) {
      setIsBotTyping(false);
      setStatusText('');
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'bot',
          text: 'Sorry, I encountered an error. Please try again later.',
        },
      ]);
      console.error('API Error:', error);
    }
  };

  const handleClear = () => {
    setMessages([]);
    setIsBotTyping(false);
    setIsAnimating(false);
    setInputText('');
  };

  // Auto scroll to bottom when messages change or typing status changes
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: !isAnimating });
      }, 50);
    }
  }, [messages, isBotTyping, isAnimating]);

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setIsKeyboardVisible(true),
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setIsKeyboardVisible(false),
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const renderHeaderGraphic = () => (
    <View style={styles.headerGraphicContainer}>
      <Image
        source={IMAGES.Robot_Big}
        style={styles.robotImage}
        resizeMode="contain"
      />
      <Text style={styles.welcomeText}>Welcome to the {'\n'}Luminous</Text>
      <Text style={styles.subtitleText}>
        Use the power of AI to find answers from the{'\n'}web, create written
        content, and more.
      </Text>

      <View style={styles.suggestionsContainer}>
        {SUGGESTIONS.map((sug, index) => (
          <TouchableOpacity
            key={index}
            style={styles.suggestionPill}
            onPress={() => handleSend(sug)}
          >
            <Text style={styles.suggestionPillText}>{sug}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.separatorContainer}>
        <View style={[styles.separator, styles.transparent]} />
      </View>
    </View>
  );

  const renderMessage = (msg: Message) => {
    const isUser = msg.sender === 'user';
    return (
      <View key={msg.id} style={styles.messageRowContainer}>
        {isUser ? (
          <View style={styles.userMessageRow}>
            <View style={styles.userBubble}>
              <Text style={styles.userMessageText}>{msg.text}</Text>
            </View>
            <Image source={IMAGES.Luminous_Face} style={styles.miniAvatar} />
          </View>
        ) : (
          <View style={styles.botMessageRow}>
            <View style={styles.botBubble}>
              <Image source={IMAGES.Robot} style={styles.miniBotAvatar} />
              <Markdown style={markdownStyles}>{msg.text}</Markdown>
              <View style={styles.botBubbleFooter}>
                <Text style={styles.counterText}>1 of 5 ●</Text>
              </View>
            </View>
            {msg.suggestions && msg.suggestions.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.botSuggestionsScroll}
              >
                {msg.suggestions.map((sug, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.botSuggestionPill}
                    onPress={() => handleSend(sug)}
                  >
                    <Text style={styles.botSuggestionText}>{sug}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, inputFocused && { paddingBottom: 0 }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Mock underlying screen header for effect */}
      <Animated.View
        style={[
          styles.underlyingHeader,
          {
            height: headerAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [
                0,
                ResponsivePixels.size60 +
                  ResponsivePixels.size30 +
                  ResponsivePixels.size30,
              ],
            }),
            opacity: headerAnim,
            paddingTop: headerAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, ResponsivePixels.size60],
            }),
            paddingBottom: headerAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, ResponsivePixels.size40],
            }),
          },
        ]}
      >
        <View style={styles.underlyingProfile}>
          <Image source={IMAGES.Luminous_Face} style={styles.underlyingPic} />
          <View>
            <Text style={styles.underlyingGreeting}>Good Morning 👋</Text>
            <Text style={styles.underlyingName}>{user?.name || user?.email || 'User'}</Text>
          </View>
        </View>
        <View style={styles.headerRightControls}>
          {isPremium && <PremiumBadge />}
          <TouchableOpacity
            onPress={() => setIsStylePopupVisible(true)}
            style={styles.styleToggleBtn}
          >
            <Sliders color={Colors.MidnightInkText} size={24} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Main Chat Sheet overlaid */}
      <View style={styles.chatSheet}>
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {messages.length === 0 && renderHeaderGraphic()}

          <View style={styles.messagesContainer}>
            {messages.map(renderMessage)}

            {isBotTyping && (
              <View style={styles.stopRespondingContainer}>
                {statusText ? (
                  <Text style={styles.statusText}>🔍 {statusText}</Text>
                ) : null}
                <TouchableOpacity
                  style={styles.stopRespondingBtn}
                  onPress={() => setIsBotTyping(false)}
                >
                  <MoreHorizontal color="#FF6B6B" size={20} />
                  <Text style={styles.stopRespondingText}>Stop Responding</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Input Area */}
        <View
          style={[
            styles.inputArea,
            isKeyboardVisible && { paddingBottom: ResponsivePixels.size20 },
          ]}
        >
          <View style={styles.inputPill}>
            <TextInput
              style={styles.textInput}
              placeholder="Ask me anything..."
              placeholderTextColor={Colors.MutedSteelText}
              value={inputText}
              onChangeText={setInputText}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              multiline
            />

            <TouchableOpacity style={styles.iconBtn}>
              <Mic color={Colors.MidnightInkText} size={22} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sendBtn,
                !inputText.trim() && !isBotTyping
                  ? { backgroundColor: Colors.FogGrey }
                  : {},
              ]}
              onPress={() => handleSend(inputText)}
              disabled={!inputText.trim() || isBotTyping}
            >
              <Send color={Colors.DefaultWhite} size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Conversation Style Popup Modal */}
      <Modal
        visible={isStylePopupVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsStylePopupVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsStylePopupVisible(false)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            <Text style={styles.stylePickerTitle}>
              Choose a conversation style
            </Text>
            <View style={styles.segmentControl}>
              {['Creative', 'Balanced', 'Precise'].map(style => {
                const isActive = conversationStyle === style;
                return (
                  <TouchableOpacity
                    key={style}
                    style={[
                      styles.segmentItem,
                      isActive && styles.segmentItemActive,
                    ]}
                    onPress={() => {
                      setConversationStyle(style);
                      setIsStylePopupVisible(false);
                    }}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.segmentSubtext,
                        isActive && styles.segmentSubtextActive,
                      ]}
                    >
                      More
                    </Text>
                    <Text
                      style={[
                        styles.segmentText,
                        isActive && styles.segmentTextActive,
                      ]}
                    >
                      {style}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DefaultWhite,
  },
  underlyingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: ResponsivePixels.size60,
    paddingHorizontal: ResponsivePixels.size12,
    paddingBottom: ResponsivePixels.size40,
    backgroundColor: Colors.DefaultWhite,
    overflow: 'hidden',
  },
  underlyingProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  underlyingPic: {
    width: ResponsivePixels.size36,
    height: ResponsivePixels.size36,
    borderRadius: ResponsivePixels.size18,
    backgroundColor: Colors.IvoryMist,
    marginRight: ResponsivePixels.size12,
  },
  underlyingGreeting: {
    ...Typography.bodyLargePoppinsSemiBold,
    color: Colors.MidnightInkText,
  },
  underlyingName: {
    ...Typography.bodySmallPoppinsRegular,
    color: Colors.MutedSteelText,
  },
  headerRightControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  styleToggleBtn: {
    marginLeft: ResponsivePixels.size12,
    padding: ResponsivePixels.size4,
  },
  chatSheet: {
    flex: 1,
    backgroundColor: Colors.DefaultWhite,
    borderTopLeftRadius: ResponsivePixels.size30,
    borderTopRightRadius: ResponsivePixels.size30,
    marginTop: -ResponsivePixels.size20,
    shadowColor: Colors.DefaultBlack,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 10,
  },
  dragHandle: {
    width: ResponsivePixels.size40,
    height: ResponsivePixels.size4,
    backgroundColor: Colors.FogGrey,
    borderRadius: ResponsivePixels.size2,
    alignSelf: 'center',
    marginTop: ResponsivePixels.size12,
  },
  scrollContent: {
    paddingTop: 0,
    paddingBottom: ResponsivePixels.size180, // Increased to ensure last message clears the floating input area
    paddingHorizontal: ResponsivePixels.size20,
  },
  headerGraphicContainer: {
    alignItems: 'center',
    // marginBottom: ResponsivePixels.size20,
  },
  robotImage: {
    width: ResponsivePixels.size140,
    height: ResponsivePixels.size140,
    marginBottom: ResponsivePixels.size4,
  },
  welcomeText: {
    ...Typography.h1RanadeBold,
    fontSize: ResponsivePixels.size24,
    color: Colors.LuminousGreen,
    textAlign: 'center',
    marginBottom: ResponsivePixels.size12,
  },
  subtitleText: {
    ...Typography.bodyMediumPoppinsRegular,
    color: Colors.SlateGraphiteText,
    textAlign: 'center',
    marginBottom: ResponsivePixels.size20,
  },
  suggestionsContainer: {
    alignItems: 'center',
    gap: ResponsivePixels.size12,
  },
  suggestionPill: {
    borderWidth: 1,
    borderColor: Colors.PrimaryBlue,
    borderRadius: ResponsivePixels.size20,
    paddingHorizontal: ResponsivePixels.size20,
    paddingVertical: ResponsivePixels.size10,
  },
  suggestionPillText: {
    ...Typography.bodyMediumPoppinsMedium,
    color: Colors.PrimaryBlue,
  },
  separatorContainer: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.FogGrey,
    opacity: 0.3,
    marginVertical: ResponsivePixels.size20,
  },
  separator: {},
  transparent: {
    opacity: 0,
  },
  stylePickerTitle: {
    ...Typography.bodyLargePoppinsSemiBold,
    color: Colors.MidnightInkText,
    marginBottom: ResponsivePixels.size16,
  },
  segmentControl: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: ResponsivePixels.size16,
    padding: ResponsivePixels.size4,
    width: '100%',
  },
  segmentItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: ResponsivePixels.size12,
    borderRadius: ResponsivePixels.size12,
  },
  segmentItemActive: {
    backgroundColor: Colors.LuminousGreen,
  },
  segmentSubtext: {
    ...Typography.bodySuperSmallPoppinsRegularLoose,
    color: Colors.MutedSteelText,
  },
  segmentSubtextActive: {
    color: Colors.DefaultWhite,
    opacity: 0.9,
  },
  segmentText: {
    ...Typography.bodyMediumPoppinsSemiBold,
    color: Colors.MidnightInkText,
  },
  segmentTextActive: {
    color: Colors.DefaultWhite,
  },
  messagesContainer: {
    marginTop: ResponsivePixels.size10,
  },
  messageRowContainer: {
    marginBottom: ResponsivePixels.size20,
  },
  userMessageRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  userBubble: {
    backgroundColor: Colors.LuminousGreen,
    paddingHorizontal: ResponsivePixels.size16,
    paddingVertical: ResponsivePixels.size12,
    borderRadius: ResponsivePixels.size16,
    borderBottomRightRadius: ResponsivePixels.size4,
    maxWidth: '80%',
  },
  userMessageText: {
    ...Typography.bodyLargePoppinsRegular,
    color: Colors.DefaultWhite,
  },
  miniAvatar: {
    width: ResponsivePixels.size24,
    height: ResponsivePixels.size24,
    borderRadius: ResponsivePixels.size12,
    marginLeft: ResponsivePixels.size8,
    backgroundColor: Colors.IvoryMist,
  },
  botMessageRow: {
    alignItems: 'flex-start',
  },
  botBubble: {
    backgroundColor: '#F5F5F5',
    padding: ResponsivePixels.size16,
    borderRadius: ResponsivePixels.size16,
    borderBottomLeftRadius: ResponsivePixels.size4,
    maxWidth: '85%',
    marginBottom: ResponsivePixels.size12,
  },
  miniBotAvatar: {
    width: ResponsivePixels.size24,
    height: ResponsivePixels.size24,
    marginBottom: ResponsivePixels.size8,
  },
  botMessageText: {
    ...Typography.bodyLargePoppinsRegular,
    color: Colors.MidnightInkText,
    marginBottom: ResponsivePixels.size8,
  },
  botBubbleFooter: {
    alignItems: 'flex-end',
  },
  counterText: {
    ...Typography.bodySuperSmallPoppinsSemiBoldLoose,
    color: Colors.MutedSteelText,
  },
  botSuggestionsScroll: {
    marginLeft: ResponsivePixels.size8,
  },
  botSuggestionPill: {
    borderWidth: 1,
    borderColor: Colors.PrimaryBlue,
    borderRadius: ResponsivePixels.size16,
    paddingHorizontal: ResponsivePixels.size16,
    paddingVertical: ResponsivePixels.size8,
    marginRight: ResponsivePixels.size8,
  },
  botSuggestionText: {
    ...Typography.bodyMediumPoppinsMedium,
    color: Colors.PrimaryBlue,
  },
  stopRespondingContainer: {
    alignItems: 'center',
    marginVertical: ResponsivePixels.size12,
  },
  statusText: {
    ...Typography.bodyMediumPoppinsRegular,
    color: Colors.MutedSteelText,
    marginBottom: ResponsivePixels.size8,
  },
  stopRespondingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ResponsivePixels.size8,
    borderWidth: 1,
    borderColor: '#FF6B6B',
    borderRadius: ResponsivePixels.size20,
    paddingHorizontal: ResponsivePixels.size16,
    paddingVertical: ResponsivePixels.size8,
  },
  stopRespondingText: {
    ...Typography.bodyMediumPoppinsMedium,
    color: '#FF6B6B',
  },
  inputArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: ResponsivePixels.size20,
    paddingBottom: ResponsivePixels.size115, // Increased to clear tab bar fully
    paddingTop: ResponsivePixels.size10,
    backgroundColor: 'transparent',
  },
  sendBtn: {
    width: ResponsivePixels.size36,
    height: ResponsivePixels.size36,
    borderRadius: ResponsivePixels.size18,
    backgroundColor: Colors.LuminousGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: ResponsivePixels.size2,
  },
  inputPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F5F5F5',
    borderRadius: ResponsivePixels.size24,
    borderWidth: 1,
    borderColor: Colors.LuminousGreen + '50', // Added faded theme color border
    paddingLeft: ResponsivePixels.size16,
    paddingRight: ResponsivePixels.size8,
    paddingVertical: ResponsivePixels.size8,
    minHeight: ResponsivePixels.size48,
  },
  textInput: {
    flex: 1,
    ...Typography.bodyLargePoppinsRegular,
    color: Colors.MidnightInkText,
    maxHeight: ResponsivePixels.size100,
    minHeight: ResponsivePixels.size36,
    paddingVertical: Platform.OS === 'ios' ? ResponsivePixels.size8 : 0,
    textAlignVertical: 'center',
  },
  iconBtn: {
    padding: ResponsivePixels.size6,
    marginLeft: ResponsivePixels.size4,
    marginBottom: ResponsivePixels.size2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.DefaultWhite,
    padding: ResponsivePixels.size24,
    borderRadius: ResponsivePixels.size24,
    width: '90%',
    shadowColor: Colors.DefaultBlack,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
});

const markdownStyles = StyleSheet.create({
  body: {
    ...Typography.bodyLargePoppinsRegular,
    color: Colors.MidnightInkText,
    marginBottom: ResponsivePixels.size8,
  },
  strong: {
    ...Typography.bodyLargePoppinsSemiBold,
    color: Colors.MidnightInkText,
  },
  em: {
    fontStyle: 'italic',
  },
  paragraph: {
    marginTop: 0,
    marginBottom: 0,
  },
});
