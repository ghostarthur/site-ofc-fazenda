import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { logout } from '../utils/auth';
import { getOrders, getTotalRevenue, updateOrderStatus, deleteOrder, markAsNotified } from '../utils/orders';
import { sendNotification } from '../utils/notifications';
import { Order } from '../types';
import { Sidebar } from './Sidebar';
import { StatsCards } from './StatsCards';
import { OrdersByStatus } from './OrdersByStatus';
import { ProductsManager } from './ProductsManager';
import { Menu } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type TabType = 'pedidos' | 'produtos';

export function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('pedidos');
  const navigate = useNavigate();

  const loadOrders = () => {
    setOrders(getOrders());
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleUpdateStatus = (id: string, status: Order['status']) => {
    updateOrderStatus(id, status);
    loadOrders();
    
    // Enviar notificação
    const order = orders.find(o => o.id === id);
    if (order) {
      const updatedOrder = { ...order, status };
      if (sendNotification(updatedOrder)) {
        markAsNotified(id);
        toast.success(`Cliente notificado sobre o status: ${status}`);
      }
    }
  };

  const handleDeleteOrder = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
      deleteOrder(id);
      loadOrders();
      toast.success('Pedido excluído com sucesso');
    }
  };

  const totalRevenue = getTotalRevenue();
  const totalOrders = orders.length;
  const ordersAguardando = orders.filter(o => o.status === 'Aguardando').length;
  const ordersProcessando = orders.filter(o => o.status === 'Processando').length;
  const ordersFinalizado = orders.filter(o => o.status === 'Finalizado').length;
  const ordersEntregue = orders.filter(o => o.status === 'Entregue').length;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onLogout={handleLogout}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {activeTab === 'pedidos' ? 'Gestão de Pedidos' : 'Gestão de Produtos'}
                </h1>
                <p className="text-sm text-gray-500">
                  {activeTab === 'pedidos' 
                    ? 'Gerencie e acompanhe todos os pedidos' 
                    : 'Adicione e gerencie produtos disponíveis'}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'pedidos' ? (
            <>
              {/* Stats Cards */}
              <StatsCards
                totalRevenue={totalRevenue}
                totalOrders={totalOrders}
                ordersAguardando={ordersAguardando}
                ordersProcessando={ordersProcessando}
                ordersFinalizado={ordersFinalizado}
                ordersEntregue={ordersEntregue}
              />

              {/* Orders by Status */}
              <OrdersByStatus
                orders={orders}
                onUpdateStatus={handleUpdateStatus}
                onDeleteOrder={handleDeleteOrder}
              />
            </>
          ) : (
            <ProductsManager />
          )}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
