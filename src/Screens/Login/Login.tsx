import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MainContainer from '../../Common/MainContainer';
import { Colors } from '../../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../../Assets/StyleUtilities/ResponsivePixels';
import { Typography } from '../../Theme/Typographys';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react-native';
import { FloatingTextInput } from '../../Common/FloatingTextInput';
import CustomButton from '../../Common/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { goBack, navigate } from '../../Navigators/Navigator';

const Login: React.FC = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <MainContainer
            statusBarStyle="dark-content"
            statusBarBackgroundColor={Colors.DefaultWhite}
            containerBackgroundColor={Colors.DefaultWhite}
            showHeader={true}
            header={{
                headerLeft: {
                    customIcon: <ArrowLeft color={Colors.TrueBlackText} size={ResponsivePixels.size26} strokeWidth={2} />,
                    onPress: goBack
                },
                headerTitle: "",
            }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.title}>Log In</Text>
                <Text style={styles.subtitle}>Welcome back to chat GPT 👋</Text>

                <View style={styles.formContainer}>
                    <FloatingTextInput
                        label="Email Address"
                        value={email}
                        onChangeText={setEmail}
                        isRequired={false}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <FloatingTextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        isRequired={false}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        onPressRightIcon={() => setShowPassword(!showPassword)}
                        rightComponent={
                            showPassword ? (
                                <EyeOff color={Colors.MidnightInkText} size={ResponsivePixels.size24} strokeWidth={2} />
                            ) : (
                                <Eye color={Colors.MidnightInkText} size={ResponsivePixels.size24} strokeWidth={2} />
                            )
                        }
                    />

                    <TouchableOpacity style={styles.forgotPasswordContainer}>
                        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <CustomButton title="Log In" onPress={() => navigate('BottomTabs')} />
                </View>

                <View style={styles.signupLinkContainer}>
                    <Text style={styles.signupText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigate('CreateAccount')}>
                        <Text style={styles.linkTextGreen}>Create account</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>OR</Text>
                    <View style={styles.divider} />
                </View>

                <View style={styles.socialButtonsContainer}>
                    <CustomButton
                        title="Continue with Google"
                        onPress={() => { }}
                        variant="google"
                        style={styles.socialButton}
                    />
                    <CustomButton
                        title="Continue with Facebook"
                        onPress={() => { }}
                        variant="facebook"
                        style={styles.socialButton}
                    />
                    <CustomButton
                        title="Continue with Apple"
                        onPress={() => { }}
                        variant="apple"
                        style={styles.socialButton}
                    />
                </View>
            </ScrollView>
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        paddingHorizontal: ResponsivePixels.size16,
        paddingBottom: ResponsivePixels.size40,
        paddingTop: ResponsivePixels.size20,
    },
    title: {
        ...Typography.h1RanadeBold,
        fontSize: ResponsivePixels.size28,
        color: Colors.MidnightInkText,
    },
    subtitle: {
        ...Typography.bodyMediumPoppinsRegular,
        color: Colors.MutedSteelText,
        marginTop: ResponsivePixels.size8,
        lineHeight: 17,
    },
    formContainer: {
        marginTop: ResponsivePixels.size8,
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end',
        marginTop: ResponsivePixels.size8,
    },
    forgotPasswordText: {
        ...Typography.bodyLargePoppinsRegular,
        color: Colors.MidnightInkText,
    },
    linkTextGreen: {
        color: Colors.LuminousGreen,
        textDecorationLine: 'underline',
        ...Typography.bodyLargePoppinsRegular,
    },
    buttonContainer: {
        marginTop: ResponsivePixels.size24,
    },
    signupLinkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: ResponsivePixels.size16,
    },
    signupText: {
        ...Typography.bodyLargePoppinsRegular,
        color: Colors.MutedSteelText,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: ResponsivePixels.size20,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.FogGrey,
    },
    dividerText: {
        ...Typography.bodyMediumPoppinsRegular,
        color: Colors.MutedSteelText,
        marginHorizontal: ResponsivePixels.size15,
    },
    socialButtonsContainer: {
        gap: ResponsivePixels.size16,
        paddingVertical: ResponsivePixels.size12,
    },
    socialButton: {
        height: ResponsivePixels.size52,
    },
});

export default Login;
