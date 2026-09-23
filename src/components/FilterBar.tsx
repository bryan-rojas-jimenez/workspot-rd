'use client';

import { Search, Filter, ShieldCheck, Wifi, Volume2, Zap } from 'lucide-react';

interface FilterBarProps {
  search: string;
  setSearch: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  zone: string;
  setZone: (val: string) => void;
  filter: string;
  setFilter: (val: string) => void;
}

export default function FilterBar({
  search,
  setSearch,
  category,
  setCategory,
  zone,
  setZone,
  filter,
  setFilter,
}: FilterBarProps) {
  const quickFilters = [
    { id: '', label: 'Todos' },
    { id: 'verified', label: 'Verificados B2B', icon: ShieldCheck, color: 'text-emerald-600' },
    { id: 'fast_wifi', label: 'Wi-Fi Rápido', icon: Wifi, color: 'text-sky-600' },
    { id: 'quiet', label: 'Silencioso', icon: Volume2, color: 'text-indigo-600' },
    { id: 'abundant_outlets', label: 'Tomacorrientes', icon: Zap, color: 'text-amber-500' },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-6 space-y-4">
      {/* Search Input & Select Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Buscar por nombre, calle o zona en Santo Domingo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>

        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none text-slate-700 font-medium"
          >
            <option value="All">Todas las Categorías</option>
            <option value="Cafe">Cafeterías</option>
            <option value="Coworking">Coworking Spaces</option>
            <option value="Library">Bibliotecas</option>
            <option value="Restaurant">Restaurantes / Bistros</option>
          </select>
        </div>

        <div>
          <select
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none text-slate-700 font-medium"
          >
            <option value="All">Todas las Zonas (SD)</option>
            <option value="Piantini">Piantini</option>
            <option value="Bella Vista">Bella Vista</option>
            <option value="Zona Colonial">Zona Colonial</option>
            <option value="Naco">Naco</option>
            <option value="Zona Universitaria">Zona Universitaria</option>
          </select>
        </div>
      </div>

      {/* Quick Filter Badges */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
          <Filter className="w-3 h-3" /> Filtros Rápidos:
        </span>
        {quickFilters.map((q) => {
          const Icon = q.icon;
          const isActive = filter === q.id;
          return (
            <button
              key={q.id}
              onClick={() => setFilter(isActive ? '' : q.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition flex items-center gap-1.5 ${
                isActive
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-400' : q.color}`} />}
              {q.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
