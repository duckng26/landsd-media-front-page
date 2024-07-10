import React from "react";
import styles from "./loadingSpinner.module.css";

function LoadingSpinner() {
    return (
        <div className={styles.ldsRing}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default LoadingSpinner;
