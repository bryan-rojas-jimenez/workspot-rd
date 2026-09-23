'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import FilterBar from '@/components/FilterBar';
import SpotCard from '@/components/SpotCard';
import DynamicMapComponent from '@/components/DynamicMap';
import ReportModal from '@/components/ReportModal';
import ReviewModal from '@/components/ReviewModal';
import AddSpotModal from '@/components/AddSpotModal';
import { Map, Grid, ShieldCheck, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

export default function Home() {
  const [spots, setSpots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [zone, setZone] = useState('All');
  const [filter, setFilter] = useState('');
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'dual' | 'grid' | 'map'>('dual');

  // Modals state
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isAddSpotModalOpen, setIsAddSpotModalOpen] = useState(false);
  const [activeSpotForModal, setActiveSpotForModal] = useState<any | null>(null);

  const fetchSpots = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category !== 'All') params.append('category', category);
      if (zone !== 'All') params.append('zone', zone);
      if (filter) params.append('filter', filter);

      const res = await fetch(`/api/spots?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setSpots(data);
      }
    } catch (err) {
      console.error('Error fetching spots:', err);
    } finally {
      setLoading(false);
    }
  }, [search, category, zone, filter]);

  useEffect(() => {
    fetchSpots();
  }, [fetchSpots]);

  const handleOpenReportModal = (spot: any) => {
    setActiveSpotForModal(spot);
    setIsReportModalOpen(true);
  };

  const handleOpenReviewModal = (spot: any) => {
    setActiveSpotForModal(spot);
    setIsReviewModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header Navbar */}
      <Navbar onOpenAddSpot={() => setIsAddSpotModalOpen(true)} spotCount={spots.length} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Mapa Colaborativo de Enfocabilidad en Tiempo Real
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-3">
              Encuentra tu próximo lugar para <span className="text-sky-400">trabajar sin interrupciones</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Monitorea en tiempo real el nivel de ruido, la velocidad del Wi-Fi y la disponibilidad de tomacorrientes en cafeterías, coworkings y bibliotecas de Santo Domingo.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Filter Bar Component */}
        <FilterBar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          zone={zone}
          setZone={setZone}
          filter={filter}
          setFilter={setFilter}
        />

        {/* View Switcher & Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">
              Espacios disponibles ({spots.length})
            </h2>
            {loading && <RefreshCw className="w-4 h-4 text-sky-600 animate-spin" />}
          </div>

          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm text-xs font-semibold">
            <button
              onClick={() => setViewMode('dual')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                viewMode === 'dual' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Map className="w-3.5 h-3.5" /> Mapa + Lista
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                viewMode === 'grid' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5" /> Solo Lista
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                viewMode === 'map' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Map className="w-3.5 h-3.5" /> Solo Mapa
            </button>
          </div>
        </div>

        {/* B2B Verified Banner Info */}
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 mb-8 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-emerald-800/40">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-emerald-300 flex items-center gap-2">
                ¿Tienes una cafetería o espacio de trabajo en Santo Domingo?
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Verifica tu local bajo el modelo <strong>WorkSpot B2B</strong> para recibir tráfico constante de freelancers y ofrecer descuentos exclusivos.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAddSpotModalOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-md shrink-0"
          >
            Afiliar mi Local (B2B)
          </button>
        </div>

        {/* Dynamic Layout according to viewMode */}
        {spots.length === 0 && !loading ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-md mx-auto my-12">
            <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-800 text-base mb-1">No se encontraron espacios</h3>
            <p className="text-xs text-slate-500 mb-4">Prueba ajustando los filtros de búsqueda o categoría.</p>
            <button
              onClick={() => {
                setSearch('');
                setCategory('All');
                setZone('All');
                setFilter('');
              }}
              className="bg-slate-900 text-white text-xs px-4 py-2 rounded-xl font-semibold hover:bg-slate-800 transition"
            >
              Limpiar Filtros
            </button>
          </div>
        ) : (
          <div>
            {viewMode === 'dual' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {spots.map((spot) => (
                    <SpotCard
                      key={spot.id}
                      spot={spot}
                      isSelected={spot.id === selectedSpotId}
                      onSelect={() => setSelectedSpotId(spot.id)}
                      onOpenReportModal={handleOpenReportModal}
                      onOpenReviewModal={handleOpenReviewModal}
                    />
                  ))}
                </div>
                <div className="lg:col-span-5 sticky top-20 h-[650px]">
                  <DynamicMapComponent
                    spots={spots}
                    selectedSpotId={selectedSpotId}
                    onSelectSpot={(id) => setSelectedSpotId(id)}
                  />
                </div>
              </div>
            )}

            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {spots.map((spot) => (
                  <SpotCard
                    key={spot.id}
                    spot={spot}
                    isSelected={spot.id === selectedSpotId}
                    onSelect={() => setSelectedSpotId(spot.id)}
                    onOpenReportModal={handleOpenReportModal}
                    onOpenReviewModal={handleOpenReviewModal}
                  />
                ))}
              </div>
            )}

            {viewMode === 'map' && (
              <div className="h-[750px] w-full">
                <DynamicMapComponent
                  spots={spots}
                  selectedSpotId={selectedSpotId}
                  onSelectSpot={(id) => setSelectedSpotId(id)}
                />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-xs mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-medium text-slate-300 mb-1">
            WorkSpot RD &copy; 2026 - Proyecto de Formulación de Proyectos Emprendedores (UAPA)
          </p>
          <p className="text-slate-500">
            Desarrollado por <strong>Bryan A. Rojas Jiménez</strong> (Matrícula: 100083212)
          </p>
        </div>
      </footer>

      {/* Modals */}
      <ReportModal
        spot={activeSpotForModal}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSuccess={fetchSpots}
      />

      <ReviewModal
        spot={activeSpotForModal}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSuccess={fetchSpots}
      />

      <AddSpotModal
        isOpen={isAddSpotModalOpen}
        onClose={() => setIsAddSpotModalOpen(false)}
        onSuccess={fetchSpots}
      />
    </div>
  );
}
