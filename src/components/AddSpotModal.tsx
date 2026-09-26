'use client';

import { useState } from 'react';
import { X, PlusCircle, Building2, MapPin, ShieldCheck, Sparkles } from 'lucide-react';

interface AddSpotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddSpotModal({ isOpen, onClose, onSuccess }: AddSpotModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Cafe');
  const [address, setAddress] = useState('');
  const [zone, setZone] = useState('Piantini');
  const [lat, setLat] = useState('18.4712');
  const [lng, setLng] = useState('-69.9320');
  const [isVerified, setIsVerified] = useState(false);
  const [verifiedPerk, setVerifiedPerk] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [wifiRating, setWifiRating] = useState('Fast');
  const [noiseLevel, setNoiseLevel] = useState('Quiet');
  const [outlets, setOutlets] = useState('Abundant');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address || !zone) {
      setError('Por favor completa todos los campos requeridos.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          category,
          address,
          zone,
          lat: parseFloat(lat),
          lng: parseFloat(lng),
          isVerified,
          verifiedPerk,
          imageUrl,
          wifiRating,
          noiseLevel,
          outlets,
        }),
      });

      if (!res.ok) {
        throw new Error('Error al registrar el nuevo espacio');
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
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-sky-600 mb-1">
          <Building2 className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Registrar Espacio de Trabajo</span>
        </div>

        <h2 className="text-xl font-extrabold text-slate-900 mb-1">Agregar Nuevo WorkSpot</h2>
        <p className="text-xs text-slate-500 mb-5">
          Registra una cafetería, coworking o espacio público apto para la comunidad remota en RD.
        </p>

        {error && <div className="p-3 mb-4 text-xs bg-rose-50 text-rose-700 rounded-xl">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Nombre del Espacio / Comercio *</label>
            <input
              type="text"
              placeholder="Ej: Café BHD León - Naco"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Categoría</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white"
              >
                <option value="Cafe">Cafetería</option>
                <option value="Coworking">Coworking Space</option>
                <option value="Library">Biblioteca Público/Privada</option>
                <option value="Restaurant">Restaurante / Bistro</option>
                <option value="Hotel Lounge">Hotel Lounge</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Zona / Sector *</label>
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white"
              >
                <option value="Piantini">Piantini</option>
                <option value="Bella Vista">Bella Vista</option>
                <option value="Zona Colonial">Zona Colonial</option>
                <option value="Naco">Naco</option>
                <option value="Zona Universitaria">Zona Universitaria</option>
                <option value="Gazcue">Gazcue</option>
                <option value="Mirador Sur">Mirador Sur</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Dirección Exacta *</label>
            <input
              type="text"
              placeholder="Ej: Av. Gustavo Mejía Ricart #48, Santo Domingo"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Latitud GPS</label>
              <input
                type="number"
                step="any"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Longitud GPS</label>
              <input
                type="number"
                step="any"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
          </div>

          {/* B2B Verified Business Switch */}
          <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl">
            <label className="flex items-center gap-2 cursor-pointer mb-2">
              <input
                type="checkbox"
                checked={isVerified}
                onChange={(e) => setIsVerified(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <span className="font-bold text-emerald-900 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Plan B2B / Local Verificado
              </span>
            </label>
            {isVerified && (
              <div>
                <label className="block text-[11px] font-medium text-emerald-800 mb-1">
                  Beneficio exclusivo para usuarios WorkSpot (Perk B2B)
                </label>
                <input
                  type="text"
                  placeholder="Ej: 10% de descuento en consumos al mostrar la app WorkSpot"
                  value={verifiedPerk}
                  onChange={(e) => setVerifiedPerk(e.target.value)}
                  className="w-full px-3 py-1.5 border border-emerald-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">URL de la Foto / Imagen de Portada</label>
            <input
              type="text"
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-xl font-bold transition shadow-md disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Crear Espacio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
