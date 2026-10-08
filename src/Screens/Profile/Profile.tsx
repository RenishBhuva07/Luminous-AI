import { ToastHelper } from '../../Common/ToastHelper';
import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import MainContainer from '../../Common/MainContainer';
import { Colors } from '../../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../../Assets/StyleUtilities/ResponsivePixels';
import { ArrowLeft, Camera } from 'lucide-react-native';
import { FloatingTextInput } from '../../Common/FloatingTextInput';
import CustomButton from '../../Common/CustomButton';
import { goBack } from '../../Navigators/Navigator';
import { IMAGES } from '../../Assets/Images';
import { useTheme } from '../../Theme/ThemeContext';
import { AuthContext } from '../../Context/AuthContext';
import AuthController from '../../api/controllers/AuthController';
import { launchImageLibrary } from 'react-native-image-picker';

const Profile: React.FC = () => {
    const { Colors } = useTheme();
    const { user, updateUser } = useContext(AuthContext);
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [isSaving, setIsSaving] = useState(false);
    const [avatar, setAvatar] = useState<any>(null);

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const handlePickImage = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.8,
        });

        if (!result.didCancel && result.assets && result.assets.length > 0) {
            setAvatar(result.assets[0]);
        }
    };

    const handleSave = async () => {
        if (!name.trim()) {
            ToastHelper.error('Full Name is required');
            return;
        }

        setIsSaving(true);
        try {
            const res = await AuthController.updateProfile({ 
                name: name.trim(),
                ...(avatar ? { avatar } : {})
            });
            if (res.success) {
                const newProfilePicture = res.data?.user?.profilePicture || res.data?.user?.avatar || avatar?.uri || user?.profilePicture || user?.avatar;
                updateUser({ name: name.trim(), profilePicture: newProfilePicture, avatar: newProfilePicture });
                ToastHelper.success(res.message || 'Profile updated successfully');
                goBack();
            } else {
                ToastHelper.error(res.message || 'Failed to update profile');
            }
        } catch (error: any) {
            console.error('Update profile error:', error);
            ToastHelper.error(
                error?.response?.data?.error?.message ||
                error?.response?.data?.message ||
                error?.message
            );
        } finally {
            setIsSaving(false);
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
                    customIcon: <ArrowLeft color={Colors.TrueBlackText} size={ResponsivePixels.size26} strokeWidth={2} />,
                    onPress: goBack
                },
                headerTitle: "Edit Profile",
            }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                {/* Profile Picture Section */}
                <View style={styles.profilePicContainer}>
                    <TouchableOpacity activeOpacity={0.8} onPress={handlePickImage}>
                        <Image 
                            source={avatar?.uri ? { uri: avatar.uri } : (user?.profilePicture || user?.avatar ? { uri: user?.profilePicture || user?.avatar } : IMAGES.Luminous_Face)} 
                            style={styles.profilePic} 
                        />
                        <View style={styles.cameraButton}>
                            <Camera color={Colors.DefaultWhite} size={20} />
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

                    <FloatingTextInput
                        label="Email Address"
                        value={email}
                        onChangeText={setEmail}
                        isRequired={false}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                </View>

                <CustomButton
                    title={isSaving ? "Saving..." : "Save Changes"}
                    onPress={handleSave}
                    style={styles.saveButton}
                    disabled={isSaving}
                />
            </ScrollView>
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        paddingTop: ResponsivePixels.size20,
        paddingBottom: ResponsivePixels.size120,
        paddingHorizontal: ResponsivePixels.size20,
    },
    profilePicContainer: {
        alignItems: 'center',
        marginBottom: ResponsivePixels.size32,
    },
    profilePic: {
        width: ResponsivePixels.size120,
        height: ResponsivePixels.size120,
        borderRadius: ResponsivePixels.size60,
        backgroundColor: Colors.IvoryMist,
    },
    cameraButton: {
        position: 'absolute',
        bottom: "-1%",
        right: '30%',
        backgroundColor: Colors.LuminousGreen,
        width: ResponsivePixels.size40,
        height: ResponsivePixels.size40,
        borderRadius: ResponsivePixels.size20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Colors.DefaultWhite,
    },
    formContainer: {
        marginBottom: ResponsivePixels.size32,
    },
    saveButton: {
        marginTop: ResponsivePixels.size20,
    },
});

export default Profile;