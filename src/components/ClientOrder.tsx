import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Sprout, ShoppingCart, CheckCircle, ArrowLeft } from 'lucide-react';
import { addOrder } from '../utils/orders';
import { getActiveProducts } from '../utils/products';
import { Product } from '../types';

export function ClientOrder() {
  const [products, setProducts] = useState<Product[]>([]);
  const [nome, setNome] = useState('');
  const [estabelecimento, setEstabelecimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [parceiro, setParceiro] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const activeProducts = getActiveProducts();
    setProducts(activeProducts);
    // Initialize quantities
    const initialQuantities: { [key: string]: number } = {};
    activeProducts.forEach(product => {
      initialQuantities[product.id] = 0;
    });
    setQuantities(initialQuantities);
  }, []);

  const calculateTotal = () => {
    let total = 0;
    products.forEach(product => {
      const quantity = quantities[product.id] || 0;
      const price = parceiro ? product.priceParceiro : product.priceNormal;
      total += quantity * price;
    });
    return total;
  };

  const getTotalWeight = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const total = calculateTotal();
  const totalWeight = getTotalWeight();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare items
    const items = products
      .filter(product => quantities[product.id] > 0)
      .map(product => ({
        productId: product.id,
        productName: product.name,
        quantity: quantities[product.id],
      }));

    if (items.length === 0) {
      alert('Por favor, selecione pelo menos um produto');
      return;
    }

    addOrder(nome, items, parceiro, estabelecimento, telefone);
    setSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setNome('');
      setEstabelecimento('');
      setTelefone('');
      const resetQuantities: { [key: string]: number } = {};
      products.forEach(product => {
        resetQuantities[product.id] = 0;
      });
      setQuantities(resetQuantities);
      setParceiro(false);
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center space-y-6">
          <div className="flex justify-center">
            <div className="bg-green-100 p-6 rounded-full">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Pedido Enviado!
            </h2>
            <p className="text-gray-600">
              Seu pedido foi registrado com sucesso. Entraremos em contato em breve!
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">Resumo do Pedido</p>
            <p className="text-2xl font-bold text-green-600">€{total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg">
              <Sprout className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Fazenda Herança da Terra
          </h1>
          <p className="text-xl text-gray-600">Faça seu pedido de produtos frescos</p>
        </div>

        {/* Back to Home Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
        </div>

        {/* Order Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Novo Pedido</h2>
              <p className="text-sm text-gray-500">Preencha seus dados e escolha os produtos</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dados do Cliente */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 text-lg">Seus Dados</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Pessoa *
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  placeholder="Digite seu nome"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estabelecimento
                  </label>
                  <input
                    type="text"
                    value={estabelecimento}
                    onChange={(e) => setEstabelecimento(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                    placeholder="Nome do seu estabelecimento"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                    placeholder="+351 000 000 000"
                  />
                </div>
              </div>
            </div>

            {/* Produtos */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 text-lg">Selecione os Produtos</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 hover:shadow-lg transition"
                  >
                    <div className="text-center mb-3">
                      <div className="text-5xl mb-2">{product.emoji}</div>
                      <h4 className="font-bold text-gray-800">{product.name}</h4>
                      <p className="text-xs text-gray-600">
                        €{parceiro ? product.priceParceiro : product.priceNormal}/kg
                      </p>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={quantities[product.id] || 0}
                      onChange={(e) => setQuantities({
                        ...quantities,
                        [product.id]: Number(e.target.value)
                      })}
                      className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition text-center font-semibold"
                      placeholder="0 kg"
                    />
                  </div>
                ))}
              </div>

              {products.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Nenhum produto disponível no momento
                </div>
              )}
            </div>

            {/* Tipo de Cliente */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 text-lg">Tipo de Cliente</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setParceiro(false)}
                  className={`p-6 border-2 rounded-xl transition-all ${
                    !parceiro
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">👤</div>
                    <h4 className="font-bold text-gray-800 mb-1">Cliente Normal</h4>
                    <p className="text-xs text-gray-500 mt-2">Preço padrão</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setParceiro(true)}
                  className={`p-6 border-2 rounded-xl transition-all ${
                    parceiro
                      ? 'border-green-500 bg-green-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">🏪</div>
                    <h4 className="font-bold text-gray-800 mb-1">Estabelecimento Parceiro</h4>
                    <p className="text-xs text-gray-500 mt-2">Desconto especial</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Total Preview */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">Total do Pedido</p>
                  <p className="text-lg">{totalWeight} kg total</p>
                </div>
                <div className="text-right">
                  <p className="text-5xl font-bold">€{total.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={totalWeight === 0}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-[1.02] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-6 h-6" />
              Finalizar Pedido
            </button>

            <p className="text-center text-sm text-gray-500">
              Ao enviar o pedido, nossa equipe entrará em contato para confirmar os detalhes e combinar a entrega.
            </p>
          </form>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-2">
            Produtos frescos direto da fazenda para sua mesa
          </p>
          <button
            onClick={() => navigate('/')}
            className="text-green-600 hover:text-green-700 font-semibold"
          >
            Área Administrativa →
          </button>
        </div>
      </div>
    </div>
  );
}