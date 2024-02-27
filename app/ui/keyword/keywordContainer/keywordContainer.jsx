import styles from "./keywordContainer.module.css";

export const KeywordContainer = ({ title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>
          {title}
        </h3>
      </div>
      <div className={styles.nuggetsList}>
        <div className={styles.nugget}>Singapore</div>
        <div className={styles.nugget}>Singapore</div>
        <div className={styles.nugget}>Singapore</div>
      </div>
    </div>
  );
};
