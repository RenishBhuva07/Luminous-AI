import { ToastHelper } from '../../Common/ToastHelper';
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import MainContainer from '../../Common/MainContainer';
import { Colors } from '../../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../../Assets/StyleUtilities/ResponsivePixels';
import { Typography } from '../../Theme/Typographys';
import { ArrowLeft, Camera } from 'lucide-react-native';
import { FloatingTextInput } from '../../Common/FloatingTextInput';
import CustomButton from '../../Common/CustomButton';
import { goBack } from '../../Navigators/Navigator';
import { launchImageLibrary } from 'react-native-image-picker';
import { AuthContext } from '../../Context/AuthContext';
import AuthController from '../../api/controllers/AuthController';

const CompleteProfile: React.FC = () => {
  const { user, setAuthState } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setAvatarUri(result.assets[0].uri || null);
    }
  };

  const handleUpdateProfile = async () => {
    if (!name.trim()) {
      ToastHelper.error('Please enter your full name');
      return;
    }

    try {
      setIsLoading(true);
      const res = await AuthController.updateProfile({ name });
      if (res.success && res.data) {
        // Update global state and disable requiresProfileCompletion to route to Main App
        setAuthState(res.data.user, false);
      } else {
        ToastHelper.error('Failed to update profile');
      }
    } catch (error: any) {
      console.error(error);
      ToastHelper.error(error?.response?.data?.error?.message || error?.response?.data?.message || 'Failed to update profile');
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
        <Text style={styles.title}>Complete your profile</Text>
        <Text style={styles.subtitle}>
          Don't worry, only you can see your personal data. No one else will be
          able to see it.
        </Text>

        <View style={styles.avatarContainer}>
          <TouchableOpacity
            style={styles.avatarPicker}
            activeOpacity={0.8}
            onPress={handlePickImage}
          >
            {avatarUri ? (
              <Image
                source={{ uri: avatarUri }}
                style={styles.avatarPlaceholder}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Camera
                  color={Colors.MutedSteelText}
                  size={ResponsivePixels.size32}
                  strokeWidth={1.5}
                />
              </View>
            )}
            <View style={styles.editIconContainer}>
              <Camera color={Colors.DefaultWhite} size={14} strokeWidth={2} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <FloatingTextInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            isRequired={false}
            autoCapitalize="words"
          />

          <View style={{ marginTop: ResponsivePixels.size16 }}>
            <FloatingTextInput
              label="Email Address"
              value={user?.email || ''}
              onChangeText={() => {}} // Disabled or readonly field
              isRequired={false}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={false}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title={isLoading ? 'Saving...' : 'Complete Setup'}
            onPress={handleUpdateProfile}
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
  avatarContainer: {
    alignItems: 'center',
    marginTop: ResponsivePixels.size32,
    marginBottom: ResponsivePixels.size16,
  },
  avatarPicker: {
    position: 'relative',
  },
  avatarPlaceholder: {
    width: ResponsivePixels.size100,
    height: ResponsivePixels.size100,
    borderRadius: ResponsivePixels.size50,
    backgroundColor: Colors.FogGrey,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.SoftSilver,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.LuminousGreen,
    width: ResponsivePixels.size28,
    height: ResponsivePixels.size28,
    borderRadius: ResponsivePixels.size14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.DefaultWhite,
  },
  formContainer: {
    marginTop: ResponsivePixels.size16,
  },
  buttonContainer: {
    marginTop: ResponsivePixels.size40,
  },
});

export default CompleteProfile;
