import { useNavigate } from "react-router-dom";
import { Sprout, ShoppingCart, Shield } from "lucide-react";

function Home() {
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
          {/* Cliente */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition-all transform hover:scale-[1.02]">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl shadow-lg">
                  <ShoppingCart className="w-12 h-12 text-white" />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-800">
                Fazer Pedido
              </h2>

              <button
                onClick={() => navigate("/pedido")}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-[1.02] transition-all shadow-lg"
              >
                Fazer Meu Pedido
              </button>
            </div>
          </div>

          {/* Admin */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition-all transform hover:scale-[1.02]">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-lg">
                  <Shield className="w-12 h-12 text-white" />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-800">
                Área Administrativa
              </h2>

              <button
                onClick={() => navigate("/login")}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02] transition-all shadow-lg"
              >
                Acessar Painel Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
