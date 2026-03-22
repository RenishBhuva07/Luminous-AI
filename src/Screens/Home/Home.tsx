import React from "react";
import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { Search, LayoutGrid, SlidersHorizontal, Bitcoin, BarChart2, BookOpen, MoreHorizontal, CheckCircle2 } from "lucide-react-native";
import { Colors } from "../../Assets/StyleUtilities/Colors";
import ResponsivePixels from "../../Assets/StyleUtilities/ResponsivePixels";
import { Typography } from "../../Theme/Typographys";
import { IMAGES } from "../../Assets/Images";

const POPULAR_PROMPTS = [
    { id: '1', title: 'Crypto', icon: <Bitcoin size={20} color={Colors.MidnightInkText} /> },
    { id: '2', title: 'Business', icon: <BarChart2 size={20} color={Colors.MidnightInkText} /> },
    { id: '3', title: 'Learning', icon: <BookOpen size={20} color={Colors.MidnightInkText} /> },
    { id: '4', title: 'Code', icon: <Bitcoin size={20} color={Colors.MidnightInkText} /> },
];

const RECENT_CHATS = [
    { id: '1', title: 'How do you say\n"where is the bus\nstop" in spanish?', desc: 'With these 100+\nChatGPT prompts\nfor Crypto Trading!' },
    { id: '2', title: 'How do you say\n"where is the bus\nstop" in spanish?', desc: 'With these 100+\nChatGPT prompts\nfor Crypto Trading!' },
];

export default function Home() {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* Header Profile Section */}
                <View style={styles.headerContainer}>
                    <View style={styles.profileSection}>
                        <Image source={IMAGES.Luminous_Face} style={styles.profilePic} />
                        <View style={styles.userInfo}>
                            <Text style={styles.greetingText}>Good Morning 👋</Text>
                            <Text style={styles.userNameText}>Zachery Williamson</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <LayoutGrid color={Colors.MidnightInkText} size={28} />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Search color={Colors.MutedSteelText} size={22} style={styles.searchIcon} />
                    <TextInput 
                        style={styles.searchInput}
                        placeholder="Search for prompts"
                        placeholderTextColor={Colors.MutedSteelText}
                    />
                    <TouchableOpacity>
                        <SlidersHorizontal color={Colors.MutedSteelText} size={22} />
                    </TouchableOpacity>
                </View>

                {/* ChatGPT Plus Banner */}
                <View style={styles.bannerContainer}>
                    <View style={styles.bannerContent}>
                        <View style={styles.bannerHeader}>
                            <Text style={styles.bannerTitle}>ChatGPT Plus</Text>
                            <View style={styles.comingSoonBadge}>
                                <Text style={styles.comingSoonText}>Coming Soon</Text>
                            </View>
                        </View>

                        <View style={styles.bulletList}>
                            <View style={styles.bulletItem}>
                                <CheckCircle2 size={16} color={Colors.DefaultWhite} />
                                <Text style={styles.bulletText}>Access to GPT-4, our most{'\n'}capable model</Text>
                            </View>
                            <View style={styles.bulletItem}>
                                <CheckCircle2 size={16} color={Colors.DefaultWhite} />
                                <Text style={styles.bulletText}>Faster response speed</Text>
                            </View>
                            <View style={styles.bulletItem}>
                                <CheckCircle2 size={16} color={Colors.DefaultWhite} />
                                <Text style={styles.bulletText}>Exclusive access to beta features like{'\n'}Browsing, Plugins, and Much more.</Text>
                            </View>
                        </View>
                    </View>
                    <Image source={IMAGES.Robot} style={styles.bannerImage} resizeMode="contain" />
                </View>

                {/* Popular Prompts */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Popular prompts</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>See all</Text>
                    </TouchableOpacity>
                </View>

                <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={POPULAR_PROMPTS}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.horizontalList}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.promptChip}>
                            {item.icon}
                            <Text style={styles.promptChipText}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                />

                {/* Recent Chats */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent chats</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>See all</Text>
                    </TouchableOpacity>
                </View>

                <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={RECENT_CHATS}
                    keyExtractor={item => item.id}
                    contentContainerStyle={[styles.horizontalList, { paddingBottom: ResponsivePixels.size100 }]} // padding for bottom tab
                    renderItem={({ item }) => (
                        <View style={styles.chatCard}>
                            <Text style={styles.chatCardTitle}>{item.title}</Text>
                            <Text style={styles.chatCardDesc}>{item.desc}</Text>
                            <TouchableOpacity style={styles.moreOptions}>
                                <MoreHorizontal color={Colors.LuminousGreen} size={24} />
                            </TouchableOpacity>
                        </View>
                    )}
                />

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DefaultWhite,
    },
    scrollContent: {
        paddingTop: ResponsivePixels.size60,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: ResponsivePixels.size20,
        marginBottom: ResponsivePixels.size24,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profilePic: {
        width: ResponsivePixels.size50,
        height: ResponsivePixels.size50,
        borderRadius: ResponsivePixels.size25,
        backgroundColor: Colors.IvoryMist,
        marginRight: ResponsivePixels.size12,
    },
    userInfo: {
        justifyContent: 'center',
    },
    greetingText: {
        ...Typography.h6PoppinsSemiBold,
        color: Colors.MidnightInkText,
        marginBottom: ResponsivePixels.size2,
    },
    userNameText: {
        ...Typography.bodyMediumPoppinsRegular,
        color: Colors.MutedSteelText,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.DefaultWhite,
        marginHorizontal: ResponsivePixels.size20,
        paddingHorizontal: ResponsivePixels.size16,
        height: ResponsivePixels.size50,
        borderRadius: ResponsivePixels.size16,
        borderWidth: 1,
        borderColor: Colors.FogGrey,
        marginBottom: ResponsivePixels.size32,
    },
    searchIcon: {
        marginRight: ResponsivePixels.size10,
    },
    searchInput: {
        flex: 1,
        ...Typography.bodyLargePoppinsRegular,
        color: Colors.MidnightInkText,
    },
    bannerContainer: {
        backgroundColor: '#2A4A43', // Dark greenish custom color
        borderRadius: ResponsivePixels.size20,
        marginHorizontal: ResponsivePixels.size20,
        padding: ResponsivePixels.size20,
        paddingBottom: ResponsivePixels.size30,
        marginBottom: ResponsivePixels.size32,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    bannerContent: {
        flex: 1,
        zIndex: 2,
    },
    bannerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: ResponsivePixels.size20,
    },
    bannerTitle: {
        ...Typography.h1RanadeBold,
        fontSize: ResponsivePixels.size24,
        color: Colors.LuminousGreen,
    },
    comingSoonBadge: {
        backgroundColor: '#FF6B6B', // Reddish custom color
        paddingHorizontal: ResponsivePixels.size10,
        paddingVertical: ResponsivePixels.size4,
        borderRadius: ResponsivePixels.size12,
    },
    comingSoonText: {
        ...Typography.bodySmallPoppinsSemiBold,
        color: Colors.DefaultWhite,
    },
    bulletList: {
        gap: ResponsivePixels.size12,
    },
    bulletItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: ResponsivePixels.size8,
    },
    bulletText: {
        ...Typography.bodySmallPoppinsRegularLoose,
        color: Colors.CloudSilk,
        flex: 1,
    },
    bannerImage: {
        position: 'absolute',
        right: -ResponsivePixels.size30,
        bottom: 0,
        width: ResponsivePixels.size160,
        height: ResponsivePixels.size160,
        zIndex: 1,
        opacity: 0.8,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: ResponsivePixels.size20,
        marginBottom: ResponsivePixels.size16,
    },
    sectionTitle: {
        ...Typography.bodyLargePoppinsSemiBold,
        color: Colors.MidnightInkText,
        fontSize: ResponsivePixels.size18,
    },
    seeAllText: {
        ...Typography.bodyMediumPoppinsRegular,
        color: Colors.MutedSteelText,
    },
    horizontalList: {
        paddingHorizontal: ResponsivePixels.size20,
        gap: ResponsivePixels.size12,
        marginBottom: ResponsivePixels.size32,
    },
    promptChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: ResponsivePixels.size8,
        paddingHorizontal: ResponsivePixels.size16,
        paddingVertical: ResponsivePixels.size10,
        borderRadius: ResponsivePixels.size12,
        borderWidth: 1,
        borderColor: Colors.FogGrey,
        backgroundColor: Colors.DefaultWhite,
    },
    promptChipText: {
        ...Typography.bodyMediumPoppinsMedium,
        color: Colors.MidnightInkText,
    },
    chatCard: {
        width: ResponsivePixels.size180,
        padding: ResponsivePixels.size20,
        borderRadius: ResponsivePixels.size20,
        borderWidth: 1,
        borderColor: Colors.FogGrey,
        backgroundColor: Colors.DefaultWhite,
        marginRight: ResponsivePixels.size12,
    },
    chatCardTitle: {
        ...Typography.bodyLargePoppinsSemiBold,
        color: Colors.MidnightInkText,
        marginBottom: ResponsivePixels.size12,
    },
    chatCardDesc: {
        ...Typography.bodySmallPoppinsRegularLoose,
        color: Colors.MutedSteelText,
        marginBottom: ResponsivePixels.size16,
    },
    moreOptions: {
        alignSelf: 'flex-end',
    },
});
