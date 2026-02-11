import { Order, OrderStatus } from '../types';
import { Trash2, Bell, BellOff } from 'lucide-react';

interface OrderCardProps {
  order: Order;
  onUpdateStatus: (id: string, status: OrderStatus) => void;
  onDeleteOrder: (id: string) => void;
  statusColor: string;
}

export function OrderCard({ order, onUpdateStatus, onDeleteOrder, statusColor }: OrderCardProps) {
  const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    const flow: OrderStatus[] = ['Aguardando', 'Processando', 'Finalizado', 'Entregue'];
    const currentIndex = flow.indexOf(currentStatus);
    if (currentIndex < flow.length - 1) {
      return flow[currentIndex + 1];
    }
    return null;
  };

  const nextStatus = getNextStatus(order.status);

  const statusButtonColors = {
    yellow: 'bg-yellow-500 hover:bg-yellow-600',
    orange: 'bg-orange-500 hover:bg-orange-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
    teal: 'bg-teal-500 hover:bg-teal-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className={`bg-${statusColor}-50 border-b border-${statusColor}-200 px-4 py-3`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-bold text-gray-800">{order.nome}</h4>
            <p className="text-xs text-gray-500">
              {new Date(order.data).toLocaleDateString('pt-PT', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          <div className="flex items-center gap-1">
            {order.notified ? (
              <BellOff className="w-4 h-4 text-gray-400" title="Cliente já notificado" />
            ) : (
              <Bell className="w-4 h-4 text-green-600 animate-pulse" title="Notificação pendente" />
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Contact Info */}
        {(order.estabelecimento || order.telefone) && (
          <div className="text-xs space-y-1 pb-2 border-b border-gray-200">
            {order.estabelecimento && (
              <p className="text-gray-600">🏪 {order.estabelecimento}</p>
            )}
            {order.telefone && (
              <p className="text-gray-600">📱 {order.telefone}</p>
            )}
          </div>
        )}

        {/* Items */}
        <div className="space-y-1">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-gray-700">{item.productName}</span>
              <span className="font-semibold text-gray-800">{item.quantity} kg</span>
            </div>
          ))}
        </div>

        {/* Parceiro Badge */}
        {order.parceiro && (
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
            🏪 Parceiro
          </div>
        )}

        {/* Total */}
        <div className="pt-2 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Total</span>
            <span className="text-xl font-bold text-green-600">€{order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {nextStatus && (
            <button
              onClick={() => onUpdateStatus(order.id, nextStatus)}
              className={`flex-1 ${statusButtonColors[statusColor as keyof typeof statusButtonColors]} text-white py-2 rounded-lg font-semibold text-sm transition-all hover:shadow-md`}
            >
              {nextStatus === 'Processando' && '▶ Processar'}
              {nextStatus === 'Finalizado' && '✓ Finalizar'}
              {nextStatus === 'Entregue' && '🚚 Entregar'}
            </button>
          )}
          <button
            onClick={() => onDeleteOrder(order.id)}
            className="p-2 hover:bg-red-50 rounded-lg transition group"
            title="Excluir pedido"
          >
            <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition" />
          </button>
        </div>
      </div>
    </div>
  );
}