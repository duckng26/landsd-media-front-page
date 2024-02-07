"use client"

import styles from "../ui/news/news.module.css";
import Rightbar from "../ui/news/rightbar/rightbar";
import Map from "../ui/news/map/Map";
import { MockDataPoint } from "../data/sample_data";

const DEFAULT_CENTER = [22.349, 114.136];

const News = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <Map
          className={styles.homeMap}
          width="800"
          height="400"
          center={DEFAULT_CENTER}
          zoom={12}
          style={{borderRadius: '10px'}}
        >
          {({ TileLayer, Marker, Popup }) => {
            return (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution={`<a href='https://api.portal.hkmapservice.gov.hk/disclaimer' target='_blank'>Map from Lands Department</a> | Leaflet`}
                />{MockDataPoint.map((data) =>
                <Marker position={data.geometry}>
                  <Popup>
                    {`${data.attributes.Name_of_Building} ${data.attributes.District}`}
                  </Popup>
                </Marker>)}
              </>
            );
          }}
        </Map>
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default News;
