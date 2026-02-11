import { useNavigate } from 'react-router';
import { Sprout, ShoppingCart, Shield } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-3xl shadow-2xl">
              <Sprout className="w-20 h-20 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Fazenda Herança da Terra
          </h1>
          <p className="text-xl text-gray-600">
            Produtos frescos e de qualidade direto da fazenda
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cliente - Fazer Pedido */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition-all transform hover:scale-[1.02]">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl shadow-lg">
                  <ShoppingCart className="w-12 h-12 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Fazer Pedido
                </h2>
                <p className="text-gray-600 mb-6">
                  Escolha seus produtos e faça seu pedido online
                </p>
              </div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Produtos frescos: cenoura, batata e tomate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Desconto especial para parceiros</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Entrega rápida e segura</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/pedido')}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-[1.02] transition-all shadow-lg"
              >
                Fazer Meu Pedido
              </button>
            </div>
          </div>

          {/* Admin - Área Administrativa */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition-all transform hover:scale-[1.02]">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-lg">
                  <Shield className="w-12 h-12 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Área Administrativa
                </h2>
                <p className="text-gray-600 mb-6">
                  Gerencie pedidos e acompanhe o faturamento
                </p>
              </div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span className="text-gray-700">Dashboard completo com estatísticas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span className="text-gray-700">Controle de status dos pedidos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span className="text-gray-700">Relatório de faturamento total</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02] transition-all shadow-lg"
              >
                Acessar Painel Admin
              </button>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-lg p-6 inline-block">
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Preços:</span> €15/kg (cliente normal) | €10/kg (parceiro)
            </p>
            <p className="text-gray-500 text-sm">
              Produtos disponíveis: Cenoura 🥕 • Batata 🥔 • Tomate 🍅
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
