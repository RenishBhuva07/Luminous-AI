import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
} from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import MainContainer from '../Common/MainContainer';
import { IMAGES } from '../Assets/Images';
import { Colors } from '../Assets/StyleUtilities/Colors';

const { width } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
    return (
        <MainContainer
            statusBarStyle="light-content"
            statusBarBackgroundColor={Colors.LuminousGreen}
            containerBackgroundColor={Colors.LuminousGreen}
            showHeader={false}
        >
            <View style={styles.container}>
                {/* Top Decorative Waves Section */}
                <View style={styles.topWavesSection}>
                    <Svg width={width / 2} height={200} viewBox="0 0 200 200">
                        <Defs>
                            <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
                                <Stop offset="100%" stopColor="#1ABC9C" stopOpacity="0.1" />
                            </LinearGradient>
                        </Defs>
                        <Path
                            d="M 0,50 Q 30,20 60,50 T 120,50 T 180,50"
                            stroke="url(#grad1)"
                            strokeWidth="1.5"
                            fill="none"
                        />
                        <Path
                            d="M 0,70 Q 30,40 60,70 T 120,70 T 180,70"
                            stroke="url(#grad1)"
                            strokeWidth="1.5"
                            fill="none"
                            opacity="0.7"
                        />
                        <Path
                            d="M 0,90 Q 30,60 60,90 T 120,90 T 180,90"
                            stroke="url(#grad1)"
                            strokeWidth="1"
                            fill="none"
                            opacity="0.5"
                        />
                        <Path
                            d="M 0,110 Q 30,80 60,110 T 120,110 T 180,110"
                            stroke="url(#grad1)"
                            strokeWidth="1"
                            fill="none"
                            opacity="0.3"
                        />
                    </Svg>
                </View>

                {/* Center Robot Section */}
                <View style={styles.centerSection}>
                    <View style={styles.robotContainer}>
                        <Image
                            source={IMAGES.Robot}
                            style={styles.robotImage}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                {/* Bottom Decorative Waves Section */}
                <View style={styles.bottomWavesSection}>
                    <Svg width={width} height={150} viewBox={`0 0 ${width} 150`}>
                        <Defs>
                            <LinearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                                <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
                                <Stop offset="100%" stopColor="#1ABC9C" stopOpacity="0.05" />
                            </LinearGradient>
                        </Defs>
                        <Path
                            d={`M 0,80 Q ${width / 4},40 ${width / 2},80 T ${width},80`}
                            stroke="url(#grad2)"
                            strokeWidth="1.5"
                            fill="none"
                        />
                        <Path
                            d={`M 0,100 Q ${width / 4},60 ${width / 2},100 T ${width},100`}
                            stroke="url(#grad2)"
                            strokeWidth="1.5"
                            fill="none"
                            opacity="0.6"
                        />
                        <Path
                            d={`M 0,120 Q ${width / 4},80 ${width / 2},120 T ${width},120`}
                            stroke="url(#grad2)"
                            strokeWidth="1"
                            fill="none"
                            opacity="0.4"
                        />
                    </Svg>
                </View>

            </View>
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 40,
    },
    topWavesSection: {
        position: 'absolute',
        top: 10,
        left: -30,
        width: width / 2 + 30,
        height: 200,
        zIndex: 5,
    },
    centerSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    robotContainer: {
        width: 180,
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
    },
    robotImage: {
        width: '100%',
        height: '100%',
    },
    bottomWavesSection: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: width,
        height: 150,
        zIndex: 8,
    },
    statusBar: {
        position: 'absolute',
        top: 8,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 8,
        zIndex: 20,
    },
    timeText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    statusIcons: {
        flexDirection: 'row',
        gap: 4,
    },
    iconText: {
        fontSize: 12,
        color: '#FFFFFF',
    },
});

export default SplashScreen;
