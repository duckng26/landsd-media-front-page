import React, { useState } from "react";

import styles from "./addUserRecord.module.css";
import { MdOutlinePerson } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "@/app/lib/clientActions";

function AddUserRecord({ handleCancel }) {
    const [domain, setDomain] = useState("");
    const [section, setSection] = useState("");
    const [post, setPost] = useState("");
    const [username, setUsername] = useState("");
    const [idRole, setIdRole] = useState(1);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: async () => {
            return await createUser({
                id: section + "_" + post,
                domain: domain,
                section: section,
                post: post,
                username: username,
                id_role: idRole,
                email: email,
                password: password,
            });
        },
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ["users"] });
        },
    });

    const handleSubmit = (e) => {
        if (
            !domain ||
            !section ||
            !post ||
            !username ||
            !idRole ||
            !email ||
            !password
        ) {
            console.log("Create user fields incomplete!");
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
                    <h3>New User </h3>
                </div>
                <form className={styles.form}>
                    <div className={styles.fields}>
                        <div className={styles.formField}>
                            <label>Domain</label>
                            <input
                                type="text"
                                required
                                onChange={(e) => {
                                    setDomain(e.target.value);
                                }}
                                value={domain}
                            />
                        </div>
                        <div className={styles.formField}>
                            <label>Section</label>
                            <input
                                type="text"
                                required
                                onChange={(e) => {
                                    setSection(e.target.value);
                                }}
                                value={section}
                            />
                        </div>
                        <div className={styles.formField}>
                            <label>Post</label>
                            <input
                                type="text"
                                required
                                onChange={(e) => {
                                    setPost(e.target.value);
                                }}
                                value={post}
                            />
                        </div>
                        <div className={styles.formField}>
                            <label>Username</label>
                            <input
                                type="text"
                                required
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                                value={username}
                            />
                        </div>
                        <div className={styles.formField}>
                            {/* TODO: potentially remove */}
                            <label>Role</label>
                            <select
                                required
                                onChange={(e) => {
                                    setIdRole(e.target.value);
                                }}
                                value={idRole}
                            >
                                <option value={1}>Admin</option>
                                <option value={2}>Section Coordinator</option>
                                <option value={3}>User</option>
                            </select>
                        </div>
                        <div className={styles.formField}>
                            <label>Email</label>
                            <input
                                type="text"
                                required
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                value={email}
                            />
                        </div>
                        <div className={styles.formField}>
                            <label>Password</label>
                            <input
                                type="text"
                                required
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                value={password}
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

export default AddUserRecord;
