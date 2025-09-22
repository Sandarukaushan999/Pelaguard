import React, { useState } from 'react';
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

const NotificationsScreen = () => {
  const [selectedTab, setSelectedTab] = useState('All');

  const tabs = ['All', 'Events', 'Habits', 'News'];

  const todayNotifications = [
    {
      id: 1,
      type: 'achievement',
      icon: '🏆',
      title: 'Achievement Unlocked!',
      message: "You've saved 50 plastic bottles this month!",
      time: '2 hours ago',
      isNew: true,
    },
    {
      id: 2,
      type: 'event',
      icon: '🧹',
      title: 'Beach Cleanup Tomorrow!',
      message: 'Galle Face cleanup starts at 8.00 AM',
      time: '5 hours ago',
      isNew: false,
    },
    {
      id: 3,
      type: 'fact',
      icon: '🌊',
      title: 'Ocean Fact of the Day',
      message: "Did you know? Oceans produce 70% of Earth's oxygen!",
      time: '12 hours ago',
      isNew: false,
    },
  ];

  const yesterdayNotifications = [
    {
      id: 4,
      type: 'community',
      icon: '👥',
      title: 'Community Milestone!',
      message: 'Save the sea community reached 1,000 members!',
      time: '1 day ago',
      isNew: false,
    },
    {
      id: 5,
      type: 'report',
      icon: '📊',
      title: 'Weekly Impact Report',
      message: 'Your actions saved 12 bottles and 3kg CO2 this week!',
      time: '1 day ago',
      isNew: false,
    },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'achievement': return '🏆';
      case 'event': return '🧹';
      case 'fact': return '🌊';
      case 'community': return '👥';
      case 'report': return '📊';
      default: return '🔔';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'achievement': return '#10B981';
      case 'event': return '#8B5CF6';
      case 'fact': return '#6B7280';
      case 'community': return '#6B7280';
      case 'report': return '#10B981';
      default: return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#171836" />

      {/* Decorative header to match other screens */}
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

        {/* Tabs inside header as a rounded group */}
        <View style={styles.tabsBar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tabPill, selectedTab === tab && styles.tabPillActive]}
                onPress={() => setSelectedTab(tab)}
              >
                <Text style={[styles.tabPillText, selectedTab === tab && styles.tabPillTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Tabs moved into header */}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Today Notifications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today Notifications</Text>
            <TouchableOpacity>
              <Text style={styles.markAllText}>Mark all read</Text>
            </TouchableOpacity>
          </View>
          
          {todayNotifications.map((notification) => (
            <View key={notification.id} style={styles.notificationCard}>
              <View style={[styles.notificationIcon, { backgroundColor: getNotificationColor(notification.type) + '20' }]}>
                <Text style={styles.notificationIconText}>{notification.icon}</Text>
              </View>
              
              <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  {notification.isNew && (
                    <View style={styles.newBadge}>
                      <Text style={styles.newBadgeText}>New</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
              
              <View style={styles.notificationActions}>
                <TouchableOpacity style={styles.dismissButton}>
                  <Text style={styles.dismissText}>Dismiss</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Yesterday Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Yesterday Notifications</Text>
          
          {yesterdayNotifications.map((notification) => (
            <View key={notification.id} style={styles.notificationCard}>
              <View style={[styles.notificationIcon, { backgroundColor: getNotificationColor(notification.type) + '20' }]}>
                <Text style={styles.notificationIconText}>{notification.icon}</Text>
              </View>
              
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
              
              <View style={styles.notificationActions}>
                <TouchableOpacity style={styles.dismissButton}>
                  <Text style={styles.dismissText}>Dismiss</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Settings Card */}
        <View style={styles.settingsCard}>
          <View style={styles.settingsIcon}>
            <Text style={styles.settingsIconText}>⚙️</Text>
          </View>
          <View style={styles.settingsContent}>
            <Text style={styles.settingsTitle}>Notification Setting</Text>
            <Text style={styles.settingsSubtitle}>Manage your preferences</Text>
          </View>
          <Text style={styles.settingsArrow}>›</Text>
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
    paddingBottom: 24,
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
  tabsBar: {
    marginTop: 16,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 22,
    padding: 6,
  },
  tabPill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 18,
    marginRight: 8,
  },
  tabPillActive: {
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  tabPillText: {
    fontSize: 13,
    color: '#F3F4F6',
    fontWeight: '600',
  },
  tabPillTextActive: {
    color: '#111827',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  markAllText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    position: 'relative',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationIconText: {
    fontSize: 20,
  },
  notificationContent: {
    flex: 1,
    marginRight: 12,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  newBadge: {
    position: 'absolute',
    top: -10,
    right: 16,
    backgroundColor: '#7C3AED',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  notificationActions: {
    alignItems: 'flex-end',
  },
  dismissButton: {
    marginBottom: 8,
  },
  dismissText: {
    fontSize: 14,
    color: '#6B7280',
  },
  viewButton: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  viewButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  settingsCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#374151',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsIconText: {
    fontSize: 20,
  },
  settingsContent: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  settingsSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  settingsArrow: {
    fontSize: 20,
    color: '#6B7280',
  },
});

export default NotificationsScreen;