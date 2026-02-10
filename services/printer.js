import { NativeModules, PermissionsAndroid, Platform } from 'react-native';
import { PRINTER_MAC } from './printerConfig';

const { BluetoothPrinter } = NativeModules;

const ESC = 0x1b;
const GS = 0x1d;
const LF = 0x0a;

const encoder = typeof TextEncoder !== 'undefined' ? new TextEncoder() : null;

const textToBytes = (text) => {
  if (encoder) {
    return Array.from(encoder.encode(text));
  }
  const utf8 = unescape(encodeURIComponent(text));
  return Array.from(utf8).map((c) => c.charCodeAt(0));
};

const line = (width = 48) => '-'.repeat(width);

const padLine = (left, right, width = 48) => {
  const leftText = left ?? '';
  const rightText = right ?? '';
  const spaceCount = Math.max(1, width - leftText.length - rightText.length);
  return leftText + ' '.repeat(spaceCount) + rightText;
};

export const requestBluetoothPermissions = async () => {
  if (Platform.OS !== 'android') return true;

  if (Platform.Version >= 31) {
    const result = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    ]);
    return (
      result[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] === PermissionsAndroid.RESULTS.GRANTED &&
      result[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] === PermissionsAndroid.RESULTS.GRANTED
    );
  }

  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );
  return result === PermissionsAndroid.RESULTS.GRANTED;
};

export const ensurePrinterConnected = async (macOverride) => {
  if (!BluetoothPrinter) {
    throw new Error('BluetoothPrinter native module not available.');
  }

  const mac = macOverride || PRINTER_MAC;
  if (!mac || mac === '00:11:22:33:44:55') {
    throw new Error('Set PRINTER_MAC in services/printerConfig.js');
  }

  const granted = await requestBluetoothPermissions();
  if (!granted) {
    throw new Error('Bluetooth permission denied.');
  }

  const connected = await BluetoothPrinter.isConnected();
  if (!connected) {
    await BluetoothPrinter.connect(mac);
  }
};

export const buildReceiptBytes = ({
  shop,
  items,
  totals,
  invoiceNo,
  date,
  time,
  payment,
}) => {
  const bytes = [];
  const push = (...vals) => vals.forEach((v) => bytes.push(v));
  const pushText = (text) => bytes.push(...textToBytes(text));

  push(ESC, 0x40); // init
  push(ESC, 0x61, 0x01); // center
  push(ESC, 0x45, 0x01); // bold on
  pushText('Lakshan Dairy Products\n');
  push(ESC, 0x45, 0x00); // bold off
  pushText('17 Mile Post, Wewmadu, Bibile Rd, Bakinigahawela\n');
  pushText('Tel: 0779708725\n');
  pushText('milkfoodlakshan@gmail.com\n');
  pushText(line() + '\n');

  push(ESC, 0x61, 0x00); // left
  push(ESC, 0x45, 0x01); // bold
  pushText('???????? ??????\n');
  push(ESC, 0x45, 0x00);

  if (invoiceNo) pushText(`???? ????: ${invoiceNo}\n`);
  if (date || time) pushText(`????: ${date || ''}   ?????: ${time || ''}\n`);
  if (shop?.shopName) pushText(`??????????: ${shop.shopName}\n`);
  if (shop?.address) pushText(`??????: ${shop.address}\n`);
  if (shop?.contact) pushText(`??????: ${shop.contact}\n`);

  pushText(line() + '\n');
  pushText(padLine('?????', '????', 48) + '\n');
  pushText(line() + '\n');

  items.forEach((item) => {
    const qty = item.quantity || 0;
    if (qty <= 0) return;
    const total = item.totalPrice || qty * (item.pricePerUnit || 0);
    pushText(padLine(item.productName, total.toFixed(2), 48) + '\n');
    pushText(padLine(`qty ${qty} x ${item.pricePerUnit || 0}`, '', 48) + '\n');
  });

  pushText(line() + '\n');
  if (totals?.subtotal != null) pushText(padLine('MRP ?????', totals.subtotal.toFixed(2), 48) + '\n');
  if (totals?.discount != null) pushText(padLine('?????', totals.discount.toFixed(2), 48) + '\n');
  if (totals?.grandTotal != null) {
    push(ESC, 0x45, 0x01);
    pushText(padLine('?????', totals.grandTotal.toFixed(2), 48) + '\n');
    push(ESC, 0x45, 0x00);
  }

  if (payment?.method) pushText(`?????? ??????: ${payment.method}\n`);
  if (payment?.paidAmount != null) pushText(padLine('???? ????', payment.paidAmount.toFixed(2), 48) + '\n');
  if (payment?.balance != null) pushText(padLine('????? ????', payment.balance.toFixed(2), 48) + '\n');

  pushText('\n');
  pushText('??? ????????!\n');
  pushText('VOXOSolution\n');
  pushText('0710901871\n');
  pushText('\n\n\n');

  push(LF, LF, LF);
  return bytes;
};

export const buildReceiptText = ({
  shop,
  items,
  totals,
  invoiceNo,
  date,
  time,
  payment,
}) => {
  const lines = [];
  const push = (t = '') => lines.push(t);
  push('Lakshan Dairy Products');
  push('17 Mile Post, Wewmadu, Bibile Rd, Bakinigahawela');
  push('Tel: 0779708725');
  push('milkfoodlakshan@gmail.com');
  push(line());
  push('???????? ??????');
  if (invoiceNo) push(`???? ????: ${invoiceNo}`);
  if (date || time) push(`????: ${date || ''}   ?????: ${time || ''}`);
  if (shop?.shopName) push(`??????????: ${shop.shopName}`);
  if (shop?.address) push(`??????: ${shop.address}`);
  if (shop?.contact) push(`??????: ${shop.contact}`);
  push(line());
  push(padLine('?????', '????', 48));
  push(line());
  items.forEach((item) => {
    const qty = item.quantity || 0;
    if (qty <= 0) return;
    const total = item.totalPrice || qty * (item.pricePerUnit || 0);
    push(padLine(item.productName, total.toFixed(2), 48));
    push(padLine(`qty ${qty} x ${item.pricePerUnit || 0}`, '', 48));
  });
  push(line());
  if (totals?.subtotal != null) push(padLine('MRP ?????', totals.subtotal.toFixed(2), 48));
  if (totals?.discount != null) push(padLine('?????', totals.discount.toFixed(2), 48));
  if (totals?.grandTotal != null) push(padLine('?????', totals.grandTotal.toFixed(2), 48));
  if (payment?.method) push(`?????? ??????: ${payment.method}`);
  if (payment?.paidAmount != null) push(padLine('???? ????', payment.paidAmount.toFixed(2), 48));
  if (payment?.balance != null) push(padLine('????? ????', payment.balance.toFixed(2), 48));
  push('');
  push('??? ????????!');
  push('VOXOSolution');
  push('0710901871');
  return lines.join('\n');
};
export const printReceipt = async (billData, macOverride) => {
  await ensurePrinterConnected(macOverride);
  const bytes = buildReceiptBytes(billData);
  await BluetoothPrinter.printRaw(bytes);
};



