import React, { useContext, useEffect, useState } from "react";
import { fetchProfiles } from "@/app/lib/clientActions";
import { useQuery } from "@tanstack/react-query";

import styles from "./displayProfile.module.css";
import ProfileItem from "./profileItem/profileItem";
import { ProfilePageContext } from "@/app/profile/page";
import { useAuth } from "@/app/auth/authProvider";

function DisplayProfile() {
    const pageContext = useContext(ProfilePageContext);
    const authContext = useAuth();

    const { data, isLoading } = useQuery({
        queryFn: () => {
            const res = fetchProfiles();
            return res;
        },
        queryKey: ["profile"],
    });

    const handleCreate = () => {
        pageContext.setCurrPage("create");
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {data?.map((i) => {
                    return <ProfileItem profile={i} user={authContext.user} />;
                })}
                <button className={styles.addButton} onClick={handleCreate}>
                    Add New Profile
                </button>
            </div>
        </div>
    );
}

export default DisplayProfile;
