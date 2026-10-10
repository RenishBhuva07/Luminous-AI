import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  ArrowLeft,
  Smartphone,
  Laptop,
  Tablet,
  Clock,
  ChevronRight,
  X,
  LogOut,
} from 'lucide-react-native';
import MainContainer from '../../Common/MainContainer';
import { useTheme } from '../../Theme/ThemeContext';
import { Typography } from '../../Theme/Typographys';
import ResponsivePixels from '../../Assets/StyleUtilities/ResponsivePixels';
import AuthController from '../../api/controllers/AuthController';

export default function Devices() {
  const { Colors } = useTheme();
  const styles = getStyles(Colors);
  const navigation = useNavigation();

  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [devices, setDevices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setIsLoading(true);
      const res = await AuthController.getSessions();
      if (res.success && res.data?.sessions) {
        const mappedDevices = res.data.sessions.map((session: any) => {
          let icon = Smartphone;
          let iconBg = '#42CBE9';
          const type = session.deviceType?.toLowerCase() || '';
          if (
            type.includes('mac') ||
            type.includes('windows') ||
            type.includes('pc')
          ) {
            icon = Laptop;
            iconBg = '#4A8BFF';
          } else if (type.includes('ipad') || type.includes('tablet')) {
            icon = Tablet;
            iconBg = '#9E57E5';
          }

          return {
            id: session.id,
            title: session.deviceName || session.deviceType || 'Unknown Device',
            status: session.isCurrentDevice
              ? 'Current device'
              : 'Linked device',
            lastActive: session.isCurrentDevice
              ? 'Active now'
              : `Last active: ${new Date(
                  session.lastActiveAt,
                ).toLocaleString()}`,
            icon,
            iconBg,
          };
        });
        setDevices(mappedDevices);
      } else {
        setDevices([]);
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDevicePress = (device: any) => {
    setSelectedDevice(device);
    setIsModalVisible(true);
  };

  const handleLogoutSession = async () => {
    if (!selectedDevice) return;
    try {
      const res = await AuthController.deleteSession(selectedDevice.id);
      if (res.success) {
        setIsModalVisible(false);
        fetchSessions();
      }
    } catch (error) {
      console.error('Failed to logout session:', error);
    }
  };

  const renderDeviceItem = (device: any, index: number) => {
    const isLast = index === devices.length - 1;

    return (
      <View key={device.id}>
        <TouchableOpacity
          style={styles.deviceItem}
          activeOpacity={0.7}
          onPress={() => handleDevicePress(device)}
        >
          <View
            style={[styles.iconContainer, { backgroundColor: device.iconBg }]}
          >
            <device.icon color={Colors.DefaultWhite} size={20} />
          </View>
          <View style={styles.deviceContent}>
            <Text style={styles.deviceTitle}>{device.title}</Text>
            <Text style={styles.deviceStatus}>{device.status}</Text>
            {device.lastActive === 'Active now' ? (
              <View style={styles.activeBadge}>
                <View style={styles.activeDot} />
                <Text style={styles.activeBadgeText}>Active now</Text>
              </View>
            ) : (
              <View style={styles.lastActiveRow}>
                <Clock color={Colors.MutedSteelText} size={14} />
                <Text style={styles.lastActiveText}>{device.lastActive}</Text>
              </View>
            )}
          </View>
          <ChevronRight color={Colors.MutedSteelText} size={20} />
        </TouchableOpacity>
        {!isLast && <View style={styles.separator} />}
      </View>
    );
  };

  return (
    <MainContainer
      showHeader={true}
      header={{
        headerTitle: 'Devices',
        headerLeft: {
          customIcon: <ArrowLeft color={Colors.MidnightInkText} size={24} />,
          onPress: () => navigation.goBack(),
        },
      }}
    >
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            isLoading || devices.length === 0
              ? { flex: 1, justifyContent: 'center' }
              : {},
          ]}
        >
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.MidnightInkText} />
            </View>
          ) : devices.length > 0 ? (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Linked Devices</Text>
              <View style={styles.cardGroup}>
                {devices.map((device, index) =>
                  renderDeviceItem(device, index),
                )}
              </View>
            </View>
          ) : (
            <View style={styles.emptyStateContainer}>
              <Smartphone color={Colors.MutedSteelText} size={64} />
              <Text style={styles.emptyStateTitle}>No Active Sessions</Text>
              <Text style={styles.emptyStateDesc}>
                You don't have any active device sessions right now.
              </Text>
            </View>
          )}
        </ScrollView>

        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <Pressable
              style={styles.modalBackdrop}
              onPress={() => setIsModalVisible(false)}
            />
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Device Details</Text>
                <TouchableOpacity
                  onPress={() => setIsModalVisible(false)}
                  style={styles.closeButton}
                >
                  <X color={Colors.MidnightInkText} size={24} />
                </TouchableOpacity>
              </View>

              {selectedDevice && (
                <View style={styles.modalBody}>
                  <View
                    style={[
                      styles.modalIconContainer,
                      { backgroundColor: selectedDevice.iconBg },
                    ]}
                  >
                    <selectedDevice.icon
                      color={Colors.DefaultWhite}
                      size={32}
                    />
                  </View>
                  <Text style={styles.modalDeviceTitle}>
                    {selectedDevice.title}
                  </Text>
                  <Text style={styles.modalDeviceStatus}>
                    {selectedDevice.status}
                  </Text>

                  {selectedDevice.lastActive === 'Active now' ? (
                    <View style={[styles.activeBadge, styles.modalActiveBadge]}>
                      <View style={styles.activeDot} />
                      <Text style={styles.activeBadgeText}>Active now</Text>
                    </View>
                  ) : (
                    <View style={styles.modalInfoRow}>
                      <Clock color={Colors.MutedSteelText} size={16} />
                      <Text style={styles.modalInfoText}>
                        {selectedDevice.lastActive}
                      </Text>
                    </View>
                  )}

                  <TouchableOpacity
                    style={styles.unlinkButton}
                    activeOpacity={0.7}
                    onPress={handleLogoutSession}
                  >
                    <LogOut color={'#FF3B30'} size={20} />
                    <Text style={styles.unlinkButtonText}>
                      Logout this session
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </MainContainer>
  );
}

const getStyles = (Colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      paddingTop: ResponsivePixels.size24,
      paddingBottom: ResponsivePixels.size60,
    },
    sectionContainer: {
      marginBottom: ResponsivePixels.size24,
    },
    sectionTitle: {
      ...Typography.bodyLargePoppinsSemiBold,
      color: Colors.MidnightInkText,
      marginBottom: ResponsivePixels.size12,
      marginHorizontal: ResponsivePixels.size12,
    },
    cardGroup: {
      backgroundColor: Colors.DefaultWhite,
      borderRadius: ResponsivePixels.size20,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 2,
    },
    deviceItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: ResponsivePixels.size16,
      paddingHorizontal: ResponsivePixels.size12,
    },
    iconContainer: {
      width: ResponsivePixels.size40,
      height: ResponsivePixels.size40,
      borderRadius: ResponsivePixels.size12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: ResponsivePixels.size16,
    },
    deviceContent: {
      flex: 1,
    },
    deviceTitle: {
      ...Typography.bodyLargePoppinsMedium,
      color: Colors.MidnightInkText,
      marginBottom: ResponsivePixels.size4,
    },
    deviceStatus: {
      ...Typography.bodyMediumPoppinsRegular,
      color: Colors.MidnightInkText,
      opacity: 0.75,
      marginBottom: ResponsivePixels.size6,
    },
    lastActiveRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    lastActiveText: {
      ...Typography.bodySmallPoppinsRegular,
      color: Colors.MutedSteelText,
      marginLeft: ResponsivePixels.size4,
    },
    activeBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(52, 199, 89, 0.1)',
      paddingHorizontal: ResponsivePixels.size8,
      paddingVertical: ResponsivePixels.size4,
      borderRadius: ResponsivePixels.size8,
      alignSelf: 'flex-start',
    },
    activeDot: {
      width: ResponsivePixels.size6,
      height: ResponsivePixels.size6,
      borderRadius: ResponsivePixels.size3,
      backgroundColor: '#34C759',
      marginRight: ResponsivePixels.size6,
    },
    activeBadgeText: {
      ...Typography.bodySmallPoppinsMedium,
      color: '#34C759',
    },
    modalActiveBadge: {
      alignSelf: 'center',
      marginBottom: ResponsivePixels.size24,
    },
    separator: {
      height: 1,
      backgroundColor: Colors.FogGrey,
      opacity: 0.4,
      marginHorizontal: ResponsivePixels.size16,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    modalBackdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalContent: {
      backgroundColor: Colors.DefaultWhite,
      borderTopLeftRadius: ResponsivePixels.size24,
      borderTopRightRadius: ResponsivePixels.size24,
      padding: ResponsivePixels.size20,
      paddingBottom: ResponsivePixels.size40,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: ResponsivePixels.size24,
    },
    modalTitle: {
      ...Typography.h4PoppinsSemiBold,
      color: Colors.MidnightInkText,
      fontWeight: 'bold',
    },
    closeButton: {
      padding: ResponsivePixels.size4,
    },
    modalBody: {
      alignItems: 'center',
    },
    modalIconContainer: {
      width: ResponsivePixels.size64,
      height: ResponsivePixels.size64,
      borderRadius: ResponsivePixels.size16,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: ResponsivePixels.size16,
    },
    modalDeviceTitle: {
      ...Typography.h4PoppinsSemiBold,
      color: Colors.MidnightInkText,
      marginBottom: ResponsivePixels.size4,
    },
    modalDeviceStatus: {
      ...Typography.bodyLargePoppinsMedium,
      color: Colors.MidnightInkText,
      opacity: 0.75,
      marginBottom: ResponsivePixels.size12,
    },
    modalInfoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.FogGrey,
      paddingHorizontal: ResponsivePixels.size16,
      paddingVertical: ResponsivePixels.size8,
      borderRadius: ResponsivePixels.size20,
      marginBottom: ResponsivePixels.size24,
    },
    modalInfoText: {
      ...Typography.bodyMediumPoppinsRegular,
      color: Colors.MutedSteelText,
      marginLeft: ResponsivePixels.size8,
    },
    unlinkButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFE5E5',
      paddingVertical: ResponsivePixels.size14,
      paddingHorizontal: ResponsivePixels.size24,
      borderRadius: ResponsivePixels.size16,
      width: '100%',
    },
    unlinkButtonText: {
      ...Typography.bodyLargePoppinsSemiBold,
      color: '#FF3B30',
      marginLeft: ResponsivePixels.size8,
    },
    emptyStateContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: ResponsivePixels.size40,
    },
    emptyStateTitle: {
      ...Typography.h5PoppinsSemiBold,
      color: Colors.MidnightInkText,
      marginTop: ResponsivePixels.size16,
      marginBottom: ResponsivePixels.size8,
    },
    emptyStateDesc: {
      ...Typography.bodyMediumPoppinsRegular,
      color: Colors.MutedSteelText,
      textAlign: 'center',
      paddingHorizontal: ResponsivePixels.size32,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
