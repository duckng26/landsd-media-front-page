import { useEffect } from "react";
import { TileLayer, Marker, Popup, MapContainer } from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster'

import "leaflet/dist/leaflet.css";
import { MockDataPoint } from "../../../data/sample_data";

const icon = new L.Icon({
  iconUrl:  "/marker-icon.png",
  iconRetinaUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
})

import styles from "./map.module.css";


let apikey = "28ba7bd74cbe4af890d90991f9d5a86e"; // key for text analytic platform

const Map = ({ children, className, width, height, ...rest }) => {
  let mapClassName = styles.map;

  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }

  const handleOnclick = (e) => {
    // console.log(e.containerPoint)
  }

  return (
    <MapContainer className={mapClassName} {...rest} doubleClickZoom>
      <TileLayer
        url={`https://api.hkmapservice.gov.hk/osm/xyz/basemap/WGS84/tile/{z}/{x}/{y}.png?key=${apikey}`}
        attribution={`<a href='https://api.portal.hkmapservice.gov.hk/disclaimer' target='_blank'>Map from Lands Department</a> | Leaflet`}
      />
      <TileLayer
        url={`https://api.hkmapservice.gov.hk/osm/xyz/label-en/WGS84/tile/{z}/{x}/{y}.png?key=${apikey}`}
        attribution={`<a href='https://api.portal.hkmapservice.gov.hk/disclaimer' target='_blank'>Map from Lands Department</a> | Leaflet`}
      />
      <MarkerClusterGroup onClick={handleOnclick}>
        {MockDataPoint.map((data) => (
          <Marker position={data.geometry} icon={icon}>
            <Popup>
              {`${data.attributes.Name_of_Building} ${data.attributes.District}`}
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;
