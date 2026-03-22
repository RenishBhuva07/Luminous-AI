import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { Colors } from "../../Assets/StyleUtilities/Colors";
import ResponsivePixels from "../../Assets/StyleUtilities/ResponsivePixels";
import { Typography } from "../../Theme/Typographys";

const { width: W } = Dimensions.get('window');
const SLIDER_CARD_WIDTH = W * 0.8;
const SLIDER_SPACING = ResponsivePixels.size16;

const BREAKING_NEWS = [
    { id: '1', title: 'Chat GPT: Banned in schools and colleges, why Elon Musk terms it the...', image: 'https://images.unsplash.com/photo-1620712948343-0008ce8a285b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: '2', title: 'Technology leaps forward with new AI advancements in 2024', image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: '3', title: 'Global markets hit record highs amidst tech rally', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

const CATEGORIES = ['All News', 'Chat GPT', 'Sport', 'Politics', 'Tech'];

const NEWS_FEED = [
    {
        id: '1',
        title: "Air India Pilot Refuses To Fly BJP MPs, 100 Passengers From Rajkot To Delhi, Here's Why?",
        source: 'Zee News',
        sourceIconText: 'ZEE',
        sourceIconColor: '#D32F2F',
        time: '1d ago',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: '2',
        title: "Twitter rebranding to X goes live worldwide",
        source: 'TechCrunch',
        sourceIconText: 'TC',
        sourceIconColor: '#00A14B',
        time: '2d ago',
        image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
];

const SliderSeparator = () => <View style={{ width: SLIDER_SPACING }} />;

export default function News() {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

    const handleScroll = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        // Calculate the current index based on offset and item width + spacing
        const index = Math.round(offsetX / (SLIDER_CARD_WIDTH + SLIDER_SPACING));
        if (index >= 0 && index < BREAKING_NEWS.length) {
            setCurrentSlideIndex(index);
        }
    };

    const renderSliderItem = ({ item }: any) => (
        <View style={styles.sliderCard}>
            <Image source={{ uri: item.image }} style={StyleSheet.absoluteFillObject} />
            {/* Dark overlay for text readability */}
            <View style={styles.sliderOverlay} />
            <Text style={styles.sliderTitle} numberOfLines={2}>{item.title}</Text>
        </View>
    );

    const renderNewsItem = ({ item }: any) => (
        <TouchableOpacity style={styles.newsCard}>
            <Image source={{ uri: item.image }} style={styles.newsImage} />
            <View style={styles.newsContent}>
                <View style={styles.sourceRow}>
                    <View style={[styles.sourceIcon, { backgroundColor: item.sourceIconColor }]}>
                        <Text style={styles.sourceIconText}>{item.sourceIconText}</Text>
                    </View>
                    <Text style={styles.sourceText}>{item.source} • {item.time}</Text>
                </View>
                <Text style={styles.newsTitle}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderHeader = () => (
        <View>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Breaking News</Text>
                <TouchableOpacity>
                    <Text style={styles.viewAllText}>View all</Text>
                </TouchableOpacity>
            </View>

            {/* Slider */}
            <View>
                <FlatList
                    horizontal
                    data={BREAKING_NEWS}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.sliderListContent}
                    snapToInterval={SLIDER_CARD_WIDTH + SLIDER_SPACING}
                    snapToAlignment="center"
                    decelerationRate="fast"
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    ItemSeparatorComponent={SliderSeparator}
                    renderItem={renderSliderItem}
                />

                {/* Pagination */}
                <View style={styles.paginationContainer}>
                    {BREAKING_NEWS.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentSlideIndex === index && styles.activeDot
                            ]}
                        />
                    ))}
                </View>
            </View>

            {/* Categories */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContent}
                style={styles.categoriesContainer}
            >
                {CATEGORIES.map(category => {
                    const isSelected = selectedCategory === category;
                    return (
                        <TouchableOpacity
                            key={category}
                            style={[styles.categoryChip, isSelected && styles.activeCategoryChip]}
                            onPress={() => setSelectedCategory(category)}
                        >
                            <Text style={[styles.categoryText, isSelected && styles.activeCategoryText]}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={NEWS_FEED}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={renderHeader}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.mainFeedContent}
                renderItem={renderNewsItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DefaultWhite,
    },
    mainFeedContent: {
        paddingTop: ResponsivePixels.size60,
        paddingBottom: ResponsivePixels.size100, // For bottom tab
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: ResponsivePixels.size20,
        marginBottom: ResponsivePixels.size20,
    },
    headerTitle: {
        ...Typography.h6PoppinsSemiBold,
        fontSize: ResponsivePixels.size20,
        color: Colors.MidnightInkText,
    },
    viewAllText: {
        ...Typography.bodyMediumPoppinsMedium,
        color: Colors.LuminousGreen,
    },
    sliderListContent: {
        paddingHorizontal: (W - SLIDER_CARD_WIDTH) / 2, // Centering logic
    },
    sliderCard: {
        width: SLIDER_CARD_WIDTH,
        height: ResponsivePixels.size180,
        borderRadius: ResponsivePixels.size20,
        overflow: 'hidden',
        justifyContent: 'flex-end',
        padding: ResponsivePixels.size20,
    },
    sliderOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)', // Faux gradient overlay
        top: '40%', // So only bottom half is darkened
    },
    sliderTitle: {
        ...Typography.bodyLargePoppinsSemiBold,
        color: Colors.DefaultWhite,
        zIndex: 1,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: ResponsivePixels.size16,
        gap: ResponsivePixels.size8,
    },
    dot: {
        width: ResponsivePixels.size8,
        height: ResponsivePixels.size8,
        borderRadius: ResponsivePixels.size4,
        backgroundColor: Colors.IvoryMist,
    },
    activeDot: {
        width: ResponsivePixels.size24,
        backgroundColor: Colors.LuminousGreen,
    },
    categoriesContainer: {
        marginVertical: ResponsivePixels.size24,
    },
    categoriesContent: {
        paddingHorizontal: ResponsivePixels.size20,
        gap: ResponsivePixels.size12,
    },
    categoryChip: {
        paddingHorizontal: ResponsivePixels.size20,
        paddingVertical: ResponsivePixels.size10,
        borderRadius: ResponsivePixels.size20,
        borderWidth: 1,
        borderColor: Colors.FogGrey,
        backgroundColor: Colors.DefaultWhite,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeCategoryChip: {
        borderColor: Colors.LuminousGreen,
        backgroundColor: Colors.LuminousGreen,
    },
    categoryText: {
        ...Typography.bodyMediumPoppinsMedium,
        color: Colors.MutedSteelText,
    },
    activeCategoryText: {
        color: Colors.DefaultWhite,
    },
    newsCard: {
        marginHorizontal: ResponsivePixels.size20,
        marginBottom: ResponsivePixels.size24,
        borderRadius: ResponsivePixels.size20,
        backgroundColor: Colors.DefaultWhite,
        borderWidth: 1,
        borderColor: Colors.FogGrey,
        overflow: 'hidden',
    },
    newsImage: {
        width: '100%',
        height: ResponsivePixels.size180,
        backgroundColor: Colors.IvoryMist,
    },
    newsContent: {
        padding: ResponsivePixels.size16,
    },
    sourceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: ResponsivePixels.size12,
    },
    sourceIcon: {
        width: ResponsivePixels.size24,
        height: ResponsivePixels.size24,
        borderRadius: ResponsivePixels.size12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: ResponsivePixels.size8,
    },
    sourceIconText: {
        ...Typography.bodySuperSmallPoppinsSemiBoldLoose,
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size8,
    },
    sourceText: {
        ...Typography.bodyMediumPoppinsMedium,
        color: Colors.MidnightInkText,
    },
    newsTitle: {
        ...Typography.bodyLargePoppinsSemiBold,
        color: Colors.MidnightInkText,
    },
});
