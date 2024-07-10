import React, { useEffect, useState } from "react";
import styles from "./userManagementFilter.module.css";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function UserManagementFilter({ userList, setFilter }) {
    const [id, setId] = useState("");
    const [domain, setDomain] = useState("");
    const [section, setSection] = useState("");
    const [post, setPost] = useState("");
    const [username, setUsername] = useState("");
    const [idRole, setIdRole] = useState("");
    const [email, setEmail] = useState("");

    const handleClear = () => {
        setId("");
        setDomain("");
        setSection(""), setPost(""), setUsername("");
        setIdRole(""), setEmail("");
    };

    useEffect(() => {
        setFilter &&
            setFilter({
                id: id,
                domain: domain,
                section: section,
                post: post,
                username: username,
                idRole: idRole,
                email: email,
            });
    }, [id, domain, section, post, username, idRole, email]);

    return (
        <div className={styles.container}>
            <div className={styles.filterContainer}>
                <div className={styles.filter}>
                    <label>User ID</label>
                    <input
                        type="text"
                        placeholder="User ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
                <div className={styles.filter}>
                    <label>Domain</label>
                    <input
                        type="text"
                        placeholder="Domain"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                    />
                </div>
                <div className={styles.filter}>
                    <label>Section</label>
                    <input
                        type="text"
                        placeholder="Section"
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                    />
                </div>
                <div className={styles.filter}>
                    <label>Post</label>
                    <input
                        type="text"
                        placeholder="Post"
                        value={post}
                        onChange={(e) => setPost(e.target.value)}
                    />
                </div>
                <div className={styles.filter}>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className={styles.filter}>
                    <label>Role</label>
                    <select
                        value={idRole}
                        onChange={(e) => {
                            setIdRole(e.target.value);
                        }}
                    >
                        <option value={null}></option>
                        <option value={1}>Admin</option>
                        <option value={2}>Section Coordinator</option>
                        <option value={3}>User</option>
                    </select>
                </div>
                <div className={styles.filter}>
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>
            <div className={styles.clear}>
                <button onClick={handleClear}>Clear Filter</button>
            </div>
        </div>
    );
}

export default UserManagementFilter;
