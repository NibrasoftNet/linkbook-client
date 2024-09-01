'use client';

import 'node_modules/leaflet-geosearch/dist/geosearch.css';

import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { LatLngLiteral } from 'leaflet';
// eslint-disable-next-line import/no-extraneous-dependencies
import L from 'leaflet';
import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  ZoomControl,
} from 'react-leaflet';
import { toast } from 'sonner';

import { getSearchServiceAction } from '@/actions/search.actions';
import SearchResultCard from '@/components/card/SearchResultCard';
import { SubscribeCard } from '@/components/card/SunscribeCard';
import SearchLocation from '@/components/map/SearchLocation';
import SearchProduct from '@/components/map/SearchProduct';
import type { SearchServiceProps } from '@/types/search.type';
import type {
  ApiResponsePaginated,
  SubscriptionStatusEnum,
} from '@/types/types';
import useSearchStore from '@/zustand/searchStore';

const MapSearchContainer = ({
  search,
  searchMarkers,
  subscriptionStatus,
}: {
  search: boolean;
  searchMarkers: boolean;
  subscriptionStatus: SubscriptionStatusEnum;
}) => {
  const position: LatLngLiteral = { lat: 51.505, lng: -0.09 };
  const { category, city, type, searchResults, setSearchResults } =
    useSearchStore();
  console.log('azerty', search, subscriptionStatus, category, city, type);
  const data: UseQueryResult<
    ApiResponsePaginated<SearchServiceProps>,
    Error
  > = useQuery({
    // @ts-ignore
    queryFn: async () => {
      try {
        const data: ApiResponsePaginated<SearchServiceProps> =
          await getSearchServiceAction({
            type,
            subscriptionStatus,
            category,
            city,
          });
        if (!data.status) {
          toast.error('Failed to search Profile', {});
          return;
        }
        setSearchResults(data.result.data);
        return data;
      } catch (e) {
        toast.error('Error', {
          description: `${e}`,
        });
      }
    },
    queryKey: ['search-products'],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
  });

  useEffect(() => {
    data.refetch();
  }, [category, city, type]);

  function FlyMapToLocation({
    zoomLevel,
    search,
  }: {
    zoomLevel: number;
    search: SearchServiceProps;
  }) {
    const map = useMap();
    useEffect(() => {
      map.flyTo([search.address.latitude, search.address.longitude], zoomLevel);
    }, [searchResults]);
    return null;
  }

  const isInitialized = useRef(false);
  useEffect(() => {
    isInitialized.current = true;
    return () => {
      isInitialized.current = false;
    };
  }, []);
  if (!isInitialized) return null;

  return (
    <section className="relative z-20 size-full">
      <MapContainer
        id="unique-map-id"
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
        {searchMarkers && searchResults[0] && (
          <FlyMapToLocation zoomLevel={4} search={searchResults[0]} />
        )}
        {search && <SearchLocation />}
        {searchMarkers && <SearchProduct page="search" />}
        {searchMarkers &&
          searchResults.map((result: SearchServiceProps) => (
            <Marker
              key={result.id}
              position={[result.address.latitude, result.address.longitude]}
              icon={
                new L.Icon({
                  iconUrl: `/marker/marker-icon-blue.png`,
                  iconSize: [35, 35],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowSize: [41, 41],
                })
              }
            >
              <Popup>
                {result.creator ? (
                  <SearchResultCard details={result} />
                ) : (
                  <SubscribeCard />
                )}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </section>
  );
};

export default MapSearchContainer;
