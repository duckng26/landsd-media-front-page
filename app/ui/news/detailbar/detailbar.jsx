import { useQuery } from "@tanstack/react-query";
import styles from "./detailbar.module.css";
import Map from "../map/Map";
import { MockDataPoint } from "../../../data/sample_data";
import { fetchNewsData } from "../../../lib/clientActions";

const DEFAULT_CENTER = [22.349, 114.136];
let apikey = "28ba7bd74cbe4af890d90991f9d5a86e"; // key for text analytic platform

const Detailbar = ({ name, closeDetail, selectGroup, id }) => {
  const { status, data, isLoading, error } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNewsData,
  });

  const sourceList = Object.entries(
    data?.data.dct_GrpST_Src_GeoTag[id].sources
  ).map(([key, value]) => value);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.indicatorTitle}>{name}</h3>
        <span className={styles.iconClose} onClick={closeDetail}>
          +
        </span>
      </div>
      <div className={styles.topicHeader}>
        <h5 className={styles.indicatorTitle}>Grouping</h5>
      </div>
      {status === "pending" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        sourceList.map((src, index) => (
          <div
            className={styles.item}
            key={index}
            onClick={() => selectGroup(src.geo_tags)}
          >
            <div className={styles.text}>
              <span className={styles.link}>
                <span className={styles.square}></span>
                <a href="/">{src.title}</a>
              </span>
              <p className={styles.desc}>{src.content}</p>
              <div className={styles.nuggetsList}>
                <span className={styles.addBtn} onClick={() => {}}>
                  +
                </span>
                {Object.values(src.geo_tags).map(({ location, index }) => (
                  <div className={styles.nuggetLocation} key={index}>
                    {location}
                    <span className={styles.removeBtn} onClick={() => {}}>
                      +
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
      <div className={styles.topicHeader}>
        <h5 className={styles.indicatorTitle}>Related Hot Keywords</h5>
      </div>
      <div className={styles.nuggetsList}>
        <div className={styles.nugget}>Real</div>
        <div className={styles.nugget}>Lands</div>
      </div>
      {/* <Map
        className={styles.homeMap}
        center={DEFAULT_CENTER}
        zoom={12}
        style={{ borderRadius: "10px", height: "100px" }}
      >
        {({ TileLayer, Marker, Popup }) => {
          return (
            <>
              <TileLayer
                url={`https://api.hkmapservice.gov.hk/osm/xyz/basemap/WGS84/tile/{z}/{x}/{y}.png?key=${apikey}`}
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
      </Map> */}
    </div>
  );
};

export default Detailbar;
