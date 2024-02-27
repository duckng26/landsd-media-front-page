"use client";

import { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../ui/keyword/keyword.module.css";
import { Filter } from "../ui/news/filter/filter";
import { KeywordContainer } from "../ui/keyword/keywordContainer/keywordContainer";


const Keyword = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

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
        <div className={styles.inputContainter}>
          <label>Category</label>
          <input className={styles.inputFilter} type="text"></input>
        </div>
      </Filter>
      <Filter>
        <div className={styles.inputContainter}>
          <label>Topic</label>
          <input className={styles.inputFilter} type="text"></input>
        </div>
        <div className={styles.inputContainter}>
          <label>Subtopic</label>
          <input className={styles.inputFilter} type="text"></input>
        </div>
        <div className={styles.inputContainter}>
          <label>Keyword</label>
          <input className={styles.inputFilter} type="text"></input>
        </div>
      </Filter>
      <div className={styles.main}>
           <KeywordContainer title={'Core Keyword'}></KeywordContainer>
           <KeywordContainer title={'Trending Keyword'}></KeywordContainer>
           <KeywordContainer title={'Keyword Suggestions'}></KeywordContainer>
      </div>
    </div>
  );
};

export default Keyword;
