'use client';

import { Wifi, Volume2, Zap, Users, Star, ShieldCheck, MapPin, Radio } from 'lucide-react';

interface Report {
  id: string;
  noiseLevel: string;
  wifiRating: string;
  outlets: string;
  occupancy: string;
  comment?: string | null;
  createdAt: string;
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface Spot {
  id: string;
  name: string;
  category: string;
  address: string;
  zone: string;
  lat: number;
  lng: number;
  isVerified: boolean;
  verifiedPerk?: string | null;
  imageUrl?: string | null;
  wifiRating: string;
  noiseLevel: string;
  outlets: string;
  occupancy: string;
  overallScore: number;
  reports?: Report[];
  reviews?: Review[];
}

interface SpotCardProps {
  spot: Spot;
  isSelected?: boolean;
  onSelect?: () => void;
  onOpenReportModal?: (spot: Spot) => void;
  onOpenReviewModal?: (spot: Spot) => void;
}

export default function SpotCard({
  spot,
  isSelected,
  onSelect,
  onOpenReportModal,
  onOpenReviewModal,
}: SpotCardProps) {
  // Enfocabilidad Index Calculation
  const getFocusBadge = () => {
    if (spot.noiseLevel === 'Quiet' && spot.wifiRating === 'Fast' && spot.outlets === 'Abundant') {
      return { label: 'Enfocabilidad Óptima', bg: 'bg-emerald-500', text: 'text-white' };
    }
    if (spot.noiseLevel === 'Loud' || spot.wifiRating === 'Slow') {
      return { label: 'Concurrido / Concurrencia Alta', bg: 'bg-rose-500', text: 'text-white' };
    }
    return { label: 'Enfocabilidad Moderada', bg: 'bg-amber-500', text: 'text-white' };
  };

  const focusStatus = getFocusBadge();

  return (
    <div
      onClick={onSelect}
      className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer shadow-sm hover:shadow-md ${
        isSelected ? 'border-sky-500 ring-2 ring-sky-100' : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="relative mb-4 h-44 rounded-xl overflow-hidden bg-slate-100">
        {spot.imageUrl ? (
          <img src={spot.imageUrl} alt={spot.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">Sin Imagen</div>
        )}

        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm ${focusStatus.bg} ${focusStatus.text}`}>
            {focusStatus.label}
          </span>
          {spot.isVerified && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white flex items-center gap-1 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" /> Verificado B2B
            </span>
          )}
        </div>

        <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          {spot.overallScore.toFixed(1)}
        </div>
      </div>

      {/* Spot Info */}
      <div className="mb-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-600">{spot.category} • {spot.zone}</span>
        </div>
        <h3 className="font-bold text-lg text-slate-900 leading-tight mt-0.5">{spot.name}</h3>
        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
          <MapPin className="w-3.5 h-3.5 shrink-0" /> {spot.address}
        </p>
      </div>

      {/* Verified B2B Perk Banner */}
      {spot.isVerified && spot.verifiedPerk && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-xs text-emerald-900 mb-3 font-medium flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>{spot.verifiedPerk}</span>
        </div>
      )}

      {/* Live Status Indicators */}
      <div className="grid grid-cols-2 gap-2 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
            <Wifi className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-medium">Wi-Fi</div>
            <div className="font-semibold text-slate-700">
              {spot.wifiRating === 'Fast' ? 'Rápido (Fibra)' : spot.wifiRating === 'Medium' ? 'Moderado' : 'Lento'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <Volume2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-medium">Ruido</div>
            <div className="font-semibold text-slate-700">
              {spot.noiseLevel === 'Quiet' ? 'Silencioso' : spot.noiseLevel === 'Moderate' ? 'Moderado' : 'Ruidoso'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-medium">Tomacorrientes</div>
            <div className="font-semibold text-slate-700">
              {spot.outlets === 'Abundant' ? 'Abundantes' : spot.outlets === 'Scarce' ? 'Escasos' : 'Ninguno'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-medium">Ocupación</div>
            <div className="font-semibold text-slate-700">
              {spot.occupancy === 'Low' ? 'Baja' : spot.occupancy === 'Medium' ? 'Media' : 'Alta'}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenReportModal && onOpenReportModal(spot);
          }}
          className="flex-1 bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs py-2 px-3 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition"
        >
          <Radio className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
          Reportar en Vivo
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenReviewModal && onOpenReviewModal(spot);
          }}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs py-2 px-3 rounded-xl font-semibold flex items-center gap-1 transition"
        >
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          Reseñas ({spot.reviews?.length || 0})
        </button>
      </div>
    </div>
  );
}
