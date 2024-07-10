import React from "react";
import styles from "./editToolTip.module.css";
import { useOutsideClick } from "@/app/lib/hooks";
import { MdCreate, MdDelete } from "react-icons/md";

function EditToolTip({ handleEdit, handleDelete, setIsShowingEdit }) {
    const ref = useOutsideClick(() => {
        if (setIsShowingEdit) setIsShowingEdit(false);
    });

    return (
        <div className={styles.container} ref={ref}>
            <div onClick={handleEdit} className={styles.option}>
                <MdCreate size={20} />
                Edit
            </div>
            <div onClick={handleDelete} className={styles.delete}>
                <MdDelete size={20} />
                Delete
            </div>
        </div>
    );
}

export default EditToolTip;
