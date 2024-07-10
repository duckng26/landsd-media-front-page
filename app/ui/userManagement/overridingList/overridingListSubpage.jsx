"use client";

import React, { useState, useCallback, useEffect } from "react";

import styles from "./overridingListSubpage.module.css";
import Filter from "./overridingFilter/overridingFilter";
import Table from "./table/overridingTable";
import AddRecord from "./addOverridingRecord/addOverridingRecord";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    deleteOverridingRecord,
    fetchOverridingListData,
    fetchUsers,
    updateOverridingRecord,
} from "@/app/lib/clientActions";

function debounce(func, delay) {
    let timer;
    return (...args) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

function OverridingListSubpage() {
    const debouncedSetQueryString = useCallback(
        debounce((query) => setQueryString(query), 500),
        []
    );
    const [filter, setFilter] = useState({
        userIdOld: "",
        userIdNew: "",
        createdBy: "",
        updatedBy: "",
        createdDateRange: [null, null],
        updatedDateRange: [null, null],
    });
    const [sortBy, setSortBy] = useState(null);
    const [sortDir, setSortDir] = useState(null);
    const [offset, setOffset] = useState(0);

    const [isAddingRecord, setIsAddingRecord] = useState(false);

    const [queryString, setQueryString] = useState("");

    const queryClient = useQueryClient();

    const deleteOverridingRecordMutation = useMutation({
        mutationFn: async (id_user_old) => {
            return await deleteOverridingRecord(`id_user_old=${id_user_old}`);
        },
        onSuccess: () => {
            queryClient.refetchQueries(["overriding_list"]);
        },
    });

    const updateOverridingRecordMutation = useMutation({
        mutationFn: async (data) => {
            console.log(data);
            const qs = new URLSearchParams();
            qs.append("id_user_old", data.id_user_old);
            qs.append("id_user_new", data.id_user_new);

            return await updateOverridingRecord(qs.toString());
        },
        onSuccess: () => {
            queryClient.refetchQueries(["overriding_list"]);
        },
    });

    const handleNextPage = () => {
        setOffset(offset + 25);
    };

    const handlePreviousPage = () => {
        setOffset(Math.max(offset - 25, 0));
    };

    const handleDeleteRecord = (id_user_old) => {
        deleteOverridingRecordMutation.mutate(id_user_old);
    };

    const handleEditRecord = (data) => {
        updateOverridingRecordMutation.mutate(data);
    };

    const handleSort = (sortedBy) => {
        setSortBy(sortedBy[0]);
        setSortDir(sortedBy[1]);
    };

    const { data, isLoading } = useQuery({
        queryKey: ["overriding_list", queryString],
        queryFn: async () => {
            const data = await fetchOverridingListData(queryString);
            return data.data.users[0];
        },
    });

    const { data: userData, isLoading: userIsLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const data = await fetchUsers(queryString);
            return data.data.users[0];
        },
    });

    useEffect(() => {
        let query = new URLSearchParams();

        // filter variables
        if (filter.userIdOld) query.append("id_user_old", filter.userIdOld);
        if (filter.userIdNew) query.append("id_user_new", filter.userIdNew);
        if (filter.createdBy) query.append("created_by", filter.createdBy);
        if (filter.updatedBy) query.append("updated_by", filter.updatedBy);
        if (filter.createdDateRange[0] && filter.createdDateRange[1]) {
            query.append(
                "created_at_start",
                filter.createdDateRange[0].toISOString()
            );
            query.append(
                "created_at_end",
                filter.createdDateRange[1].toISOString()
            );
        }
        if (filter.updatedDateRange[0] && filter.updatedDateRange[1]) {
            query.append(
                "updated_at_start",
                filter.updatedDateRange[0].toISOString()
            );
            query.append(
                "updated_at_end",
                filter.updatedDateRange[1].toISOString()
            );
        }

        // pagination variables
        if (offset > 0) query.append("offset", offset);
        if (sortBy) query.append("sort_by", sortBy);
        if (sortDir) query.append("sort_dir", sortDir);

        debouncedSetQueryString(query.toString());
    }, [filter, offset, sortBy, sortDir]);

    return (
        <div>
            {isAddingRecord && (
                <AddRecord handleCancel={() => setIsAddingRecord(false)} />
            )}
            <div className={styles.header}>
                <h3>Manage Overriding Record</h3>
                <button
                    className={styles.addButton}
                    onClick={() => setIsAddingRecord(true)}
                >
                    + Overriding Record
                </button>
            </div>
            <Filter setFilter={setFilter} userList={userData} />
            <Table
                data={data}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                page={offset / 25 + 1}
                columns={{
                    id_user_old: "User ID (Old)",
                    id_user_new: "User ID (New)",
                    created_at: "Created At",
                    created_by: "Created By",
                    updated_at: "Updated At",
                    updated_by: "Updated By",
                }}
                editableFields={["id_user_new"]}
                handleDeleteRecord={handleDeleteRecord}
                handleEditRecord={handleEditRecord}
                handleSort={handleSort}
            />
        </div>
    );
}

export default OverridingListSubpage;
