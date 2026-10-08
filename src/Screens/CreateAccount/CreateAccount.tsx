import { ToastHelper } from '../../Common/ToastHelper';
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MainContainer from '../../Common/MainContainer';
import { Colors } from '../../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../../Assets/StyleUtilities/ResponsivePixels';
import { Typography } from '../../Theme/Typographys';
import { ArrowLeft, Check, Eye, EyeOff } from 'lucide-react-native';
import { FloatingTextInput } from '../../Common/FloatingTextInput';
import CustomButton from '../../Common/CustomButton';
import { goBack, navigate } from '../../Navigators/Navigator';
import { AuthContext } from '../../Context/AuthContext';
import AuthController from '../../api/controllers/AuthController';

const CreateAccount: React.FC = () => {
  const { setAuthState } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      ToastHelper.error('Please enter email and password');
      return;
    }
    try {
      setIsLoading(true);
      const res = await AuthController.register({
        email,
        password,
        acceptedTerms: agreed,
      });
      if (res.success && res.data) {
        const profileRes = await AuthController.getProfile();
        if (profileRes.success && profileRes.data?.user) {
          setAuthState(
            profileRes.data.user,
            res.data.requiresProfileCompletion,
          );
        } else {
          setAuthState(res.data.user, res.data.requiresProfileCompletion);
        }
      } else {
        ToastHelper.error('Registration failed');
      }
    } catch (error: any) {
      console.error(error);
      ToastHelper.error(
        error?.response?.data?.error?.message ||
          error?.response?.data?.message ||
          'Registration failed',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainContainer
      statusBarStyle="dark-content"
      statusBarBackgroundColor={Colors.DefaultWhite}
      containerBackgroundColor={Colors.DefaultWhite}
      showHeader={true}
      header={{
        headerLeft: {
          customIcon: (
            <ArrowLeft
              color={Colors.TrueBlackText}
              size={ResponsivePixels.size26}
              strokeWidth={2}
            />
          ),
          onPress: goBack,
        },
        headerTitle: '',
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>
          To begin using the Luminous, please create an account with your email
          address.
        </Text>

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
                <EyeOff
                  color={Colors.MidnightInkText}
                  size={ResponsivePixels.size24}
                  strokeWidth={2}
                />
              ) : (
                <Eye
                  color={Colors.MidnightInkText}
                  size={ResponsivePixels.size24}
                  strokeWidth={2}
                />
              )
            }
          />
        </View>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, agreed && styles.checkboxActive]}
            onPress={() => setAgreed(!agreed)}
            activeOpacity={0.8}
          >
            {agreed && (
              <Check color={Colors.DefaultWhite} size={14} strokeWidth={3} />
            )}
          </TouchableOpacity>
          <Text style={styles.checkboxText}>
            By continuing you agree to the Luminous{' '}
            <Text style={styles.linkTextGreen}>Term of Service</Text> and{' '}
            <Text style={styles.linkTextGreen}>Privacy Policy</Text>
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title={isLoading ? 'Creating...' : 'Continue'}
            onPress={handleRegister}
            disabled={isLoading}
          />
        </View>

        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigate('Login')}>
            <Text style={styles.linkTextGreen}>Log In</Text>
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
            onPress={() => {}}
            variant="google"
            style={styles.socialButton}
            buttonTextStyle={styles.socialButtonTextBlack}
          />
          <CustomButton
            title="Continue with Facebook"
            onPress={() => {}}
            variant="facebook"
            style={styles.socialButton}
          />
          <CustomButton
            title="Continue with Apple"
            onPress={() => {}}
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: ResponsivePixels.size16,
  },
  checkbox: {
    width: ResponsivePixels.size20,
    height: ResponsivePixels.size20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.LuminousGreen,
    marginRight: ResponsivePixels.size10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: ResponsivePixels.size2,
  },
  checkboxActive: {
    backgroundColor: Colors.LuminousGreen,
    borderColor: Colors.LuminousGreen,
  },
  checkboxText: {
    ...Typography.bodyMediumPoppinsRegular,
    color: Colors.MutedSteelText,
    flex: 1,
    lineHeight: 20,
  },
  linkTextGreen: {
    color: Colors.LuminousGreen,
    textDecorationLine: 'underline',
    ...Typography.bodyLargePoppinsRegular,
  },
  buttonContainer: {
    marginTop: ResponsivePixels.size24,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: ResponsivePixels.size16,
  },
  loginText: {
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
  socialButtonTextBlack: {
    fontFamily: Typography.bodyLargePoppinsRegular.fontFamily,
  },
});

export default CreateAccount;
