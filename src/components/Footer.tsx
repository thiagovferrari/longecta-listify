import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Footer = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHNlOWF2NWowMGRqMmptbGVwZ2E1ZXd2In0.Wm7OXHkIFoEPrqB-0ogRYw';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-46.6476, -23.5505], // São Paulo coordinates
      zoom: 15,
      pitch: 45,
    });

    // Add marker
    new mapboxgl.Marker({ color: '#0284c7' })
      .setLngLat([-46.6476, -23.5505])
      .addTo(map.current);

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <footer className="bg-white shadow-lg mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-sky-600 mb-2">Onde nos encontrar</h2>
          <p className="text-gray-600">Venha nos visitar na Longecta</p>
        </div>
        <div className="h-[400px] rounded-lg overflow-hidden shadow-xl">
          <div ref={mapContainer} className="w-full h-full" />
        </div>
        <div className="text-center mt-6 text-gray-600">
          <p>© {new Date().getFullYear()} Longecta. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;