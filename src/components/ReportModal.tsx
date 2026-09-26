'use client';

import { useState } from 'react';
import { X, Radio, Wifi, Volume2, Zap, Users } from 'lucide-react';

interface Spot {
  id: string;
  name: string;
}

interface ReportModalProps {
  spot: Spot | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReportModal({ spot, isOpen, onClose, onSuccess }: ReportModalProps) {
  const [wifiRating, setWifiRating] = useState('Fast');
  const [noiseLevel, setNoiseLevel] = useState('Quiet');
  const [outlets, setOutlets] = useState('Abundant');
  const [occupancy, setOccupancy] = useState('Medium');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !spot) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spotId: spot.id,
          wifiRating,
          noiseLevel,
          outlets,
          occupancy,
          comment,
        }),
      });

      if (!res.ok) {
        throw new Error('Error al enviar reporte en vivo');
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-sky-600 mb-1">
          <Radio className="w-5 h-5 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider">Reporte Colaborativo en Vivo</span>
        </div>

        <h2 className="text-xl font-extrabold text-slate-900 mb-1">{spot.name}</h2>
        <p className="text-xs text-slate-500 mb-6">
          Actualiza la información en tiempo real para ayudar a la comunidad de trabajadores remotos.
        </p>

        {error && <div className="p-3 mb-4 text-xs bg-rose-50 text-rose-700 rounded-xl">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {/* Wi-Fi Rating */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <Wifi className="w-4 h-4 text-sky-600" /> Vel. de Wi-Fi Actual
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'Fast', label: '⚡ Fast (Fibra)' },
                { id: 'Medium', label: '📶 Normal' },
                { id: 'Slow', label: '🐢 Lento' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setWifiRating(item.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition ${
                    wifiRating === item.id
                      ? 'bg-sky-50 border-sky-500 text-sky-700 font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Noise Level */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-indigo-600" /> Nivel de Ruido Ambiental
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'Quiet', label: '🤫 Silencioso' },
                { id: 'Moderate', label: '☕ Moderado' },
                { id: 'Loud', label: '🔊 Ruidoso' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setNoiseLevel(item.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition ${
                    noiseLevel === item.id
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Outlets Availability */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" /> Disponibilidad de Enchufes
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'Abundant', label: '🔌 Abundantes' },
                { id: 'Scarce', label: '⚠️ Escasos' },
                { id: 'None', label: '🚫 Ninguno' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setOutlets(item.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition ${
                    outlets === item.id
                      ? 'bg-amber-50 border-amber-500 text-amber-700 font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Occupancy Level */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-slate-600" /> Ocupación Actual del Local
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'Low', label: '🟢 Baja' },
                { id: 'Medium', label: '🟡 Media' },
                { id: 'High', label: '🔴 Llena' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setOccupancy(item.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition ${
                    occupancy === item.id
                      ? 'bg-slate-100 border-slate-600 text-slate-900 font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Comment */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Comentario Adicional (Opcional)</label>
            <input
              type="text"
              placeholder="Ej: Hay mesa libre cerca de la ventana con tomacorriente..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-xl font-bold text-xs transition shadow-md disabled:opacity-50"
            >
              {loading ? 'Enviando Reporte...' : 'Publicar Reporte en Vivo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
