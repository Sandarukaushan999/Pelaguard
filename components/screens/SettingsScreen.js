import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(true);

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Sign Out", style: "destructive", onPress: () => {/* TODO: sign out logic */} }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#171836" />

      {/* Header */}
      <LinearGradient
        colors={["#1A1A32", "#635EFC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerDecor}
      >
        <View style={styles.headerTopRow}>
          <TouchableOpacity style={styles.iconWrap} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.userPillWrap}>
            <View style={styles.userPill}>
              <Text style={styles.pillHi}>Settings</Text>
            </View>
          </View>

          <View style={{ width: 36 }} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Profile Summary Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={24} color="#635EFC" />
            </View>
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileEmail}>john.doe@example.com</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.editProfileBtn}
            onPress={() => navigation.navigate('ProfileScreen')}
          >
            <Ionicons name="create-outline" size={18} color="#635EFC" />
          </TouchableOpacity>
        </View>

        {/* Account & Security */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="shield-checkmark" size={18} color="#635EFC" />
            <Text style={styles.sectionHeading}>Account & Security</Text>
          </View>
          
          <TouchableOpacity style={styles.row} onPress={() => {}}>
            <View style={styles.rowLeft}>
              <Ionicons name="key-outline" size={20} color="#111827" />
              <Text style={styles.rowTitle}>Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.rowInline}>
            <View style={styles.rowLeft}>
              <Ionicons name="finger-print-outline" size={20} color="#111827" />
              <Text style={styles.rowTitle}>Biometric Authentication</Text>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              thumbColor={biometricEnabled ? '#fff' : '#fff'}
              trackColor={{ false: '#D1D5DB', true: '#635EFC' }}
            />
          </View>

          <TouchableOpacity style={styles.row} onPress={() => {}}>
            <View style={styles.rowLeft}>
              <Ionicons name="phone-portrait-outline" size={20} color="#111827" />
              <Text style={styles.rowTitle}>Two-Factor Authentication</Text>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.statusBadge}>Enabled</Text>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Notifications */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="notifications" size={18} color="#635EFC" />
            <Text style={styles.sectionHeading}>Notifications</Text>
          </View>
          
          <View style={styles.rowInline}>
            <View style={styles.rowLeft}>
              <Ionicons name="notifications-outline" size={20} color="#111827" />
              <Text style={styles.rowTitle}>Push Notifications</Text>
            </View>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              thumbColor={pushEnabled ? '#fff' : '#fff'}
              trackColor={{ false: '#D1D5DB', true: '#635EFC' }}
            />
          </View>

          <View style={styles.rowInline}>
            <View style={styles.rowLeft}>
              <Ionicons name="mail-outline" size={20} color="#111827" />
              <Text style={styles.rowTitle}>Email Notifications</Text>
            </View>
            <Switch
              value={emailEnabled}
              onValueChange={setEmailEnabled}
              thumbColor={emailEnabled ? '#fff' : '#fff'}
              trackColor={{ false: '#D1D5DB', true: '#635EFC' }}
            />
          </View>

          <View style={styles.rowInline}>
            <View style={styles.rowLeft}>
              <Ionicons name="chatbubble-outline" size={20} color="#111827" />
              <Text style={styles.rowTitle}>SMS Notifications</Text>
            </View>
            <Switch
              value={smsEnabled}
              onValueChange={setSmsEnabled}
              thumbColor={smsEnabled ? '#fff' : '#fff'}
              trackColor={{ false: '#D1D5DB', true: '#635EFC' }}
            />
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="options" size={18} color="#635EFC" />
            <Text style={styles.sectionHeading}>Preferences</Text>
          </View>
          
          <View style={styles.rowInline}>
            <View style={styles.rowLeft}>
              <Ionicons name="moon-outline" size={20} color="#111827" />
              <Text style={styles.rowTitle}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              thumbColor={darkMode ? '#fff' : '#fff'}
              trackColor={{ false: '#D1D5DB', true: '#635EFC' }}
            />
          </View>

          <TouchableOpacity style={styles.row} onPress={() => {}}>
            <View style={styles.rowLeft}>
              <Ionicons name="language-outline" size={20} color="#111827" />
              <Text style={styles.rowTitle}>Language</Text>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.rowMeta}>English</Text>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={() => {}}>
            <View style={styles.rowLeft}>
              <Ionicons name="location-outline" size={20} color="#111827" />
              <Text style={styles.rowTitle}>Region</Text>
            </View>
            <View style={styles.rowRight}>
              <Text style={styles.rowMeta}>United States</Text>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Support & Legal */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="help-circle" size={18} color="#635EFC" />
            <Text style={styles.sectionHeading}>Support & Legal</Text>
          </View>
          
          <TouchableOpacity style={styles.row} onPress={() => {}}>
            <View style={styles.rowLeft}>
              <Ionicons name="help-buoy-outline" size={20} color="#111827" />
              <Text style={styles.rowTitle}>Help Center</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={() => {}}>
            <View style={styles.rowLeft}>
              <Ionicons name="chatbubbles-outline" size={20} color="#111827" />
              <Text style={styles.rowTitle}>Contact Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={() => {}}>
            <View style={styles.rowLeft}>
              <Ionicons name="document-text-outline" size={20} color="#111827" />
              <Text style={styles.rowTitle}>Privacy Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={() => {}}>
            <View style={styles.rowLeft}>
              <Ionicons name="reader-outline" size={20} color="#111827" />
              <Text style={styles.rowTitle}>Terms of Service</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle" size={18} color="#635EFC" />
            <Text style={styles.sectionHeading}>App Information</Text>
          </View>
          
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons name="code-slash-outline" size={20} color="#111827" />
              <Text style={styles.rowTitle}>Version</Text>
            </View>
            <Text style={styles.rowMeta}>1.0.0</Text>
          </View>

          <TouchableOpacity style={styles.row} onPress={() => {}}>
            <View style={styles.rowLeft}>
              <Ionicons name="star-outline" size={20} color="#111827" />
              <Text style={styles.rowTitle}>Rate App</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={() => {}}>
            <View style={styles.rowLeft}>
              <Ionicons name="share-outline" size={20} color="#111827" />
              <Text style={styles.rowTitle}>Share App</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Sign Out */}
        <View style={styles.sectionCard}>
          <TouchableOpacity style={styles.signOut} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  headerDecor: {
    paddingTop: 56,
    paddingBottom: 14,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 56,
    borderBottomRightRadius: 56,
    overflow: 'hidden',
  },
  headerTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconWrap: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  userPillWrap: { flexDirection: 'row', alignItems: 'center' },
  userPill: { backgroundColor: 'transparent' },
  pillHi: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  content: { paddingHorizontal: 20, marginTop: 18 },
  
  // Profile Card
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileDetails: { flex: 1 },
  profileName: { fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 2 },
  profileEmail: { fontSize: 14, color: '#6B7280' },
  editProfileBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Section Cards
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 16,
    color: '#111827',
    marginLeft: 8,
    fontWeight: '600',
  },
  
  // Rows
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  rowInline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  rowRight: { flexDirection: 'row', alignItems: 'center' },
  rowTitle: { marginLeft: 12, fontSize: 16, color: '#111827', flex: 1 },
  rowMeta: { fontSize: 14, color: '#6B7280', marginRight: 8 },
  
  // Status Badge
  statusBadge: {
    backgroundColor: '#D1FAE5',
    color: '#065F46',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  
  // Sign Out
  signOut: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  signOutText: {
    marginLeft: 8,
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SettingsScreen;