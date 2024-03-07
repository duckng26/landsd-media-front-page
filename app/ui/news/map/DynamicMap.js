import React, { useState, useEffect, useRef } from "react";
import { TileLayer, Marker, Popup, MapContainer, useMap } from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { MockDataPoints } from "../../../data/sample_data";

import "leaflet/dist/leaflet.css";

const icon = new L.Icon({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});

import styles from "./map.module.css";

let apikey = "28ba7bd74cbe4af890d90991f9d5a86e"; // key for text analytic platform

const Map = ({ className, width, height, dataSource, ...rest }) => {
  const markerList = dataSource
    ? Object.entries(dataSource).map(([key, value]) => value)
    : [];

  let mapClassName = styles.map;

  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }

  return (
    <MapContainer
      className={mapClassName}
      {...rest}
      doubleClickZoom
    >
      <TileLayer
        url={`https://api.hkmapservice.gov.hk/osm/xyz/basemap/WGS84/tile/{z}/{x}/{y}.png?key=${apikey}`}
        attribution={`<a href='https://api.portal.hkmapservice.gov.hk/disclaimer' target='_blank'>Map from Lands Department</a> | Leaflet`}
      />
      <TileLayer
        url={`https://api.hkmapservice.gov.hk/osm/xyz/label-en/WGS84/tile/{z}/{x}/{y}.png?key=${apikey}`}
        attribution={`<a href='https://api.portal.hkmapservice.gov.hk/disclaimer' target='_blank'>Map from Lands Department</a> | Leaflet`}
      />
      <Clusters markerList={markerList}/>
    </MapContainer>
  );
};


const Clusters = ({markerList}) => {
  const mapState = useMap();

  useEffect(() => {
    if (markerList.length > 0) {
      const bounds = markerList.reduce((acc, marker) => {
        return acc.extend([marker.latitude, marker.longitude]);
      }, L.latLngBounds([markerList[0].latitude, markerList[0].longitude], [markerList[0].latitude, markerList[0].longitude]));

      mapState.fitBounds(bounds);
    }
  }, [markerList]);

  return <MarkerClusterGroup>
  {markerList?.map((data, key) => (
    <Marker
      position={{ lat: data.latitude, lng: data.longitude }}
      icon={icon}
      key={key}
    >
      <Popup>{`${data.location}`}</Popup>
    </Marker>
  ))}
</MarkerClusterGroup>
}

export default Map;
