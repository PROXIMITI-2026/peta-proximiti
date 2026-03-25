'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// Zone data migrated from map/app.js
const MAIN_ZONE_POLYGON: [number, number][] = [
  [-6.9508, 107.6220],[-6.9500, 107.6260],[-6.9495, 107.6300],[-6.9492, 107.6340],
  [-6.9500, 107.6380],[-6.9510, 107.6410],[-6.9540, 107.6430],[-6.9580, 107.6440],
  [-6.9620, 107.6440],[-6.9660, 107.6435],[-6.9700, 107.6425],[-6.9730, 107.6420],
  [-6.9760, 107.6430],[-6.9790, 107.6440],[-6.9830, 107.6445],[-6.9870, 107.6435],
  [-6.9900, 107.6420],[-6.9920, 107.6400],[-6.9935, 107.6380],[-6.9950, 107.6360],
  [-6.9960, 107.6330],[-6.9965, 107.6300],[-6.9960, 107.6270],[-6.9950, 107.6240],
  [-6.9930, 107.6220],[-6.9900, 107.6200],[-6.9870, 107.6190],[-6.9840, 107.6185],
  [-6.9810, 107.6180],[-6.9780, 107.6178],[-6.9760, 107.6175],[-6.9730, 107.6170],
  [-6.9700, 107.6170],[-6.9670, 107.6175],[-6.9640, 107.6180],[-6.9610, 107.6190],
  [-6.9580, 107.6195],[-6.9555, 107.6200],[-6.9530, 107.6210],[-6.9508, 107.6220],
];

const BATAS_BUAHBATU_POLYGON: [number, number][] = [
  [-6.9492,107.6300],[-6.9470,107.6285],[-6.9445,107.6290],[-6.9430,107.6310],
  [-6.9425,107.6340],[-6.9430,107.6370],[-6.9450,107.6390],[-6.9475,107.6400],
  [-6.9500,107.6410],[-6.9510,107.6410],[-6.9540,107.6430],[-6.9510,107.6410],
  [-6.9500,107.6380],[-6.9492,107.6340],[-6.9495,107.6300],[-6.9492,107.6300],
];

const BATAS_BALEENDAH_POLYGON: [number, number][] = [
  [-6.9950,107.6360],[-6.9975,107.6375],[-6.9995,107.6380],[-7.0015,107.6375],
  [-7.0030,107.6360],[-7.0035,107.6335],[-7.0030,107.6310],[-7.0015,107.6295],
  [-6.9995,107.6285],[-6.9975,107.6280],[-6.9960,107.6270],[-6.9960,107.6300],
  [-6.9965,107.6300],[-6.9960,107.6330],[-6.9950,107.6360],
];

const ZONES = [
  { id: 'telkom-univ', name: 'Telkom University', emoji: '🏛️', type: 'zona', color: '#dc2626', center: [-6.9733, 107.6311] as [number, number] },
  { id: 'bojongsoang', name: 'Bojongsoang', emoji: '🏘️', type: 'zona', color: '#dc2626', center: [-6.9830, 107.6400] as [number, number] },
  { id: 'sukapura', name: 'Sukapura', emoji: '🏠', type: 'zona', color: '#dc2626', center: [-6.9690, 107.6400] as [number, number] },
  { id: 'sukabirus', name: 'Sukabirus', emoji: '🏡', type: 'zona', color: '#dc2626', center: [-6.9735, 107.6195] as [number, number] },
  { id: 'jl-radio', name: 'Jalan Radio', emoji: '📻', type: 'zona', color: '#dc2626', center: [-6.9630, 107.6210] as [number, number] },
  { id: 'buahbatu', name: 'Lampu Merah Buahbatu', emoji: '🚦', type: 'batas', color: '#eab308', center: [-6.9460, 107.6340] as [number, number] },
  { id: 'batununggal', name: 'Batununggal', emoji: '🏢', type: 'zona', color: '#dc2626', center: [-6.9530, 107.6240] as [number, number] },
  { id: 'jembatan-baleendah', name: 'Jembatan Kedua Baleendah', emoji: '🌉', type: 'batas', color: '#eab308', center: [-6.9995, 107.6335] as [number, number] },
  { id: 'ciganitri', name: 'Ciganitri', emoji: '🏗️', type: 'zona', color: '#dc2626', center: [-6.9900, 107.6230] as [number, number] },
];

function isPointInPolygon(lat: number, lng: number, polygon: [number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const yi = polygon[i][0], xi = polygon[i][1];
    const yj = polygon[j][0], xj = polygon[j][1];
    if (((yi > lat) !== (yj > lat)) && (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi)) {
      inside = !inside;
    }
  }
  return inside;
}

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInitialized = useRef(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<{ inside: boolean; text: string } | null>(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    // Guard against double initialization (React StrictMode)
    if (!mapRef.current || mapInitialized.current) return;
    mapInitialized.current = true;

    import('leaflet').then((L) => {
      // Fix default icon
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(mapRef.current!, { center: [-6.9733, 107.6311], zoom: 14, zoomControl: false });
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      // Main zone
      L.polygon(MAIN_ZONE_POLYGON, { color: '#dc2626', weight: 3, opacity: 0.85, fillColor: '#dc2626', fillOpacity: 0.12, smoothFactor: 1.5 })
        .addTo(map).bindPopup('<b>🛡️ Zona Wajib Armband</b><br>Seluruh wilayah dalam zona ini wajib armband.');

      // Transition zones
      L.polygon(BATAS_BUAHBATU_POLYGON, { color: '#eab308', weight: 2, opacity: 0.8, fillColor: '#eab308', fillOpacity: 0.1, dashArray: '8, 6' })
        .addTo(map).bindPopup('<b>🚦 Batas Utara — Lampu Merah Buahbatu</b>');
      L.polygon(BATAS_BALEENDAH_POLYGON, { color: '#eab308', weight: 2, opacity: 0.8, fillColor: '#eab308', fillOpacity: 0.1, dashArray: '8, 6' })
        .addTo(map).bindPopup('<b>🌉 Batas Selatan — Jembatan Baleendah</b>');

      // Zone markers
      ZONES.forEach((zone) => {
        const icon = L.divIcon({
          className: '',
          html: `<div style="background:${zone.color};width:30px;height:30px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3)"><span style="transform:rotate(45deg);font-size:13px">${zone.emoji}</span></div>`,
          iconSize: [30, 36], iconAnchor: [15, 36], popupAnchor: [0, -36],
        });
        L.marker(zone.center, { icon }).addTo(map)
          .bindPopup(`<b>${zone.emoji} ${zone.name}</b><br><small>${zone.type === 'zona' ? 'ZONA WAJIB ARMBAND' : 'AREA TRANSISI'}</small>`)
          .bindTooltip(zone.name, { direction: 'top', offset: [0, -38] });
      });

      const allCoords = [...MAIN_ZONE_POLYGON, ...BATAS_BUAHBATU_POLYGON, ...BATAS_BALEENDAH_POLYGON];
      map.fitBounds(L.latLngBounds(allCoords).pad(0.08));

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        mapInitialized.current = false;
      }
    };
  }, []);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim() || !mapInstanceRef.current) return;
    setSearching(true);
    try {
      const q = searchQuery.includes('Bandung') ? searchQuery : `${searchQuery}, Bandung, Indonesia`;
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=1`, { headers: { 'Accept-Language': 'id' } });
      const data = await res.json();
      if (!data?.length) { setSearchResult({ inside: false, text: 'Alamat tidak ditemukan.' }); return; }

      const lat = parseFloat(data[0].lat), lng = parseFloat(data[0].lon);
      const inside = isPointInPolygon(lat, lng, MAIN_ZONE_POLYGON) || isPointInPolygon(lat, lng, BATAS_BUAHBATU_POLYGON) || isPointInPolygon(lat, lng, BATAS_BALEENDAH_POLYGON);

      setSearchResult({
        inside,
        text: inside
          ? `✅ ${data[0].display_name} — MASUK zona armband.`
          : `⛔ ${data[0].display_name} — TIDAK masuk zona armband.`,
      });
      mapInstanceRef.current.flyTo([lat, lng], 16, { duration: 1.2 });
    } catch {
      setSearchResult({ inside: false, text: 'Gagal mencari. Periksa koneksi.' });
    } finally {
      setSearching(false);
    }
  }, [searchQuery]);

  return (
    <div style={{ maxWidth: 1000 }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)', marginBottom: 4 }}>🗺️ Peta Zonasi Armband</h1>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 16 }}>Cek apakah lokasi kamu masuk zona wajib armband.</p>

      {/* Search */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          className="input"
          style={{ flex: 1 }}
          placeholder="Ketik alamat untuk cek zona..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="btn btn-primary" onClick={handleSearch} disabled={searching}>
          {searching ? '...' : 'Cek'}
        </button>
      </div>

      {searchResult && (
        <div style={{
          padding: '12px 16px', borderRadius: 'var(--radius)', fontSize: 13, fontWeight: 600, marginBottom: 12,
          background: searchResult.inside ? 'var(--success-bg)' : 'var(--danger-bg)',
          color: searchResult.inside ? 'var(--success)' : 'var(--danger)',
          border: `1px solid ${searchResult.inside ? 'rgba(22,163,74,0.2)' : 'rgba(220,38,38,0.2)'}`,
        }}>
          {searchResult.text}
        </div>
      )}

      {/* Map */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossOrigin="" />
        <div ref={mapRef} style={{ height: 500, width: '100%', borderRadius: 'var(--radius-lg)' }} />
      </div>

      {/* Zone list */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">📍 Daftar Zona</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
          {ZONES.map(z => (
            <button key={z.id} onClick={() => mapInstanceRef.current?.flyTo(z.center, 16, { duration: 1 })}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
                background: 'var(--surface-alt)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius)', cursor: 'pointer', textAlign: 'left',
                fontFamily: 'inherit', transition: 'var(--transition)',
              }}>
              <span style={{ fontSize: 22 }}>{z.emoji}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{z.name}</div>
                <span className={`badge ${z.type === 'zona' ? 'badge-danger' : 'badge-warning'}`} style={{ marginTop: 2 }}>
                  {z.type === 'zona' ? 'Zona Wajib' : 'Batas'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
