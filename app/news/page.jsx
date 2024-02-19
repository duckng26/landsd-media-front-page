"use client";

import { createContext, useContext, useEffect, useState } from "react";
import styles from "../ui/news/news.module.css";
import Rightbar from "../ui/news/rightbar/rightbar";
import Map from "../ui/news/map/Map";
import { Tabs } from "../ui/news/tabs/tabs";
import { MockDataPoint } from "../data/sample_data";
import Detailbar from "../ui/news/detailbar/detailbar";

const DEFAULT_CENTER = [22.349, 114.136];
let apikey = "28ba7bd74cbe4af890d90991f9d5a86e"; // key for text analytic platform

const News = () => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const sideClassName = isDetailOpen ? styles.twoSide : styles.side;

  const handleOpenDetail = () => {
    setIsDetailOpen(!isDetailOpen);
  };

  return (
    <div className={styles.wrapper}>
      <Tabs />
      <div className={styles.main}>
        <Map
          className={styles.homeMap}
          center={DEFAULT_CENTER}
          zoom={15}
          style={{ borderRadius: "10px", height: "600px", flex: "3" }}
        >
          {({ TileLayer, Marker, Popup }) => {
            return (
              <>
                <TileLayer
                  url={`https://api.hkmapservice.gov.hk/osm/xyz/basemap/WGS84/tile/{z}/{x}/{y}.png?key=${apikey}`}
                  attribution={`<a href='https://api.portal.hkmapservice.gov.hk/disclaimer' target='_blank'>Map from Lands Department</a> | Leaflet`}
                />
                <TileLayer
                  url={`https://api.hkmapservice.gov.hk/osm/xyz/label-en/WGS84/tile/{z}/{x}/{y}.png?key=${apikey}`}
                  attribution={`<a href='https://api.portal.hkmapservice.gov.hk/disclaimer' target='_blank'>Map from Lands Department</a> | Leaflet`}
                />
                {MockDataPoint.map((data) => (
                  <Marker position={data.geometry}>
                    <Popup>
                      {`${data.attributes.Name_of_Building} ${data.attributes.District}`}
                    </Popup>
                  </Marker>
                ))}
              </>
            );
          }}
        </Map>
        <div className={sideClassName}>
          <Rightbar name={"News Summary"} openDetail={handleOpenDetail} />
        </div>
        {isDetailOpen && (
          <div className={sideClassName}>
            <Detailbar name={"Details"} closeDetail={handleOpenDetail} />
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
