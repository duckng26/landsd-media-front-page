import React, { useEffect, useState } from "react";

import styles from "./logsTable.module.css";
import {
    MdMoreHoriz,
    MdArrowUpward,
    MdArrowDownward,
    MdChevronLeft,
    MdChevronRight,
} from "react-icons/md";

function Table({
    data,
    handleNextPage,
    handlePreviousPage,
    page,
    columns,
    limit = 25,
    handleDeleteRecord,
    handleEditRecord,
    editableFields,
    handleSort,
}) {
    const [sortedBy, setSortedBy] = useState([null, null]);

    const handleClickSort = (sortKey) => {
        // sortedBy = [key, "ASC" or "DESC"]
        setSortedBy(sortKey);
        handleSort(sortKey);
    };

    return (
        <div>
            <div className={styles.tableContainer}>
                <table>
                    <thead>
                        <tr>
                            {Object.keys(columns)?.map((key) => (
                                <th key={key}>
                                    <div
                                        className={styles.columnHead}
                                        onClick={() => {
                                            if (
                                                sortedBy[0] == key &&
                                                sortedBy[1] == "ASC"
                                            ) {
                                                handleClickSort([key, "DESC"]);
                                            } else {
                                                handleClickSort([key, "ASC"]);
                                            }
                                        }}
                                    >
                                        {columns[key]}
                                        {sortedBy[0] == key &&
                                            (sortedBy[1] == "ASC" ? (
                                                <MdArrowDownward size={15} />
                                            ) : (
                                                <MdArrowUpward size={15} />
                                            ))}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((d) => {
                            return (
                                <tr>
                                    {Object.keys(columns)?.map((k) => {
                                        return <td key={k + d[k]}>{d[k]}</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className={styles.pageContainer}>
                <button
                    className={styles.pageBtn}
                    disabled={page <= 1}
                    onClick={handlePreviousPage}
                >
                    <MdChevronLeft size={20} />
                </button>
                <div className={styles.page}>{page}</div>
                <button
                    className={styles.pageBtn}
                    disabled={data?.length < limit}
                    onClick={handleNextPage}
                >
                    <MdChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}

export default Table;
