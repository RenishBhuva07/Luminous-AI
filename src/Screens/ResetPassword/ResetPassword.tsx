import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ToastHelper } from '../../Common/ToastHelper';
import MainContainer from '../../Common/MainContainer';
import { Colors } from '../../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../../Assets/StyleUtilities/ResponsivePixels';
import { Typography } from '../../Theme/Typographys';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react-native';
import { FloatingTextInput } from '../../Common/FloatingTextInput';
import CustomButton from '../../Common/CustomButton';
import AuthController from '../../api/controllers/AuthController';

const ResetPassword: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { email, resetToken } = route.params || {};

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    if (!newPassword || !confirmNewPassword) {
      ToastHelper.error('Please enter all fields');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      ToastHelper.error('Passwords do not match');
      return;
    }
    try {
      setIsLoading(true);
      const res = await AuthController.resetPassword({
        email,
        resetToken,
        newPassword,
        confirmNewPassword,
      });
      if (res.success) {
        ToastHelper.success('Password reset successfully');
        navigation.navigate('Login');
      } else {
        ToastHelper.error('Failed to reset password');
      }
    } catch (error: any) {
      console.error(error);
      ToastHelper.error(
        error?.response?.data?.error?.message ||
          error?.response?.data?.message ||
          'Reset failed',
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>Enter your new password below.</Text>

        <View style={styles.formContainer}>
          <FloatingTextInput
            label="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
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

          <FloatingTextInput
            label="Confirm New Password"
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            isRequired={false}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
            onPressRightIcon={() => setShowConfirmPassword(!showConfirmPassword)}
            rightComponent={
              showConfirmPassword ? (
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

        <View style={styles.buttonContainer}>
          <CustomButton
            title={isLoading ? 'Resetting...' : 'Reset Password'}
            onPress={handleReset}
            disabled={isLoading}
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
  buttonContainer: {
    marginTop: ResponsivePixels.size24,
  },
});

export default ResetPassword;
