import Image from "next/image";
import styles from "./indicator.module.css";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";

export const Indicator = ({ isOpen, handleToggle}) => {

  const onToggle = () => {
    handleToggle(!isOpen);
  }

  return <div className={`${styles.indicator} ${isOpen?styles.open:styles.close}`} onClick={onToggle}>
    {`<`}
  </div>
}
