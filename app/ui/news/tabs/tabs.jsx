import { createContext, useContext, useEffect, useState } from "react";
import styles from "./tabs.module.css";
const activeTabContext = createContext({});

const labels = ["Default Profile", "Profile 1", "Profile 2", "Profile 3"];
const INITIAL_TAB = 0;
export const Tabs = () => {
  const [active, setActive] = useState(INITIAL_TAB);

  return (
    <activeTabContext.Provider value={{ active, setActive }}>
      <div className={styles.row_flex}>
        {labels.map((label, i) => (
          <Tab key={i} label={label} i={i} />
        ))}
      </div>
    </activeTabContext.Provider>
  );
};

const Tab = ({ label, i }) => {
  const { active, setActive } = useContext(activeTabContext);

  return (
    <div className={styles.tab}>
      <div
        className={styles.tab_name}
        style={{
          color: active === i ?  "#00b19f": "#ccc",
        }}
        onClick={() => {
          setActive(i);
        }}
      >
        {label}
      </div>
      <div
        className={styles.underline}
        style={{
          borderBottomStyle: "solid",
          borderBottomColor: "#00b19f",
          borderBottomWidth: active === i ? "2px" : "0px",
          left: active === i ? "0" : "-100px",
          transition: "left 1s ease"
        }}
      ></div>
    </div>
  );
};
