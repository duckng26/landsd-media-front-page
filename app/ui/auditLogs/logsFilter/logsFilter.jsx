import React, { useEffect, useState } from "react";
import styles from "./logsFilter.module.css";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function Filter({ userList, setFilter }) {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [userId, setUserId] = useState("");
    const [action, setAction] = useState("");

    const handleClear = () => {
        setDateRange([null, null]);
        setUserId("");
        setAction("");
    };

    useEffect(() => {
        setFilter &&
            setFilter({
                userId: userId,
                action: action,
                startDate: startDate?.toISOString().split("T")[0],
                endDate: endDate?.toISOString().split("T")[0],
            });
    }, [userId, dateRange, action]);

    return (
        <div className={styles.container}>
            <div className={styles.filterContainer}>
                <div className={styles.filter}>
                    <label>User ID</label>
                    <input
                        type="text"
                        placeholder="User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </div>
                <div className={styles.filter}>
                    <label>Action</label>
                    <input
                        type="text"
                        placeholder="Action"
                        value={action}
                        onChange={(e) => setAction(e.target.value)}
                    />
                </div>
                <div className={styles.filter + " " + styles.filterDate}>
                    <label>Date</label>
                    <ReactDatePicker
                        wrapperClassName={styles.datePickerContainer}
                        className={styles.datePicker}
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update) => {
                            setDateRange(update);
                        }}
                        isClearable={true}
                    />
                </div>
            </div>
            <div className={styles.clear}>
                <button onClick={handleClear}>Clear Filter</button>
            </div>
        </div>
    );
}

export default Filter;
