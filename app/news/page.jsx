"use client";

import { useState, forwardRef, useEffect, useCallback } from "react";
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
import { CustomInput } from "../ui/news/custominput/custominput";

const DEFAULT_CENTER = [22.349, 114.136];

function debounce(func, delay) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const News = () => {
  const [activeDetail, setActiveDetail] = useState("");
  const [activeGroupMarker, setActiveGroupMarker] = useState([]);
  const [isMapExpand, setIsMapExpand] = useState(true);

  const [topic, setTopic] = useState("");
  const [event, setEvent] = useState("");
  const [keyword_chinese, setKeywordChinese] = useState("");
  const [keyword_english, setKeywordEnglish] = useState("");
  const [location, setLocation] = useState("");
  const [yearStart, setYearStart] = useState("");
  const [yearEnd, setYearEnd] = useState("");
  const [weekStart, setWeekStart] = useState("");
  const [weekEnd, setWeekEnd] = useState("");
  const [queryString, setQueryString] = useState("");

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const debouncedSetQueryString = useCallback(
    debounce((query) => setQueryString(query), 500),
    []
  );

  useEffect(() => {
    let query = new URLSearchParams();

    if (topic) query.append("topic", topic);
    if (event) query.append("event", event);
    if (keyword_chinese) query.append("keyword_chinese", keyword_chinese);
    if (keyword_english) query.append("keyword_english", keyword_english);
    if (location) query.append("location", location);
    if (yearStart) query.append("year_start", yearStart);
    if (yearEnd) query.append("year_end", yearEnd);
    if (weekStart) query.append("week_start", weekStart);
    if (weekEnd) query.append("week_end", weekEnd);

    debouncedSetQueryString(query.toString());
  }, [
    topic,
    event,
    keyword_chinese,
    keyword_english,
    location,
    yearStart,
    yearEnd,
    weekStart,
    weekEnd,
  ]);

  const { status, data, isLoading, error } = useQuery({
    queryKey: ["news", queryString],
    queryFn: () => fetchNewsData(queryString),
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
      <Filter>
        <div className={styles.inputContainter}>
          <label>Year Start</label>
          <CustomInput
            type="number"
            value={yearStart}
            onChange={setYearStart}
          />
        </div>
        <div className={styles.inputContainter}>
          <label>Year End</label>
          <CustomInput type="number" value={yearEnd} onChange={setYearEnd} />
        </div>
        <div className={styles.inputContainter}>
          <label>Week Start</label>
          <CustomInput
            type="number"
            value={weekStart}
            onChange={setWeekStart}
          />
        </div>
        <div className={styles.inputContainter}>
          <label>Week End</label>
          <CustomInput type="number" value={weekEnd} onChange={setWeekEnd} />
        </div>
        <div className={styles.inputContainter}>
          <label>Topic</label>
          <CustomInput type="text" value={topic} onChange={setTopic} />
        </div>
        <div className={styles.inputContainter}>
          <label>Event</label>
          <CustomInput type="text" value={event} onChange={setEvent} />
        </div>
        <div className={styles.inputContainter}>
          <label>Keyword (Chinese)</label>
          <CustomInput
            type="text"
            value={keyword_chinese}
            onChange={setKeywordChinese}
          />
        </div>
        <div className={styles.inputContainter}>
          <label>Keyword (English)</label>
          <CustomInput
            type="text"
            value={keyword_english}
            onChange={setKeywordEnglish}
          />
        </div>
        <div className={styles.inputContainter}>
          <label>Location</label>
          <CustomInput type="text" value={location} onChange={setLocation} />
        </div>
      </Filter>
      {status === "pending" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
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
                  qs={queryString}
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
                  qs={queryString}
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
