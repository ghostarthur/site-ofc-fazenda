import { Order, OrderStatus } from '../types';
import { Trash2, Package } from 'lucide-react';

interface OrdersTableProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: OrderStatus) => void;
  onDeleteOrder: (id: string) => void;
}

export function OrdersTable({ orders, onUpdateStatus, onDeleteOrder }: OrdersTableProps) {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Em processo':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Entregue':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Finalizado':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Pedidos Registrados</h2>
            <p className="text-sm text-gray-500">{orders.length} pedidos no sistema</p>
          </div>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="p-12 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Nenhum pedido registrado ainda</p>
          <p className="text-gray-400 text-sm mt-2">Crie seu primeiro pedido usando o formulário acima</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  🥕 Cenoura
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  🥔 Batata
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  🍅 Tomate
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Parceiro
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">{order.nome}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(order.data).toLocaleDateString('pt-PT')}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-700 rounded-lg font-semibold">
                      {order.cenoura}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-700 rounded-lg font-semibold">
                      {order.batata}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-12 h-12 bg-red-100 text-red-700 rounded-lg font-semibold">
                      {order.tomate}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {order.parceiro ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                        ✓ Sim
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                        Não
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <p className="text-lg font-bold text-green-600">€{order.total.toFixed(2)}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <select
                      value={order.status}
                      onChange={(e) => onUpdateStatus(order.id, e.target.value as OrderStatus)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border cursor-pointer outline-none transition ${getStatusColor(order.status)}`}
                    >
                      <option value="Em processo">Em processo</option>
                      <option value="Entregue">Entregue</option>
                      <option value="Finalizado">Finalizado</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => onDeleteOrder(order.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition group"
                      title="Excluir pedido"
                    >
                      <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
