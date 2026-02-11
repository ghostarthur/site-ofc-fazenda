import { Euro, ShoppingCart, Clock, Loader, CheckCircle, Truck } from 'lucide-react';

interface StatsCardsProps {
  totalRevenue: number;
  totalOrders: number;
  ordersAguardando: number;
  ordersProcessando: number;
  ordersFinalizado: number;
  ordersEntregue: number;
}

export function StatsCards({
  totalRevenue,
  totalOrders,
  ordersAguardando,
  ordersProcessando,
  ordersFinalizado,
  ordersEntregue,
}: StatsCardsProps) {
  const stats = [
    {
      title: 'Faturamento Total',
      value: `€${totalRevenue.toFixed(2)}`,
      icon: Euro,
      color: 'bg-gradient-to-br from-green-500 to-emerald-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total de Pedidos',
      value: totalOrders,
      icon: ShoppingCart,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Aguardando',
      value: ordersAguardando,
      icon: Clock,
      color: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Processando',
      value: ordersProcessando,
      icon: Loader,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Finalizados',
      value: ordersFinalizado,
      icon: CheckCircle,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Entregues',
      value: ordersEntregue,
      icon: Truck,
      color: 'bg-gradient-to-br from-teal-500 to-teal-600',
      textColor: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex flex-col items-center text-center">
            <div className={`${stat.color} p-3 rounded-lg shadow-lg mb-3`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-500 text-xs font-medium mb-1">{stat.title}</p>
            <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
