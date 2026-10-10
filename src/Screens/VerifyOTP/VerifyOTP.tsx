import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ToastHelper } from '../../Common/ToastHelper';
import MainContainer from '../../Common/MainContainer';
import { Colors } from '../../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../../Assets/StyleUtilities/ResponsivePixels';
import { Typography } from '../../Theme/Typographys';
import { ArrowLeft } from 'lucide-react-native';
import CustomButton from '../../Common/CustomButton';
import AuthController from '../../api/controllers/AuthController';

const VerifyOTP: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { email } = route.params || {};

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, 100); // small delay to allow screen transition to complete
    return () => clearTimeout(timer);
  }, []);

  const handleOtpChange = (text: string, index: number) => {
    // Basic paste handling (if user pastes a full OTP into the first box)
    if (text.length > 1 && index === 0) {
      const pasted = text
        .replace(/[^0-9]/g, '')
        .slice(0, 6)
        .split('');
      const newOtp = [...otp];
      pasted.forEach((char, i) => {
        newOtp[i] = char;
      });
      setOtp(newOtp);
      // focus the last filled input or the next empty one
      const focusIndex = Math.min(pasted.length, 5);
      inputRefs.current[focusIndex]?.focus();
      return;
    }

    const val = text.replace(/[^0-9]/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto-focus next
    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    if (otpValue.length < 6) {
      ToastHelper.error('Please enter the full 6-digit OTP');
      return;
    }
    try {
      setIsLoading(true);
      const res = await AuthController.verifyResetOtp({ email, otp: otpValue });
      if (res.success && res.data?.resetToken) {
        ToastHelper.success('OTP verified successfully');
        navigation.navigate('ResetPassword', {
          email,
          resetToken: res.data.resetToken,
        });
      } else {
        ToastHelper.error('Invalid OTP');
      }
    } catch (error: any) {
      console.error(error);
      ToastHelper.error(
        error?.response?.data?.error?.message ||
          error?.response?.data?.message ||
          'Verification failed',
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
          onPress: () => navigation.goBack(),
        },
        headerTitle: '',
      }}
    >
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.subtitle}>
            We sent a verification code to{' '}
            <Text style={styles.emailText}>{email}</Text>. Please enter it below.
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => (inputRefs.current[index] = ref)}
                style={[
                  styles.otpInput,
                  focusedIndex === index && styles.otpInputFocused,
                ]}
                value={digit}
                onChangeText={text => handleOtpChange(text, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                keyboardType="number-pad"
                maxLength={6} // Allow up to 6 for pasting, handled in onChangeText
                selectTextOnFocus
              />
            ))}
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <CustomButton
            title={isLoading ? 'Verifying...' : 'Verify'}
            onPress={handleVerify}
            disabled={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: ResponsivePixels.size16,
    paddingBottom: ResponsivePixels.size20,
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
  emailText: {
    ...Typography.bodyMediumPoppinsSemiBold,
    color: Colors.MidnightInkText,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: ResponsivePixels.size40,
    width: '100%',
  },
  otpInput: {
    width: ResponsivePixels.size44,
    height: ResponsivePixels.size44,
    borderWidth: 2.5,
    borderColor: Colors.FogGrey,
    borderRadius: ResponsivePixels.size12,
    textAlign: 'center',
    fontSize: ResponsivePixels.size24,
    color: Colors.MidnightInkText,
    ...Typography.h1RanadeBold,
    backgroundColor: Colors.DefaultWhite,
  },
  otpInputFocused: {
    borderColor: Colors.LuminousGreen,
    borderWidth: 2.5,
    backgroundColor: Colors.DefaultWhite,
    shadowColor: Colors.LuminousGreen,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContainer: {
    paddingHorizontal: ResponsivePixels.size16,
    paddingBottom:
      Platform.OS === 'ios' ? ResponsivePixels.size32 : ResponsivePixels.size24,
    paddingTop: ResponsivePixels.size12,
    backgroundColor: Colors.DefaultWhite,
  },
});

export default VerifyOTP;
