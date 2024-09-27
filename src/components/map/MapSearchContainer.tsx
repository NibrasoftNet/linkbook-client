'use client';

import 'node_modules/leaflet-geosearch/dist/geosearch.css';

import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { LatLngLiteral } from 'leaflet';
import L from 'leaflet';
import Link from 'next/link';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
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
  const position: LatLngLiteral = {
    lat: 36.80040338608358,
    lng: 10.186405758149286,
  };
  const { category, city, type, searchResults, setSearchResults } =
    useSearchStore();

  const paginationParams = useSearchParams();
  const page = Number(paginationParams.get('page')) || 1;
  const limit = Number(paginationParams.get('limit')) || 20;

  const {
    data: searchResultQueryData,
    refetch: refetchSearchData,
  }: UseQueryResult<
    ApiResponsePaginated<SearchServiceProps | []>,
    Error
  > = useQuery({
    // @ts-ignore
    queryFn: async () => {
      try {
        const data = await getSearchServiceAction(
          {
            type,
            subscriptionStatus,
            category,
            city,
          },
          {
            page,
            limit,
            filter: [
              {
                field: 'product.category.id',
                operation: '$eq',
                value: category,
              },
            ],
          },
        );
        if (!data.status) {
          toast.error('Failed to search', {
            description: `Your search has failed`,
          });
          setSearchResults([]);
          return [];
        }
        setSearchResults(data.result?.data);
        return data;
      } catch (e) {
        setSearchResults([]);
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
    refetchSearchData().catch((error) => {
      setSearchResults([]);
      toast.error('Error', {
        description: `${error}`,
      });
    });
  }, [category, city, type, page]);

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
        {searchResultQueryData?.result?.data.length && (
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              zIndex: '1000',
            }}
            className="flex w-80 gap-2"
          >
            <Link
              href={`search?page=${Number(page) - 1}&limit=${Number(limit)}`}
              aria-label="Scroll left"
              type="button"
            >
              <button
                aria-label="Scroll left"
                type="button"
                disabled={Number(page) === 1}
                className="text-primary hover:text-tertiary disabled:text-gray-400"
              >
                <FaCircleChevronLeft className="size-8" />
              </button>
            </Link>
            <Link
              href={`search?page=${Number(page) + 1}&limit=${Number(limit)}`}
              aria-label="Scroll right"
              type="button"
            >
              <button
                aria-label="Scroll right"
                type="button"
                disabled={
                  Number(page) === searchResultQueryData.result.meta.totalPages
                }
                className="text-primary hover:text-tertiary disabled:text-gray-400"
              >
                <FaCircleChevronRight className="size-8" />
              </button>
            </Link>
          </div>
        )}

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
