import Image from "next/image";
import styles from "./rightbar.module.css";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";
import { Indicator } from '../indicator/indicator'
import { useState } from "react";

const Rightbar = ({name}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Indicator handleToggle={setIsOpen} isOpen={isOpen} />
        <h3 className={styles.indicatorTitle}>{name}</h3>
      </div>
      {isOpen && (
        <>
          <div className={styles.item}>
            <div className={styles.bgContainer}></div>
            <div className={styles.text}>
              <h3 className={styles.title}>Lorem ipsum dolor</h3>
              <span className={styles.subtitle}>Takes 4 minutes to learn</span>
              <p className={styles.desc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit eius libero perspiciatis recusandae possimus.
              </p>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.text}>
              <h3 className={styles.title}>News coming up!</h3>
              <span className={styles.subtitle}>
                Lorem ipsum dolor sit amet{" "}
              </span>
              <p className={styles.desc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit eius libero perspiciatis recusandae possimus.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Rightbar;
