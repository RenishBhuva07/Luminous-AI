import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Archive, Bot, MessageCircle, Calendar } from "lucide-react-native";
import MainContainer from "../../Common/MainContainer";
import { useTheme } from "../../Theme/ThemeContext";
import { Typography } from "../../Theme/Typographys";
import ResponsivePixels from "../../Assets/StyleUtilities/ResponsivePixels";

export default function ArchiveChat() {
    const { Colors } = useTheme();
    const styles = getStyles(Colors);
    const navigation = useNavigation();

    const archivedChats = [
        {
            id: 1,
            title: "AI Assistant Chat",
            description: "Conversation about productivity tips",
            icon: Bot,
            iconBg: "#4A8BFF",
            date: "Today",
            messageCount: 24
        },
        {
            id: 2,
            title: "Recipe Discussion",
            description: "AI-generated cooking recipes",
            icon: MessageCircle,
            iconBg: "#21AF85",
            date: "Yesterday",
            messageCount: 18
        },
        {
            id: 3,
            title: "Travel Planning",
            description: "AI-assisted trip planning for vacation",
            icon: Bot,
            iconBg: "#9E57E5",
            date: "3 days ago",
            messageCount: 32
        }
    ];

    const renderChatItem = (chat: any, index: number) => {
        const isLast = index === archivedChats.length - 1;

        return (
            <View key={chat.id}>
                <TouchableOpacity style={styles.chatItem} activeOpacity={0.7}>
                    <View style={[styles.iconContainer, { backgroundColor: chat.iconBg }]}>
                        <chat.icon color={Colors.DefaultWhite} size={20} />
                    </View>
                    <View style={styles.chatContent}>
                        <Text style={styles.chatTitle}>{chat.title}</Text>
                        <Text style={styles.chatDescription}>{chat.description}</Text>
                        <View style={styles.chatMeta}>
                            <View style={styles.dateContainer}>
                                <Calendar color={Colors.MutedSteelText} size={14} />
                                <Text style={styles.dateText}>{chat.date}</Text>
                            </View>
                            <Text style={styles.messageCountText}>{chat.messageCount} messages</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                {!isLast && <View style={styles.separator} />}
            </View>
        );
    };

    return (
        <MainContainer
            showHeader={true}
            header={{
                headerTitle: "Archive Chat",
                headerLeft: {
                    customIcon: <ArrowLeft color={Colors.MidnightInkText} size={24} />,
                    onPress: () => navigation.goBack()
                }
            }}
        >
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Archived AI Chats</Text>
                        <View style={styles.cardGroup}>
                            {archivedChats.map((chat, index) => renderChatItem(chat, index))}
                        </View>
                    </View>

                    {archivedChats.length === 0 && (
                        <View style={styles.emptyContainer}>
                            <Archive color={Colors.MutedSteelText} size={64} />
                            <Text style={styles.emptyTitle}>No Archived Chats</Text>
                            <Text style={styles.emptyText}>Your archived AI conversations will appear here</Text>
                        </View>
                    )}

                </ScrollView>
            </View>
        </MainContainer>
    );
}

const getStyles = (Colors: any) => StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingTop: ResponsivePixels.size24,
        paddingBottom: ResponsivePixels.size60,
    },
    sectionContainer: {
        marginBottom: ResponsivePixels.size24,
    },
    sectionTitle: {
        ...Typography.bodyLargePoppinsSemiBold,
        color: Colors.MidnightInkText,
        marginBottom: ResponsivePixels.size12,
        marginHorizontal: ResponsivePixels.size12,
    },
    cardGroup: {
        backgroundColor: Colors.DefaultWhite,
        borderRadius: ResponsivePixels.size20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: ResponsivePixels.size16,
        paddingHorizontal: ResponsivePixels.size12,
    },
    iconContainer: {
        width: ResponsivePixels.size40,
        height: ResponsivePixels.size40,
        borderRadius: ResponsivePixels.size12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: ResponsivePixels.size16,
    },
    chatContent: {
        flex: 1,
    },
    chatTitle: {
        ...Typography.bodyLargePoppinsMedium,
        color: Colors.MidnightInkText,
        marginBottom: ResponsivePixels.size4,
    },
    chatDescription: {
        ...Typography.bodyMediumPoppinsRegular,
        color: Colors.MutedSteelText,
        marginBottom: ResponsivePixels.size8,
    },
    chatMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        ...Typography.bodySmallPoppinsRegular,
        color: Colors.MutedSteelText,
        marginLeft: ResponsivePixels.size4,
    },
    messageCountText: {
        ...Typography.bodySmallPoppinsRegular,
        color: Colors.MutedSteelText,
    },
    separator: {
        height: 1,
        backgroundColor: Colors.FogGrey,
        opacity: 0.4,
        marginHorizontal: ResponsivePixels.size16,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: ResponsivePixels.size60,
    },
    emptyTitle: {
        ...Typography.h2RanadeBold,
        color: Colors.MidnightInkText,
        marginTop: ResponsivePixels.size16,
        marginBottom: ResponsivePixels.size8,
    },
    emptyText: {
        ...Typography.bodyMediumPoppinsRegular,
        color: Colors.MutedSteelText,
        textAlign: 'center',
    },
});

export default ArchiveChat;