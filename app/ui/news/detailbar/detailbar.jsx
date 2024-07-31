import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./detailbar.module.css";
import { Modal } from "../modal/modal";
import { MockDataPoint } from "../../../data/sample_data";
import { updateNewsLocation } from "../../../lib/clientActions";

const DEFAULT_CENTER = [22.349, 114.136];
let apikey = "28ba7bd74cbe4af890d90991f9d5a86e"; // key for text analytic platform

const Detailbar = ({ name, closeDetail, selectGroup, id, qs, onEnglishKeywordClick, onChineseKeywordClick }) => {
  const [activeItem, setActiveItem] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newLocation, setNewLocation] = useState({
    location: "",
    latitude: "",
    longitude: "",
  });
  const [currentSource, setCurrentSource] = useState(null);

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["news", qs]);

  const sourceList = Object.entries(
    data?.data.dct_GrpST_Src_GeoTag[id]?.sources || {}
  ).map(([key, value]) => value);

  const trendingKeywords =
    data?.data.dct_GrpST_Src_GeoTag[id]?.["keywords_trending"] || [];

  const handleItemClick = (src) => {
    setActiveItem(src.id);
    selectGroup(src.geo_tags);
  };

  const handleAddLocation = () => {
    if (currentSource) {
      const curGeoTags = currentSource.geo_tags;

      const lst_id_geo_tag_remain = Object.keys(curGeoTags).map(
        (key) => curGeoTags[key].id
      );
      const lst_loc_new = [newLocation.location];

      updateNewsLocation(currentSource.id, lst_id_geo_tag_remain, lst_loc_new);
      setShowModal(false);
      setNewLocation({ location: "", latitude: "", longitude: "" });
    }
  };

  const handleDeleteLocation = (src, tagId) => {
    const lst_id_geo_tag_remain = new Array(src.geo_tags)
      .filter((tag) => tag.id !== tagId)
      .map((tag) => tag.id);
    const lst_loc_new = new Array(src.geo_tags).filter(
      (tag) => tag.id !== tagId
    );

    updateNewsLocation(src.id, lst_id_geo_tag_remain, lst_loc_new);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.indicatorTitle}>{name}</h3>
        <span className={styles.iconClose} onClick={closeDetail}>
          +
        </span>
      </div>
      {!!sourceList.length && (
        <div className={styles.topicHeader}>
          <h5 className={styles.indicatorTitle}>Grouping</h5>
        </div>
      )}
      <div className={styles.sourceList}>
        {status === "pending" ? (
          "Loading..."
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : (
          sourceList.map((src, index) => (
            <div
              key={index}
              className={activeItem == src.id ? styles.itemActive : styles.item}
              onClick={() => handleItemClick(src)}
            >
              <div className={styles.text}>
                <div className={styles.linkHeader}>
                  <span className={styles.biasLevelCard}>{src.bias_level}</span>
                  <span className={styles.link}>
                    <span className={styles.square}></span>
                    <a>{src.title}</a>
                  </span>
                </div>
                <p className={styles.desc}>{src.content}</p>
                <div className={styles.nuggetsList}>
                  <span
                    className={styles.addBtn}
                    onClick={() => {
                      setShowModal(true);
                      setCurrentSource(src);
                    }}
                  >
                    +
                  </span>
                  {Object.values(src.geo_tags).map(
                    ({ location, index, id }) => (
                      <div className={styles.nuggetLocation} key={index}>
                        {location}
                        <span
                          className={styles.removeBtn}
                          onClick={() => handleDeleteLocation(src, id)}
                        >
                          +
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {!!trendingKeywords.length && (
        <div className={styles.topicHeader}>
          <h4 className={styles.indicatorTitle}>Related Hot Keywords</h4>
        </div>
      )}
      {trendingKeywords?.map((grp) => (
        <>
          <div className={styles.nuggetsList}>
            {grp?.["keyword_chinese"].map((keyword) => (
              <div onClick={() => onChineseKeywordClick(keyword)} className={styles.nugget}>{keyword}</div>
            ))}
            {grp?.["keyword_english"].map((keyword) => (
              <div onClick={() => onEnglishKeywordClick(keyword)} className={styles.nugget}>{keyword}</div>
            ))}
          </div>
        </>
      ))}
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
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2>Add New Location</h2>
        <form className={styles.formWrapper}>
          <div className={styles.location}>
            <label className={styles.locationText}>Location</label>
            <input
              className={styles.input}
              type="text"
              value={newLocation.location}
              onChange={(e) =>
                setNewLocation({ ...newLocation, location: e.target.value })
              }
            />
          </div>
          <button
            className={styles.updateBtn}
            type="button"
            onClick={handleAddLocation}
          >
            Add
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Detailbar;
