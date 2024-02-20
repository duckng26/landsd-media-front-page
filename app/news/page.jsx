"use client";

import { createContext, useContext, useEffect, useState } from "react";
import styles from "../ui/news/news.module.css";
import Rightbar from "../ui/news/rightbar/rightbar";
import Map from "../ui/news/map/Map";
import { Tabs } from "../ui/news/tabs/tabs";
import { Filter } from "../ui/news/filter/filter";
import Detailbar from "../ui/news/detailbar/detailbar";


const DEFAULT_CENTER = [22.349, 114.136];

const News = () => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const sideClassName = isDetailOpen ? styles.twoSide : styles.side;

  const handleOpenDetail = () => {
    setIsDetailOpen(!isDetailOpen);
  };

  return (
    <div className={styles.wrapper}>
      <Filter/>
      <Tabs />
      <div className={styles.main}>
        <Map
          className={styles.homeMap}
          center={DEFAULT_CENTER}
          zoom={15}
          style={{ borderRadius: "10px", height: "600px", flex: "3" }}
       />
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
