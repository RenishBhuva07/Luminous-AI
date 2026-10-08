import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, EyeOff, Eye, Lock } from 'lucide-react-native';
import AuthController from '../../api/controllers/AuthController';
import MainContainer from '../../Common/MainContainer';
import { ToastHelper } from '../../Common/ToastHelper';
import { useTheme } from '../../Theme/ThemeContext';
import { Typography } from '../../Theme/Typographys';
import ResponsivePixels from '../../Assets/StyleUtilities/ResponsivePixels';
import { FloatingTextInput } from '../../Common/FloatingTextInput';
import CustomButton from '../../Common/CustomButton';

export default function ChangePassword() {
  const { Colors } = useTheme();
  const styles = getStyles(Colors);
  const navigation = useNavigation();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      ToastHelper.error('New password and confirm password do not match');
      return;
    }

    setLoading(true);
    try {
      await AuthController.changePassword({
        currentPassword: oldPassword,
        newPassword: newPassword,
        confirmNewPassword: confirmPassword,
      });
      ToastHelper.success('Password changed successfully');
      navigation.goBack();
    } catch (error: any) {
      ToastHelper.error(
        error?.response?.data?.message || 'Failed to change password',
      );
    } finally {
      setLoading(false);
    }
  };

  const renderEyeIcon = (show: boolean, toggle: () => void) => (
    <TouchableOpacity onPress={toggle} style={{ padding: 8 }}>
      {show ? (
        <Eye color={Colors.SlateGraphiteText} size={20} />
      ) : (
        <EyeOff color={Colors.SlateGraphiteText} size={20} />
      )}
    </TouchableOpacity>
  );

  return (
    <MainContainer
      showHeader={true}
      header={{
        headerTitle: 'Change Password',
        headerTitleNumberOfLines: 1,
        headerLeft: {
          customIcon: <ArrowLeft color={Colors.MidnightInkText} size={24} />,
          onPress: () => navigation.goBack(),
        },
      }}
    >
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
              <Lock color={Colors.LuminousGreen} size={20} />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>Password Requirements</Text>
              <Text style={styles.description}>
                Must be at least 8 characters long and include a combination of
                numbers, letters, and special characters.
              </Text>
            </View>
          </View>

          <FloatingTextInput
            label="Current Password"
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry={!showOldPassword}
            rightComponent={renderEyeIcon(showOldPassword, () =>
              setShowOldPassword(!showOldPassword),
            )}
          />

          <FloatingTextInput
            label="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showNewPassword}
            rightComponent={renderEyeIcon(showNewPassword, () =>
              setShowNewPassword(!showNewPassword),
            )}
          />

          <FloatingTextInput
            label="Confirm New Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            rightComponent={renderEyeIcon(showConfirmPassword, () =>
              setShowConfirmPassword(!showConfirmPassword),
            )}
          />
        </ScrollView>
        <View style={styles.bottomContainer}>
          <CustomButton
            title={loading ? 'Saving...' : 'Save Password'}
            onPress={handleSave}
            disabled={
              !oldPassword ||
              !newPassword ||
              !confirmPassword ||
              newPassword !== confirmPassword ||
              loading
            }
          />
        </View>
      </View>
    </MainContainer>
  );
}

const getStyles = (Colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: ResponsivePixels.size12,
    },
    scrollContent: {
      paddingTop: ResponsivePixels.size24,
      paddingBottom: ResponsivePixels.size60,
    },
    infoCard: {
      flexDirection: 'row',
      backgroundColor: `${Colors.LuminousGreen}15`,
      padding: ResponsivePixels.size16,
      borderRadius: ResponsivePixels.size12,
      marginBottom: ResponsivePixels.size24,
      alignItems: 'flex-start',
    },
    infoIconContainer: {
      marginRight: ResponsivePixels.size12,
      marginTop: ResponsivePixels.size2,
    },
    infoTextContainer: {
      flex: 1,
    },
    infoTitle: {
      ...Typography.bodyLargePoppinsSemiBold,
      color: Colors.LuminousGreen,
      marginBottom: ResponsivePixels.size4,
    },
    description: {
      ...Typography.bodyMediumPoppinsRegular,
      color: Colors.SlateGraphiteText,
      lineHeight: ResponsivePixels.size20,
    },
    bottomContainer: {
      paddingVertical: ResponsivePixels.size24,
      paddingBottom: ResponsivePixels.size40,
    },
  });
