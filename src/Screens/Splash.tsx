import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
} from 'react-native';
import MainContainer from '../Common/MainContainer';
import { IMAGES } from '../Assets/Images';
import { Colors } from '../Assets/StyleUtilities/Colors';

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
    return (
        <MainContainer
            statusBarStyle="light-content"
            statusBarBackgroundColor={Colors.LuminousGreen}
            containerBackgroundColor={Colors.LuminousGreen}
            showHeader={false}
        >
            <View style={styles.container}>
                <Image
                    source={IMAGES.Robot_Architecture}
                    style={styles.architectureImage}
                    resizeMode="contain"
                />
                <Image
                    source={IMAGES.Robot}
                    style={styles.robotImage}
                    resizeMode="contain"
                />
            </View>
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.LuminousGreen,
    },
    architectureImage: {
        position: 'absolute',
        bottom: 0,
        right: width * 0.02,
        width: width * 1.08,
        height: height * 0.52,
        opacity: 0.62,
    },
    robotImage: {
        position: 'absolute',
        width: width * 0.56,
        height: height * 0.36,
        left: width * 0.5 - (width * 0.56) / 5,
        top: height * 0.38,
    },
});

export default SplashScreen;
