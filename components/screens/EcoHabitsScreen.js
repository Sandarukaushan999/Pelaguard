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

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#171836" />

      {/* Header with gradient + pill */}
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
      </LinearGradient>

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
                  {habit.id === 1 && <Ionicons name="water-outline" size={20} color="#6B7280" />}
                  {habit.id === 2 && <Ionicons name="bag-outline" size={20} color="#6B7280" />}
                  {habit.id === 3 && <Ionicons name="people-outline" size={20} color="#6B7280" />}
                  {habit.id === 4 && <Ionicons name="leaf-outline" size={20} color="#6B7280" />}
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
  header: {},
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
    paddingTop: 56,
    paddingBottom: 36,
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
  progressCard: {
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
    backgroundColor: '#5145E5',
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
    backgroundColor: '#8373fbff',
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
    backgroundColor: '#c5c5c5ff',
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