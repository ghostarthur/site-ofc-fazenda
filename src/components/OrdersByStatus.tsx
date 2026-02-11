import { Order, OrderStatus } from '../types';
import { OrderCard } from './OrderCard';
import { Clock, Loader, CheckCircle, Truck } from 'lucide-react';

interface OrdersByStatusProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: OrderStatus) => void;
  onDeleteOrder: (id: string) => void;
}

export function OrdersByStatus({ orders, onUpdateStatus, onDeleteOrder }: OrdersByStatusProps) {
  const statusConfig = [
    {
      status: 'Aguardando' as OrderStatus,
      title: 'Aguardando',
      icon: Clock,
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700',
    },
    {
      status: 'Processando' as OrderStatus,
      title: 'Processando',
      icon: Loader,
      color: 'orange',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
    },
    {
      status: 'Finalizado' as OrderStatus,
      title: 'Finalizados',
      icon: CheckCircle,
      color: 'purple',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
    },
    {
      status: 'Entregue' as OrderStatus,
      title: 'Entregues',
      icon: Truck,
      color: 'teal',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      textColor: 'text-teal-700',
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
      {statusConfig.map((config) => {
        const statusOrders = orders.filter(order => order.status === config.status);
        
        return (
          <div key={config.status} className="space-y-4">
            {/* Header */}
            <div className={`${config.bgColor} border-2 ${config.borderColor} rounded-xl p-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <config.icon className={`w-5 h-5 ${config.textColor}`} />
                  <h3 className={`font-bold ${config.textColor}`}>{config.title}</h3>
                </div>
                <span className={`${config.bgColor} ${config.textColor} font-bold text-lg px-3 py-1 rounded-full border ${config.borderColor}`}>
                  {statusOrders.length}
                </span>
              </div>
            </div>

            {/* Orders */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {statusOrders.length === 0 ? (
                <div className={`${config.bgColor} border ${config.borderColor} rounded-lg p-6 text-center`}>
                  <config.icon className={`w-12 h-12 ${config.textColor} opacity-30 mx-auto mb-2`} />
                  <p className={`text-sm ${config.textColor} opacity-70`}>
                    Nenhum pedido
                  </p>
                </div>
              ) : (
                statusOrders.map(order => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onUpdateStatus={onUpdateStatus}
                    onDeleteOrder={onDeleteOrder}
                    statusColor={config.color}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
