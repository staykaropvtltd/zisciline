export interface Product {
  id: string;
  name: string;
  category: 'T-Shirts' | 'Tracks' | 'Shorts' | 'Jackets';
  price: number;
  description: string;
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped';

export interface Order {
  id: string;
  customerName: string;
  items: string;
  quantity: number;
  total: number;
  date: string;
  status: OrderStatus;
}
