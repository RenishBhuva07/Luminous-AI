import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { Colors } from "../../Assets/StyleUtilities/Colors";
import ResponsivePixels from "../../Assets/StyleUtilities/ResponsivePixels";
import { Typography } from "../../Theme/Typographys";

const { width: W } = Dimensions.get('window');
const SLIDER_CARD_WIDTH = W * 0.8;
const SLIDER_SPACING = ResponsivePixels.size16;

const BREAKING_NEWS = [
    { id: '1', title: 'Luminous: Banned in schools and colleges, why Elon Musk terms it the...', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: '2', title: 'Technology leaps forward with new AI advancements in 2024', image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: '3', title: 'Global markets hit record highs amidst tech rally', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

const CATEGORIES = ['All News', 'Luminous', 'Sport', 'Politics', 'Tech'];

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
    const baseSliderLength = BREAKING_NEWS.length;
    const initialMiddleIndex = Math.floor(baseSliderLength / 2);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(initialMiddleIndex);
    const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
    const sliderRef = useRef<FlatList<(typeof BREAKING_NEWS)[number]>>(null);
    const currentVirtualIndexRef = useRef(baseSliderLength + initialMiddleIndex);
    const loopedBreakingNews = useMemo(
        () => [...BREAKING_NEWS, ...BREAKING_NEWS, ...BREAKING_NEWS],
        []
    );

    const updateSlideIndex = useCallback((event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const virtualIndex = Math.round(offsetX / (SLIDER_CARD_WIDTH + SLIDER_SPACING));
        currentVirtualIndexRef.current = virtualIndex;

        if (baseSliderLength === 0) {
            return;
        }

        const normalizedIndex =
            ((virtualIndex % baseSliderLength) + baseSliderLength) % baseSliderLength;
        setCurrentSlideIndex(normalizedIndex);

        if (virtualIndex < baseSliderLength || virtualIndex >= baseSliderLength * 2) {
            const recenteredIndex = baseSliderLength + normalizedIndex;
            currentVirtualIndexRef.current = recenteredIndex;
            sliderRef.current?.scrollToIndex({ index: recenteredIndex, animated: false });
        }
    }, [baseSliderLength]);

    useEffect(() => {
        if (baseSliderLength === 0) {
            return;
        }

        const initialVirtualIndex = baseSliderLength + initialMiddleIndex;
        currentVirtualIndexRef.current = initialVirtualIndex;
        sliderRef.current?.scrollToIndex({ index: initialVirtualIndex, animated: false });
    }, [baseSliderLength, initialMiddleIndex]);

    const handleDotPress = useCallback((index: number) => {
        sliderRef.current?.scrollToIndex({ index: baseSliderLength + index, animated: true });
        currentVirtualIndexRef.current = baseSliderLength + index;
        setCurrentSlideIndex(index);
    }, [baseSliderLength]);

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
                    ref={sliderRef}
                    horizontal
                    data={loopedBreakingNews}
                    initialScrollIndex={baseSliderLength + initialMiddleIndex}
                    keyExtractor={(_, index) => `${index}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.sliderListContent}
                    snapToInterval={SLIDER_CARD_WIDTH + SLIDER_SPACING}
                    snapToAlignment="start"
                    disableIntervalMomentum
                    bounces={false}
                    decelerationRate="fast"
                    onScroll={updateSlideIndex}
                    onMomentumScrollEnd={updateSlideIndex}
                    scrollEventThrottle={16}
                    directionalLockEnabled
                    ItemSeparatorComponent={SliderSeparator}
                    getItemLayout={(_, index) => ({
                        length: SLIDER_CARD_WIDTH + SLIDER_SPACING,
                        offset: (SLIDER_CARD_WIDTH + SLIDER_SPACING) * index,
                        index,
                    })}
                    onScrollToIndexFailed={() => {
                        // A graceful fallback prevents the carousel from feeling broken on first load.
                    }}
                    renderItem={renderSliderItem}
                />

                {/* Pagination */}
                <View style={styles.paginationContainer}>
                    {BREAKING_NEWS.map((_, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleDotPress(index)}
                            style={[
                                styles.dot,
                                currentSlideIndex === index && styles.activeDot
                            ]}
                        />
                    ))}
                </View>
            </View>

            {/* Categories — same chip design as Home Popular prompts */}
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={CATEGORIES}
                keyExtractor={(item) => item}
                contentContainerStyle={styles.horizontalList}
                renderItem={({ item: category }) => {
                    const isSelected = selectedCategory === category;
                    return (
                        <TouchableOpacity
                            style={[styles.promptChip, isSelected && styles.promptChipActive]}
                            onPress={() => setSelectedCategory(category)}
                        >
                            <Text style={[styles.promptChipText, isSelected && styles.promptChipTextActive]}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.mainFeedContent}
            >
                {renderHeader()}
                {NEWS_FEED.map((item) => (
                    <View key={item.id}>
                        {renderNewsItem({ item })}
                    </View>
                ))}
            </ScrollView>
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
        paddingBottom: ResponsivePixels.size100,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: ResponsivePixels.size12,
        marginBottom: ResponsivePixels.size20,
    },
    headerTitle: {
        ...Typography.h5SemiBold,
        color: Colors.MidnightInkText,
    },
    viewAllText: {
        ...Typography.bodyMediumPoppinsMedium,
        color: Colors.LuminousGreen,
    },
    sliderListContent: {
        paddingHorizontal: (W - SLIDER_CARD_WIDTH) / 2,
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
        backgroundColor: 'rgba(0,0,0,0.4)',
        top: '40%',
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
    horizontalList: {
        paddingHorizontal: ResponsivePixels.size12,
        gap: ResponsivePixels.size12,
        marginBottom: ResponsivePixels.size16,
        marginTop: ResponsivePixels.size20,
    },
    promptChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: ResponsivePixels.size8,
        paddingHorizontal: ResponsivePixels.size12,
        paddingVertical: ResponsivePixels.size9,
        borderRadius: ResponsivePixels.size12,
        borderWidth: 1,
        borderColor: Colors.FogGrey,
        backgroundColor: Colors.DefaultWhite,
    },
    promptChipActive: {
        borderColor: Colors.LuminousGreen,
        backgroundColor: Colors.LuminousGreen,
    },
    promptChipText: {
        ...Typography.bodyMediumPoppinsMedium,
        color: Colors.MidnightInkText,
    },
    promptChipTextActive: {
        color: Colors.DefaultWhite,
    },
    newsCard: {
        marginHorizontal: ResponsivePixels.size12,
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
        ...Typography.h6PoppinsSemiBold,
        lineHeight: ResponsivePixels.size28,
        letterSpacing: 0.1,
        color: Colors.MidnightInkText,
    },
});
