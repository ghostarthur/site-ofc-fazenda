import { Sprout, LayoutDashboard, Package, Apple, LogOut } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onLogout: () => void;
  activeTab: 'pedidos' | 'produtos';
  onTabChange: (tab: 'pedidos' | 'produtos') => void;
}

export function Sidebar({ isOpen, onLogout, activeTab, onTabChange }: SidebarProps) {
  return (
    <aside
      className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-20 w-64 bg-gradient-to-b from-green-600 to-emerald-700 text-white transition-transform duration-300 ease-in-out flex flex-col`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-green-500">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-lg">
            <Sprout className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Fazenda</h2>
            <p className="text-xs text-green-100">Herança da Terra</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <button
          onClick={() => onTabChange('pedidos')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            activeTab === 'pedidos'
              ? 'bg-green-700 shadow-lg'
              : 'hover:bg-green-700'
          }`}
        >
          <Package className="w-5 h-5" />
          <span className="font-medium">Pedidos</span>
        </button>
        <button
          onClick={() => onTabChange('produtos')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            activeTab === 'produtos'
              ? 'bg-green-700 shadow-lg'
              : 'hover:bg-green-700'
          }`}
        >
          <Apple className="w-5 h-5" />
          <span className="font-medium">Produtos</span>
        </button>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-green-500">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-700 transition text-red-100 hover:text-white"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
}
