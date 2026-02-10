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
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const Expenses = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ category: '', amount: '', description: '' });

  const mockExpenses = [
    { id: '1', category: 'Fuel', amount: 5000, description: 'Vehicle fuel for sales route', date: '2024-01-15' },
    { id: '2', category: 'Maintenance', amount: 12000, description: 'Vehicle service and repair', date: '2024-01-12' },
    { id: '3', category: 'Meal', amount: 1500, description: 'Lunch during route', date: '2024-01-10' },
    { id: '4', category: 'Tolls', amount: 700, description: 'Highway tolls', date: '2024-01-08' },
  ];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return mockExpenses;
    return mockExpenses.filter(e =>
      e.category.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q)
    );
  }, [search]);

  const total = useMemo(() => filtered.reduce((sum, e) => sum + e.amount, 0), [filtered]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1220" />

      <LinearGradient colors={["#0B1220", "#0F172A"]} style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Expenses</Text>
            <Text style={styles.headerSubtitle}>Track daily costs</Text>
          </View>
          <TouchableOpacity style={styles.addBtn} onPress={() => setShowModal(true)}>
            <Ionicons name="add" size={20} color="#0F172A" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBox}>
          <MaterialCommunityIcons name="magnify" size={18} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search expenses..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Expenses</Text>
          <Text style={styles.totalValue}>Rs. {total.toFixed(2)}</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Expenses</Text>
          <Text style={styles.sectionHint}>{filtered.length} items</Text>
        </View>

        {filtered.map((e) => (
          <View key={e.id} style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{e.category}</Text>
              </View>
              <Text style={styles.amount}>Rs. {e.amount.toFixed(2)}</Text>
            </View>
            <Text style={styles.desc}>{e.description}</Text>
            <Text style={styles.date}>{e.date}</Text>
          </View>
        ))}

        <View style={{ height: 24 }} />
      </ScrollView>

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Expense</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Ionicons name="close" size={22} color="#64748B" />
              </TouchableOpacity>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Category</Text>
              <TextInput
                style={styles.formInput}
                value={form.category}
                onChangeText={(v) => setForm({ ...form, category: v })}
                placeholder="Fuel / Maintenance"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Amount</Text>
              <TextInput
                style={styles.formInput}
                value={form.amount}
                onChangeText={(v) => setForm({ ...form, amount: v })}
                keyboardType="numeric"
                placeholder="0"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Description</Text>
              <TextInput
                style={[styles.formInput, styles.textArea]}
                value={form.description}
                onChangeText={(v) => setForm({ ...form, description: v })}
                placeholder="Optional note"
                multiline
              />
            </View>
            <TouchableOpacity style={styles.saveBtn} onPress={() => setShowModal(false)}>
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9' },
  header: { paddingTop: 54, paddingHorizontal: 20, paddingBottom: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: '800' },
  headerSubtitle: { color: '#CBD5F5', marginTop: 4, fontSize: 12 },
  addBtn: {
    backgroundColor: '#FFFFFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  totalCard: {
    marginTop: 14,
    backgroundColor: '#0EA5E9',
    borderRadius: 14,
    padding: 14,
  },
  totalLabel: { color: '#E0F2FE', fontSize: 12 },
  totalValue: { color: '#FFFFFF', fontSize: 20, fontWeight: '800', marginTop: 4 },
  content: { flex: 1 },
  sectionHeader: {
    marginTop: 16,
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
  badge: { backgroundColor: '#E0E7FF', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
  badgeText: { color: '#4338CA', fontSize: 11, fontWeight: '700' },
  amount: { color: '#0F172A', fontWeight: '800' },
  desc: { color: '#334155', marginTop: 6, fontSize: 13 },
  date: { color: '#94A3B8', marginTop: 6, fontSize: 11 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 20 },
  modalCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  modalTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  formGroup: { marginTop: 10 },
  formLabel: { fontSize: 12, color: '#64748B', marginBottom: 6 },
  formInput: { backgroundColor: '#F8FAFC', borderRadius: 10, padding: 10, color: '#0F172A' },
  textArea: { height: 80, textAlignVertical: 'top' },
  saveBtn: { marginTop: 14, backgroundColor: '#2563EB', paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  saveBtnText: { color: '#FFFFFF', fontWeight: '700' },
});

export default Expenses;
