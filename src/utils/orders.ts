import { Order, OrderStatus } from '../types';
import { getProducts } from './products';

const ORDERS_KEY = 'fazenda_orders';

export const getOrders = (): Order[] => {
  const orders = localStorage.getItem(ORDERS_KEY);
  return orders ? JSON.parse(orders) : [];
};

export const saveOrders = (orders: Order[]): void => {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

export const calculateOrderTotal = (
  items: { productId: string; quantity: number }[],
  parceiro: boolean
): number => {
  const products = getProducts();
  let total = 0;
  
  items.forEach(item => {
    const product = products.find(p => p.id === item.productId);
    if (product) {
      const price = parceiro ? product.priceParceiro : product.priceNormal;
      total += item.quantity * price;
    }
  });
  
  return total;
};

export const addOrder = (
  nome: string,
  items: { productId: string; productName: string; quantity: number }[],
  parceiro: boolean,
  estabelecimento?: string,
  telefone?: string
): Order => {
  const orders = getOrders();
  const total = calculateOrderTotal(items, parceiro);
  
  const newOrder: Order = {
    id: Date.now().toString(),
    nome,
    estabelecimento,
    telefone,
    items,
    parceiro,
    status: 'Aguardando',
    total,
    data: new Date().toISOString(),
    notified: false,
  };

  orders.push(newOrder);
  saveOrders(orders);
  return newOrder;
};

export const updateOrderStatus = (id: string, status: OrderStatus): void => {
  const orders = getOrders();
  const orderIndex = orders.findIndex(order => order.id === id);
  if (orderIndex !== -1) {
    orders[orderIndex].status = status;
    orders[orderIndex].notified = false; // Marcar para notificar
    saveOrders(orders);
  }
};

export const markAsNotified = (id: string): void => {
  const orders = getOrders();
  const orderIndex = orders.findIndex(order => order.id === id);
  if (orderIndex !== -1) {
    orders[orderIndex].notified = true;
    saveOrders(orders);
  }
};

export const deleteOrder = (id: string): void => {
  const orders = getOrders();
  const filteredOrders = orders.filter(order => order.id !== id);
  saveOrders(filteredOrders);
};

export const getTotalRevenue = (): number => {
  const orders = getOrders();
  return orders.reduce((sum, order) => sum + order.total, 0);
};

export const getOrdersByStatus = (status: OrderStatus): Order[] => {
  return getOrders().filter(order => order.status === status);
};