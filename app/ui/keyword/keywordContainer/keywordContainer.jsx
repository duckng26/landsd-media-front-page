import { useState } from "react";
import styles from "./keywordContainer.module.css";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

export const KeywordContainer = ({ title, children }) => {
    const [isShowingChildren, setIsShowingChildren] = useState(true);

    return (
        <div className={styles.container}>
            <div
                className={styles.header}
                onClick={() => setIsShowingChildren(!isShowingChildren)}
            >
                <h3>{title}</h3>
                {isShowingChildren ? (
                    <MdArrowDropDown size={30} />
                ) : (
                    <MdArrowDropUp size={30} />
                )}
            </div>
            <div style={{ display: isShowingChildren ? "inherit" : "none" }}>
                {children}
            </div>
        </div>
    );
};
