import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import React, { useEffect } from 'react';
import { Marker, Popup, useMap, useMapEvents } from 'react-leaflet';

import type { CreateAddressProps } from '@/types/address.type';
import useAddressStore from '@/zustand/addressStore';

const SearchLocation = () => {
  const provider = new OpenStreetMapProvider();
  const { position, address, setPosition, setAddress } = useAddressStore();
  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider,
    marker: {
      // optional: L.Marker    - default L.Icon.Default
      icon: new L.Icon({
        iconUrl: `/marker/marker-icon-blue.png`,
        iconSize: [35, 55],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
      draggable: false,
    },
  });

  const map = useMap();
  // @ts-ignore
  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

  // Use useMapEvents to handle the map click event
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setPosition({ lat, lng }); // Set marker position

      try {
        const results = await provider.search({ query: `${lat}, ${lng}` });
        if (results && results.length > 0) {
          const result = results[0]?.raw as any;
          const formattedAddress: CreateAddressProps = {
            country: result.display_name || 'N/A',
            city: result.display_name || 'N/A',
            longitude: lng,
            latitude: lat,
            countryFlag: `tn`,
            street: result.display_name || 'N/A',
          };
          setAddress(formattedAddress); // Set the formatted address
        } else {
          setAddress(null);
        }
      } catch (error) {
        console.error('Error fetching address:', error);
        setAddress(null);
      }
    },
  });

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {position && (
        <Marker
          icon={
            new L.Icon({
              iconUrl: `/marker/marker-icon-blue.png`,
              iconSize: [35, 55],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41],
            })
          }
          position={position}
        >
          <Popup>
            {address ? (
              <p>
                <strong>Street:</strong> {address.street}
              </p>
            ) : (
              'Loading address...'
            )}
          </Popup>
        </Marker>
      )}
    </>
  );
};
export default SearchLocation;
