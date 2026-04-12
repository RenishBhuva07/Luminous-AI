import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import MainContainer from '../../Common/MainContainer';
import { Colors } from '../../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../../Assets/StyleUtilities/ResponsivePixels';
import { ArrowLeft, Camera } from 'lucide-react-native';
import { FloatingTextInput } from '../../Common/FloatingTextInput';
import CustomButton from '../../Common/CustomButton';
import { goBack } from '../../Navigators/Navigator';
import { IMAGES } from '../../Assets/Images';
import { useTheme } from '../../Theme/ThemeContext';

const Profile: React.FC = () => {
    const { Colors } = useTheme();
    const [name, setName] = useState('Zachery Williamson');
    const [email, setEmail] = useState('zachery.williamson94@gmail.com');

    const handleSave = () => {
        // TODO: Implement save logic
        goBack();
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
                    <Image source={IMAGES.Luminous_Face} style={styles.profilePic} />
                    <TouchableOpacity style={styles.cameraButton}>
                        <Camera color={Colors.DefaultWhite} size={20} />
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
                    title="Save Changes"
                    onPress={handleSave}
                    style={styles.saveButton}
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
        bottom: 0,
        right: '35%',
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