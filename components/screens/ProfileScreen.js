import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const badgeImage1 = require('../../assets/warriorBadge.png');
  const badgeImage2 = require('../../assets/guardianBadge.png');
  const badgeImage3 = require('../../assets/champBadge.png');
  const badgeImage4 = require('../../assets/turtleBadge.png');
  const badgeImage5 = require('../../assets/WaveBadge.png');

  const achievements = [
    { id: 1, name: 'Sea Turtle Saver', icon: badgeImage4 },
    { id: 2, name: 'Ocean Guardian', icon: badgeImage2 },
    { id: 3, name: 'Beach Warrior', icon: badgeImage1 },
    { id: 4, name: 'Wave Maker', icon: badgeImage5 },
    { id: 5, name: 'Eco Champion', icon: badgeImage3 },
  ];

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#171836" />

      {/* Decorative header matching Home gradient */}
      <LinearGradient colors={["#1A1A32", "#635EFC"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.headerDecor}>

        <TouchableOpacity style={styles.iconWrapLeft} onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={18} color="#FFFFFF" />
          <View style={styles.unreadDotTop} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.topSettingsButton} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={18} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.profileSectionDecor}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person-outline" size={36} color="#FFFFFF" />
            </View>
            <TouchableOpacity style={styles.editDot} onPress={() => navigation.navigate('Settings')}>
              <Ionicons name="create-outline" size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userNameDecor}>Andrew Garfield</Text>
          <Text style={styles.userLevelDecor}>Level 7 | Eco Warrior</Text>
        </View>
      </LinearGradient>

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
                <View key={achievement.id} style={[styles.achievementBadge, { backgroundColor: achievement.color }]}>
                  <Image source={achievement.icon} style={styles.achievementIconImage} />
                  <Text style={[styles.achievementName, { color: '#0F172A' }]}>{achievement.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Account & Security */}
        <View style={styles.sectionCardAlt}>
          <Text style={styles.sectionTitle}>Account & Security</Text>
          <TouchableOpacity style={styles.rowItem} onPress={() => navigation.navigate('Settings')}>
            <View style={styles.rowLeft}>
              <Ionicons name="person-outline" size={18} color="#6B7280" />
              <Text style={styles.rowText}>Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rowItem}>
            <View style={styles.rowLeft}>
              <Ionicons name="lock-closed-outline" size={18} color="#6B7280" />
              <Text style={styles.rowText}>Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <View style={styles.sectionCardAlt}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.rowItem}>
            <View style={styles.rowLeft}>
              <Ionicons name="notifications-outline" size={18} color="#6B7280" />
              <Text style={styles.rowText}>Push Notifications</Text>
            </View>
            <Switch value={pushEnabled} onValueChange={setPushEnabled} />
          </View>

          <View style={styles.rowItem}>
            <View style={styles.rowLeft}>
              <Ionicons name="mail-outline" size={18} color="#6B7280" />
              <Text style={styles.rowText}>Email Notifications</Text>
            </View>
            <Switch value={emailEnabled} onValueChange={setEmailEnabled} />
          </View>

          <View style={styles.rowItem}>
            <View style={styles.rowLeft}>
              <Ionicons name="moon-outline" size={18} color="#6B7280" />
              <Text style={styles.rowText}>Dark Mode</Text>
            </View>
            <Switch value={darkMode} onValueChange={setDarkMode} />
          </View>
        </View>

        {/* About */}
        <View style={styles.sectionCardAlt}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.rowItem}>
            <View style={styles.rowLeft}>
              <Ionicons name="information-circle-outline" size={18} color="#6B7280" />
              <Text style={styles.rowText}>App Version</Text>
            </View>
            <Text style={styles.rowSubText}>1.0.0</Text>
          </View>
          <TouchableOpacity style={styles.rowItem}>
            <View style={styles.rowLeft}>
              <Ionicons name="document-text-outline" size={18} color="#6B7280" />
              <Text style={styles.rowText}>Privacy Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
          </TouchableOpacity>
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
    paddingTop: 48,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 56,
    borderBottomRightRadius: 56,
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
  iconWrapLeft: {
    position: 'absolute',
    left: 20,
    top: 52,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadDotTop: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6EE7B7',
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
    backgroundColor: 'rgba(255,255,255,0.18)',
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
  achievementIconImage: {
    width: 48,
    height: 48,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  achievementName: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  sectionCardAlt: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  rowText: { marginLeft: 12, fontSize: 14, color: '#111827' },
  rowSubText: { fontSize: 14, color: '#6B7280' },
  bottomSpacer: {
    height: 100,
  },
});

export default ProfileScreen;