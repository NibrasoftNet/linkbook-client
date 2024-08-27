'use client';

import type { LatLngLiteral } from 'leaflet';
// eslint-disable-next-line import/no-extraneous-dependencies
import L from 'leaflet';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from 'react-leaflet';

import SearchProduct from '@/components/map/SearchProduct';
import useSearchStore from '@/zustand/searchStore';

const MapSearchContainer = () => {
  const position: LatLngLiteral = { lat: 51.505, lng: -0.09 };
  const { category, city } = useSearchStore();
  console.log('werty', category, city);
  return (
    <section className="relative z-0 size-full">
      <MapContainer
        center={position}
        zoom={7}
        scrollWheelZoom
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topright" />
        <SearchProduct page="search" />
        <Marker
          position={position}
          icon={
            new L.Icon({
              iconUrl: `/marker/marker-icon-blue.png`,
              iconSize: [35, 55],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41],
            })
          }
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </section>
  );
};

export default MapSearchContainer;
