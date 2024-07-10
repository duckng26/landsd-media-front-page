import React, { useEffect, useState, useCallback } from "react";

import styles from "./userTable.module.css";
import {
    MdMoreHoriz,
    MdArrowUpward,
    MdArrowDownward,
    MdChevronLeft,
    MdChevronRight,
} from "react-icons/md";

import ActionToolTip from "../../actionToolTip/actionToolTip";
import EditPopup from "./editPopup/editPopup";
import { useAuth } from "@/app/auth/authProvider";

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
    const [sortedBy, setSortedBy] = useState(["", ""]);

    const [isShowingTooltip, setIsShowingTooltip] = useState(false);
    const [recordWithTooltip, setRecordWithTooltip] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const auth = useAuth();
    const isAdmin = auth.user.id_role == 1;

    const handleClickSort = (sortKey) => {
        // sortedBy = [key, "ASC" or "DESC"]
        setSortedBy(sortKey);
        handleSort(sortKey);
    };

    const handleCancelTooltip = () => {
        setIsShowingTooltip(false);
    };

    const handleCancelPopup = () => {
        setIsEditing(false);
    };

    const handleClickAction = (r) => {
        setRecordWithTooltip(r);
        setIsShowingTooltip(true);
    };

    const handleClickEdit = () => {
        setIsShowingTooltip(false);
        setRecordWithTooltip(null);
        setIsEditing(true);
    };

    const handleClickDelete = (id) => {
        setRecordWithTooltip(null);
        setIsShowingTooltip(false);
        handleDeleteRecord(id);
    };

    return (
        <div>
            {isEditing && (
                <EditPopup
                    handleCancel={handleCancelPopup}
                    record={recordWithTooltip}
                    editableFields={editableFields}
                    handleSubmit={(data) => {
                        delete data.role;
                        handleEditRecord(data);
                    }}
                    columns={columns}
                />
            )}
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
                            {isAdmin && (
                                <th>
                                    <div className={styles.columnHead}>
                                        Action
                                    </div>
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((d) => {
                            const id = Object.entries(d)[0][1];
                            return (
                                <tr key={id}>
                                    {Object.keys(columns)?.map((k) => {
                                        return <td key={k + d[k]}>{d[k]}</td>;
                                    })}
                                    {isAdmin && (
                                        <td>
                                            <div
                                                className={styles.action}
                                                onClick={() =>
                                                    handleClickAction(d)
                                                }
                                            >
                                                <MdMoreHoriz size={20} />
                                                {recordWithTooltip &&
                                                    Object.entries(
                                                        recordWithTooltip
                                                    )[0][1] == id &&
                                                    isShowingTooltip && (
                                                        <ActionToolTip
                                                            handleCancel={
                                                                handleCancelTooltip
                                                            }
                                                            handleClickEdit={
                                                                handleClickEdit
                                                            }
                                                            handleClickDelete={() =>
                                                                handleClickDelete(
                                                                    id
                                                                )
                                                            }
                                                        />
                                                    )}
                                            </div>
                                        </td>
                                    )}
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
