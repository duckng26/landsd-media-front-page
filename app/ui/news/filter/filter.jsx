import { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./filter.module.css";
import  "./filter.css";

export const Filter = () => {
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
    <div className={styles.filterContainer}>
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
          customInput={<ExampleCustomInput value={"02/05/2024 - 02/14/2024"} />}
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
    </div>
  );
};
