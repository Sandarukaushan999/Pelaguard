import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Sales = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');

  const mockSales = [
    { id: '1', shop: 'Lakshan Supermarket', date: '2024-01-15', total: 50000, paid: 37500, status: 'partial' },
    { id: '2', shop: 'Dairy Mart', date: '2024-01-14', total: 35600, paid: 35600, status: 'paid' },
    { id: '3', shop: 'Fresh Milk Center', date: '2024-01-13', total: 42000, paid: 0, status: 'pending' },
    { id: '4', shop: 'City Groceries', date: '2024-01-12', total: 28000, paid: 28000, status: 'paid' },
  ];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return mockSales;
    return mockSales.filter(s => s.shop.toLowerCase().includes(q));
  }, [search]);

  const stats = useMemo(() => {
    return filtered.reduce(
      (acc, s) => {
        acc.total += s.total;
        acc.paid += s.paid;
        acc.pending += Math.max(0, s.total - s.paid);
        return acc;
      },
      { total: 0, paid: 0, pending: 0 }
    );
  }, [filtered]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  const statusStyle = (status) => {
    if (status === 'paid') return styles.badgePaid;
    if (status === 'partial') return styles.badgePartial;
    return styles.badgePending;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1220" />

      <LinearGradient colors={["#0B1220", "#1F2937"]} style={styles.header}>
        <Text style={styles.headerTitle}>Sales</Text>
        <Text style={styles.headerSubtitle}>Revenue overview</Text>

        <View style={styles.searchBox}>
          <MaterialCommunityIcons name="magnify" size={18} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search shops..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsRow}>
          <View style={[styles.statCard, styles.statBlue]}>
            <Text style={styles.statLabel}>Total</Text>
            <Text style={styles.statValue}>Rs. {stats.total.toFixed(2)}</Text>
          </View>
          <View style={[styles.statCard, styles.statGreen]}>
            <Text style={styles.statLabel}>Paid</Text>
            <Text style={styles.statValue}>Rs. {stats.paid.toFixed(2)}</Text>
          </View>
          <View style={[styles.statCard, styles.statOrange]}>
            <Text style={styles.statLabel}>Pending</Text>
            <Text style={styles.statValue}>Rs. {stats.pending.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Sales</Text>
          <Text style={styles.sectionHint}>{filtered.length} bills</Text>
        </View>

        {filtered.map((s) => (
          <View key={s.id} style={styles.card}>
            <View style={styles.cardTop}>
              <View>
                <Text style={styles.cardTitle}>{s.shop}</Text>
                <Text style={styles.cardSubtitle}>{s.date}</Text>
              </View>
              <View style={[styles.badge, statusStyle(s.status)]}>
                <Text style={styles.badgeText}>{s.status.toUpperCase()}</Text>
              </View>
            </View>
            <View style={styles.amountRow}>
              <Text style={styles.amountLabel}>Total</Text>
              <Text style={styles.amountValue}>Rs. {s.total.toFixed(2)}</Text>
            </View>
            <View style={styles.amountRow}>
              <Text style={styles.amountLabel}>Paid</Text>
              <Text style={styles.amountValue}>Rs. {s.paid.toFixed(2)}</Text>
            </View>
            <View style={styles.amountRow}>
              <Text style={styles.amountLabel}>Pending</Text>
              <Text style={styles.amountValue}>Rs. {(s.total - s.paid).toFixed(2)}</Text>
            </View>
          </View>
        ))}

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9' },
  header: { paddingTop: 54, paddingHorizontal: 20, paddingBottom: 20 },
  headerTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: '800' },
  headerSubtitle: { color: '#CBD5F5', marginTop: 4, fontSize: 12 },
  searchBox: {
    marginTop: 16,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchInput: { color: '#FFFFFF', flex: 1, fontSize: 14 },
  content: { flex: 1 },
  statsRow: { flexDirection: 'row', gap: 12, marginTop: 16, marginHorizontal: 20 },
  statCard: { flex: 1, borderRadius: 14, padding: 12 },
  statLabel: { color: '#E2E8F0', fontSize: 11 },
  statValue: { color: '#FFFFFF', fontSize: 14, fontWeight: '800', marginTop: 4 },
  statBlue: { backgroundColor: '#2563EB' },
  statGreen: { backgroundColor: '#16A34A' },
  statOrange: { backgroundColor: '#F97316' },
  sectionHeader: {
    marginTop: 18,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  sectionHint: { fontSize: 12, color: '#64748B' },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  cardSubtitle: { fontSize: 12, color: '#64748B', marginTop: 2 },
  badge: { borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
  badgeText: { fontSize: 10, fontWeight: '700', color: '#FFFFFF' },
  badgePaid: { backgroundColor: '#16A34A' },
  badgePartial: { backgroundColor: '#F59E0B' },
  badgePending: { backgroundColor: '#EF4444' },
  amountRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  amountLabel: { color: '#64748B', fontSize: 12 },
  amountValue: { color: '#0F172A', fontWeight: '700', fontSize: 12 },
});

export default Sales;
