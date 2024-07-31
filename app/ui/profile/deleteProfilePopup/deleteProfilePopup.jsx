import React from "react";

import styles from "./deleteProfilePopup.module.css";
import { MdDelete } from "react-icons/md";

function DeleteProfilePopup({ profile, handleNo, handleYes }) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <h3>Delete Section {profile?.name}?</h3>
                </div>
                <div className={styles.center}>
                    <MdDelete size={50} color="red" />
                </div>
                <div className={styles.buttons}>
                    <button className={styles.no} onClick={handleNo}>
                        No
                    </button>
                    <button className={styles.yes} onClick={handleYes}>
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteProfilePopup;
