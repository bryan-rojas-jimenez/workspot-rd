'use client';

import dynamic from 'next/dynamic';

const DynamicMapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] md:h-full bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center text-slate-400 font-medium">
      Cargando mapa interactivo de Santo Domingo...
    </div>
  ),
});

export default DynamicMapComponent;
