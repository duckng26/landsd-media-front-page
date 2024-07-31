import React, { useContext, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import styles from "./profileItem.module.css";
import DeleteProfilePopup from "../../deleteProfilePopup/deleteProfilePopup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProfile, getCurrentUser } from "@/app/lib/clientActions";
import { ProfilePageContext } from "@/app/profile/page";

function isProfileEditable(profile, user) {
    if (!user) {
        return false;
    }
    if (user.id_role === 3 && profile.id_user != user.id) {
        return false;
    }

    if (!profile.section && !profile.id_user && user.id_role != 1) {
        return false;
    }

    return true;
}

function ProfileItem({ profile, user }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const queryClient = useQueryClient();
    const pageContext = useContext(ProfilePageContext);
    const isEditable = isProfileEditable(profile, user);

    const deleteMutation = useMutation({
        mutationFn: () => {
            const success = deleteProfile(`id_profile=${profile.id}`);
            return success;
        },
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ["profile"] });
        },
    });

    const handleNo = () => {
        setIsDeleting(false);
    };

    const handleYes = () => {
        setIsDeleting(false);

        deleteMutation.mutate();
    };

    const handleEdit = () => {
        pageContext.setTargetProfile(profile);
        pageContext.setCurrPage("edit");
    };

    return (
        <div className={styles.container}>
            {isDeleting && (
                <DeleteProfilePopup
                    profile={profile}
                    handleNo={handleNo}
                    handleYes={handleYes}
                />
            )}
            <div className={styles.name}>{profile?.name}</div>
            {isEditable && (
                <div className={styles.icon} onClick={handleEdit}>
                    <MdEdit size={25} color="#00A38D" />
                </div>
            )}
            {isEditable && (
                <div
                    className={styles.icon}
                    onClick={() => setIsDeleting(true)}
                >
                    <MdDelete size={25} color="red" />
                </div>
            )}
        </div>
    );
}

export default ProfileItem;
