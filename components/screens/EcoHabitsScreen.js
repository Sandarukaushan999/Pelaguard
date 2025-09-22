import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

const EcoHabitsScreen = () => {
  const [habits, setHabits] = useState([
    { id: 1, title: 'Use Reusable Water Bottle', description: 'Avoid single-use plastic bottles', points: '+50 points/day', completed: false },
    { id: 2, title: 'Say No to Plastic Bags', description: 'Bring your own shopping bags', points: '+30 points/day', completed: false },
    { id: 3, title: 'Join Beach Cleanups', description: 'Participate in monthly cleanups', points: '+200 points/day', completed: false },
    { id: 4, title: 'Choose Eco Products', description: 'Buy sustainable alternatives', points: '+200 points/day', completed: false },
  ]);

  const toggleHabit = (id) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  const completedCount = habits.filter(habit => habit.completed).length;
  const totalCount = habits.length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#171836" />

      {/* Header decor with pill, bell and gear */}
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

        {/* Progress card */}
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Daily Progress</Text>
          <View style={styles.progressNumberRow}>
            <Text style={styles.progressNumber}>{completedCount}/{totalCount}</Text>
          </View>
          <View style={styles.progressBarOuter}>
            <View style={[styles.progressBarInner, { width: `${(completedCount / totalCount) * 100}%` }]} />
          </View>
          <Text style={styles.progressCaption}>Keep going | You're making a difference</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {/* Habits List */}
        <View style={styles.habitsContainer}>
          {habits.map((habit) => (
            <TouchableOpacity
              key={habit.id}
              style={styles.habitCard}
              onPress={() => toggleHabit(habit.id)}
            >
              <View style={styles.habitContent}>
                <View style={styles.habitIconCircle}>
                  <Text style={styles.habitIconText}>
                    {habit.id === 1 ? '💧' : 
                     habit.id === 2 ? '🛍️' : 
                     habit.id === 3 ? '👥' : '🌱'}
                  </Text>
                </View>
                
                <View style={styles.habitInfo}>
                  <Text style={styles.habitTitle}>{habit.title}</Text>
                  <Text style={styles.habitDescription}>{habit.description}</Text>
                  <View style={styles.pointsPill}>
                    <Text style={styles.pointsText}>{habit.points}</Text>
                  </View>
                </View>
                
                <View style={styles.toggleContainer}>
                  <View style={[styles.toggle, habit.completed ? styles.toggleActive : styles.toggleInactive]}>
                    <View style={styles.toggleKnob} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
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
  header: {
    backgroundColor: '#1E3A8A',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationButton: {
    position: 'relative',
  },
  notificationIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  userInfo: {
    flex: 1,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  email: {
    fontSize: 12,
    color: '#E5E7EB',
  },
  profileButton: {
    width: 40,
    height: 40,
    backgroundColor: '#374151',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
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
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  progressTitle: { fontSize: 14, color: '#111827', marginBottom: 8 },
  progressNumberRow: { alignItems: 'center', marginBottom: 12 },
  progressNumber: { fontSize: 40, fontWeight: '800', color: '#111827' },
  progressBarOuter: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  progressBarInner: {
    height: '100%',
    backgroundColor: '#7C3AED',
    width: '0%'
  },
  progressCaption: { marginTop: 8, textAlign: 'center', fontSize: 12, color: '#6B7280' },
  habitsContainer: {
    marginBottom: 20,
  },
  habitCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  habitContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  habitIconCircle: {
    width: 44,
    height: 44,
    backgroundColor: '#F3F4F6',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  habitIconText: {
    fontSize: 24,
  },
  habitInfo: {
    flex: 1,
  },
  habitTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  habitDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  pointsPill: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  pointsText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  toggleContainer: {
    marginLeft: 16,
  },
  toggle: {
    width: 52,
    height: 30,
    borderRadius: 15,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleInactive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'flex-start',
  },
  toggleActive: {
    backgroundColor: '#111827',
    justifyContent: 'flex-end',
  },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
});

export default EcoHabitsScreen;