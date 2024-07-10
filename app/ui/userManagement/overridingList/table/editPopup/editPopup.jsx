import React, { useEffect, useState } from "react";

import styles from "./editPopup.module.css";
import { MdCancel } from "react-icons/md";

const FormFieldText = ({
    label,
    isEditable,
    placeholder,
    objKey,
    editedData,
    setEditedData,
}) => {
    const [data, setData] = useState(placeholder);

    useEffect(() => {
        if (objKey && editedData) {
            editedData[objKey] = data;
            setEditedData(editedData);
        }
    }, [data]);

    return (
        <div className={styles.field}>
            <label>{label}</label>
            <input
                type="text"
                disabled={!isEditable}
                placeholder={placeholder}
                value={data}
                onChange={(e) => setData(e.target.value)}
            />
        </div>
    );
};

function EditPopup({
    handleCancel,
    record,
    editableFields,
    handleSubmit,
    columns,
}) {
    // const id_key = Object.keys(record)[0];
    // const id_val = record[id_key];
    const [editedData, setEditedData] = useState({});

    useEffect(() => {
        if (editableFields) {
            editableFields.forEach((e) => {
                editedData[e] = record[e];
            });
            setEditedData(editedData);
        }
    }, [editableFields]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h3>Edit Record</h3>
                <div className={styles.fieldsContainer}>
                    <div className={styles.fields}>
                        {record &&
                            Object.keys(record).map((k) => {
                                return (
                                    <FormFieldText
                                        objKey={k}
                                        label={columns[k]}
                                        isEditable={editableFields.includes(k)}
                                        placeholder={record[k]}
                                        setEditedData={setEditedData}
                                        editedData={editedData}
                                    />
                                );
                            })}
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                    <button
                        className={styles.cancelButton}
                        onClick={(e) => {
                            e.preventDefault;
                            handleCancel();
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className={styles.save}
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            handleSubmit(editedData);
                            handleCancel();
                        }}
                    >
                        Save
                    </button>
                </div>
                <MdCancel
                    size={20}
                    color="rgba(0, 0, 0, 0.3)"
                    className={styles.cancel}
                    onClick={handleCancel}
                />
            </div>
        </div>
    );
}

export default EditPopup;
