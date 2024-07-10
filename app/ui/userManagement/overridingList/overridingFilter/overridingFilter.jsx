import React, { useEffect, useState } from "react";
import styles from "./overridingFilter.module.css";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function Filter({ userList, setFilter }) {
    const [createdDateRange, setCreatedDateRange] = useState([null, null]);
    const [createdStartDate, createdEndDate] = createdDateRange;
    const [updatedDateRange, setUpdatedDateRange] = useState([null, null]);
    const [updatedStartDate, updatedEndDate] = updatedDateRange;
    const [userIdOld, setUserIdOld] = useState("");
    const [userIdNew, setUserIdNew] = useState("");
    const [createdBy, setCreatedBy] = useState("");
    const [updatedBy, setUpdatedBy] = useState("");

    const handleClear = () => {
        setCreatedDateRange([null, null]);
        setUpdatedDateRange([null, null]);
        setUserIdOld("");
        setUserIdNew("");
        setCreatedBy("");
        setUpdatedBy("");
    };

    useEffect(() => {
        setFilter &&
            setFilter({
                userIdOld: userIdOld,
                userIdNew: userIdNew,
                createdBy: createdBy,
                updatedBy: updatedBy,
                createdDateRange: createdDateRange,
                updatedDateRange: updatedDateRange,
            });
    }, [
        userIdNew,
        userIdOld,
        createdBy,
        updatedBy,
        createdDateRange,
        updatedDateRange,
    ]);

    return (
        <div className={styles.container}>
            <div className={styles.filterContainer}>
                <div className={styles.filter}>
                    <label>User ID (Old)</label>
                    <input
                        type="text"
                        placeholder="User ID"
                        value={userIdOld}
                        onChange={(e) => setUserIdOld(e.target.value)}
                    />
                </div>
                <div className={styles.filter}>
                    <label>User ID (New)</label>
                    <input
                        type="text"
                        placeholder="User ID"
                        value={userIdNew}
                        onChange={(e) => setUserIdNew(e.target.value)}
                    />
                </div>
                <div className={styles.filter}>
                    <label>Created By</label>
                    <select
                        value={createdBy}
                        onChange={(e) => setCreatedBy(e.target.value)}
                        placeholder="Created By"
                    >
                        <option value={null}></option>
                        {userList?.map((u) => (
                            <option key={u.id} value={u.id}>
                                {u.id}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.filter}>
                    <label>Updated By</label>
                    <select
                        value={updatedBy}
                        onChange={(e) => setUpdatedBy(e.target.value)}
                    >
                        <option value={null}></option>

                        {userList?.map((u) => (
                            <option key={u.id} value={u.id}>
                                {u.id}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.filter + " " + styles.filterDate}>
                    <label>Created At</label>
                    <ReactDatePicker
                        wrapperClassName={styles.datePickerContainer}
                        className={styles.datePicker}
                        selectsRange={true}
                        startDate={createdStartDate}
                        endDate={createdEndDate}
                        onChange={(update) => {
                            setCreatedDateRange(update);
                        }}
                        isClearable={true}
                    />
                </div>
                <div className={styles.filter + " " + styles.filterDate}>
                    <label>Updated At</label>
                    <ReactDatePicker
                        wrapperClassName={styles.datePickerContainer}
                        className={styles.datePicker}
                        selectsRange={true}
                        startDate={updatedStartDate}
                        endDate={updatedEndDate}
                        onChange={(update) => {
                            setUpdatedDateRange(update);
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
