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
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const NotificationsScreen = () => {
  const [selectedTab, setSelectedTab] = useState('All');
  const navigation = useNavigation();

  const tabs = ['All', 'Events', 'Habits', 'News'];

  const todayNotifications = [
    {
      id: 1,
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: "You've saved 50 plastic bottles this month!",
      time: '2 hours ago',
      isNew: true,
    },
    {
      id: 2,
      type: 'event',
      title: 'Beach Cleanup Tomorrow!',
      message: 'Galle Face cleanup starts at 8.00 AM',
      time: '5 hours ago',
      isNew: false,
    },
    {
      id: 3,
      type: 'fact',
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
      title: 'Community Milestone!',
      message: 'Save the sea community reached 1,000 members!',
      time: '1 day ago',
      isNew: false,
    },
    {
      id: 5,
      type: 'report',
      title: 'Weekly Impact Report',
      message: 'Your actions saved 12 bottles and 3kg CO2 this week!',
      time: '1 day ago',
      isNew: false,
    },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'achievement': return 'trophy-outline';
      case 'event': return 'calendar-outline';
      case 'fact': return 'information-circle-outline';
      case 'community': return 'people-outline';
      case 'report': return 'bar-chart-outline';
      default: return 'notifications-outline';
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

  const filterNotifications = (list, tab) => {
    if (tab === 'All') return list;
    // Map tabs to types; 'Events' -> 'event', 'Habits' currently map to 'achievement' (example), 'News' -> 'fact'
    const map = {
      Events: 'event',
      Habits: 'achievement',
      News: 'fact',
    };
    const type = map[tab];
    if (!type) return list;
    return list.filter((n) => n.type === type);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#171836" />

      {/* Decorative header to match other screens */}
      <LinearGradient colors={["#1A1A32", "#635EFC"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.headerDecor}>
        
        <View style={styles.headerTopRow}>
          {/* Back button on the left (replaces notification icon) */}
          <TouchableOpacity style={styles.iconWrap} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={18} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Center user pill (matches other screens) */}
          <View style={styles.userPillWrap}>
            <View style={styles.userPill}>
              <Text style={styles.pillHi}>Hi ,<Text style={styles.pillName}> Yenula</Text></Text>
              <Text style={styles.pillEmail}>yenula123@gmail.com</Text>
            </View>
            <View style={styles.avatarCircle}>
              <Ionicons name="person-outline" size={18} color="#FFFFFF" />
            </View>
          </View>

          {/* Settings icon on the right */}
          <TouchableOpacity style={styles.iconWrap} onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={18} color="#FFFFFF" />
          </TouchableOpacity>
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
      </LinearGradient>

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
          
          {(() => {
            const filteredToday = filterNotifications(todayNotifications, selectedTab);
            if (filteredToday.length === 0) {
              return (
                <View style={{ paddingVertical: 20 }}>
                  <Text style={{ textAlign: 'center', color: '#6B7280' }}>No notifications</Text>
                </View>
              );
            }

            return filteredToday.map((notification) => (
            <View key={notification.id} style={styles.notificationCard}>
              <View style={[styles.notificationIcon, { backgroundColor: getNotificationColor(notification.type) + '20' }]}>
           <Ionicons name={getNotificationIcon(notification.type)} size={18} color={getNotificationColor(notification.type)} />
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

                <View style={styles.notificationFooterRow}>
                  <Text style={styles.notificationTime}>{notification.time}</Text>

                  <View style={styles.notificationActionsInline}>
                    <TouchableOpacity style={styles.dismissButton}>
                      <Text style={styles.dismissText}>Dismiss</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.viewButton}>
                      <Text style={styles.viewButtonText}>View</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            ));
          })()}
        </View>

        {/* Yesterday Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Yesterday Notifications</Text>
          
          {(() => {
            const filteredYesterday = filterNotifications(yesterdayNotifications, selectedTab);
            if (filteredYesterday.length === 0) {
              return null;
            }
            return filteredYesterday.map((notification) => (
            <View key={notification.id} style={styles.notificationCard}>
              <View style={[styles.notificationIcon, { backgroundColor: getNotificationColor(notification.type) + '20' }]}>
           <Ionicons name={getNotificationIcon(notification.type)} size={18} color={getNotificationColor(notification.type)} />
              </View>
              
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationMessage}>{notification.message}</Text>

                <View style={styles.notificationFooterRow}>
                  <Text style={styles.notificationTime}>{notification.time}</Text>

                  <View style={styles.notificationActionsInline}>
                    <TouchableOpacity style={styles.dismissButton}>
                      <Text style={styles.dismissText}>Dismiss</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.viewButton}>
                      <Text style={styles.viewButtonText}>View</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            ));
          })()}
        </View>

        {/* Settings Card removed as requested */}
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
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
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
    color: '#959595ff',
    fontWeight: '500',
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
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
  notificationContent: {
    flex: 1,
    marginRight: 8,
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
    backgroundColor: '#5B5CF6',
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
  notificationFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  notificationActionsInline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  dismissButton: {
    marginRight: 12,
    paddingVertical: 6,
  },
  dismissText: {
    fontSize: 14,
    color: '#6B7280',
  },
  viewButton: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  viewButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  // settings styles removed because the settings card was deleted
});

export default NotificationsScreen;