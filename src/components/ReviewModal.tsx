'use client';

import { useState } from 'react';
import { X, Star, MessageSquare } from 'lucide-react';

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
  reviews?: Review[];
}

interface ReviewModalProps {
  spot: Spot | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReviewModal({ spot, isOpen, onClose, onSuccess }: ReviewModalProps) {
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !spot) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !comment) {
      setError('Por favor completa todos los campos.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spotId: spot.id,
          userName,
          rating,
          comment,
        }),
      });

      if (!res.ok) {
        throw new Error('Error al publicar reseña');
      }

      setUserName('');
      setComment('');
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-amber-500 mb-1">
          <Star className="w-5 h-5 fill-amber-500" />
          <span className="text-xs font-bold uppercase tracking-wider">Comunidad & Reseñas</span>
        </div>

        <h2 className="text-xl font-extrabold text-slate-900 mb-4">{spot.name}</h2>

        {/* Existing Reviews List */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5 text-slate-400" /> Reseñas de la comunidad ({spot.reviews?.length || 0})
          </h3>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {spot.reviews && spot.reviews.length > 0 ? (
              spot.reviews.map((r) => (
                <div key={r.id} className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-800">{r.userName}</span>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{r.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl">
                Aún no hay reseñas registradas para este espacio. ¡Sé el primero en dejar una!
              </p>
            )}
          </div>
        </div>

        {/* Add Review Form */}
        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Escribir una Reseña</h3>

          {error && <div className="p-2.5 mb-3 text-xs bg-rose-50 text-rose-700 rounded-xl">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tu Nombre / Usuario</label>
              <input
                type="text"
                placeholder="Ej: Bryan Rojas"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Calificación de Enfocabilidad</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        rating >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tu experiencia en este espacio</label>
              <textarea
                rows={3}
                placeholder="Cuéntanos sobre el ambiente, la velocidad del internet o el café..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl font-bold transition disabled:opacity-50"
            >
              {loading ? 'Publicando...' : 'Publicar Reseña'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
