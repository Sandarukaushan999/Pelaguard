import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AllocationScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [lastReturnAt, setLastReturnAt] = useState('');
  const [items, setItems] = useState([
    {
      id: '1',
      productName: 'Fresh Milk 1L',
      allocated: 150,
      sold: 120,
      free: 4,
      returns: 5,
      unit: 'bottles',
    },
    {
      id: '2',
      productName: 'Yogurt 500g',
      allocated: 100,
      sold: 85,
      free: 2,
      returns: 3,
      unit: 'packs',
    },
    {
      id: '3',
      productName: 'Cheese 250g',
      allocated: 80,
      sold: 62,
      free: 2,
      returns: 4,
      unit: 'packs',
    },
    {
      id: '4',
      productName: 'Butter 200g',
      allocated: 60,
      sold: 48,
      free: 1,
      returns: 2,
      unit: 'packs',
    },
  ]);

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const normalizeItem = (item) => {
    const allocated = Math.max(0, item.allocated || 0);
    const sold = clamp(item.sold || 0, 0, allocated);
    const free = clamp(item.free || 0, 0, allocated - sold);
    const returns = clamp(item.returns || 0, 0, allocated - sold - free);
    return { ...item, allocated, sold, free, returns };
  };

  const remainingFor = (item) =>
    Math.max(0, item.allocated - item.sold - item.free - item.returns);

  const totals = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        const remaining = remainingFor(item);
        acc.allocated += item.allocated;
        acc.sold += item.sold;
        acc.free += item.free;
        acc.returns += item.returns;
        acc.remaining += remaining;
        return acc;
      },
      { allocated: 0, sold: 0, free: 0, returns: 0, remaining: 0 }
    );
  }, [items]);

  const updateItemField = (id, field, text) => {
    const value = parseInt(text, 10);
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const next = { ...item, [field]: Number.isFinite(value) ? value : 0 };
        return normalizeItem(next);
      })
    );
  };

  const handleReturnRemaining = () => {
    Alert.alert('Return Remaining', 'Return remaining items to admin?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Return',
        onPress: () => {
          setItems((prev) =>
            prev.map((item) => {
              const remaining = remainingFor(item);
              return normalizeItem({ ...item, returns: item.returns + remaining });
            })
          );
          setLastReturnAt(new Date().toLocaleString());
        },
      },
    ]);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1220" />

      <LinearGradient colors={["#0B1220", "#1E293B"]} style={styles.header}>
        <Text style={styles.headerTitle}>Allocation</Text>
        <Text style={styles.headerSubtitle}>Allocated items, free & returns</Text>
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
          <View style={[styles.statCard, styles.statPurple]}>
            <Text style={styles.statValue}>{totals.free + totals.returns}</Text>
            <Text style={styles.statLabel}>Free + Returns</Text>
          </View>
          <View style={[styles.statCard, styles.statOrange]}>
            <Text style={styles.statValue}>{totals.remaining}</Text>
            <Text style={styles.statLabel}>Remaining</Text>
          </View>
        </View>

        <View style={styles.tableCard}>
          <View style={styles.tableHeader}>
            <Text style={styles.sectionTitle}>Allocated Items Table</Text>
            <Text style={styles.sectionHint}>{items.length} items</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              <View style={styles.tableHeaderRow}>
                <Text style={[styles.tableHeaderCell, styles.cellProduct]}>Product</Text>
                <Text style={styles.tableHeaderCell}>Alloc</Text>
                <Text style={styles.tableHeaderCell}>Sold</Text>
                <Text style={styles.tableHeaderCell}>Free</Text>
                <Text style={styles.tableHeaderCell}>Returns</Text>
                <Text style={[styles.tableHeaderCell, styles.cellRemaining]}>Remain</Text>
              </View>

              {items.map((item) => (
                <View key={item.id} style={styles.tableRow}>
                  <View style={[styles.tableCell, styles.cellProduct]}>
                    <Text style={styles.productName}>{item.productName}</Text>
                    <Text style={styles.productUnit}>{item.unit}</Text>
                  </View>
                  <Text style={styles.tableCell}>{item.allocated}</Text>
                  <Text style={styles.tableCell}>{item.sold}</Text>
                  <TextInput
                    style={[styles.tableCell, styles.tableInput]}
                    value={String(item.free)}
                    onChangeText={(text) => updateItemField(item.id, 'free', text)}
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={[styles.tableCell, styles.tableInput]}
                    value={String(item.returns)}
                    onChangeText={(text) => updateItemField(item.id, 'returns', text)}
                    keyboardType="numeric"
                  />
                  <Text style={[styles.tableCell, styles.cellRemaining]}>
                    {remainingFor(item)}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {lastReturnAt ? (
          <Text style={styles.returnedNote}>Last returned to admin: {lastReturnAt}</Text>
        ) : null}

        <TouchableOpacity style={styles.returnButton} onPress={handleReturnRemaining}>
          <MaterialCommunityIcons name="truck-fast-outline" size={20} color="#FFFFFF" />
          <Text style={styles.returnButtonText}>Return Remaining to Admin</Text>
        </TouchableOpacity>

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
  content: { flex: 1 },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
    marginHorizontal: 20,
  },
  statCard: {
    flexGrow: 1,
    flexBasis: '47%',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
  },
  statValue: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  statLabel: { color: '#E2E8F0', fontSize: 11, marginTop: 4 },
  statBlue: { backgroundColor: '#2563EB' },
  statGreen: { backgroundColor: '#16A34A' },
  statPurple: { backgroundColor: '#7C3AED' },
  statOrange: { backgroundColor: '#F97316' },
  tableCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 18,
    borderRadius: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  sectionHint: { fontSize: 12, color: '#64748B' },
  tableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tableHeaderCell: {
    width: 80,
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  tableCell: {
    width: 80,
    fontSize: 13,
    color: '#0F172A',
  },
  tableInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 4,
    textAlign: 'center',
  },
  cellProduct: { width: 170 },
  cellRemaining: { width: 90, fontWeight: '700', color: '#2563EB' },
  productName: { fontSize: 13, fontWeight: '700', color: '#0F172A' },
  productUnit: { fontSize: 11, color: '#64748B', marginTop: 2 },
  returnedNote: {
    marginTop: 12,
    marginHorizontal: 20,
    fontSize: 12,
    color: '#64748B',
  },
  returnButton: {
    marginTop: 12,
    marginHorizontal: 20,
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  returnButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
});

export default AllocationScreen;
