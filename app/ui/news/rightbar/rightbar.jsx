import Image from "next/image";
import styles from "./rightbar.module.css";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";
import { Indicator } from '../indicator/indicator'
import { useState } from "react";
//TODO: update active item along with event open detail

const Rightbar = ({name, openDetail}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  
  const handleItemClick = (activeItem) => {
    setActiveItem('1');
    openDetail();
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Indicator handleToggle={setIsOpen} isOpen={isOpen} />
        <h3 className={styles.indicatorTitle}>{name}</h3>
      </div>
      {isOpen && (
        <>
          <div className={activeItem?styles.itemActive:styles.item} onClick={() => handleItemClick(activeItem)}>
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
        </>
      )}
    </div>
  );
};

export default Rightbar;
