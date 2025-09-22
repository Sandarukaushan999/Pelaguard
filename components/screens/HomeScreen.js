import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

const HomeScreen = () => {
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

      {/* Header decor to match other pages */}
      <View style={styles.headerDecor}>
        <View style={styles.hCircleLeft} />
        <View style={styles.hCircleRight} />
        <View style={styles.headerTopRow}>
          <View style={styles.bellDot}>
            <Text style={styles.bellIcon}>🔔</Text>
          </View>
          <View style={styles.userPill}>
            <Text style={styles.pillHi}>Hi, Yenula</Text>
            <Text style={styles.pillEmail}>yenula123@gmail.com</Text>
          </View>
          <View style={styles.gearCircle}>
            <Text style={styles.gearIcon}>⚙️</Text>
          </View>
        </View>

        {/* Floating Impact card */}
        <View style={styles.impactCard}>
          <Text style={styles.impactLabel}>Your Impact Score</Text>
          <Text style={styles.impactScore}>847</Text>
          <View style={styles.weeklyProgress}>
            <Text style={styles.progressIcon}>📈</Text>
            <Text style={styles.weeklyText}>+127 this week</Text>
          </View>
          <Text style={styles.factTitle}>Ocean Fact of the Day</Text>
          <Text style={styles.factText}>
            The Great Pacific Garbage Patch is twice the size of Texas! But with your help, we can make it smaller every day.
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        

        {/* Ocean Awareness */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Text style={styles.sectionIconText}>≡</Text>
            </View>
            <View style={styles.sectionInfo}>
              <Text style={styles.sectionTitle}>Ocean Awareness</Text>
              <Text style={styles.sectionSubtitle}>Learn shocking facts & solutions</Text>
              <Text style={styles.sectionStats}>47 facts discovered</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </View>
        </View>

        {/* Eco Habits Tracker */}
        <View style={styles.habitsCard}>
          <View style={styles.habitsHeader}>
            <View style={styles.habitsIcon}>
              <Text style={styles.habitsIconText}>✓</Text>
            </View>
            <View style={styles.habitsInfo}>
              <Text style={styles.habitsTitle}>Eco Habits Tracker</Text>
              <Text style={styles.habitsSubtitle}>Build planet-saving habits</Text>
              <View style={styles.habitsStats}>
                <Text style={styles.habitsStatsText}>{completedCount}/{totalCount} habits active</Text>
              </View>
            </View>
            <Text style={styles.chevronWhite}>›</Text>
          </View>
        </View>

        {/* Action Events */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Text style={styles.sectionIconText}>👥</Text>
            </View>
            <View style={styles.sectionInfo}>
              <Text style={styles.sectionTitle}>Action Events</Text>
              <Text style={styles.sectionSubtitle}>Join Local ocean heroes</Text>
              <Text style={styles.sectionStats}>12 events near you</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
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
    backgroundColor: '#171836',
    paddingTop: 56,
    paddingBottom: 36,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
  },
  hCircleLeft: {
    position: 'absolute',
    top: -40,
    left: -30,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#2A2D86',
  },
  hCircleRight: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#6F52ED',
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bellDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellIcon: { fontSize: 16, color: '#FFFFFF' },
  userPill: {
    backgroundColor: 'rgba(255,255,255,0.22)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    alignItems: 'center',
  },
  pillHi: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  pillEmail: { color: '#E5E7EB', fontSize: 10 },
  gearCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gearIcon: { fontSize: 16, color: '#FFFFFF' },
  content: {
    flex: 1,
    paddingHorizontal: 0,
  },
  impactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginTop: 24,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  impactLabel: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 8,
  },
  impactScore: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  weeklyProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  weeklyText: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '600',
  },
  factTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  factText: {
    color: '#6B7280',
    fontSize: 14,
    lineHeight: 20,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
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
  chevron: {
    fontSize: 24,
    color: '#D1D5DB',
  },
  habitsCard: {
    backgroundColor: '#374151',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
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
  habitsIconText: {
    fontSize: 20,
    color: '#FFFFFF',
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
  chevronWhite: {
    fontSize: 24,
    color: 'rgba(255,255,255,0.5)',
  },
  bottomSpacer: {
    height: 100,
  },
});

export default HomeScreen;