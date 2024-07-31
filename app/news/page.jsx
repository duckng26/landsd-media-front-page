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
import { fetchNewsData, fetchProfiles } from "../lib/clientActions";
import { CustomInput } from "../ui/news/custominput/custominput";
import { debounce } from "../lib/utils";
import { MdFilterList } from "react-icons/md";
import { mock } from "./mock";
import { set } from "react-hook-form";

const DEFAULT_CENTER = [22.349, 114.136];

const News = () => {
  const [activeDetail, setActiveDetail] = useState("");
  const [activeProfile, setActiveProfile] = useState(0);
  const [activeGroupMarker, setActiveGroupMarker] = useState([]);
  const [isMapExpand, setIsMapExpand] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [topic, setTopic] = useState("");
  const [event, setEvent] = useState("");
  const [keyword_chinese, setKeywordChinese] = useState("");
  const [keyword_english, setKeywordEnglish] = useState("");
  const [location, setLocation] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [queryString, setQueryString] = useState("");

  const debouncedSetQueryString = useCallback(
    debounce((query) => setQueryString(query), 500),
    []
  );

  const { data: profiles } = useQuery({
    queryKey: ["profiles"],
    queryFn: () => fetchProfiles(),
  });

  useEffect(() => {
    let query = new URLSearchParams();

    if (topic) query.append("topic", topic);
    if (event) query.append("event", event);
    if (keyword_chinese) query.append("keyword_chinese", keyword_chinese);
    if (keyword_english) query.append("keyword_english", keyword_english);
    if (location) query.append("location", location);
    const formattedDate = (date) =>  `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    if (dateStart) query.append("date_start", formattedDate(dateStart));
    if (dateEnd) query.append("date_end", formattedDate(dateEnd));

    debouncedSetQueryString(query.toString());
  }, [
    topic,
    event,
    keyword_chinese,
    keyword_english,
    location,
    dateStart,
    dateEnd,
    activeProfile,
  ]);

  useEffect(() => {
    const {
      topic = "",
      event = "",
      keyword_chinese = "",
      keyword_english = "",
      location = "",
      date_start = "",
      date_end = "",
    } = profiles?.[activeProfile] || {};

    setTopic(topic || "");
    setEvent(event || "");
    setKeywordChinese(keyword_chinese || "");
    setKeywordEnglish(keyword_english || "");
    setLocation(location || "");
    setDateStart(date_start || "");
    setDateEnd(date_end || "");
  }, [activeProfile]);

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

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const clearAllFilters = () => {
    setTopic("");
    setEvent("");
    setKeywordChinese("");
    setKeywordEnglish("");
    setLocation("");
    setDateStart("");
    setDateEnd("");
    setDateShortcut("");
  };

  const ExampleCustomInput = forwardRef(
    ({ value, onClick, className }, ref) => (
      <button className={className} onClick={onClick} ref={ref}>
        {value}
      </button>
    )
  );

  return (
    <div className={styles.wrapper}>
      <button onClick={toggleFilterVisibility} className={styles.toggleButton}>
        Filters & Profiles <MdFilterList color="#00b19f" size={20} />
      </button>
      <div
        className={`${styles.overlay} ${isFilterVisible ? styles.show : ""}`}
        onClick={toggleFilterVisibility}
      ></div>
      <div
        className={`${styles.filterSidebar} ${
          isFilterVisible ? styles.show : ""
        }`}
      >
        <div className={styles.sidebarHeader}>
          <button
            onClick={toggleFilterVisibility}
            className={styles.closeButton}
          >
            X
          </button>
          <button onClick={clearAllFilters} className={styles.clearAllButton}>
            Clear All
          </button>
        </div>
        <Filter>
          {profiles?.length ? (
            <Tabs
              profiles={profiles}
              activeProfile={activeProfile}
              setActiveProfile={setActiveProfile}
            />
          ) : (
            <p>Loading profiles...</p>
          )}
          <div className={styles.inputContainer}>
            <label>Date Start</label>
            <div>
              <DatePicker
                showIcon
                toggleCalendarOnIconClick
                selected={dateStart}
                dateFormat="yyyy-MM-dd"
                onChange={(date) => setDateStart(date)}
                maxDate={dateEnd}
                customInput={
                  <ExampleCustomInput
                    value={dateStart}
                    className={styles.inputFilter}
                  />
                }
              />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label>Date End</label>
            <div>
              <DatePicker
                showIcon
                toggleCalendarOnIconClick
                selected={dateEnd}
                dateFormat="yyyy-MM-dd"
                onChange={(date) => setDateEnd(date)}
                minDate={dateStart}
                customInput={
                  <ExampleCustomInput
                    value={dateEnd}
                    className={styles.inputFilter}
                  />
                }
              />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label>Topic</label>
            <CustomInput type="text" value={topic} onChange={setTopic} />
          </div>
          <div className={styles.inputContainer}>
            <label>Event</label>
            <CustomInput type="text" value={event} onChange={setEvent} />
          </div>
          <div className={styles.inputContainer}>
            <label>Keyword (Chinese)</label>
            <CustomInput
              type="text"
              value={keyword_chinese}
              onChange={setKeywordChinese}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Keyword (English)</label>
            <CustomInput
              type="text"
              value={keyword_english}
              onChange={setKeywordEnglish}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Location</label>
            <CustomInput type="text" value={location} onChange={setLocation} />
          </div>
        </Filter>
      </div>
      {status === "pending" ? (
        <p>Loading map...</p>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <div className={styles.main}>
            <Map
              className={styles.homeMap}
              center={DEFAULT_CENTER}
              zoom={15}
              isMapExpand={isMapExpand}
              toggleMapSize={handleToggleMapSize}
              style={{
                borderRadius: "10px",
                height: "600px",
                flex: "3",
              }}
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
                  onChineseKeywordClick={setKeywordChinese}
                  onEnglishKeywordClick={setKeywordEnglish}
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
