import React, { useState, useCallback, useEffect } from "react";

import styles from "./userManagementSubpage.module.css";
import Filter from "./userManagementFilter/userManagementFilter";
import Table from "./table/userTable";
import AddRecord from "./addUserRecord/addUserRecord";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    deleteUser,
    exportUserList,
    fetchUsers,
    updateUser,
} from "@/app/lib/clientActions";
import { useAuth } from "@/app/auth/authProvider";
function debounce(func, delay) {
    let timer;
    return (...args) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

const ID_TO_ROLES = {
    1: "Admin",
    2: "Section Coordinator",
    3: "User",
};

function UserManagementSubpage() {
    const debouncedSetQueryString = useCallback(
        debounce((query) => setQueryString(query), 500),
        []
    );
    const [filter, setFilter] = useState({
        id: "",
        domain: "",
        section: "",
        post: "",
        username: "",
        idRole: "",
        email: "",
    });
    const [offset, setOffset] = useState(0);
    const [sortBy, setSortBy] = useState(null);
    const [sortDir, setSortDir] = useState(null);

    const [isAddingRecord, setIsAddingRecord] = useState(false);
    const [queryString, setQueryString] = useState("");

    const queryClient = useQueryClient();

    const auth = useAuth();

    const deleteUserMutation = useMutation({
        mutationFn: async (id) => {
            return await deleteUser(`id=${id}`);
        },
        onSuccess: () => {
            queryClient.refetchQueries(["users"]);
        },
    });

    const editUserMutation = useMutation({
        mutationFn: async (body) => {
            return await updateUser(body);
        },
        onSuccess: () => {
            queryClient.refetchQueries(["users"]);
        },
    });

    const handleNextPage = () => {
        setOffset(offset + 25);
    };

    const handlePreviousPage = () => {
        setOffset(Math.max(offset - 25, 0));
    };

    const handleEditRecord = (body) => {
        editUserMutation.mutate(body);
    };

    const handleDeleteRecord = (id) => {
        deleteUserMutation.mutate(id);
    };

    const handleSort = (sortedBy) => {
        setSortBy(sortedBy[0]);
        setSortDir(sortedBy[1]);
    };

    const { data, isLoading } = useQuery({
        queryKey: ["users", queryString],
        queryFn: async () => {
            const data = await fetchUsers(queryString);
            const users = data.data.users[0];
            return users.map((u) => {
                u.role = ID_TO_ROLES[u.id_role];
                return u;
            });
        },
    });

    const userListMutation = useMutation({
        mutationFn: async () => {
            return await exportUserList();
        },
    });

    useEffect(() => {
        let query = new URLSearchParams();

        // filter variables
        if (filter.id) query.append("id", filter.id);
        if (filter.domain) query.append("domain", filter.domain);
        if (filter.section) query.append("section", filter.section);
        if (filter.post) query.append("post", filter.post);
        if (filter.username) query.append("username", filter.username);
        if (filter.idRole) query.append("id_role", filter.idRole);
        if (filter.email) query.append("email", filter.email);

        // pagination variables
        if (offset > 0) query.append("offset", offset);
        if (sortBy) query.append("sort_by", sortBy);
        if (sortDir) query.append("sort_dir", sortDir);

        debouncedSetQueryString(query.toString());
    }, [filter, offset, sortBy, sortDir]);

    return (
        <div>
            {/* TODO: remove add button when user is add button if user is section coordinator  */}
            {isAddingRecord && (
                <AddRecord handleCancel={() => setIsAddingRecord(false)} />
            )}
            <div className={styles.header}>
                <h3>Manage Users and User Role</h3>
                <div className={styles.buttonContainer}>
                    {auth.user.id_role == 1 && (
                        <button
                            className={styles.addButton}
                            onClick={() => setIsAddingRecord(true)}
                        >
                            + Create User
                        </button>
                    )}

                    <button
                        className={styles.exportButton}
                        onClick={() => userListMutation.mutate()}
                    >
                        Export User List
                    </button>
                </div>
            </div>
            <Filter setFilter={setFilter} userList={data} />
            <Table
                data={data}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                page={offset / 25 + 1}
                columns={{
                    id: "User ID",
                    domain: "Domain",
                    section: "Section",
                    post: "Post",
                    username: "Username",
                    role: "Role",
                    email: "Email",
                }}
                editableFields={["domain", "username", "id_role", "email"]}
                handleDeleteRecord={handleDeleteRecord}
                handleEditRecord={handleEditRecord}
                handleSort={handleSort}
            />
        </div>
    );
}

export default UserManagementSubpage;
