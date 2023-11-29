import React, { useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ latitude, longitude }) => {
  console.log("test", latitude, longitude);
  const mapRef = useRef(null);

  useEffect(() => {
    mapRef.current = L.map("map", {
      center: [latitude, longitude],
      zoom: 13,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapRef.current);

    //TODO: add icon for the station

    const marker = L.marker([latitude, longitude]).addTo(mapRef.current);

    return () => {
      mapRef.current.remove();
    };
  }, [latitude, longitude]);

  return <div id="map" style={{ width: "100%", height: "400px" }} />;
};

export default MapComponent;
