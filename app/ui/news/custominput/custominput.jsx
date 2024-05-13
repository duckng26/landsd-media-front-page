import React from 'react';
import styles from '../news.module.css';

export const CustomInput = ({ value, onChange, type = 'text' }) => {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <input
        className={styles.inputFilter}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          className={styles.clearButton}
          onClick={() => onChange('')}
        >
        </button>
      )}
    </div>
  );
};