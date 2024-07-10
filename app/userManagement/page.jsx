"use client";

import React, { useEffect, useState } from "react";
import OverridingListSubpage from "../ui/userManagement/overridingList/overridingListSubpage";
import UserManagementSubpage from "../ui/userManagement/userManagement/userManagementSubpage";

import styles from "../ui/userManagement/userManagement.module.css";
import { useAuth } from "../auth/authProvider";
import { useRouter } from "next/navigation";

function UserManagement() {
    const auth = useAuth();
    const router = useRouter();

    const subpages = {
        "Overriding List": <OverridingListSubpage />,
        "User Management": <UserManagementSubpage />,
    };

    const [currSubpage, setCurrSubpage] = useState("Overriding List");

    useEffect(() => {
        if (auth.user) {
            if (auth.user.id_role == 3 || !auth.user.id_role) {
                router.push("/error");
            }
        }
    }, []);

    return (
        <div>
            <div className={styles.header}>
                {Object.keys(subpages).map((name) => {
                    return (
                        <div
                            key={name}
                            className={styles.headerOption}
                            style={
                                currSubpage == name
                                    ? {
                                          color: "#00b19f",
                                          borderBottom: "2px solid #00b19f",
                                      }
                                    : {}
                            }
                            onClick={() => setCurrSubpage(name)}
                        >
                            {name}
                        </div>
                    );
                })}
            </div>
            <div className={styles.subpageContainer}>
                {subpages[currSubpage]}
            </div>
        </div>
    );
}

export default UserManagement;
