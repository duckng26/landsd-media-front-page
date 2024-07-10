import React, { useState } from "react";

import styles from "./addOverridingRecord.module.css";
import { MdOutlinePerson } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOverridingRecord } from "@/app/lib/clientActions";

function AddOverridingRecord({ handleCancel }) {
    const [postOld, setPostOld] = useState("");
    const [postNew, setPostNew] = useState("");
    const [sectionOld, setSectionOld] = useState("");
    const [sectionNew, setSectionNew] = useState("");

    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: async () => {
            let query = new URLSearchParams();
            query.append("id_user_old", sectionOld + "_" + postOld);
            query.append("id_user_new", sectionNew + "_" + postNew);
            return await createOverridingRecord(query.toString());
        },
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ["overriding_list"] });
        },
    });

    const handleSubmit = (e) => {
        if (!postOld || !postNew || !sectionOld || !sectionNew) {
            console.log("Not all required fields filled!");
        } else {
            createMutation.mutate();

            handleCancel();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <MdOutlinePerson />
                    <h3>New Overriding Record</h3>
                </div>
                <form className={styles.form}>
                    <div className={styles.fields}>
                        <div className={styles.formField}>
                            <label>Section (Old)</label>
                            <input
                                type="text"
                                required
                                onChange={(e) => {
                                    setSectionOld(e.target.value);
                                }}
                                value={sectionOld}
                            />
                        </div>
                        <div className={styles.formField}>
                            <label>Section (New)</label>
                            <input
                                type="text"
                                required
                                onChange={(e) => {
                                    setSectionNew(e.target.value);
                                }}
                                value={sectionNew}
                            />
                        </div>
                        <div className={styles.formField}>
                            <label>Post (Old)</label>
                            <input
                                type="text"
                                required
                                onChange={(e) => {
                                    setPostOld(e.target.value);
                                }}
                                value={postOld}
                            />
                        </div>
                        <div className={styles.formField}>
                            <label>Post (New)</label>
                            <input
                                type="text"
                                required
                                onChange={(e) => {
                                    setPostNew(e.target.value);
                                }}
                                value={postNew}
                            />
                        </div>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button
                            className={styles.cancel}
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
                            onClick={handleSubmit}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddOverridingRecord;
