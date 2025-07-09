export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  orderCode: string;
  date: Date; // ISO date string
  customerName: string;
  phone: string;
  paymentMethod: 'cod' | 'card' | 'mobile';
  mobileType?: string; // if paymentMethod is mobile, this holds the mobile payment type (e.g. bKash)
  address: string;
  items: InvoiceItem[];
  subtotal: number;
  vat: number;
  deliveryFee: number;
  total: number;
}
