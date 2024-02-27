"use client";

import { useState, forwardRef} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../ui/news/news.module.css";
import Rightbar from "../ui/news/rightbar/rightbar";
import Map from "../ui/news/map/Map";
import { Tabs } from "../ui/news/tabs/tabs";
import { Filter } from "../ui/news/filter/filter";
import Detailbar from "../ui/news/detailbar/detailbar";

const DEFAULT_CENTER = [22.349, 114.136];

const News = () => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const sideClassName = isDetailOpen ? styles.twoSide : styles.side;

  const handleOpenDetail = () => {
    setIsDetailOpen(!isDetailOpen);
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
