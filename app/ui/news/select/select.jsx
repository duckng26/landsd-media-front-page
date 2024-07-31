import React from 'react';
import styles from "../news.module.css";

export const Select = ({ val, setVal , options }) => {
  const handleChange = (event) => {
    setVal(event.target.value);
  };

  return (
    <select value={val} onChange={handleChange} className={styles.inputFilter}>
      {options.map((option, i) => (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

