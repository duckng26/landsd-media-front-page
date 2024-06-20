import { createContext, useContext, useEffect, useState } from "react";
import styles from "./tabs.module.css";

const activeTabContext = createContext({});

const INITIAL_TAB = 0;
export const Tabs = ({ profiles, activeProfile, setActiveProfile }) => {

  const labels = profiles
    ? profiles?.map((profile) => profile.name)
    : ["Default"];

  return (
    <activeTabContext.Provider value={{ activeProfile, setActiveProfile }}>
      <div className={styles.row_flex}>
        {labels.map((label, i) => (
          <Tab key={i} label={label} i={i} />
        ))}
      </div>
    </activeTabContext.Provider>
  );
};

const Tab = ({ label, i }) => {
  const { activeProfile, setActiveProfile } = useContext(activeTabContext);

  return (
    <div className={styles.tab}>
      <div
        className={styles.tab_name}
        style={{
          color: activeProfile === i ? "#00b19f" : "#ccc",
        }}
        onClick={() => {
          setActiveProfile(i);
        }}
      >
        {label}
      </div>
      <div
        className={styles.underline}
        style={{
          borderBottomStyle: "solid",
          borderBottomColor: "#00b19f",
          borderBottomWidth: activeProfile === i ? "2px" : "0px",
          left: activeProfile === i ? "0" : "-100px",
          transition: "left 1s ease",
          bottom: "-2px",
        }}
      ></div>
    </div>
  );
};
