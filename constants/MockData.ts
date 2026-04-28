export interface RideOption {
  id: string;
  name: string;
  eta: string;
  price: number;
  capacity: string;
}

export interface WalletTransaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: 'debit' | 'credit';
  status: 'success' | 'pending' | 'failed';
}

export interface ActivityOrder {
  id: string;
  service: 'Ride' | 'Food' | 'Send';
  title: string;
  subtitle: string;
  total: number;
  date: string;
  status: 'ongoing' | 'completed';
}

export interface ChatThread {
  id: string;
  name: string;
  role: string;
  preview: string;
  time: string;
  unread: number;
}

export interface ChatMessage {
  id: string;
  from: 'me' | 'other';
  text: string;
  time: string;
}

export interface Restaurant {
  id: string;
  name: string;
  category: string;
  rating: number;
  distance: string;
  eta: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  popular?: boolean;
}

export const savedPlaces = [
  { id: 'home', label: 'Rumah', address: 'Jl. Merdeka No. 5' },
  { id: 'office', label: 'Kantor', address: 'Jl. Sudirman No. 10' },
  { id: 'mall', label: 'Mall Kota Kasablanka', address: 'Jl. Casablanca Raya' },
];

export const rideOptions: RideOption[] = [
  { id: 'ride', name: 'Ride', eta: '1-4 menit', price: 15000, capacity: '1 penumpang' },
  { id: 'car', name: 'Car', eta: '3-6 menit', price: 28000, capacity: '4 penumpang' },
  { id: 'delivery', name: 'Delivery', eta: '5-8 menit', price: 18000, capacity: 'Barang kecil' },
];

export const walletTransactions: WalletTransaction[] = [
  { id: 'w1', title: 'Ride - Sudirman', date: 'Hari ini', amount: 15000, type: 'debit', status: 'success' },
  { id: 'w2', title: 'Food - Nasi Goreng', date: 'Kemarin', amount: 51000, type: 'debit', status: 'success' },
  { id: 'w3', title: 'Top Up VA BCA', date: '20 Apr', amount: 100000, type: 'credit', status: 'success' },
  { id: 'w4', title: 'Transfer ke Dimas', date: '19 Apr', amount: 25000, type: 'debit', status: 'pending' },
];

export const activityOrders: ActivityOrder[] = [
  {
    id: 'act-ongoing-1',
    service: 'Ride',
    title: 'Ride ke Kantor',
    subtitle: 'Driver: Ahmad • B 1234 XY',
    total: 15000,
    date: 'Hari ini, 08:30',
    status: 'ongoing',
  },
  {
    id: 'act-ongoing-2',
    service: 'Food',
    title: 'Mie Ayam Pak Joko',
    subtitle: 'Sedang disiapkan restoran',
    total: 51000,
    date: 'Hari ini, 12:05',
    status: 'ongoing',
  },
  {
    id: 'act-completed-1',
    service: 'Ride',
    title: 'Ride ke Rumah',
    subtitle: 'Selesai dengan rating 5',
    total: 17000,
    date: 'Kemarin, 19:40',
    status: 'completed',
  },
  {
    id: 'act-completed-2',
    service: 'Send',
    title: 'Kirim dokumen',
    subtitle: 'Paket diterima penerima',
    total: 22000,
    date: '22 Apr, 14:10',
    status: 'completed',
  },
];

export const chatThreads: ChatThread[] = [
  {
    id: 'driver-ahmad',
    name: 'Ahmad',
    role: 'Driver Ride',
    preview: 'Saya sudah di depan gerbang, kak.',
    time: '2m',
    unread: 2,
  },
  {
    id: 'resto-joko',
    name: 'Mie Ayam Pak Joko',
    role: 'Merchant Food',
    preview: 'Pesanan sedang dimasak, terima kasih.',
    time: '9m',
    unread: 0,
  },
  {
    id: 'support',
    name: 'DELIVRY Support',
    role: 'Bantuan',
    preview: 'Ada yang bisa kami bantu hari ini?',
    time: '1h',
    unread: 0,
  },
];

export const chatMessages: Record<string, ChatMessage[]> = {
  'driver-ahmad': [
    { id: '1', from: 'other', text: 'Halo kak, saya sudah OTW ya.', time: '08:32' },
    { id: '2', from: 'me', text: 'Siap pak, saya tunggu di lobby.', time: '08:33' },
    { id: '3', from: 'other', text: 'Saya sudah di depan gerbang, kak.', time: '08:35' },
  ],
  'resto-joko': [
    { id: '1', from: 'other', text: 'Pesanan sedang dimasak.', time: '12:07' },
    { id: '2', from: 'me', text: 'Terima kasih, ditunggu ya.', time: '12:08' },
  ],
  support: [{ id: '1', from: 'other', text: 'Ada yang bisa kami bantu hari ini?', time: 'Kemarin' }],
};

export const foodCategories = ['Semua', 'Promo', 'Near', 'Nasi', 'Mie', 'Snack'];

export const restaurants: Restaurant[] = [
  { id: 'r1', name: 'Warung Nasi Goreng', category: 'Nasi', rating: 4.9, distance: '1.2 km', eta: '20-30 min' },
  { id: 'r2', name: 'Mie Ayam Pak Joko', category: 'Mie', rating: 4.7, distance: '0.8 km', eta: '15-25 min' },
  { id: 'r3', name: 'Soto Betawi Bu Sari', category: 'Soto', rating: 4.8, distance: '2.1 km', eta: '25-35 min' },
];

export const restaurantMenus: Record<string, MenuItem[]> = {
  r1: [
    { id: 'm1', name: 'Nasi Goreng Special', price: 25000, popular: true },
    { id: 'm2', name: 'Nasi Goreng Seafood', price: 30000 },
    { id: 'm3', name: 'Es Teh Manis', price: 8000 },
  ],
  r2: [
    { id: 'm4', name: 'Mie Ayam Bakso', price: 22000, popular: true },
    { id: 'm5', name: 'Mie Yamin Asin', price: 20000 },
    { id: 'm6', name: 'Pangsit Goreng', price: 12000 },
  ],
  r3: [
    { id: 'm7', name: 'Soto Betawi Komplit', price: 32000, popular: true },
    { id: 'm8', name: 'Sate Usus', price: 10000 },
    { id: 'm9', name: 'Jeruk Hangat', price: 9000 },
  ],
};
