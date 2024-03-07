"use client";

import { useState, forwardRef } from "react";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../ui/news/news.module.css";
import Rightbar from "../ui/news/rightbar/rightbar";
import Map from "../ui/news/map/Map";
import { Tabs } from "../ui/news/tabs/tabs";
import { Filter } from "../ui/news/filter/filter";
import Detailbar from "../ui/news/detailbar/detailbar";
import { fetchNewsData } from "../lib/clientActions";

const DEFAULT_CENTER = [22.349, 114.136];

const News = () => {
  const [activeDetail, setActiveDetail] = useState("");
  const [activeGroupMarker, setActiveGroupMarker] = useState([]);
  const [isMapExpand, setIsMapExpand] = useState(true);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const { status, data, isLoading, error } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNewsData,
  });

  const sideClassName = activeDetail != "" ? styles.twoSide : styles.side;

  const handleOpenDetail = (id) => {
    setActiveDetail(id);
  };

  const handleSelectGroup = (group) => {
    setActiveGroupMarker(group);
  };

  const handleToggleMapSize = () => {
    setIsMapExpand(!isMapExpand);
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className={`${styles.inputFilter} ${styles.customInput}`}
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));

  return (
    <div className={styles.wrapper}>
      {status === "pending" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <Filter>
            <div className={styles.inputContainter}>
              <label>Time</label>
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update);
                }}
                isClearable={true}
                placeholderText="I have been cleared!"
                customInput={
                  <ExampleCustomInput value={"02/05/2024 - 02/14/2024"} />
                }
              />
            </div>
            <div className={styles.inputContainter}>
              <label>Email</label>
              <input className={styles.inputFilter} type="email"></input>
            </div>
            <div className={styles.inputContainter}>
              <label>District</label>
              <input className={styles.inputFilter} type="text"></input>
            </div>
          </Filter>
          <Tabs />
          <div className={styles.main}>
            <Map
              className={styles.homeMap}
              center={DEFAULT_CENTER}
              zoom={15}
              isMapExpand={isMapExpand}
              toggleMapSize={handleToggleMapSize}
              style={{ borderRadius: "10px", height: "600px", flex: "3" }}
              dataSource={activeGroupMarker}
            />
            {!isMapExpand && (
              <div className={sideClassName}>
                <Rightbar
                  name={"News Summary"}
                  activeItem={activeDetail}
                  openDetail={handleOpenDetail}
                  onSelect={handleSelectGroup}
                />
              </div>
            )}
            {activeDetail != "" && !isMapExpand && (
              <div className={sideClassName}>
                <Detailbar
                  name={"Details"}
                  closeDetail={() => handleOpenDetail("")}
                  id={activeDetail}
                  selectGroup={handleSelectGroup}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default News;
