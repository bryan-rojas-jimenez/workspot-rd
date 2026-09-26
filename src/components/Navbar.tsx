'use client';

import { MapPin, Plus, ShieldCheck, Sparkles, Layers } from 'lucide-react';

interface NavbarProps {
  onOpenAddSpot: () => void;
  spotCount: number;
}

export default function Navbar({ onOpenAddSpot, spotCount }: NavbarProps) {
  return (
    <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800 backdrop-blur-lg bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white">WorkSpot</span>
              <span className="text-[10px] font-bold bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded-full border border-sky-500/30 uppercase tracking-widest">
                RD Live
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Plataforma colaborativa para trabajo remoto</p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span><strong>{spotCount}</strong> espacios activos en SD</span>
          </div>

          <button
            onClick={onOpenAddSpot}
            className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-md shadow-sky-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Registrar Espacio</span>
          </button>
        </div>
      </div>
    </header>
  );
}
