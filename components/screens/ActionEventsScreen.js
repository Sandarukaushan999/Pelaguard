import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#171836" />

      {/* Header decor */}
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

        {/* Floating summary card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Events Joined</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryNumber}>3</Text>
            <View style={styles.summaryRightRow}>
              <Text style={styles.summaryRightIcon}>👥</Text>
              <Text style={styles.summaryRightText}>Making impact</Text>
            </View>
          </View>
          <Text style={styles.summaryCaption}>Keep going | You're making a difference</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {/* Events List */}
        <View style={styles.eventsContainer}>
          {events.map((event) => (
            <View key={event.id} style={styles.eventCard}>
              <View style={styles.eventHeader}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(event.difficulty) }]}>
                  <Text style={styles.difficultyText}>{event.difficulty}</Text>
                </View>
              </View>
              
              <View style={styles.eventDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailIcon}>📅</Text>
                  <Text style={styles.detailText}>{event.date}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailIcon}>📍</Text>
                  <Text style={styles.detailText}>{event.location}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailIcon}>👥</Text>
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
    paddingHorizontal: 20,
  },
  summaryCard: {
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
  summaryTitle: { fontSize: 14, color: '#111827', marginBottom: 8 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  summaryNumber: { fontSize: 40, fontWeight: '800', color: '#111827' },
  summaryRightRow: { flexDirection: 'row', alignItems: 'center' },
  summaryRightIcon: { fontSize: 18, marginRight: 6 },
  summaryRightText: { fontSize: 14, color: '#111827', fontWeight: '600' },
  summaryCaption: { marginTop: 8, textAlign: 'center', fontSize: 12, color: '#6B7280' },
  eventsContainer: {
    marginBottom: 20,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
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
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    color: '#FFFFFF',
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
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignSelf: 'flex-end',
  },
  joinButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ActionEventsScreen;