import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Calendar, MoreVertical } from 'lucide-react-native';
import { Colors } from '../../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../../Assets/StyleUtilities/ResponsivePixels';
import { Typography } from '../../Theme/Typographys';

const CHAT_HISTORY = [
  {
    title: 'Today',
    data: [
      {
        id: '1',
        title: 'How do you say "where is the bus stop" in spanish?',
        desc: 'With these 100+ Luminous prompts for Crypto\nTrading!',
      },
      {
        id: '2',
        title: 'What are some other orange-coloured foods?',
        desc: "I'm not sure what the funniest joke is, but I can try\nto generate one for you. Here it is:...",
      },
      {
        id: '3',
        title: 'How do you say "where is the bus stop" in spanish?',
        desc: 'With these 100+ Luminous prompts for Crypto\nTrading!',
      },
    ],
  },
  {
    title: 'Yesterday',
    data: [
      {
        id: '4',
        title:
          "I didn't find that joke very funny. Do you\nhave any other jokes?",
        desc: "I'm sorry that you didn't find that joke funny. Here's\nanother one:...",
      },
      {
        id: '5',
        title: 'Can you generate a poem for me?',
        desc: 'With these 100+ Luminous prompts for Crypto\nTrading!',
      },
    ],
  },
];

export default function History() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [date, setDate] = useState(new Date(2023, 6, 26)); // Jul 26 2023
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY > 0) {
      if (!isScrolled) setIsScrolled(true);
    } else {
      if (isScrolled) setIsScrolled(false);
    }
  };

  const renderHeader = () => (
    <View
      style={[
        styles.headerContainer,
        isScrolled && styles.headerContainerScrolled,
      ]}
    >
      <Text style={styles.headerTitle}>Chat History</Text>
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Calendar color={Colors.MutedSteelText} size={20} />
        <Text style={styles.datePickerText}>
          {date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        date={date}
        onConfirm={(selectedDate) => {
          setShowDatePicker(false);
          setDate(selectedDate);
        }}
        onCancel={() => setShowDatePicker(false)}
      />
    </View>
  );

  const renderSectionHeader = ({ section: { title } }: any) => (
    <View style={styles.sectionHeaderContainer}>
      <View style={styles.line} />
      <View style={styles.sectionPill}>
        <Text style={styles.sectionPillText}>{title}</Text>
      </View>
      <View style={styles.line} />
    </View>
  );

  const renderItem = ({ item }: any) => (
    <View style={styles.chatCard}>
      <View style={styles.chatCardTopRow}>
        <Text style={styles.chatCardTitle}>{item.title}</Text>
        <TouchableOpacity style={styles.moreButton}>
          <MoreVertical color={Colors.MidnightInkText} size={20} />
        </TouchableOpacity>
      </View>
      <Text style={styles.chatCardDesc}>{item.desc}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <SectionList
        sections={CHAT_HISTORY}
        keyExtractor={item => item.id}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DefaultWhite,
  },
  listContent: {
    paddingTop: ResponsivePixels.size20,
    paddingHorizontal: ResponsivePixels.size12,
    paddingBottom: ResponsivePixels.size100, // For the bottom tab
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: ResponsivePixels.size60,
    paddingBottom: ResponsivePixels.size10,
    paddingHorizontal: ResponsivePixels.size12,
  },
  headerContainerScrolled: {
    backgroundColor: Colors.LuminousGreen,
    borderBottomLeftRadius: ResponsivePixels.size24,
    borderBottomRightRadius: ResponsivePixels.size24,
  },
  headerTitle: {
    ...Typography.h1RanadeBold,
    fontSize: ResponsivePixels.size22,
    color: Colors.MidnightInkText,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ResponsivePixels.size8,
    paddingHorizontal: ResponsivePixels.size12,
    paddingVertical: ResponsivePixels.size8,
    borderRadius: ResponsivePixels.size12,
    borderWidth: 1,
    borderColor: Colors.FogGrey,
  },
  datePickerText: {
    ...Typography.bodyMediumPoppinsMedium,
    color: Colors.MutedSteelText,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ResponsivePixels.size16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.FogGrey,
    opacity: 0.5,
  },
  sectionPill: {
    paddingHorizontal: ResponsivePixels.size20,
    paddingVertical: ResponsivePixels.size8,
    borderRadius: ResponsivePixels.size20,
    borderWidth: 1,
    borderColor: Colors.FogGrey,
    backgroundColor: Colors.DefaultWhite,
    // marginHorizontal: ResponsivePixels.size12,
  },
  sectionPillText: {
    ...Typography.bodyMediumPoppinsSemiBold,
    color: Colors.MidnightInkText,
  },
  chatCard: {
    padding: ResponsivePixels.size12,
    borderRadius: ResponsivePixels.size16,
    borderWidth: 1,
    borderColor: Colors.FogGrey,
    backgroundColor: Colors.DefaultWhite,
    marginBottom: ResponsivePixels.size12,
  },
  chatCardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: ResponsivePixels.size8,
  },
  chatCardTitle: {
    flex: 1,
    ...Typography.bodyLargePoppinsSemiBold,
    color: Colors.MidnightInkText,
    // marginRight: ResponsivePixels.size10,
  },
  moreButton: {
    // padding: ResponsivePixels.size2,
  },
  chatCardDesc: {
    ...Typography.bodySmallPoppinsRegularLoose,
    color: Colors.MutedSteelText,
  },
});
