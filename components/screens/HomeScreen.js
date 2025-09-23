import React, { useState } from 'react';
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

const HomeScreen = () => {
  const navigation = useNavigation();
  const [habits, setHabits] = useState([
    { id: 1, title: 'Use Reusable Water Bottle', description: 'Avoid single-use plastic bottles', points: '+50 points/day', completed: true },
    { id: 2, title: 'Say No to Plastic Bags', description: 'Bring your own shopping bags', points: '+30 points/day', completed: false },
    { id: 3, title: 'Join Beach Cleanups', description: 'Participate in monthly cleanups', points: '+200 points/day', completed: false },
    { id: 4, title: 'Choose Eco Products', description: 'Buy sustainable alternatives', points: '+200 points/day', completed: false },
  ]);

  const toggleHabit = (id) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  const completedCount = habits.filter(h => h.completed).length;
  const totalCount = habits.length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#171836" />

      {/* Header with gradient background */}
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

        {/* Floating Impact card */}
        <View style={styles.impactCard}>
          <View style={styles.impactTopRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.impactLabel}>Your Impact Score</Text>
              <Text style={styles.impactScore}>847</Text>
            </View>
            <View style={styles.vDivider} />
            <View style={styles.trendWrap}>
              <Ionicons name="trending-up-outline" size={48} color="#6EE7B7" />
              <Text style={styles.weeklyText}>+127 this week</Text>
            </View>
          </View>
          <Text style={styles.factTitle}>Ocean Fact of the Day</Text>
          <Text style={styles.factText}>
            The Great Pacific Garbage Patch is twice the size of Texas! With your help, we can make it smaller every day.
          </Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        

        {/* Ocean Awareness */}
        <TouchableOpacity style={styles.sectionCard} onPress={() => navigation.navigate('OceanAwareness')}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Ionicons name="reorder-three-outline" size={20} color="#6B7280" />
            </View>
            <View style={styles.sectionInfo}>
              <Text style={styles.sectionTitle}>Ocean Awareness</Text>
              <Text style={styles.sectionSubtitle}>Learn shocking facts & solutions</Text>
              <Text style={styles.sectionStats}>47 facts discovered</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#D1D5DB" />
          </View>
        </TouchableOpacity>

        {/* Eco Habits Tracker */}
        <View style={styles.habitsCard}>
          <View style={styles.habitsHeader}>
            <View style={styles.habitsIcon}>
              <Ionicons name="checkmark-done-outline" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.habitsInfo}>
              <Text style={styles.habitsTitle}>Eco Habits Tracker</Text>
              <Text style={styles.habitsSubtitle}>Build planet-saving habits</Text>
              <View style={styles.habitsStats}>
                <Text style={styles.habitsStatsText}>{completedCount}/{totalCount} habits active</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={22} color="rgba(255,255,255,0.5)" />
          </View>
        </View>

        {/* Action Events */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Ionicons name="people-outline" size={20} color="#6B7280" />
            </View>
            <View style={styles.sectionInfo}>
              <Text style={styles.sectionTitle}>Action Events</Text>
              <Text style={styles.sectionSubtitle}>Join Local ocean heroes</Text>
              <Text style={styles.sectionStats}>12 events near you</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#D1D5DB" />
          </View>
        </View>

        <View style={styles.bottomSpacer} />
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
    paddingBottom: 14,
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
  userPillWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: 22,
    paddingRight: 8,
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
    paddingHorizontal: 0,
  },
  impactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 36,
    padding: 20,
    marginTop: 24,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 10,
  },
  impactTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  impactLabel: {
    color: '#1F2937',
    fontSize: 14,
    marginBottom: 6,
    textAlign: 'center',
  },
  impactScore: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 0,
  },
  vDivider: {
    width: 1,
    height: 60,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 18,
  },
  trendWrap: {
    alignItems: 'center',
  },
  weeklyText: {
    color: '#1F2937',
    fontSize: 14,
    fontWeight: '600',
  },
  factTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 6,
  },
  factText: {
    color: '#6B7280',
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'center',
    marginInline: 16,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  sectionIconText: {
    fontSize: 20,
    color: '#6B7280',
  },
  sectionInfo: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  sectionStats: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  habitsCard: {
    backgroundColor: '#1E1E1E',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  habitsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  habitsIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  habitsInfo: {
    flex: 1,
  },
  habitsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  habitsSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 8,
  },
  habitsStats: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  habitsStatsText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 100,
  },
});

export default HomeScreen;