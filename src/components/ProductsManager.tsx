import { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../utils/products';
import { Product } from '../types';
import { Plus, Edit2, Trash2, Apple, Check, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    emoji: '',
    priceNormal: 15,
    priceParceiro: 10,
  });

  const loadProducts = () => {
    setProducts(getProducts());
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      emoji: '',
      priceNormal: 15,
      priceParceiro: 10,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      updateProduct(editingId, formData);
      toast.success('Produto atualizado com sucesso!');
    } else {
      addProduct(
        formData.name,
        formData.emoji,
        formData.priceNormal,
        formData.priceParceiro
      );
      toast.success('Produto adicionado com sucesso!');
    }
    
    loadProducts();
    resetForm();
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      emoji: product.emoji,
      priceNormal: product.priceNormal,
      priceParceiro: product.priceParceiro,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      deleteProduct(id);
      loadProducts();
      toast.success('Produto excluído com sucesso!');
    }
  };

  const handleToggleActive = (product: Product) => {
    updateProduct(product.id, { active: !product.active });
    loadProducts();
    toast.success(product.active ? 'Produto desativado' : 'Produto ativado');
  };

  const emojiSuggestions = ['🥕', '🥔', '🍅', '🥬', '🥒', '🫑', '🌽', '🧄', '🧅', '🥦', '🍆', '🍋', '🍊', '🍎', '🍌', '🍇', '🍓', '🥝'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg">
              <Apple className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Produtos Disponíveis</h2>
              <p className="text-sm text-gray-500">{products.length} produtos cadastrados</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Adicionar Produto
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">
              {editingId ? 'Editar Produto' : 'Novo Produto'}
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Produto
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  placeholder="Ex: Alface"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emoji
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.emoji}
                    onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                    placeholder="🥬"
                    maxLength={2}
                    required
                  />
                  <div className="mt-2 flex flex-wrap gap-1">
                    {emojiSuggestions.map(emoji => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setFormData({ ...formData, emoji })}
                        className="text-2xl hover:bg-gray-100 p-1 rounded transition"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço Normal (€/kg)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.priceNormal}
                  onChange={(e) => setFormData({ ...formData, priceNormal: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço Parceiro (€/kg)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.priceParceiro}
                  onChange={(e) => setFormData({ ...formData, priceParceiro: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg"
              >
                {editingId ? 'Atualizar' : 'Adicionar'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className={`bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border-2 ${
              product.active ? 'border-green-200' : 'border-gray-200 opacity-60'
            }`}
          >
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">{product.emoji}</div>
              <h3 className="font-bold text-gray-800 text-lg">{product.name}</h3>
              {!product.active && (
                <span className="text-xs text-red-600 font-semibold">Desativado</span>
              )}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Normal:</span>
                <span className="font-bold text-gray-800">€{product.priceNormal.toFixed(2)}/kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Parceiro:</span>
                <span className="font-bold text-green-600">€{product.priceParceiro.toFixed(2)}/kg</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleToggleActive(product)}
                className={`flex-1 py-2 rounded-lg font-semibold transition ${
                  product.active
                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
                title={product.active ? 'Desativar' : 'Ativar'}
              >
                {product.active ? 'Desativar' : 'Ativar'}
              </button>
              <button
                onClick={() => handleEdit(product)}
                className="p-2 hover:bg-blue-50 rounded-lg transition group"
                title="Editar"
              >
                <Edit2 className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition" />
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="p-2 hover:bg-red-50 rounded-lg transition group"
                title="Excluir"
              >
                <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <Apple className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Nenhum produto cadastrado</p>
          <p className="text-gray-400 text-sm mt-2">Clique em "Adicionar Produto" para começar</p>
        </div>
      )}
    </div>
  );
}
