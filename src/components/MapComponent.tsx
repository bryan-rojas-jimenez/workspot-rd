'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Wifi, Volume2, Zap, ShieldCheck } from 'lucide-react';

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
  wifiRating: string;
  noiseLevel: string;
  outlets: string;
  occupancy: string;
  overallScore: number;
}

interface MapProps {
  spots: Spot[];
  selectedSpotId?: string | null;
  onSelectSpot?: (spotId: string) => void;
}

// Custom Leaflet Icons
const createCustomIcon = (isVerified: boolean, isSelected: boolean) => {
  const color = isSelected ? '#0284c7' : isVerified ? '#16a34a' : '#475569';
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="36" height="36" style="filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.3));">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `;
  return L.divIcon({
    html: svg,
    className: 'custom-map-pin',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
};

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 14, { animate: true });
  }, [lat, lng, map]);
  return null;
}

export default function MapComponent({ spots, selectedSpotId, onSelectSpot }: MapProps) {
  // Santo Domingo Center Coordinates
  const defaultCenter = [18.4712, -69.9250] as [number, number];

  const selectedSpot = spots.find((s) => s.id === selectedSpotId);
  const mapCenter = selectedSpot ? [selectedSpot.lat, selectedSpot.lng] as [number, number] : defaultCenter;

  return (
    <div className="w-full h-[500px] md:h-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 relative z-0">
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors & CartoDB'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {selectedSpot && <RecenterMap lat={selectedSpot.lat} lng={selectedSpot.lng} />}

        {spots.map((spot) => {
          const isSelected = spot.id === selectedSpotId;
          const icon = createCustomIcon(spot.isVerified, isSelected);

          return (
            <Marker
              key={spot.id}
              position={[spot.lat, spot.lng]}
              icon={icon}
              eventHandlers={{
                click: () => onSelectSpot && onSelectSpot(spot.id),
              }}
            >
              <Popup className="workspot-popup">
                <div className="p-2 max-w-xs font-sans">
                  {spot.isVerified && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 mb-1">
                      <ShieldCheck className="w-3 h-3" /> Verificado B2B
                    </span>
                  )}
                  <h3 className="font-bold text-slate-900 text-base leading-snug">{spot.name}</h3>
                  <p className="text-xs text-slate-500 mb-2">{spot.address}</p>

                  <div className="grid grid-cols-3 gap-1 text-[11px] bg-slate-50 p-2 rounded-lg mb-2 border border-slate-100">
                    <div className="flex items-center gap-1">
                      <Wifi className="w-3 h-3 text-sky-600" />
                      <span className="capitalize">{spot.wifiRating === 'Fast' ? 'Rápido' : spot.wifiRating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Volume2 className="w-3 h-3 text-indigo-600" />
                      <span className="capitalize">{spot.noiseLevel === 'Quiet' ? 'Silencio' : spot.noiseLevel}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-500" />
                      <span className="capitalize">{spot.outlets === 'Abundant' ? 'Abundante' : spot.outlets}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectSpot && onSelectSpot(spot.id)}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs py-1.5 rounded-md transition font-medium text-center"
                  >
                    Ver detalles del espacio
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
