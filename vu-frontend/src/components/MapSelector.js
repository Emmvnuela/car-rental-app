// src/components/MapSelector.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Corriger l'icône par défaut
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Clé API Mapbox
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZW1tdnZ2IiwiYSI6ImNtZGh2dWNrNzA1enEybHJ6cmcydmQ5bWwifQ.7RHiCOhZdnWS1yAnPe8i2Q';

const LocationMarker = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);

      try {
        // Utilisation de l'API Mapbox v6 avec précision maximale
        const response = await axios.get(
          `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${lng}&latitude=${lat}&access_token=${MAPBOX_ACCESS_TOKEN}`,
          {
            params: {
              // Paramètres pour une précision maximale
              country: 'TG', // Code pays pour le Togo (améliore la précision locale)
              language: 'fr', // Langue française pour les résultats
              limit: 1, // Un seul résultat, le plus précis
              types: 'address,poi,place', // Types de lieux recherchés
              worldview: 'cn', // Vue du monde (cn = international)
              // Nouveau paramètre v6 pour la précision au niveau de l'unité
              address_line_1: true,
              address_line_2: true,
            }
          }
        );
        
        let address = 'Adresse non trouvée';
        
        if (response.data && response.data.features && response.data.features.length > 0) {
          const feature = response.data.features[0];
          const properties = feature.properties;
          
          // Construction d'une adresse très précise avec les nouveaux champs v6
          let addressParts = [];
          
          // Numéro et nom de rue (très précis avec v6)
          if (properties.address_line1) {
            addressParts.push(properties.address_line1);
          } else {
            // Fallback pour la construction manuelle
            if (properties.address_number) addressParts.push(properties.address_number);
            if (properties.street_name) addressParts.push(properties.street_name);
          }
          
          // Compléments d'adresse
          if (properties.address_line2) addressParts.push(properties.address_line2);
          if (properties.neighborhood) addressParts.push(properties.neighborhood);
          if (properties.locality) addressParts.push(properties.locality);
          if (properties.place) addressParts.push(properties.place);
          if (properties.region) addressParts.push(properties.region);
          if (properties.country) addressParts.push(properties.country);
          
          // Si on a des parties d'adresse, les assembler
          if (addressParts.length > 0) {
            address = addressParts.join(', ');
          } else {
            // Fallback vers les anciens champs
            address = feature.properties.full_address || 
                     feature.properties.place_formatted || 
                     feature.properties.name || 
                     'Adresse non trouvée';
          }
        }
        
        onLocationSelect({ lat, lng, address });
        
      } catch (error) {
        console.error("Erreur reverse geocoding Mapbox v6:", error);
        
        // Si v6 échoue, essayer avec v5 en fallback
        try {
          console.log("Tentative avec Mapbox v5...");
          const fallbackResponse = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_ACCESS_TOKEN}&limit=1&country=TG&language=fr`
          );
          
          if (fallbackResponse.data && fallbackResponse.data.features && fallbackResponse.data.features.length > 0) {
            const feature = fallbackResponse.data.features[0];
            const address = feature.place_name || feature.text || 'Adresse trouvée (v5)';
            onLocationSelect({ lat, lng, address });
            return;
          }
        } catch (fallbackError) {
          console.error("Erreur fallback v5:", fallbackError);
        }
        
        // Gestion des erreurs spécifiques
        let errorMessage = 'Adresse non trouvée';
        if (error.response) {
          switch (error.response.status) {
            case 401:
              errorMessage = 'Token Mapbox invalide';
              break;
            case 429:
              errorMessage = 'Quota Mapbox dépassé';
              break;
            case 422:
              errorMessage = 'Coordonnées invalides';
              break;
            default:
              errorMessage = 'Erreur service Mapbox';
          }
        }
        
        onLocationSelect({ lat, lng, address: errorMessage });
      }
    },
  });

  return position ? <Marker position={position} /> : null;
};

const MapSelector = ({ onLocationSelect }) => {
  return (
    <MapContainer center={[6.1725, 1.2314]} zoom={18} style={{ height: '400px', width: '100%' }}>
      {/* Style Satellite haute résolution pour une précision visuelle maximale 
      <TileLayer
        attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/{z}/{x}/{y}@2x?access_token=${MAPBOX_ACCESS_TOKEN}`}
        tileSize={512}
        zoomOffset={-1}
        maxZoom={22} // Zoom maximum pour la précision
      />
      
      {/* Alternative: Style Streets très détaillé 
      <TileLayer
        attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}@2x?access_token=${MAPBOX_ACCESS_TOKEN}`}
        tileSize={512}
        zoomOffset={-1}
        maxZoom={22}
      />
      */}

      <TileLayer
        attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}@2x?access_token=${MAPBOX_ACCESS_TOKEN}`}
        tileSize={512}
        zoomOffset={-1}
        maxZoom={22}
      />
      
      <LocationMarker onLocationSelect={onLocationSelect} />
    </MapContainer>
  );
};

export default MapSelector;