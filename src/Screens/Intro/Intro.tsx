import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import MainContainer from '../../Common/MainContainer';
import { Colors } from '../../Assets/StyleUtilities/Colors';
import { IMAGES } from '../../Assets/Images';
import CustomButton from '../../Common/CustomButton';
import ResponsivePixels from '../../Assets/StyleUtilities/ResponsivePixels';
import { Typography } from '../../Theme/Typographys';
import { navigate } from '../../Navigators/Navigator';

const Intro: React.FC = () => {
    return (
        <MainContainer
            statusBarStyle="dark-content"
            statusBarBackgroundColor={Colors.DefaultWhite}
            containerBackgroundColor={Colors.DefaultWhite}
            showHeader={false}
        >
            <View style={styles.container}>
                <View style={styles.topSection}>
                    <Image source={IMAGES.Robot_Big} style={styles.robotImage} resizeMode="contain" />
                </View>

                <View style={styles.bottomSection}>
                    <Image source={IMAGES.Robot_Left_Hand} style={styles.leftHand} resizeMode="contain" />
                    <Image source={IMAGES.Robot_Right_Hand} style={styles.rightHand} resizeMode="contain" />

                    <Text style={styles.title}>
                        <Text style={styles.primaryText}>Luminous</Text>
                        <Text style={styles.darkText}> - Your AI</Text>
                    </Text>
                    <Text style={styles.title}>
                        <Text style={styles.darkText}>Language </Text>
                        <Text style={styles.primaryText}>Partner</Text>
                    </Text>

                    <Text style={styles.subtitle}>
                        Unlock Infinite Conversations: Luminous,{"\n"}Your AI Companion!
                    </Text>

                    <View style={styles.buttonContainer}>
                        <CustomButton title="Log In" onPress={() => navigate('Login')} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <CustomButton title="Create Account" onPress={() => navigate('CreateAccount')} variant="outlined" />
                    </View>
                </View>
            </View>
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DefaultWhite,
    },
    topSection: {
        flex: 0.56,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: ResponsivePixels.size84,
    },
    robotImage: {
        // width: ResponsivePixels.size300,
        height: ResponsivePixels.size330,
    },
    bottomSection: {
        flex: 0.44,
        justifyContent: 'flex-end',
        paddingHorizontal: ResponsivePixels.size22,
        paddingBottom: ResponsivePixels.size22,
        position: 'relative',
    },
    leftHand: {
        position: 'absolute',
        right: 80,
        bottom: 150,
        width: ResponsivePixels.size390,
        height: ResponsivePixels.size370,
        opacity: 0.95,
    },
    rightHand: {
        position: 'absolute',
        left: 80,
        bottom: 150,
        width: ResponsivePixels.size390,
        height: ResponsivePixels.size370,
        opacity: 0.95,
    },
    title: {
        ...Typography.h1RanadeBold,
        textAlign: 'center',
    },
    primaryText: {
        color: Colors.LuminousGreen,
    },
    darkText: {
        color: Colors.MidnightInkText,
    },
    subtitle: {
        ...Typography.bodyMediumPoppinsRegular,
        color: Colors.MutedSteelText,
        textAlign: 'center',
        marginTop: ResponsivePixels.size6,
        marginBottom: ResponsivePixels.size18,
    },
    buttonContainer: {
        marginTop: ResponsivePixels.size10,
    },
});

export default Intro;
