import React from "react";
import { useOutsideClick } from "@/app/lib/hooks";
import styles from "./actionToolTip.module.css";
import { MdCreate, MdDelete } from "react-icons/md";

function ActionToolTip({ handleCancel, handleClickEdit, handleClickDelete }) {
    const ref = useOutsideClick(handleCancel);

    return (
        <div className={styles.container} ref={ref}>
            <div onClick={handleClickEdit} className={styles.option}>
                <MdCreate size={20} />
                Edit
            </div>
            <div onClick={handleClickDelete} className={styles.delete}>
                <MdDelete size={20} />
                Delete
            </div>
        </div>
    );
}

export default ActionToolTip;
