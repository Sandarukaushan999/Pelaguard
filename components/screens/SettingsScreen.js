import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [glassModeEnabled, setGlassModeEnabled] = useState(false);

  const isDark = darkModeEnabled;
  const isGlass = glassModeEnabled;

  const handleLogout = () => {
    Alert.alert('Logout', 'Do you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive' },
    ]);
  };

  const SettingRow = ({ icon, title, subtitle, right }) => (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <View style={styles.iconWrap}>
          <Ionicons name={icon} size={20} color="#2563EB" />
        </View>
        <View style={styles.rowText}>
          <Text style={[styles.rowTitle, isDark && styles.rowTitleDark]}>{title}</Text>
          {subtitle ? (
            <Text style={[styles.rowSubtitle, isDark && styles.rowSubtitleDark]}>{subtitle}</Text>
          ) : null}
        </View>
      </View>
      {right}
    </View>
  );

  const SectionHeader = ({ title }) => (
    <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>{title}</Text>
  );

  const cardStyle = [
    styles.card,
    isDark && styles.cardDark,
    isGlass && (isDark ? styles.cardGlassDark : styles.cardGlassLight),
  ];

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <StatusBar barStyle="light-content" backgroundColor="#171836" />

      <LinearGradient
        colors={["#0B1220", "#1E293B"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerTopRow}>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>Settings</Text>
            <Text style={styles.headerSubtitle}>System preferences</Text>
          </View>
          <MaterialCommunityIcons name="cog" size={26} color="#FFFFFF" />
        </View>

        <View style={[styles.profileCard, isGlass && styles.profileCardGlass]}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={22} color="#FFFFFF" />
          </View>
          <View style={styles.profileText}>
            <Text style={styles.profileName}>Salesperson</Text>
            <Text style={styles.profileRole}>Lakshan Products</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <SectionHeader title="Account" />
        <View style={cardStyle}>
          <SettingRow
            icon="person-circle-outline"
            title="Profile"
            subtitle="Update your details"
            right={<Ionicons name="chevron-forward" size={20} color="#9CA3AF" />}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="lock-closed-outline"
            title="Change Password"
            subtitle="Update your password"
            right={<Ionicons name="chevron-forward" size={20} color="#9CA3AF" />}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="shield-checkmark-outline"
            title="Biometric Login"
            subtitle="Use fingerprint or face"
            right={
              <Switch
                value={biometricEnabled}
                onValueChange={setBiometricEnabled}
                trackColor={{ false: '#E5E7EB', true: '#93C5FD' }}
                thumbColor={biometricEnabled ? '#2563EB' : '#F3F4F6'}
              />
            }
          />
        </View>

        <SectionHeader title="Appearance" />
        <View style={cardStyle}>
          <SettingRow
            icon="moon-outline"
            title="Dark Mode"
            subtitle="Reduce glare in low light"
            right={
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: '#E5E7EB', true: '#93C5FD' }}
                thumbColor={darkModeEnabled ? '#2563EB' : '#F3F4F6'}
              />
            }
          />
          <View style={styles.divider} />
          <SettingRow
            icon="sparkles-outline"
            title="Glass Effect"
            subtitle="Translucent cards & panels"
            right={
              <Switch
                value={glassModeEnabled}
                onValueChange={setGlassModeEnabled}
                trackColor={{ false: '#E5E7EB', true: '#93C5FD' }}
                thumbColor={glassModeEnabled ? '#2563EB' : '#F3F4F6'}
              />
            }
          />
        </View>

        <SectionHeader title="App Settings" />
        <View style={cardStyle}>
          <SettingRow
            icon="notifications-outline"
            title="Notifications"
            subtitle="Sales & payment alerts"
            right={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#E5E7EB', true: '#93C5FD' }}
                thumbColor={notificationsEnabled ? '#2563EB' : '#F3F4F6'}
              />
            }
          />
          <View style={styles.divider} />
          <SettingRow
            icon="location-outline"
            title="Location Services"
            subtitle="Route tracking"
            right={
              <Switch
                value={locationEnabled}
                onValueChange={setLocationEnabled}
                trackColor={{ false: '#E5E7EB', true: '#93C5FD' }}
                thumbColor={locationEnabled ? '#2563EB' : '#F3F4F6'}
              />
            }
          />
          <View style={styles.divider} />
          <SettingRow
            icon="sync-outline"
            title="Auto Sync"
            subtitle="Sync data automatically"
            right={
              <Switch
                value={autoSyncEnabled}
                onValueChange={setAutoSyncEnabled}
                trackColor={{ false: '#E5E7EB', true: '#93C5FD' }}
                thumbColor={autoSyncEnabled ? '#2563EB' : '#F3F4F6'}
              />
            }
          />
          <View style={styles.divider} />
          <SettingRow
            icon="language-outline"
            title="Language"
            subtitle="English"
            right={<Ionicons name="chevron-forward" size={20} color="#9CA3AF" />}
          />
        </View>

        <SectionHeader title="System" />
        <View style={cardStyle}>
          <SettingRow
            icon="document-text-outline"
            title="Terms & Privacy"
            subtitle="Policies and permissions"
            right={<Ionicons name="chevron-forward" size={20} color="#9CA3AF" />}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="help-circle-outline"
            title="Help & Support"
            subtitle="Contact or FAQs"
            right={<Ionicons name="chevron-forward" size={20} color="#9CA3AF" />}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="information-circle-outline"
            title="About"
            subtitle="App version 1.0.0"
            right={<Ionicons name="chevron-forward" size={20} color="#9CA3AF" />}
          />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  containerDark: {
    backgroundColor: '#0B1220',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitleWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#CBD5F5',
    marginTop: 2,
  },
  profileCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileCardGlass: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    flex: 1,
    marginLeft: 12,
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  profileRole: {
    color: '#E5E7EB',
    fontSize: 12,
    marginTop: 2,
  },
  editButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#2563EB',
    fontWeight: '600',
    fontSize: 12,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    marginTop: 16,
    marginHorizontal: 20,
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionTitleDark: {
    color: '#94A3B8',
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  cardDark: {
    backgroundColor: '#0F172A',
  },
  cardGlassDark: {
    backgroundColor: 'rgba(15,23,42,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  cardGlassLight: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: {
    marginLeft: 12,
    flex: 1,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  rowTitleDark: {
    color: '#F8FAFC',
  },
  rowSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  rowSubtitleDark: {
    color: '#CBD5F5',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  logoutButton: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  bottomSpacer: {
    height: 40,
  },
});

export default SettingsScreen;
