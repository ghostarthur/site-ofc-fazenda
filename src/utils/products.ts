import { Product } from '../types';

const PRODUCTS_KEY = 'fazenda_products';

// Produtos padrão
const DEFAULT_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Cenoura',
    emoji: '🥕',
    priceNormal: 15,
    priceParceiro: 10,
    active: true,
  },
  {
    id: '2',
    name: 'Batata',
    emoji: '🥔',
    priceNormal: 15,
    priceParceiro: 10,
    active: true,
  },
  {
    id: '3',
    name: 'Tomate',
    emoji: '🍅',
    priceNormal: 15,
    priceParceiro: 10,
    active: true,
  },
];

export const getProducts = (): Product[] => {
  const products = localStorage.getItem(PRODUCTS_KEY);
  if (!products) {
    // Inicializar com produtos padrão
    saveProducts(DEFAULT_PRODUCTS);
    return DEFAULT_PRODUCTS;
  }
  return JSON.parse(products);
};

export const saveProducts = (products: Product[]): void => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const addProduct = (
  name: string,
  emoji: string,
  priceNormal: number,
  priceParceiro: number
): Product => {
  const products = getProducts();
  const newProduct: Product = {
    id: Date.now().toString(),
    name,
    emoji,
    priceNormal,
    priceParceiro,
    active: true,
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
};

export const updateProduct = (
  id: string,
  updates: Partial<Product>
): void => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    saveProducts(products);
  }
};

export const deleteProduct = (id: string): void => {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  saveProducts(filtered);
};

export const getActiveProducts = (): Product[] => {
  return getProducts().filter(p => p.active);
};
