import { createContext, useContext, useEffect, useState } from "react";
import styles from "./tabs.module.css";

const activeTabContext = createContext({});

export const Tabs = ({ profiles, activeProfile, setActiveProfile }) => {
    const labels = profiles
        ? profiles?.map((profile) => profile.name)
        : ["Default"];

    const handleChange = (event) => {
        setActiveProfile(Number(event.target.value));
    };

    return (
        <activeTabContext.Provider value={{ activeProfile, setActiveProfile }}>
            <div className={styles.selectContainer}>
                <select
                    value={activeProfile}
                    onChange={handleChange}
                    className={styles.select}
                >
                    {labels.map((label, i) => (
                        <option key={i} value={i}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>
        </activeTabContext.Provider>
    );
};
