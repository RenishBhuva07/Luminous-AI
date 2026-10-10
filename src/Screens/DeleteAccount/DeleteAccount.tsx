import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, AlertTriangle, EyeOff, Eye } from 'lucide-react-native';
import MainContainer from '../../Common/MainContainer';
import { useTheme } from '../../Theme/ThemeContext';
import { Typography } from '../../Theme/Typographys';
import ResponsivePixels from '../../Assets/StyleUtilities/ResponsivePixels';
import { FloatingTextInput } from '../../Common/FloatingTextInput';
import CustomButton from '../../Common/CustomButton';
import { AuthContext } from '../../Context/AuthContext';
import { TouchableOpacity } from 'react-native';
import AuthController from '../../api/controllers/AuthController';
import { ToastHelper } from '../../Common/ToastHelper';
export default function DeleteAccount() {
  const { Colors } = useTheme();
  const styles = getStyles(Colors);
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);

  const [password, setPassword] = useState('');
  const [reason, setReason] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await AuthController.deleteAccount({ password, reason });
      if (res?.data?.message) {
        ToastHelper.success(res.data.message);
      } else {
        ToastHelper.success('Account deleted successfully');
      }
      await logout();
    } catch (error: any) {
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Failed to delete account.',
      );
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
        headerTitle: 'Delete Account',
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
              <AlertTriangle color={Colors.SunburstFlameRed} size={24} />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>This action is irreversible</Text>
              <Text style={styles.description}>
                Deleting your account will permanently erase all your data,
                messages, and settings. You will not be able to recover your
                account once it is deleted.
              </Text>
            </View>
          </View>

          <Text style={styles.instructionText}>
            Please enter your password to confirm you want to delete your
            account.
          </Text>

          <FloatingTextInput
            label="Reason for deletion (Optional)"
            value={reason}
            onChangeText={setReason}
            multiline={true}
            isRequired={false}
          />

          <FloatingTextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            rightComponent={renderEyeIcon(showPassword, () =>
              setShowPassword(!showPassword),
            )}
          />
        </ScrollView>
        <View style={styles.bottomContainer}>
          <CustomButton
            title="Delete My Account"
            onPress={handleDelete}
            disabled={!password}
            style={styles.deleteButton}
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
      backgroundColor: `${Colors.SunburstFlameRed}15`,
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
      color: Colors.SunburstFlameRed,
      marginBottom: ResponsivePixels.size4,
    },
    description: {
      ...Typography.bodyMediumPoppinsRegular,
      color: Colors.SlateGraphiteText,
      lineHeight: ResponsivePixels.size20,
    },
    instructionText: {
      ...Typography.bodyMediumPoppinsRegular,
      color: Colors.MidnightInkText,
      marginBottom: ResponsivePixels.size16,
    },
    bottomContainer: {
      paddingVertical: ResponsivePixels.size24,
      paddingBottom: ResponsivePixels.size40,
    },
    deleteButton: {
      backgroundColor: Colors.SunburstFlameRed,
    },
  });
