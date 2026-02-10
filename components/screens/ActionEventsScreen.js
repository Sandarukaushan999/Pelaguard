import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AllocatedProducts = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');

  const mockProducts = [
    {
      product_id: '1',
      product_name: 'Fresh Milk 1L',
      category: 'Dairy',
      selling_price: 320,
      total_allocated: 150,
      sold_quantity: 120,
      returned_quantity: 5,
      remaining_stock: 25,
      unit: 'bottles',
    },
    {
      product_id: '2',
      product_name: 'Yogurt 500g',
      category: 'Dairy',
      selling_price: 270,
      total_allocated: 100,
      sold_quantity: 85,
      returned_quantity: 3,
      remaining_stock: 12,
      unit: 'packs',
    },
    {
      product_id: '3',
      product_name: 'Cheese 250g',
      category: 'Dairy',
      selling_price: 450,
      total_allocated: 80,
      sold_quantity: 62,
      returned_quantity: 4,
      remaining_stock: 14,
      unit: 'packs',
    },
    {
      product_id: '4',
      product_name: 'Butter 200g',
      category: 'Dairy',
      selling_price: 350,
      total_allocated: 60,
      sold_quantity: 48,
      returned_quantity: 2,
      remaining_stock: 10,
      unit: 'packs',
    },
  ];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return mockProducts;
    return mockProducts.filter(p =>
      p.product_name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }, [search]);

  const totals = useMemo(() => {
    return mockProducts.reduce(
      (acc, p) => {
        acc.allocated += p.total_allocated;
        acc.sold += p.sold_quantity;
        acc.remaining += p.remaining_stock;
        return acc;
      },
      { allocated: 0, sold: 0, remaining: 0 }
    );
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1220" />

      <LinearGradient colors={["#0B1220", "#1E293B"]} style={styles.header}>
        <Text style={styles.headerTitle}>Allocations</Text>
        <Text style={styles.headerSubtitle}>Daily stock overview</Text>

        <View style={styles.searchBox}>
          <MaterialCommunityIcons name="magnify" size={18} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
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
            <Text style={styles.statValue}>{totals.allocated}</Text>
            <Text style={styles.statLabel}>Allocated</Text>
          </View>
          <View style={[styles.statCard, styles.statGreen]}>
            <Text style={styles.statValue}>{totals.sold}</Text>
            <Text style={styles.statLabel}>Sold</Text>
          </View>
          <View style={[styles.statCard, styles.statOrange]}>
            <Text style={styles.statValue}>{totals.remaining}</Text>
            <Text style={styles.statLabel}>Remaining</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Allocated Products</Text>
          <Text style={styles.sectionHint}>{filtered.length} items</Text>
        </View>

        {filtered.map((p) => (
          <View key={p.product_id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardTitle}>{p.product_name}</Text>
                <Text style={styles.cardSubtitle}>{p.category} • {p.unit}</Text>
              </View>
              <View style={styles.priceChip}>
                <Text style={styles.priceText}>Rs. {p.selling_price}</Text>
              </View>
            </View>

            <View style={styles.metricRow}>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Allocated</Text>
                <Text style={styles.metricValue}>{p.total_allocated}</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Sold</Text>
                <Text style={styles.metricValue}>{p.sold_quantity}</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Returns</Text>
                <Text style={styles.metricValue}>{p.returned_quantity}</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Remaining</Text>
                <Text style={styles.metricValue}>{p.remaining_stock}</Text>
              </View>
            </View>

            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${Math.min(100, (p.sold_quantity / p.total_allocated) * 100)}%` }]} />
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
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    marginHorizontal: 20,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
  },
  statValue: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  statLabel: { color: '#E2E8F0', fontSize: 11, marginTop: 4 },
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
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  cardSubtitle: { fontSize: 12, color: '#64748B', marginTop: 2 },
  priceChip: { backgroundColor: '#EEF2FF', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  priceText: { color: '#4338CA', fontWeight: '700', fontSize: 12 },
  metricRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 12 },
  metricItem: { width: '47%' },
  metricLabel: { fontSize: 11, color: '#64748B' },
  metricValue: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginTop: 2 },
  progressTrack: { height: 6, backgroundColor: '#E2E8F0', borderRadius: 4, marginTop: 12 },
  progressFill: { height: 6, backgroundColor: '#2563EB', borderRadius: 4 },
});

export default AllocatedProducts;
