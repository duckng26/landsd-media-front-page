import Image from "next/image";
import styles from "./rightbar.module.css";
import { useQuery } from "@tanstack/react-query";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";
import { Indicator } from "../indicator/indicator";
import { useState } from "react";
import { fetchNewsData } from "../../../lib/clientActions";
//TODO: update active item along with event open detail

const Rightbar = ({ name, openDetail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  const { status, data, isLoading, error } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNewsData,
  });

  const { dct_GrpST_Src_GeoTag } = data?.data;

  const handleItemClick = (activeItem) => {
    setActiveItem(activeItem);
    openDetail(activeItem);
  };


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Indicator handleToggle={setIsOpen} isOpen={isOpen} />
        <h3 className={styles.indicatorTitle}>{name}</h3>
      </div>
      {isOpen && (
        <>
          {status === "pending" ? (
            "Loading..."
          ) : status === "error" ? (
            <span>Error: {error.message}</span>
          ) : (
            <div
              className={activeItem ? styles.itemActive : styles.item}
              onClick={() => handleItemClick('5d09ffb56e42459c9624a132f45cc7c9')}
            >
              <div className={styles.bgContainer}></div>
              <div className={styles.text}>
                <h3 className={styles.title}>
                  {dct_GrpST_Src_GeoTag['5d09ffb56e42459c9624a132f45cc7c9'].id}
                </h3>
                <span className={styles.subtitle}>
                  {new Date(Date.now()).toUTCString()}
                </span>
                <p className={styles.desc}>
                  {dct_GrpST_Src_GeoTag['5d09ffb56e42459c9624a132f45cc7c9'].summary_abstractive}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Rightbar;
