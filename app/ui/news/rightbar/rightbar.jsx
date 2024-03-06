import Image from "next/image";
import styles from "./rightbar.module.css";
import { useQuery } from "@tanstack/react-query";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";
import { Indicator } from "../indicator/indicator";
import { useState } from "react";
import { fetchNewsData } from "@/app/news/page";
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
              onClick={() => handleItemClick('dcc37b57552a4f879b7c6e62ec87cfdc')}
            >
              <div className={styles.bgContainer}></div>
              <div className={styles.text}>
                <h3 className={styles.title}>
                  {dct_GrpST_Src_GeoTag?.dcc37b57552a4f879b7c6e62ec87cfdc?.id}
                </h3>
                <span className={styles.subtitle}>
                  {new Date(Date.now()).toUTCString()}
                </span>
                <p className={styles.desc}>
                  {dct_GrpST_Src_GeoTag.dcc37b57552a4f879b7c6e62ec87cfdc.summary_abstractive}
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
