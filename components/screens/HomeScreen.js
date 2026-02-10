import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Modal,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { printReceipt, buildReceiptText } from '../../services/printer';

const { width, height } = Dimensions.get('window');
const ADMIN_CODE = '7777';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [showShopModal, setShowShopModal] = useState(false);
  const [showShopDetailsModal, setShowShopDetailsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [shopItems, setShopItems] = useState([]);
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [printPreviewText, setPrintPreviewText] = useState('');
  const [pendingBillData, setPendingBillData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [cashAmount, setCashAmount] = useState('');
  const [chequeAmount, setChequeAmount] = useState('');
  const [chequeNumber, setChequeNumber] = useState('');
  const [chequeBank, setChequeBank] = useState('');
  const [chequeExpiryDate, setChequeExpiryDate] = useState('');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [ongoingPayments, setOngoingPayments] = useState([]);

  const [shopForm, setShopForm] = useState({
    shopName: '',
    contact: '',
    address: '',
    latitude: null,
    longitude: null,
  });
  const [editingShopId, setEditingShopId] = useState(null);
  const [showAdminCodeModal, setShowAdminCodeModal] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [pendingAction, setPendingAction] = useState(null);

  const [showSettlementModal, setShowSettlementModal] = useState(false);
  const [settlementTarget, setSettlementTarget] = useState(null);
  const [settlementAmount, setSettlementAmount] = useState('');
  const [settlementMethod, setSettlementMethod] = useState('cash');

  const mockShops = [
    {
      id: '1',
      shopName: 'Lakshan Supermarket',
      contact: '0771234567',
      address: '123 Main Street, Colombo',
      latitude: 6.9271,
      longitude: 79.8612,
      paymentStatus: 'ongoing',
      pendingAmount: 12500,
    },
    {
      id: '2',
      shopName: 'Dairy Mart',
      contact: '0772345678',
      address: '456 Galle Road, Galle',
      latitude: 6.0535,
      longitude: 80.221,
      paymentStatus: 'paid',
      pendingAmount: 0,
    },
    {
      id: '3',
      shopName: 'Fresh Milk Center',
      contact: '0773456789',
      address: '789 Kandy Road, Kandy',
      latitude: 7.2906,
      longitude: 80.6337,
      paymentStatus: 'pending',
      pendingAmount: 8500,
    },
    {
      id: '4',
      shopName: 'City Groceries',
      contact: '0774567890',
      address: '321 Negombo Road, Negombo',
      latitude: 7.2093,
      longitude: 79.8385,
      paymentStatus: 'ongoing',
      pendingAmount: 15600,
    },
  ];

  const mockOngoingPayments = [
    {
      id: 'pay-1',
      shopId: '1',
      invoiceNo: 'INV-2026-001',
      shopName: 'Lakshan Supermarket',
      address: '123 Main Street, Colombo',
      totalAmount: 50000,
      totalPaid: 37500,
      remainingBalance: 12500,
      saleDate: '2026-02-08',
    },
    {
      id: 'pay-2',
      shopId: '4',
      invoiceNo: 'INV-2026-002',
      shopName: 'City Groceries',
      address: '321 Negombo Road, Negombo',
      totalAmount: 35600,
      totalPaid: 20000,
      remainingBalance: 15600,
      saleDate: '2026-02-07',
    },
  ];

  const mockShopItems = [
    {
      id: '1',
      productName: 'Fresh Milk 1L',
      quantity: 0,
      maxQuantity: 100,
      pricePerUnit: 300,
      inventoryPrice: 320,
      totalPrice: 0,
      returns: 0,
      freeItems: 0,
    },
    {
      id: '2',
      productName: 'Yogurt 500g',
      quantity: 0,
      maxQuantity: 80,
      pricePerUnit: 250,
      inventoryPrice: 270,
      totalPrice: 0,
      returns: 0,
      freeItems: 0,
    },
    {
      id: '3',
      productName: 'Cheese 250g',
      quantity: 0,
      maxQuantity: 60,
      pricePerUnit: 450,
      inventoryPrice: 500,
      totalPrice: 0,
      returns: 0,
      freeItems: 0,
    },
    {
      id: '4',
      productName: 'Butter 200g',
      quantity: 0,
      maxQuantity: 50,
      pricePerUnit: 350,
      inventoryPrice: 380,
      totalPrice: 0,
      returns: 0,
      freeItems: 0,
    },
  ];

  useEffect(() => {
    loadData();
    requestLocation();
  }, []);

  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      setFilteredShops(shops);
      return;
    }
    setFilteredShops(
      shops.filter(
        (shop) =>
          shop.shopName.toLowerCase().includes(q) ||
          shop.address.toLowerCase().includes(q)
      )
    );
  }, [searchQuery, shops]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
    setTimeout(() => setRefreshing(false), 800);
  };

  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      setShops(mockShops);
      setFilteredShops(mockShops);
      setOngoingPayments(mockOngoingPayments);
      setLoading(false);
    }, 800);
  };

  const requestLocation = () => {
    setTimeout(() => {
      setLocation({
        lat: 6.9271,
        lng: 79.8612,
      });
    }, 800);
  };

  const formatCurrency = (amount) => {
    if (amount == null || Number.isNaN(amount)) return 'Rs. 0.00';
    return `Rs. ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  };

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const getChargeableQty = (item) =>
    Math.max(0, (item.quantity || 0) - (item.freeItems || 0) - (item.returns || 0));

  const normalizeItem = (item) => {
    const maxQty = item.maxQuantity || 0;
    const quantity = clamp(item.quantity || 0, 0, maxQty);
    const freeItems = clamp(item.freeItems || 0, 0, quantity);
    const returns = clamp(item.returns || 0, 0, quantity - freeItems);
    const pricePerUnit = Math.max(0, item.pricePerUnit || 0);
    const chargeableQty = Math.max(0, quantity - freeItems - returns);
    return {
      ...item,
      quantity,
      freeItems,
      returns,
      pricePerUnit,
      totalPrice: chargeableQty * pricePerUnit,
    };
  };

  const updateItem = (itemId, updates) => {
    setShopItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? normalizeItem({ ...item, ...updates }) : item
      )
    );
  };

  const updateItemQuantity = (itemId, delta) => {
    setShopItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const nextQty = clamp((item.quantity || 0) + delta, 0, item.maxQuantity || 0);
        return normalizeItem({ ...item, quantity: nextQty });
      })
    );
  };

  const calculateSubtotal = () => {
    return shopItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
  };

  const getDefaultLocation = () => {
    if (location) return { latitude: location.lat, longitude: location.lng };
    return { latitude: 6.9271, longitude: 79.8612 };
  };

  const buildShopForm = (shop) => {
    const fallback = getDefaultLocation();
    return {
      shopName: shop?.shopName || '',
      contact: shop?.contact || '',
      address: shop?.address || '',
      latitude: shop?.latitude ?? fallback.latitude,
      longitude: shop?.longitude ?? fallback.longitude,
    };
  };

  const openAddShopModal = () => {
    setEditingShopId(null);
    setShopForm(buildShopForm());
    setShowShopModal(true);
  };

  const openEditShopModal = (shop) => {
    setEditingShopId(shop.id);
    setShopForm(buildShopForm(shop));
    setShowShopModal(true);
  };

  const handleSaveShop = () => {
    if (!shopForm.shopName.trim()) {
      Alert.alert('Missing Shop Name', 'Please enter a shop name.');
      return;
    }
    const base = editingShopId ? shops.find((s) => s.id === editingShopId) : null;
    const fallback = getDefaultLocation();
    const newShop = {
      id: base?.id || Date.now().toString(),
      shopName: shopForm.shopName.trim(),
      contact: shopForm.contact.trim(),
      address: shopForm.address.trim(),
      latitude: shopForm.latitude ?? fallback.latitude,
      longitude: shopForm.longitude ?? fallback.longitude,
      paymentStatus: base?.paymentStatus || 'paid',
      pendingAmount: base?.pendingAmount || 0,
    };

    const nextShops = editingShopId
      ? shops.map((s) => (s.id === editingShopId ? newShop : s))
      : [newShop, ...shops];

    setShops(nextShops);
    setShowShopModal(false);
    setEditingShopId(null);
  };

  const handleDeleteShop = (shop) => {
    Alert.alert('Delete Shop', `Remove ${shop.shopName}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setShops((prev) => prev.filter((s) => s.id !== shop.id));
          setOngoingPayments((prev) => prev.filter((p) => p.shopId !== shop.id));
        },
      },
    ]);
  };

  const requestProtectedAction = (action, shop) => {
    setPendingAction({ action, shop });
    setAdminCode('');
    setShowAdminCodeModal(true);
  };

  const confirmAdminCode = () => {
    if (adminCode !== ADMIN_CODE) {
      Alert.alert('Invalid Code', 'Use admin code 7777 to proceed.');
      return;
    }
    const action = pendingAction?.action;
    const shop = pendingAction?.shop;
    setShowAdminCodeModal(false);
    setPendingAction(null);

    if (!shop) return;
    if (action === 'edit') {
      openEditShopModal(shop);
    } else if (action === 'delete') {
      handleDeleteShop(shop);
    }
  };

  const handleUseMyLocation = () => {
    if (!location) {
      Alert.alert('Location', 'Location not available yet.');
      return;
    }
    setShopForm((prev) => ({
      ...prev,
      latitude: location.lat,
      longitude: location.lng,
    }));
  };

  const handleShopPress = (shop) => {
    setSelectedShop(shop);
    setShopItems(mockShopItems.map((item) => normalizeItem({ ...item })));
    setShowShopDetailsModal(true);
    setShowPaymentSection(false);
    setPaymentMethod('cash');
    setCashAmount('');
    setChequeAmount('');
    setChequeNumber('');
    setChequeBank('');
    setChequeExpiryDate('');
  };

  const getPaidAmount = () => {
    const cash = parseFloat(cashAmount) || 0;
    const cheque = parseFloat(chequeAmount) || 0;
    if (paymentMethod === 'cash') return cash;
    if (paymentMethod === 'cheque') return cheque;
    if (paymentMethod === 'split') return cash + cheque;
    if (paymentMethod === 'ongoing') return cash;
    return 0;
  };

  const syncShopPaymentStatus = (shopId, payments) => {
    if (!shopId) return;
    const pending = payments
      .filter((p) => p.shopId === shopId)
      .reduce((sum, p) => sum + p.remainingBalance, 0);
    setShops((prev) =>
      prev.map((shop) => {
        if (shop.id !== shopId) return shop;
        return {
          ...shop,
          pendingAmount: pending,
          paymentStatus: pending > 0 ? 'ongoing' : 'paid',
        };
      })
    );
  };

  const handleProcessPayment = async () => {
    if (!selectedShop) return;

    setProcessingPayment(true);
    try {
      const now = new Date();
      const subtotal = calculateSubtotal();
      const paidAmount = getPaidAmount();
      const billedItems = shopItems
        .map((item) => {
          const chargeableQty = getChargeableQty(item);
          return {
            ...item,
            quantity: chargeableQty,
            totalPrice: chargeableQty * (item.pricePerUnit || 0),
          };
        })
        .filter((item) => item.quantity > 0);

      const billData = {
        shop: selectedShop,
        items: billedItems,
        totals: {
          subtotal,
          discount: 0,
          grandTotal: subtotal,
        },
        invoiceNo: selectedShop?.id
          ? `INV-${selectedShop.id}-${now.getTime()}`
          : `INV-${now.getTime()}`,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        payment: {
          method: paymentMethod,
          paidAmount,
          balance: Math.max(0, subtotal - paidAmount),
          chequeNumber,
          chequeBank,
          chequeExpiryDate,
        },
      };

      const preview = buildReceiptText(billData);
      setPendingBillData(billData);
      setPrintPreviewText(preview);
      setShowPrintPreview(true);
    } catch (err) {
      Alert.alert('Preview Error', err?.message || 'Failed to prepare receipt preview.');
    } finally {
      setProcessingPayment(false);
    }
  };

  const handleConfirmPrint = async () => {
    if (!pendingBillData) return;
    setProcessingPayment(true);
    try {
      await printReceipt(pendingBillData);

      const balance = pendingBillData.payment?.balance || 0;
      const shopId = pendingBillData.shop?.id;

      if (shopId && balance > 0) {
        const entry = {
          id: `pay-${pendingBillData.invoiceNo}`,
          shopId,
          invoiceNo: pendingBillData.invoiceNo,
          shopName: pendingBillData.shop.shopName,
          address: pendingBillData.shop.address,
          totalAmount: pendingBillData.totals.grandTotal,
          totalPaid: pendingBillData.payment.paidAmount,
          remainingBalance: balance,
          saleDate: pendingBillData.date,
        };
        const nextPayments = [
          entry,
          ...ongoingPayments.filter((p) => p.invoiceNo !== entry.invoiceNo),
        ];
        setOngoingPayments(nextPayments);
        syncShopPaymentStatus(shopId, nextPayments);
      } else if (shopId) {
        syncShopPaymentStatus(shopId, ongoingPayments);
      }

      Alert.alert('Success', 'Payment processed & receipt printed!');
      setShowPrintPreview(false);
      setShowShopDetailsModal(false);
      setShowPaymentSection(false);
      setPendingBillData(null);
    } catch (err) {
      Alert.alert('Print Error', err?.message || 'Failed to print receipt.');
    } finally {
      setProcessingPayment(false);
    }
  };

  const handleSaveItems = () => {
    setShowPaymentSection(true);
    const subtotal = calculateSubtotal();
    setCashAmount(subtotal.toString());
  };

  const openSettlement = (payment) => {
    setSettlementTarget(payment);
    setSettlementAmount(payment?.remainingBalance?.toString() || '');
    setSettlementMethod('cash');
    setShowSettlementModal(true);
  };

  const handleSettlePayment = () => {
    if (!settlementTarget) return;
    const amount = parseFloat(settlementAmount) || 0;
    if (amount <= 0 || amount > settlementTarget.remainingBalance) {
      Alert.alert(
        'Invalid Amount',
        `Enter an amount between 0 and ${formatCurrency(settlementTarget.remainingBalance)}`
      );
      return;
    }

    const updated = {
      ...settlementTarget,
      totalPaid: settlementTarget.totalPaid + amount,
      remainingBalance: settlementTarget.remainingBalance - amount,
    };

    const nextPayments = updated.remainingBalance <= 0
      ? ongoingPayments.filter((p) => p.id !== settlementTarget.id)
      : ongoingPayments.map((p) => (p.id === settlementTarget.id ? updated : p));

    setOngoingPayments(nextPayments);
    syncShopPaymentStatus(updated.shopId, nextPayments);
    setShowSettlementModal(false);
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return '#10B981';
      case 'pending':
        return '#F59E0B';
      case 'ongoing':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getPaymentStatusText = (status) => {
    switch (status) {
      case 'paid':
        return 'Paid';
      case 'pending':
        return 'Pending';
      case 'ongoing':
        return 'Ongoing';
      default:
        return 'Unknown';
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Loading Dashboard...</Text>
      </View>
    );
  }

  const mapLocation = getDefaultLocation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#171836" />

      <LinearGradient
        colors={["#1A1A32", "#2563EB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerTopRow}>
          <TouchableOpacity style={styles.iconWrap}>
            <Ionicons name="notifications-outline" size={22} color="#FFFFFF" />
            <View style={styles.unreadDot} />
          </TouchableOpacity>

          <View style={styles.userPillWrap}>
            <View style={styles.avatarCircle}>
              <MaterialIcons name="person-pin" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.userPill}>
              <Text style={styles.pillName}>Salesperson</Text>
              <Text style={styles.pillEmail}>Active - Today</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.iconWrap}
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="settings-outline" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mapCard}>
          <View style={styles.mapHeader}>
            <MaterialCommunityIcons name="store-marker" size={20} color="#1F2937" />
            <Text style={styles.mapTitle}>Shop Locations</Text>
            <TouchableOpacity style={styles.mapActionButton}>
              <Text style={styles.mapActionText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mapContainer}>
            {location ? (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: location.lat,
                  longitude: location.lng,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: location.lat,
                    longitude: location.lng,
                  }}
                  title="Your Location"
                >
                  <View style={styles.userMarker}>
                    <MaterialCommunityIcons name="account" size={20} color="#FFFFFF" />
                  </View>
                </Marker>

                {shops.map((shop) => (
                  <Marker
                    key={shop.id}
                    coordinate={{
                      latitude: shop.latitude,
                      longitude: shop.longitude,
                    }}
                    title={shop.shopName}
                    onPress={() => handleShopPress(shop)}
                  >
                    <View
                      style={[
                        styles.shopMarker,
                        { backgroundColor: getPaymentStatusColor(shop.paymentStatus) },
                      ]}
                    >
                      <MaterialCommunityIcons name="store" size={14} color="#FFFFFF" />
                    </View>
                  </Marker>
                ))}
              </MapView>
            ) : (
              <View style={styles.mapPlaceholder}>
                <MaterialCommunityIcons name="map-outline" size={48} color="#9CA3AF" />
                <Text style={styles.mapPlaceholderText}>Enable location to view shops</Text>
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.addShopButton} onPress={openAddShopModal}>
            <Ionicons name="add" size={24} color="#FFFFFF" />
            <Text style={styles.addShopText}>Add New Shop</Text>
          </TouchableOpacity>
        </View>

        {ongoingPayments.length > 0 && (
          <View style={styles.paymentsCard}>
            <View style={styles.paymentsHeader}>
              <MaterialCommunityIcons name="clock-outline" size={20} color="#F59E0B" />
              <Text style={styles.paymentsTitle}>Ongoing Payments</Text>
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {ongoingPayments.map((payment) => (
                <View key={payment.id} style={styles.paymentItem}>
                  <View style={styles.paymentShopInfo}>
                    <MaterialCommunityIcons name="store" size={16} color="#6B7280" />
                    <Text style={styles.paymentShopName} numberOfLines={1}>
                      {payment.shopName}
                    </Text>
                  </View>

                  <Text style={styles.paymentMeta}>
                    {payment.invoiceNo} • {payment.saleDate}
                  </Text>

                  <View style={styles.paymentAmounts}>
                    <View style={styles.amountRow}>
                      <Text style={styles.amountLabel}>Total:</Text>
                      <Text style={styles.amountValue}>{formatCurrency(payment.totalAmount)}</Text>
                    </View>
                    <View style={styles.amountRow}>
                      <Text style={styles.amountLabel}>Paid:</Text>
                      <Text style={[styles.amountValue, styles.paidAmount]}>
                        {formatCurrency(payment.totalPaid)}
                      </Text>
                    </View>
                    <View style={styles.amountRow}>
                      <Text style={styles.amountLabel}>Remaining:</Text>
                      <Text style={[styles.amountValue, styles.remainingAmount]}>
                        {formatCurrency(payment.remainingBalance)}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.settleButton} onPress={() => openSettlement(payment)}>
                    <Text style={styles.settleButtonText}>Settle</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.shopListCard}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search shops by name or location..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>

          {filteredShops.length > 0 ? (
            <FlatList
              data={filteredShops}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.shopItem} onPress={() => handleShopPress(item)}>
                  <View style={styles.shopInfo}>
                    <View style={styles.shopHeader}>
                      <MaterialCommunityIcons name="store" size={20} color="#2563EB" />
                      <Text style={styles.shopName}>{item.shopName}</Text>
                      <View
                        style={[
                          styles.statusBadge,
                          { backgroundColor: getPaymentStatusColor(item.paymentStatus) },
                        ]}
                      >
                        <Text style={styles.statusText}>
                          {getPaymentStatusText(item.paymentStatus)}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.shopDetails}>
                      <MaterialCommunityIcons name="map-marker" size={14} color="#6B7280" />
                      <Text style={styles.shopAddress} numberOfLines={1}>
                        {item.address}
                      </Text>
                    </View>

                    <View style={styles.shopDetails}>
                      <MaterialCommunityIcons name="phone" size={14} color="#6B7280" />
                      <Text style={styles.shopContact}>{item.contact}</Text>
                    </View>

                    {item.pendingAmount > 0 && (
                      <View style={styles.pendingAmountContainer}>
                        <MaterialCommunityIcons name="alert-circle" size={14} color="#EF4444" />
                        <Text style={styles.pendingAmountText}>
                          Pending: {formatCurrency(item.pendingAmount)}
                        </Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.shopActions}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => requestProtectedAction('edit', item)}
                    >
                      <Ionicons name="pencil" size={18} color="#2563EB" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => requestProtectedAction('delete', item)}
                    >
                      <Ionicons name="trash" size={18} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="store-off" size={48} color="#9CA3AF" />
              <Text style={styles.emptyStateText}>No shops found</Text>
              <Text style={styles.emptyStateSubtext}>Try a different search or add a new shop</Text>
            </View>
          )}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <Modal
        visible={showShopModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowShopModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{editingShopId ? 'Edit Shop' : 'Add New Shop'}</Text>
              <TouchableOpacity onPress={() => setShowShopModal(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Shop Name *</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="Enter shop name"
                  placeholderTextColor="#9CA3AF"
                  value={shopForm.shopName}
                  onChangeText={(text) => setShopForm((prev) => ({ ...prev, shopName: text }))}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Phone Number</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="Enter phone number"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  value={shopForm.contact}
                  onChangeText={(text) => setShopForm((prev) => ({ ...prev, contact: text }))}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Address</Text>
                <TextInput
                  style={[styles.formInput, styles.textArea]}
                  placeholder="Enter shop address"
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={3}
                  value={shopForm.address}
                  onChangeText={(text) => setShopForm((prev) => ({ ...prev, address: text }))}
                />
              </View>

              <View style={styles.locationSection}>
                <Text style={styles.formLabel}>Shop Location (Pick on Map)</Text>
                <View style={styles.mapPickerWrap}>
                  <MapView
                    style={styles.mapPicker}
                    initialRegion={{
                      latitude: shopForm.latitude || mapLocation.latitude,
                      longitude: shopForm.longitude || mapLocation.longitude,
                      latitudeDelta: 0.015,
                      longitudeDelta: 0.015,
                    }}
                    onPress={(e) => {
                      const { latitude, longitude } = e.nativeEvent.coordinate;
                      setShopForm((prev) => ({ ...prev, latitude, longitude }));
                    }}
                  >
                    {shopForm.latitude && shopForm.longitude && (
                      <Marker
                        coordinate={{
                          latitude: shopForm.latitude,
                          longitude: shopForm.longitude,
                        }}
                        draggable
                        onDragEnd={(e) => {
                          const { latitude, longitude } = e.nativeEvent.coordinate;
                          setShopForm((prev) => ({ ...prev, latitude, longitude }));
                        }}
                      />
                    )}
                  </MapView>
                </View>
                <View style={styles.coordRow}>
                  <Text style={styles.coordLabel}>Selected:</Text>
                  <Text style={styles.coordValue}>
                    {shopForm.latitude && shopForm.longitude
                      ? `${shopForm.latitude.toFixed(5)}, ${shopForm.longitude.toFixed(5)}`
                      : 'Tap map to select'}
                  </Text>
                </View>
                <TouchableOpacity style={styles.locationButton} onPress={handleUseMyLocation}>
                  <MaterialCommunityIcons name="crosshairs-gps" size={20} color="#FFFFFF" />
                  <Text style={styles.locationButtonText}>Use My Location</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowShopModal(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={handleSaveShop}>
                <MaterialCommunityIcons name="store-plus" size={20} color="#FFFFFF" />
                <Text style={styles.saveButtonText}>
                  {editingShopId ? 'Update Shop' : 'Create Shop'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showAdminCodeModal}
        animationType="fade"
        transparent
        onRequestClose={() => setShowAdminCodeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Admin Code</Text>
            <Text style={styles.adminCodeHint}>Enter 7777 to continue</Text>
            <TextInput
              style={styles.adminCodeInput}
              value={adminCode}
              onChangeText={setAdminCode}
              keyboardType="numeric"
              secureTextEntry
              placeholder="7777"
              placeholderTextColor="#9CA3AF"
            />
            <View style={styles.modalFooterCompact}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowAdminCodeModal(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={confirmAdminCode}>
                <Text style={styles.saveButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showSettlementModal}
        animationType="fade"
        transparent
        onRequestClose={() => setShowSettlementModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Settle Payment</Text>
            <Text style={styles.settlementShop}>{settlementTarget?.shopName}</Text>
            <View style={styles.settlementInfo}>
              <Text style={styles.settlementLabel}>Remaining</Text>
              <Text style={styles.settlementValue}>
                {formatCurrency(settlementTarget?.remainingBalance || 0)}
              </Text>
            </View>

            <Text style={styles.formLabel}>Payment Method</Text>
            <View style={styles.paymentMethodButtons}>
              {['cash', 'cheque'].map((method) => (
                <TouchableOpacity
                  key={method}
                  style={[
                    styles.paymentMethodButton,
                    settlementMethod === method && styles.paymentMethodButtonActive,
                  ]}
                  onPress={() => setSettlementMethod(method)}
                >
                  <Text
                    style={[
                      styles.paymentMethodText,
                      settlementMethod === method && styles.paymentMethodTextActive,
                    ]}
                  >
                    {method.charAt(0).toUpperCase() + method.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.amountInputGroup}>
              <Text style={styles.amountLabel}>Amount *</Text>
              <TextInput
                style={styles.amountInput}
                value={settlementAmount}
                onChangeText={setSettlementAmount}
                placeholder="Enter amount"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.modalFooterCompact}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowSettlementModal(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSettlePayment}>
                <Text style={styles.saveButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showShopDetailsModal}
        animationType="slide"
        transparent
        onRequestClose={() => {
          setShowShopDetailsModal(false);
          setShowPaymentSection(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.shopDetailsModal]}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                  if (showPaymentSection) {
                    setShowPaymentSection(false);
                  } else {
                    setShowShopDetailsModal(false);
                  }
                }}
              >
                <Ionicons name="arrow-back" size={24} color="#6B7280" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>
                {showPaymentSection ? 'Payment' : selectedShop?.shopName}
              </Text>
              <TouchableOpacity onPress={() => setShowShopDetailsModal(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {!showPaymentSection ? (
              <ScrollView style={styles.modalBody}>
                <View style={styles.shopHeaderInfo}>
                  <View style={styles.shopInfoRow}>
                    <MaterialCommunityIcons name="map-marker" size={16} color="#6B7280" />
                    <Text style={styles.shopInfoText}>{selectedShop?.address}</Text>
                  </View>
                  <View style={styles.shopInfoRow}>
                    <MaterialCommunityIcons name="phone" size={16} color="#6B7280" />
                    <Text style={styles.shopInfoText}>{selectedShop?.contact}</Text>
                  </View>
                </View>

                <View style={styles.itemsSection}>
                  <Text style={styles.sectionTitle}>Allocated Items</Text>

                  {shopItems.map((item) => (
                    <View key={item.id} style={styles.itemCard}>
                      <View style={styles.itemHeader}>
                        <Text style={styles.itemName}>{item.productName}</Text>
                        <Text style={styles.itemStock}>Stock: {item.maxQuantity}</Text>
                      </View>

                      <View style={styles.itemControls}>
                        <View style={styles.quantityControls}>
                          <Text style={styles.controlLabel}>Quantity</Text>
                          <View style={styles.quantityButtons}>
                            <TouchableOpacity
                              style={styles.quantityButton}
                              onPress={() => updateItemQuantity(item.id, -1)}
                            >
                              <Ionicons name="remove" size={20} color="#FFFFFF" />
                            </TouchableOpacity>

                            <TextInput
                              style={styles.quantityInput}
                              value={item.quantity.toString()}
                              keyboardType="numeric"
                              onChangeText={(text) => {
                                const val = parseInt(text, 10);
                                updateItem(item.id, { quantity: Number.isFinite(val) ? val : 0 });
                              }}
                            />

                            <TouchableOpacity
                              style={styles.quantityButton}
                              onPress={() => updateItemQuantity(item.id, 1)}
                              disabled={item.quantity >= item.maxQuantity}
                            >
                              <Ionicons name="add" size={20} color="#FFFFFF" />
                            </TouchableOpacity>
                          </View>
                        </View>

                        <View style={styles.priceControls}>
                          <Text style={styles.controlLabel}>Price/Unit</Text>
                          <TextInput
                            style={styles.priceInput}
                            value={item.pricePerUnit.toString()}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                              const price = parseFloat(text);
                              updateItem(item.id, { pricePerUnit: Number.isFinite(price) ? price : 0 });
                            }}
                          />
                        </View>
                      </View>

                      <View style={styles.adjustmentControls}>
                        <View style={styles.adjustmentColumn}>
                          <Text style={styles.controlLabel}>Free</Text>
                          <TextInput
                            style={styles.adjustmentInput}
                            value={item.freeItems.toString()}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                              const val = parseInt(text, 10);
                              updateItem(item.id, { freeItems: Number.isFinite(val) ? val : 0 });
                            }}
                          />
                        </View>
                        <View style={styles.adjustmentColumn}>
                          <Text style={styles.controlLabel}>Returns</Text>
                          <TextInput
                            style={styles.adjustmentInput}
                            value={item.returns.toString()}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                              const val = parseInt(text, 10);
                              updateItem(item.id, { returns: Number.isFinite(val) ? val : 0 });
                            }}
                          />
                        </View>
                      </View>

                      <View style={styles.itemFooter}>
                        <View>
                          <Text style={styles.totalLabel}>Chargeable Qty</Text>
                          <Text style={styles.helperText}>{getChargeableQty(item)}</Text>
                        </View>
                        <View>
                          <Text style={styles.totalLabel}>Total</Text>
                          <Text style={styles.totalAmount}>{formatCurrency(item.totalPrice)}</Text>
                        </View>
                      </View>
                    </View>
                  ))}

                  <View style={styles.subtotalCard}>
                    <Text style={styles.subtotalLabel}>Subtotal</Text>
                    <Text style={styles.subtotalAmount}>{formatCurrency(calculateSubtotal())}</Text>
                  </View>

                  <View style={styles.orderSummary}>
                    <Text style={styles.summaryTitle}>Summary</Text>
                    {shopItems
                      .filter((item) => item.quantity > 0)
                      .map((item) => (
                        <View key={item.id} style={styles.summaryItem}>
                          <View style={styles.summaryItemMeta}>
                            <Text style={styles.summaryItemName}>{item.productName}</Text>
                            <Text style={styles.summaryMeta}>
                              Free {item.freeItems} • Returns {item.returns}
                            </Text>
                          </View>
                          <Text style={styles.summaryItemQuantity}>x{getChargeableQty(item)}</Text>
                          <Text style={styles.summaryItemPrice}>{formatCurrency(item.totalPrice)}</Text>
                        </View>
                      ))}

                    <View style={styles.summaryTotal}>
                      <Text style={styles.summaryTotalLabel}>Total Amount</Text>
                      <Text style={styles.summaryTotalAmount}>{formatCurrency(calculateSubtotal())}</Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
            ) : (
              <ScrollView style={styles.modalBody}>
                <View style={styles.paymentMethodSection}>
                  <Text style={styles.sectionTitle}>Payment Method</Text>
                  <View style={styles.paymentMethodButtons}>
                    {['cash', 'cheque', 'split', 'ongoing'].map((method) => (
                      <TouchableOpacity
                        key={method}
                        style={[
                          styles.paymentMethodButton,
                          paymentMethod === method && styles.paymentMethodButtonActive,
                        ]}
                        onPress={() => setPaymentMethod(method)}
                      >
                        <Text
                          style={[
                            styles.paymentMethodText,
                            paymentMethod === method && styles.paymentMethodTextActive,
                          ]}
                        >
                          {method.charAt(0).toUpperCase() + method.slice(1)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.paymentAmountsSection}>
                  {(paymentMethod === 'cash' || paymentMethod === 'split' || paymentMethod === 'ongoing') && (
                    <View style={styles.amountInputGroup}>
                      <Text style={styles.amountLabel}>
                        Cash Amount {paymentMethod === 'ongoing' ? '(can be 0)' : '*'}
                      </Text>
                      <TextInput
                        style={styles.amountInput}
                        value={cashAmount}
                        onChangeText={setCashAmount}
                        placeholder="Enter cash amount"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="numeric"
                      />
                    </View>
                  )}

                  {(paymentMethod === 'cheque' || paymentMethod === 'split') && (
                    <>
                      <View style={styles.amountInputGroup}>
                        <Text style={styles.amountLabel}>Cheque Amount *</Text>
                        <TextInput
                          style={styles.amountInput}
                          value={chequeAmount}
                          onChangeText={setChequeAmount}
                          placeholder="Enter cheque amount"
                          placeholderTextColor="#9CA3AF"
                          keyboardType="numeric"
                        />
                      </View>

                      {parseFloat(chequeAmount) > 0 && (
                        <>
                          <View style={styles.amountInputGroup}>
                            <Text style={styles.amountLabel}>Cheque Number *</Text>
                            <TextInput
                              style={styles.amountInput}
                              value={chequeNumber}
                              onChangeText={setChequeNumber}
                              placeholder="Enter cheque number"
                              placeholderTextColor="#9CA3AF"
                            />
                          </View>

                          <View style={styles.amountInputGroup}>
                            <Text style={styles.amountLabel}>Bank Name</Text>
                            <TextInput
                              style={styles.amountInput}
                              value={chequeBank}
                              onChangeText={setChequeBank}
                              placeholder="Enter bank name (optional)"
                              placeholderTextColor="#9CA3AF"
                            />
                          </View>

                          <View style={styles.amountInputGroup}>
                            <Text style={styles.amountLabel}>Expiry Date *</Text>
                            <TextInput
                              style={styles.amountInput}
                              value={chequeExpiryDate}
                              onChangeText={setChequeExpiryDate}
                              placeholder="YYYY-MM-DD"
                              placeholderTextColor="#9CA3AF"
                            />
                          </View>
                        </>
                      )}
                    </>
                  )}
                </View>

                <View style={styles.orderSummary}>
                  <Text style={styles.summaryTitle}>Order Summary</Text>
                  {shopItems
                    .filter((item) => item.quantity > 0)
                    .map((item) => (
                      <View key={item.id} style={styles.summaryItem}>
                        <View style={styles.summaryItemMeta}>
                          <Text style={styles.summaryItemName}>{item.productName}</Text>
                          <Text style={styles.summaryMeta}>
                            Free {item.freeItems} • Returns {item.returns}
                          </Text>
                        </View>
                        <Text style={styles.summaryItemQuantity}>x{getChargeableQty(item)}</Text>
                        <Text style={styles.summaryItemPrice}>{formatCurrency(item.totalPrice)}</Text>
                      </View>
                    ))}

                  <View style={styles.summaryTotal}>
                    <Text style={styles.summaryTotalLabel}>Total Amount</Text>
                    <Text style={styles.summaryTotalAmount}>{formatCurrency(calculateSubtotal())}</Text>
                  </View>
                </View>
              </ScrollView>
            )}

            <View style={styles.modalFooter}>
              {!showPaymentSection ? (
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveItems}>
                  <MaterialCommunityIcons name="credit-card-outline" size={20} color="#FFFFFF" />
                  <Text style={styles.saveButtonText}>Pay Now</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.saveButton, processingPayment && styles.buttonDisabled]}
                  onPress={handleProcessPayment}
                  disabled={processingPayment}
                >
                  {processingPayment ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <>
                      <MaterialCommunityIcons name="receipt-text" size={20} color="#FFFFFF" />
                      <Text style={styles.saveButtonText}>Preview Bill</Text>
                    </>
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showPrintPreview}
        animationType="slide"
        transparent
        onRequestClose={() => setShowPrintPreview(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: height * 0.85 }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Bill Preview</Text>
              <TouchableOpacity onPress={() => setShowPrintPreview(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
              <Text
                style={{
                  fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
                  fontSize: 12,
                  color: '#111827',
                }}
              >
                {printPreviewText}
              </Text>
            </ScrollView>
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowPrintPreview(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveButton, processingPayment && styles.buttonDisabled]}
                onPress={handleConfirmPrint}
                disabled={processingPayment}
              >
                {processingPayment ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <MaterialCommunityIcons name="printer" size={20} color="#FFFFFF" />
                    <Text style={styles.saveButtonText}>Print</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
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
    marginBottom: 20,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  userPillWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  userPill: {
    alignItems: 'flex-start',
  },
  pillName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  pillEmail: {
    color: '#E5E7EB',
    fontSize: 11,
  },
  content: {
    flex: 1,
  },
  mapCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  mapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  mapTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
    flex: 1,
  },
  mapActionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  mapActionText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '500',
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  map: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  mapPlaceholderText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
  userMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shopMarker: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  addShopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 12,
  },
  addShopText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  paymentsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  paymentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
    flex: 1,
  },
  viewAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  viewAllText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '500',
  },
  paymentItem: {
    width: width * 0.7,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  paymentShopInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  paymentShopName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
    flex: 1,
  },
  paymentMeta: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 10,
  },
  paymentAmounts: {
    marginBottom: 12,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  amountLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  amountValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
  },
  paidAmount: {
    color: '#10B981',
  },
  remainingAmount: {
    color: '#EF4444',
  },
  settleButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  settleButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  shopListCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 20,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    paddingVertical: 12,
  },
  shopItem: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  shopInfo: {
    flex: 1,
  },
  shopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  shopName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  shopDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  shopAddress: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
    flex: 1,
  },
  shopContact: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
  },
  pendingAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  pendingAmountText: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '500',
    marginLeft: 6,
  },
  shopActions: {
    justifyContent: 'space-between',
    paddingLeft: 12,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 12,
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 100,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.9,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
    textAlign: 'center',
  },
  modalBody: {
    paddingHorizontal: 20,
  },
  modalFooter: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  modalFooterCompact: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
  shopDetailsModal: {
    maxHeight: height * 0.95,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    flex: 1,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 8,
    flex: 2,
    gap: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 6,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1F2937',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  locationSection: {
    marginBottom: 16,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  locationButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  mapPickerWrap: {
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 10,
  },
  mapPicker: {
    flex: 1,
  },
  coordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  coordLabel: {
    fontSize: 12,
    color: '#64748B',
    marginRight: 6,
  },
  coordValue: {
    fontSize: 12,
    color: '#111827',
    flex: 1,
  },
  adminCodeInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  adminCodeHint: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 6,
  },
  settlementShop: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 6,
    marginBottom: 10,
    textAlign: 'center',
  },
  settlementInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  settlementLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  settlementValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  shopHeaderInfo: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  shopInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  shopInfoText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
    flex: 1,
  },
  itemsSection: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  itemCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  itemStock: {
    fontSize: 12,
    color: '#6B7280',
  },
  itemControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  quantityControls: {
    flex: 1,
    marginRight: 12,
  },
  priceControls: {
    flex: 1,
  },
  controlLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
  },
  quantityButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityInput: {
    width: 60,
    height: 36,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    textAlign: 'center',
    marginHorizontal: 8,
    fontSize: 14,
    color: '#1F2937',
  },
  priceInput: {
    height: 36,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#1F2937',
  },
  adjustmentControls: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  adjustmentColumn: {
    flex: 1,
  },
  adjustmentInput: {
    height: 36,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#1F2937',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  totalAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563EB',
  },
  helperText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
  },
  subtotalCard: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  subtotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  subtotalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  paymentMethodSection: {
    marginBottom: 20,
  },
  paymentMethodButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  paymentMethodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#F3F4F6',
  },
  paymentMethodButtonActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  paymentMethodText: {
    fontSize: 14,
    color: '#6B7280',
  },
  paymentMethodTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  paymentAmountsSection: {
    marginBottom: 20,
  },
  amountInputGroup: {
    marginBottom: 16,
  },
  amountInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1F2937',
  },
  orderSummary: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryItemMeta: {
    flex: 2,
  },
  summaryItemName: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryMeta: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  summaryItemQuantity: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
    textAlign: 'center',
  },
  summaryItemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
    textAlign: 'right',
  },
  summaryTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginTop: 8,
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  summaryTotalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563EB',
  },
});

export default HomeScreen;
