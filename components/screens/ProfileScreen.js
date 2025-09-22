import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const achievements = [
    { id: 1, name: 'Sea Turtle Saver', icon: '🐢' },
    { id: 2, name: 'Ocean Guardian', icon: '🛡️' },
    { id: 3, name: 'Beach Warrior', icon: '🏄' },
    { id: 4, name: 'Wave Maker', icon: '🌊' },
    { id: 5, name: 'Eco Champion', icon: '🏆' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#171836" />

      {/* Decorative header matching screenshot */}
      <View style={styles.headerDecor}>
        <View style={styles.bgCircleLeft} />
        <View style={styles.bgCircleRight} />

        <TouchableOpacity style={styles.topSettingsButton}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>

        <View style={styles.profileSectionDecor}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            <View style={styles.editDot}>
              <Text style={styles.editDotIcon}>●</Text>
            </View>
          </View>
          <Text style={styles.userNameDecor}>Andrew Garfield</Text>
          <Text style={styles.userLevelDecor}>Level 7 | Eco Warrior</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, styles.cardLight]}>
            <Text style={[styles.statNumber, styles.textDark]}>25</Text>
            <Text style={[styles.statLabel, styles.textSubtleDark]}>Bottles Saved</Text>
          </View>
          <View style={[styles.statCard, styles.cardDark]}> 
            <Text style={[styles.statNumber, styles.textLight]}>12</Text>
            <Text style={[styles.statLabel, styles.textLight]}>Plastic Avoided(Kg)</Text>
          </View>
          <View style={[styles.statCard, styles.cardPurple]}> 
            <Text style={[styles.statNumber, styles.textLight]}>3</Text>
            <Text style={[styles.statLabel, styles.textLight]}>Events Joined</Text>
          </View>
          <View style={[styles.statCard, styles.cardLight]}> 
            <Text style={[styles.statNumber, styles.textDark]}>847</Text>
            <Text style={[styles.statLabel, styles.textSubtleDark]}>Impact Score</Text>
          </View>
        </View>

        {/* Achievements Section */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Achievement <Text style={styles.sectionTitleAccent}>Badges</Text></Text>
          <View style={styles.achievementsCard}>
            <View style={styles.achievementsGrid}>
              {achievements.map((achievement) => (
                <View key={achievement.id} style={styles.achievementBadge}>
                  <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                  <Text style={styles.achievementName}>{achievement.name}</Text>
                </View>
              ))}
            </View>
          </View>
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
    paddingTop: 48,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
  },
  headerBackground: {},
  bgCircleLeft: {
    position: 'absolute',
    top: -60,
    left: -40,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#2A2D86',
    opacity: 0.9,
  },
  bgCircleRight: {
    position: 'absolute',
    top: -40,
    right: -60,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#6F52ED',
    opacity: 0.9,
  },
  topSettingsButton: {
    position: 'absolute',
    right: 20,
    top: 52,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSectionDecor: {
    alignItems: 'center',
    marginTop: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: '#8B5CF6',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    color: '#FFFFFF',
  },
  editDot: {
    position: 'absolute',
    right: -2,
    top: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editDotIcon: {
    fontSize: 10,
    color: '#6B7280',
  },
  userNameDecor: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userLevelDecor: {
    fontSize: 12,
    color: '#D1D5DB',
  },
  settingsIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
  },
  statCard: {
    width: (width - 60) / 2,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardLight: {
    backgroundColor: '#FFFFFF',
  },
  cardDark: {
    backgroundColor: '#111827',
  },
  cardPurple: {
    backgroundColor: '#5B5CF6',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  textLight: { color: '#FFFFFF' },
  textDark: { color: '#111827' },
  textSubtleDark: { color: '#6B7280' },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  achievementsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
  },
  sectionTitleAccent: {
    color: '#5B5CF6',
  },
  achievementsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementBadge: {
    width: (width - 80) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementName: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default ProfileScreen;