import { useState, forwardRef } from "react";
import styles from "./filter.module.css";
import  "./filter.css";

export const Filter = ({children}) => {

  return (
    <div className={styles.filterContainer}>
      {children}
    </div>
  );
};
