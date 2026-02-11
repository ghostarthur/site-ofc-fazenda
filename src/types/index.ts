export type OrderStatus = 'Aguardando' | 'Processando' | 'Finalizado' | 'Entregue';

export interface Product {
  id: string;
  name: string;
  emoji: string;
  priceNormal: number;
  priceParceiro: number;
  active: boolean;
}

export interface Order {
  id: string;
  nome: string;
  estabelecimento?: string;
  telefone?: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
  }[];
  parceiro: boolean;
  status: OrderStatus;
  total: number;
  data: string;
  notified: boolean;
}

export interface User {
  id: string;
  username: string;
  password: string;
}