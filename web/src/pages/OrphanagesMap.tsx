import React, { useEffect, useState } from 'react';
import mapMarkerImg from '../images/map-marker.svg';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';
import api from '../services/api';

import '../styles/pages/orphanages-map.css';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 58],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
})

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>São Paulo</strong>
          <span>Guararema</span>
        </footer>
      </aside>

      <Map
        center={[-23.4253219, -46.1962686]}
        zoom={10}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup closeButton={false} minWidth={240} minHeight={240} className="map-popup">
                {orphanage.name}
            <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={32} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          )
        })}

      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;