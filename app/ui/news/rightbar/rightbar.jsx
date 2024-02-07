import Image from "next/image";
import styles from "./rightbar.module.css";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";

const Rightbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
        </div>
        <div className={styles.text}>
          <h3 className={styles.title}>
            Lorem ipsum dolor
          </h3>
          <span className={styles.subtitle}>Takes 4 minutes to learn</span>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit eius libero perspiciatis recusandae possimus.
          </p>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.text}>
          <h3 className={styles.title}>
            News coming
            up!
          </h3>
          <span className={styles.subtitle}>Lorem ipsum dolor sit amet </span>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit eius libero perspiciatis recusandae possimus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
