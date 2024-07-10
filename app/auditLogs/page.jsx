"use client";

import React, { useState, useCallback, useEffect } from "react";
import Filter from "../ui/auditLogs/logsFilter/logsFilter";
import Table from "../ui/auditLogs/table/logsTable";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getLogs } from "../lib/clientActions";

function debounce(func, delay) {
    let timer;
    return (...args) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

function AuditLogs() {
    const [filter, setFilter] = useState({
        startDate: "",
        endDate: "",
        userId: "",
        action: "",
    });
    const [offset, setOffset] = useState(0);
    const [sortBy, setSortBy] = useState(null);
    const [sortDir, setSortDir] = useState(null);

    const [queryString, setQueryString] = useState("");

    const debouncedSetQueryString = useCallback(
        debounce((query) => setQueryString(query), 500),
        []
    );

    useEffect(() => {
        let query = new URLSearchParams();

        // filter variables
        if (filter.userId) query.append("id", filter.userId);
        // if (action) query.append("action", action);
        if (filter.startDate) query.append("start_date", filter.startDate);
        if (filter.endDate) query.append("end_date", filter.endDate);

        // pagination variables
        if (offset > 0) query.append("offset", offset);
        if (sortBy) query.append("sort_by", sortBy);
        if (sortDir) query.append("sort_dir", sortDir);

        debouncedSetQueryString(query.toString());
    }, [filter, offset, sortBy, sortDir]);

    const { data, isLoading } = useQuery({
        queryKey: ["logs", queryString],
        queryFn: async () => {
            const d = await getLogs(queryString);
            console.log(queryString);
            return d;
        },
    });

    const handleNextPage = () => {
        setOffset(offset + 25);
    };

    const handlePreviousPage = () => {
        setOffset(Math.max(offset - 25, 0));
    };

    const handleSort = (sortedBy) => {
        setSortBy(sortedBy[0]);
        setSortDir(sortedBy[1]);
    };

    return (
        <div>
            <Filter setFilter={setFilter} />
            <Table
                data={data}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                handleSort={handleSort}
                page={offset / 25 + 1}
                columns={{
                    timestamp: "Date",
                    id: "User ID",
                    action: "Action",
                    message: "Log Message",
                }}
            />
        </div>
    );
}

export default AuditLogs;
