import React, { useState, useRef, useEffect } from "react";
import {
    View, Text, StyleSheet, Image, ScrollView, TouchableOpacity,
    TextInput, KeyboardAvoidingView, Platform, Keyboard
} from "react-native";
import { Send, Mic, ScanLine, Wand2, MoreHorizontal } from "lucide-react-native";
import { Colors } from "../../Assets/StyleUtilities/Colors";
import ResponsivePixels from "../../Assets/StyleUtilities/ResponsivePixels";
import { Typography } from "../../Theme/Typographys";
import { IMAGES } from "../../Assets/Images";


type Message = {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    suggestions?: string[];
};

const SUGGESTIONS = [
    "How does GPT use AI?",
    "What else can GPT do?",
    "What is the latest news in tech?"
];

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [inputText, setInputText] = useState('');
    const [inputFocused, setInputFocused] = useState(false);
    const [conversationStyle, setConversationStyle] = useState('Creative');

    const scrollViewRef = useRef<ScrollView>(null);

    const handleSend = (text: string) => {
        if (!text.trim()) return;

        const newUserMsg: Message = { id: Date.now().toString(), text, sender: 'user' };
        setMessages(prev => [...prev, newUserMsg]);
        setInputText('');
        setIsBotTyping(true);
        Keyboard.dismiss();

        // Simulate bot response
        setTimeout(() => {
            setIsBotTyping(false);
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "Hello! This is Chat GPT. How can I help you today? 😊",
                sender: 'bot',
                suggestions: ["What would you not tell me?", "Why haven't"]
            };
            setMessages(prev => [...prev, botMsg]);
        }, 2000);
    };

    const handleClear = () => {
        setMessages([]);
        setIsBotTyping(false);
        setInputText('');
    };

    // Auto scroll to bottom when messages change or typing status changes
    useEffect(() => {
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
    }, [messages, isBotTyping]);

    const renderHeaderGraphic = () => (
        <View style={styles.headerGraphicContainer}>
            <Image source={IMAGES.Robot_Big} style={styles.robotImage} resizeMode="contain" />
            <Text style={styles.welcomeText}>Welcome to the new{'\n'}Chat GPT</Text>
            <Text style={styles.subtitleText}>
                Use the power of AI to find answers from the{'\n'}web, create written content, and more.
            </Text>

            <View style={styles.suggestionsContainer}>
                {SUGGESTIONS.map((sug, index) => (
                    <TouchableOpacity key={index} style={styles.suggestionPill} onPress={() => handleSend(sug)}>
                        <Text style={styles.suggestionPillText}>{sug}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.separatorContainer}>
                <View style={[styles.separator, styles.transparent]} />
            </View>

            <Text style={styles.stylePickerTitle}>Choose a conversation style</Text>

            <View style={styles.segmentControl}>
                {['Creative', 'Balanced', 'Precise'].map(style => {
                    const isActive = conversationStyle === style;
                    return (
                        <TouchableOpacity
                            key={style}
                            style={[styles.segmentItem, isActive && styles.segmentItemActive]}
                            onPress={() => setConversationStyle(style)}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.segmentSubtext, isActive && styles.segmentSubtextActive]}>More</Text>
                            <Text style={[styles.segmentText, isActive && styles.segmentTextActive]}>{style}</Text>
                        </TouchableOpacity>
                    );
                })}
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
                            <Text style={styles.botMessageText}>{msg.text}</Text>
                            <View style={styles.botBubbleFooter}>
                                <Text style={styles.counterText}>1 of 5  ●</Text>
                            </View>
                        </View>
                        {msg.suggestions && msg.suggestions.length > 0 && (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.botSuggestionsScroll}>
                                {msg.suggestions.map((sug, i) => (
                                    <TouchableOpacity key={i} style={styles.botSuggestionPill} onPress={() => handleSend(sug)}>
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
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            {/* Mock underlying screen header for effect */}
            <View style={styles.underlyingHeader}>
                <View style={styles.underlyingProfile}>
                    <Image source={IMAGES.Luminous_Face} style={styles.underlyingPic} />
                    <View>
                        <Text style={styles.underlyingGreeting}>Good Morning 👋</Text>
                        <Text style={styles.underlyingName}>Zachery Williamson</Text>
                    </View>
                </View>
            </View>

            {/* Main Chat Sheet overlaid */}
            <View style={styles.chatSheet}>
                <View style={styles.dragHandle} />

                <ScrollView
                    ref={scrollViewRef}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {renderHeaderGraphic()}

                    <View style={styles.messagesContainer}>
                        {messages.map(renderMessage)}

                        {isBotTyping && (
                            <View style={styles.stopRespondingContainer}>
                                <TouchableOpacity style={styles.stopRespondingBtn} onPress={() => setIsBotTyping(false)}>
                                    <MoreHorizontal color="#FF6B6B" size={20} />
                                    <Text style={styles.stopRespondingText}>Stop Responding</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </ScrollView>

                {/* Input Area */}
                <View style={styles.inputArea}>
                    {(!inputFocused && inputText.length === 0) && (
                        <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
                            <Wand2 color={Colors.DefaultWhite} size={22} />
                        </TouchableOpacity>
                    )}

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
                            <ScanLine color={Colors.MidnightInkText} size={22} />
                        </TouchableOpacity>

                        {(inputText.length > 0 || inputFocused) ? (
                            <TouchableOpacity style={styles.iconBtn} onPress={() => handleSend(inputText)}>
                                <Send color="#4A8BFF" size={22} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.iconBtn}>
                                <Mic color={Colors.MidnightInkText} size={22} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DefaultWhite,
        paddingBottom: ResponsivePixels.size80, // for bottom tabs
    },
    underlyingHeader: {
        paddingTop: ResponsivePixels.size60,
        paddingHorizontal: ResponsivePixels.size20,
        paddingBottom: ResponsivePixels.size40,
        backgroundColor: Colors.DefaultWhite,
    },
    underlyingProfile: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    underlyingPic: {
        width: ResponsivePixels.size44,
        height: ResponsivePixels.size44,
        borderRadius: ResponsivePixels.size22,
        backgroundColor: Colors.IvoryMist,
        marginRight: ResponsivePixels.size12,
    },
    underlyingGreeting: {
        ...Typography.h6PoppinsSemiBold,
        color: Colors.MidnightInkText,
    },
    underlyingName: {
        ...Typography.bodyMediumPoppinsRegular,
        color: Colors.MutedSteelText,
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
        paddingTop: ResponsivePixels.size10,
        paddingBottom: ResponsivePixels.size24,
        paddingHorizontal: ResponsivePixels.size20,
    },
    headerGraphicContainer: {
        alignItems: 'center',
        marginBottom: ResponsivePixels.size20,
    },
    robotImage: {
        width: ResponsivePixels.size140,
        height: ResponsivePixels.size140,
        marginBottom: ResponsivePixels.size16,
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
        marginBottom: ResponsivePixels.size24,
    },
    suggestionsContainer: {
        alignItems: 'center',
        gap: ResponsivePixels.size12,
        marginBottom: ResponsivePixels.size24,
    },
    suggestionPill: {
        borderWidth: 1,
        borderColor: '#4A8BFF',
        borderRadius: ResponsivePixels.size20,
        paddingHorizontal: ResponsivePixels.size20,
        paddingVertical: ResponsivePixels.size10,
    },
    suggestionPillText: {
        ...Typography.bodyMediumPoppinsMedium,
        color: '#4A8BFF',
    },
    separatorContainer: {
        width: '100%',
        height: 1,
        backgroundColor: Colors.FogGrey,
        opacity: 0.3,
        marginBottom: ResponsivePixels.size24,
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
        borderColor: '#4A8BFF',
        borderRadius: ResponsivePixels.size16,
        paddingHorizontal: ResponsivePixels.size16,
        paddingVertical: ResponsivePixels.size8,
        marginRight: ResponsivePixels.size8,
    },
    botSuggestionText: {
        ...Typography.bodyMediumPoppinsMedium,
        color: '#4A8BFF',
    },
    stopRespondingContainer: {
        alignItems: 'center',
        marginVertical: ResponsivePixels.size12,
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
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: ResponsivePixels.size20,
        paddingBottom: ResponsivePixels.size20,
        paddingTop: ResponsivePixels.size10,
        backgroundColor: Colors.DefaultWhite,
    },
    clearBtn: {
        width: ResponsivePixels.size44,
        height: ResponsivePixels.size44,
        borderRadius: ResponsivePixels.size22,
        backgroundColor: Colors.LuminousGreen,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: ResponsivePixels.size12,
    },
    inputPill: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: ResponsivePixels.size24,
        paddingHorizontal: ResponsivePixels.size16,
        paddingVertical: ResponsivePixels.size8,
        minHeight: ResponsivePixels.size48,
    },
    textInput: {
        flex: 1,
        ...Typography.bodyLargePoppinsRegular,
        color: Colors.MidnightInkText,
        maxHeight: ResponsivePixels.size100,
    },
    iconBtn: {
        padding: ResponsivePixels.size8,
        marginLeft: ResponsivePixels.size4,
    },
});
