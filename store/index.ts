/**
 * App Store — simple reactive module-level store.
 * Uses React 19's useSyncExternalStore for subscription.
 * No external state library needed.
 */
import { useSyncExternalStore } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CartItem {
  menuId: string;
  menuName: string;
  restaurantId: string;
  restaurantName: string;
  price: number;
  qty: number;
}

interface AppStore {
  walletBalance: number;
  cart: CartItem[];
  userName: string;
  userPhone: string;
  userEmail: string;
}

// ─── State ────────────────────────────────────────────────────────────────────

let store: AppStore = {
  walletBalance: 150000,
  cart: [],
  userName: 'Andi Rahman',
  userPhone: '+62 812 3456 7890',
  userEmail: 'andi@email.com',
};

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): AppStore {
  return store;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useStore(): AppStore {
  return useSyncExternalStore(subscribe, getSnapshot);
}

// ─── Actions ──────────────────────────────────────────────────────────────────

export function topUp(amount: number) {
  store = { ...store, walletBalance: store.walletBalance + amount };
  notify();
}

export function deductWallet(amount: number) {
  store = { ...store, walletBalance: Math.max(0, store.walletBalance - amount) };
  notify();
}

export function addToCart(item: Omit<CartItem, 'qty'>) {
  const existing = store.cart.find((c) => c.menuId === item.menuId);
  if (existing) {
    store = {
      ...store,
      cart: store.cart.map((c) =>
        c.menuId === item.menuId ? { ...c, qty: c.qty + 1 } : c
      ),
    };
  } else {
    store = { ...store, cart: [...store.cart, { ...item, qty: 1 }] };
  }
  notify();
}

export function removeFromCart(menuId: string) {
  const existing = store.cart.find((c) => c.menuId === menuId);
  if (!existing) return;
  if (existing.qty <= 1) {
    store = { ...store, cart: store.cart.filter((c) => c.menuId !== menuId) };
  } else {
    store = {
      ...store,
      cart: store.cart.map((c) =>
        c.menuId === menuId ? { ...c, qty: c.qty - 1 } : c
      ),
    };
  }
  notify();
}

export function clearCart() {
  store = { ...store, cart: [] };
  notify();
}

export function updateProfile(name: string, email: string) {
  store = { ...store, userName: name, userEmail: email };
  notify();
}

// ─── Selectors ────────────────────────────────────────────────────────────────

export function cartTotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function cartItemCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}
