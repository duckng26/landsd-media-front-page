import Image from "next/image";
import styles from "./rightbar.module.css";
import { useQuery } from "@tanstack/react-query";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";
import { Indicator } from "../indicator/indicator";
import { useState } from "react";
import { fetchNewsData } from "../../../lib/clientActions";
//TODO: update active item along with event open detail

const Rightbar = ({ name, openDetail, onSelect, activeItem, qs }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { status, data, isLoading, error } = useQuery({
    queryKey: ["news", qs],
    enabled: false,
  });

  console.log(data)

  const listNews = Object.values(data?.data["dct_GrpST_Src_GeoTag"] || {});

  const handleItemClick = (nextItem) => {
    if (activeItem == nextItem) {
      openDetail("");
      return;
    }
    openDetail(nextItem);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Indicator handleToggle={setIsOpen} isOpen={isOpen} />
        <h3 className={styles.indicatorTitle}>{name}</h3>
      </div>
      <div className={styles.listNews}>
      {isOpen &&
        listNews.map((item) => {
          return (
            <div key={item.id}  onClick={() => onSelect(item.geo_tag)}>
              {status === "pending" ? (
                "Loading..."
              ) : status === "error" ? (
                <span>Error: {error.message}</span>
              ) : (
                <div
                  className={
                    activeItem == item.id ? styles.itemActive : styles.item
                  }
                  onClick={() => handleItemClick(item.id)}
                >
                  <div className={styles.bgContainer}></div>
                  <div className={styles.text}>
                    <h3 className={styles.title}>{item.title}</h3>
                    <span className={styles.subtitle}>
                      {new Date(Date.now()).toUTCString()}
                    </span>
                    <p className={styles.desc}>
                      {item["summary_extractive"]?.[0]}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rightbar;
