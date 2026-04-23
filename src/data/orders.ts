import { Order } from '../types';

export const mockOrders: Order[] = [
  {
    id: 'ZSL-0041',
    customerName: 'Arjun Mehta',
    items: 'Apex Performance Tee × 2',
    quantity: 2,
    total: 2998,
    date: '2026-04-20',
    status: 'Shipped',
  },
  {
    id: 'ZSL-0042',
    customerName: 'Priya Sharma',
    items: 'Velocity Track Pants × 1',
    quantity: 1,
    total: 2799,
    date: '2026-04-21',
    status: 'Processing',
  },
  {
    id: 'ZSL-0043',
    customerName: 'Rohan Das',
    items: 'Strike Training Shorts × 3, Core Compression Tee × 1',
    quantity: 4,
    total: 5696,
    date: '2026-04-22',
    status: 'Pending',
  },
  {
    id: 'ZSL-0044',
    customerName: 'Neha Patel',
    items: 'Summit Windbreaker × 1',
    quantity: 1,
    total: 4999,
    date: '2026-04-22',
    status: 'Processing',
  },
  {
    id: 'ZSL-0045',
    customerName: 'Vikram Singh',
    items: 'Apex Performance Tee × 1, Velocity Track Pants × 1',
    quantity: 2,
    total: 4298,
    date: '2026-04-23',
    status: 'Pending',
  },
];
