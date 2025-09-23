import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const ActionEventsScreen = () => {
  const events = [
    {
      id: 1,
      title: 'Colombo Beach Cleanup',
      date: 'Oct 25, 2025 8.00 AM',
      location: 'Galle Face, Colombo',
      participants: '127 joined',
      points: '+300 points',
      difficulty: 'Easy',
    },
    {
      id: 2,
      title: 'Coral Restoration Dive',
      date: 'Nov 2, 2025 9.30 AM',
      location: 'Hikkaduwa Marine Park',
      participants: '45 joined',
      points: '+500 points',
      difficulty: 'Advanced',
    },
    {
      id: 3,
      title: 'Plastic - Free Market Day',
      date: 'Nov 15, 2025 10.00 AM',
      location: 'Pettah Market, Colombo',
      participants: '89 joined',
      points: '+250 points',
      difficulty: 'Medium',
    },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#10B981';
      case 'Medium': return '#F59E0B';
      case 'Advanced': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getDifficultyStyles = (difficulty) => {
    const color = getDifficultyColor(difficulty);
    return {
      container: { backgroundColor: `${color}1A` }, // translucent bg
      text: { color },
    };
  };

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#171836" />

      {/* Header with gradient */}
      <LinearGradient colors={["#1A1A32", "#635EFC"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.headerDecor}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity style={styles.iconWrap} onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications-outline" size={18} color="#FFFFFF" />
            <View style={styles.unreadDot} />
          </TouchableOpacity>
          <View style={styles.userPillWrap}>
            <View style={styles.userPill}>
              <Text style={styles.pillHi}>Hi ,<Text style={styles.pillName}> Yenula</Text></Text>
              <Text style={styles.pillEmail}>yenula123@gmail.com</Text>
            </View>
            <View style={styles.avatarCircle}>
              <Ionicons name="person-outline" size={18} color="#FFFFFF" />
            </View>
          </View>
          <TouchableOpacity style={styles.iconWrap} onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Floating summary card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Events Joined</Text>
          <View style={styles.summaryRow}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.summaryNumber}>3</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={[styles.summaryRightRow, { flex: 1 }]}>
              <Ionicons name="people-outline" size={22} color="#34D399" style={styles.summaryRightIconFa} />
              <Text style={styles.summaryRightText}>Making impact</Text>
            </View>
          </View>
          <Text style={styles.summaryCaption}>Keep going | You're making a difference</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {/* Events List */}
        <View style={styles.eventsContainer}>
          {events.map((event) => (
            <View key={event.id} style={styles.eventCard}>
              <View style={styles.eventHeader}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View style={[styles.difficultyBadge, getDifficultyStyles(event.difficulty).container]}>
                  <Text style={[styles.difficultyText, getDifficultyStyles(event.difficulty).text]}>{event.difficulty}</Text>
                </View>
              </View>
              
              <View style={styles.eventDetails}>
                <View style={styles.detailRow}>
              <Ionicons name="calendar-outline" size={18} style={styles.detailIconFix} />
                  <Text style={styles.detailText}>{event.date}</Text>
                </View>
                
                <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={18} style={styles.detailIconFix} />
                  <Text style={styles.detailText}>{event.location}</Text>
                </View>
                
                <View style={styles.detailRow}>
              <Ionicons name="people-outline" size={18} style={styles.detailIconFix} />
                  <Text style={styles.detailText}>{event.participants}</Text>
                  <View style={styles.pointsBadge}>
                    <Text style={styles.pointsText}>{event.points}</Text>
                  </View>
                </View>
              </View>
              
              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinButtonText}>Join Now</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerDecor: {
    paddingTop: 56,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 56,
    borderBottomRightRadius: 56,
    overflow: 'hidden',
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6EE7B7',
  },
  userPillWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: 22,
    paddingRight: 8,
  },
  userPill: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    alignItems: 'center',
  },
  pillHi: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  pillName: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
  pillEmail: { color: '#E5E7EB', fontSize: 10 },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 20,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 10,
  },
  summaryTitle: { fontSize: 14, color: '#111827', marginBottom: 8 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  summaryDivider: { width: 1, height: 56, backgroundColor: '#E5E7EB' },
  summaryNumber: { fontSize: 56, fontWeight: '800', color: '#111827' },
  summaryRightRow: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  summaryRightIconFa: { marginBottom: 6 },
  summaryRightIcon: { fontSize: 18, marginRight: 6 },
  summaryRightText: { fontSize: 14, color: '#111827', fontWeight: '600' },
  summaryCaption: { marginTop: 8, textAlign: 'center', fontSize: 12, color: '#6B7280' },
  eventsContainer: {
    marginBottom: 20,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
    marginRight: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  eventDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: {
    fontSize: 16,
    marginRight: 8,
    width: 20,
  },
  detailIconFix: { color: '#6B7280', marginRight: 8, width: 20, textAlign: 'center' },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  pointsBadge: {
    backgroundColor: '#5B5CF6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  pointsText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  joinButton: {
    backgroundColor: '#111827',
    paddingVertical: 12,
    paddingHorizontal: 56,
    borderRadius: 16,
    alignSelf: 'flex-center',
  },
  joinButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ActionEventsScreen;