import { useState } from 'react';
import { PlusCircle, Carrot, Loader } from 'lucide-react';
import { calculateTotal } from '../utils/orders';

interface OrderFormProps {
  onAddOrder: (
    nome: string,
    cenoura: number,
    batata: number,
    tomate: number,
    parceiro: boolean
  ) => void;
}

export function OrderForm({ onAddOrder }: OrderFormProps) {
  const [nome, setNome] = useState('');
  const [cenoura, setCenoura] = useState(0);
  const [batata, setBatata] = useState(0);
  const [tomate, setTomate] = useState(0);
  const [parceiro, setParceiro] = useState(false);

  const total = calculateTotal(cenoura, batata, tomate, parceiro);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddOrder(nome, cenoura, batata, tomate, parceiro);
    // Reset form
    setNome('');
    setCenoura(0);
    setBatata(0);
    setTomate(0);
    setParceiro(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg">
          <PlusCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Novo Pedido</h2>
          <p className="text-sm text-gray-500">Preencha os dados do pedido</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Nome do Cliente */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome do Cliente
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              placeholder="Digite o nome do cliente"
              required
            />
          </div>

          {/* Cenoura */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🥕 Cenoura (kg)
            </label>
            <input
              type="number"
              min="0"
              value={cenoura}
              onChange={(e) => setCenoura(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              placeholder="0"
            />
          </div>

          {/* Batata */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🥔 Batata (kg)
            </label>
            <input
              type="number"
              min="0"
              value={batata}
              onChange={(e) => setBatata(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              placeholder="0"
            />
          </div>

          {/* Tomate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🍅 Tomate (kg)
            </label>
            <input
              type="number"
              min="0"
              value={tomate}
              onChange={(e) => setTomate(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              placeholder="0"
            />
          </div>

          {/* Parceiro */}
          <div className="flex items-center">
            <div className="flex items-center h-full">
              <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                <input
                  type="checkbox"
                  checked={parceiro}
                  onChange={(e) => setParceiro(e.target.checked)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Estabelecimento Parceiro (€10/kg)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Preview do Total */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Valor Total do Pedido</p>
              <p className="text-xs text-gray-500 mt-1">
                {cenoura + batata + tomate} kg × €{parceiro ? '10' : '15'}/kg
              </p>
            </div>
            <p className="text-3xl font-bold text-green-600">€{total.toFixed(2)}</p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transform hover:scale-[1.02] transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          Criar Pedido
        </button>
      </form>
    </div>
  );
}
