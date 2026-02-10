import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TextInput,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SalesScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');

  const mockSales = [
    {
      id: '1',
      invoiceNo: 'INV-2026-021',
      shopName: 'Lakshan Shop',
      dateTime: '2026-02-10 09:15 AM',
      items: [
        { name: 'Strawberry Ice', qty: 5, unit: 'bundle', price: 400 },
        { name: 'Fresh Milk 1L', qty: 10, unit: 'bottles', price: 320 },
      ],
      total: 5200,
      cash: 2000,
      cheque: 1000,
    },
    {
      id: '2',
      invoiceNo: 'INV-2026-022',
      shopName: 'Dairy Mart',
      dateTime: '2026-02-10 10:05 AM',
      items: [
        { name: 'Yogurt 500g', qty: 8, unit: 'packs', price: 270 },
        { name: 'Butter 200g', qty: 4, unit: 'packs', price: 350 },
      ],
      total: 3560,
      cash: 3560,
      cheque: 0,
    },
    {
      id: '3',
      invoiceNo: 'INV-2026-023',
      shopName: 'Fresh Milk Center',
      dateTime: '2026-02-10 11:20 AM',
      items: [
        { name: 'Cheese 250g', qty: 6, unit: 'packs', price: 450 },
      ],
      total: 2700,
      cash: 0,
      cheque: 0,
    },
    {
      id: '4',
      invoiceNo: 'INV-2026-024',
      shopName: 'City Groceries',
      dateTime: '2026-02-10 01:10 PM',
      items: [
        { name: 'Fresh Milk 1L', qty: 12, unit: 'bottles', price: 320 },
        { name: 'Yogurt 500g', qty: 6, unit: 'packs', price: 270 },
      ],
      total: 5700,
      cash: 2000,
      cheque: 1500,
    },
  ];

  const formatCurrency = (amount) => `Rs. ${Number(amount || 0).toFixed(2)}`;

  const buildItemsText = (items) =>
    items
      .map((item) => {
        const lineTotal = item.qty * item.price;
        return `${item.name} ${item.qty} ${item.unit} - ${item.price}*${item.qty}  ${lineTotal}`;
      })
      .join('\n');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return mockSales;
    return mockSales.filter((sale) => {
      const itemHit = sale.items.some((item) =>
        item.name.toLowerCase().includes(q)
      );
      return (
        sale.invoiceNo.toLowerCase().includes(q) ||
        sale.shopName.toLowerCase().includes(q) ||
        itemHit
      );
    });
  }, [search]);

  const totals = useMemo(() => {
    return filtered.reduce(
      (acc, sale) => {
        acc.total += sale.total;
        acc.cash += sale.cash;
        acc.cheque += sale.cheque;
        acc.outstanding += Math.max(0, sale.total - sale.cash - sale.cheque);
        return acc;
      },
      { total: 0, cash: 0, cheque: 0, outstanding: 0 }
    );
  }, [filtered]);

  const statusFor = (sale) => {
    const paid = (sale.cash || 0) + (sale.cheque || 0);
    const balance = Math.max(0, sale.total - paid);
    if (balance <= 0) return 'paid';
    if (paid > 0) return 'partial';
    return 'pending';
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1220" />

      <LinearGradient colors={["#0B1220", "#1F2937"]} style={styles.header}>
        <Text style={styles.headerTitle}>Sales Report</Text>
        <Text style={styles.headerSubtitle}>Invoice, items, and payments</Text>

        <View style={styles.searchBox}>
          <MaterialCommunityIcons name="magnify" size={18} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search invoice, shop, or item..."
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
            <Text style={styles.statValue}>{formatCurrency(totals.total)}</Text>
          </View>
          <View style={[styles.statCard, styles.statGreen]}>
            <Text style={styles.statLabel}>Cash</Text>
            <Text style={styles.statValue}>{formatCurrency(totals.cash)}</Text>
          </View>
          <View style={[styles.statCard, styles.statPurple]}>
            <Text style={styles.statLabel}>Cheque</Text>
            <Text style={styles.statValue}>{formatCurrency(totals.cheque)}</Text>
          </View>
          <View style={[styles.statCard, styles.statOrange]}>
            <Text style={styles.statLabel}>Outstanding</Text>
            <Text style={styles.statValue}>{formatCurrency(totals.outstanding)}</Text>
          </View>
        </View>

        <View style={styles.tableCard}>
          <View style={styles.tableHeader}>
            <Text style={styles.sectionTitle}>Sales Details</Text>
            <Text style={styles.sectionHint}>{filtered.length} invoices</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              <View style={styles.tableHeaderRow}>
                <Text style={[styles.tableHeaderCell, styles.cellInvoice]}>Inv #</Text>
                <Text style={[styles.tableHeaderCell, styles.cellShop]}>Shop</Text>
                <Text style={[styles.tableHeaderCell, styles.cellDate]}>Date & Time</Text>
                <Text style={[styles.tableHeaderCell, styles.cellItems]}>Items</Text>
                <Text style={styles.tableHeaderCell}>Total</Text>
                <Text style={styles.tableHeaderCell}>Cash</Text>
                <Text style={styles.tableHeaderCell}>Cheque</Text>
                <Text style={styles.tableHeaderCell}>Outstanding</Text>
                <Text style={[styles.tableHeaderCell, styles.cellStatus]}>Status</Text>
              </View>

              {filtered.map((sale) => {
                const paid = (sale.cash || 0) + (sale.cheque || 0);
                const balance = Math.max(0, sale.total - paid);
                const status = statusFor(sale);
                return (
                  <View key={sale.id} style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.cellInvoice]}>{sale.invoiceNo}</Text>
                    <Text style={[styles.tableCell, styles.cellShop]}>{sale.shopName}</Text>
                    <Text style={[styles.tableCell, styles.cellDate]}>{sale.dateTime}</Text>
                    <Text style={[styles.tableCell, styles.cellItems]}>{buildItemsText(sale.items)}</Text>
                    <Text style={styles.tableCell}>{formatCurrency(sale.total)}</Text>
                    <Text style={styles.tableCell}>{formatCurrency(sale.cash)}</Text>
                    <Text style={styles.tableCell}>{formatCurrency(sale.cheque)}</Text>
                    <Text style={styles.tableCell}>{formatCurrency(balance)}</Text>
                    <View style={[styles.statusBadge, styles[`status${status}`]]}>
                      <Text style={styles.statusText}>{status.toUpperCase()}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>

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
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
    marginHorizontal: 20,
  },
  statCard: { flexGrow: 1, flexBasis: '47%', borderRadius: 14, padding: 12 },
  statLabel: { color: '#E2E8F0', fontSize: 11 },
  statValue: { color: '#FFFFFF', fontSize: 14, fontWeight: '800', marginTop: 4 },
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
    width: 110,
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  tableCell: {
    width: 110,
    fontSize: 13,
    color: '#0F172A',
    lineHeight: 18,
  },
  cellInvoice: { width: 120, fontWeight: '700' },
  cellShop: { width: 170 },
  cellDate: { width: 150 },
  cellItems: { width: 280 },
  cellStatus: { width: 110 },
  statusBadge: {
    width: 110,
    paddingVertical: 4,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 2,
  },
  statusText: { fontSize: 10, fontWeight: '700', color: '#FFFFFF' },
  statuspaid: { backgroundColor: '#16A34A' },
  statuspartial: { backgroundColor: '#F59E0B' },
  statuspending: { backgroundColor: '#EF4444' },
});

export default SalesScreen;
