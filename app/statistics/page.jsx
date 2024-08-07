"use client";

import React, {
    useState,
    useCallback,
    useEffect,
    forwardRef,
    createContext,
} from "react";
import { Filter } from "../ui/news/filter/filter";
import DatePicker from "react-datepicker";
import { useQuery } from "@tanstack/react-query";
import styles from "../ui/statistics/statistics.module.css";
import "react-datepicker/dist/react-datepicker.css";
import {
    fetchTopicsData,
    fetchEventsData,
    fetchSources,
    fetchSourceFrequencies,
    fetchMediumFrequencies,
    fetchMediumFrequenciesByDate,
    fetchMediumData,
    fetchTrendingKeywordFrequency,
} from "../lib/clientActions";
import GraphContainer from "../ui/statistics/graphContainer/graphContainer";

function debounce(func, delay) {
    let timer;
    return (...args) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

function Statistics() {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [idTopic, setIdTopic] = useState(null);
    const [idEvent, setIdEvent] = useState(null);
    const [queryString, setQueryString] = useState("");

    const debouncedSetQueryString = useCallback(
        debounce((query) => setQueryString(query), 500),
        []
    );

    const dateParser = (date) => {
        const offset = date.getTimezoneOffset();
        date = new Date(date.getTime() - offset * 60 * 1000);
        return date.toISOString().split("T")[0];
    };

    // change query params when input changes
    useEffect(() => {
        let query = new URLSearchParams();

        if (startDate) query.append("start_date", dateParser(startDate));
        if (endDate) query.append("end_date", dateParser(endDate));
        if (idTopic) query.append("id_topic", idTopic);
        if (idEvent) query.append("id_event", idEvent);

        debouncedSetQueryString(query.toString());
    }, [startDate, endDate, idTopic, idEvent]);

    const { data: mediumFrequencyData, isLoading: isMediumFrequencyLoading } =
        useQuery({
            queryKey: ["medium_frequencies", queryString],
            queryFn: () => fetchMediumFrequencies(queryString),
        });

    const { data: mediumData, isLoading: isMediumLoading } = useQuery({
        queryKey: ["medium", queryString],
        queryFn: () => fetchMediumData(queryString),
    });

    const {
        data: mediumFrequencyByDateData,
        isLoading: isMediumFrequencyByDateLoading,
    } = useQuery({
        queryKey: ["medium_frequencies_by_date", queryString],
        queryFn: () => fetchMediumFrequenciesByDate(queryString),
    });

    const { data: sourceData, isLoading: isSourceLoading } = useQuery({
        queryKey: ["sources", queryString],
        queryFn: () => fetchSources(queryString),
    });

    const { data: sourceFrequencyData, isLoading: isSourceFrequencyLoading } =
        useQuery({
            queryKey: ["source_frequencies", queryString],
            queryFn: () => fetchSourceFrequencies(queryString),
        });

    const {
        data: trendingFrequencyData,
        isLoading: isTrendingFrequencyLoading,
    } = useQuery({
        queryKey: ["trending_keyword_frequency", queryString],
        queryFn: () => fetchTrendingKeywordFrequency(queryString),
    });

    const { data: topicsData, isLoading: isTopicsLoading } = useQuery({
        queryKey: ["topics"],
        queryFn: () => fetchTopicsData(),
    });

    const { data: eventsData, isLoading: isEventsLoading } = useQuery({
        queryKey: ["events"],
        queryFn: () => fetchEventsData(),
    });

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button
            className={`${styles.inputFilter} ${styles.customInput}`}
            onClick={onClick}
            ref={ref}
        >
            {value}
        </button>
    ));
    return (
        <div className={styles.page}>
            <Filter>
                <div className={styles.inputContainer} style={{ zIndex: 3 }}>
                    <label>Time</label>
                    <DatePicker
                        className={styles.datePicker}
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update) => {
                            setDateRange(update);
                        }}
                        dateFormat={"dd/MM/yyyy"}
                        isClearable={true}
                        placeholderText="I have been cleared!"
                        customInput={
                            <ExampleCustomInput
                                value={"02/05/2024 - 02/14/2024"}
                            />
                        }
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label>Topic</label>
                    <select
                        className={styles.inputFilter}
                        onChange={(e) => {
                            setIdTopic(e.target.value);
                            setIdEvent(null);
                        }}
                    >
                        <option value={""}>All</option>
                        {topicsData?.topics.map((t) => {
                            return (
                                <option key={t.topic} value={t.id}>
                                    {t.topic}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className={styles.inputContainer}>
                    <label>Event</label>
                    <select
                        className={styles.inputFilter}
                        onChange={(e) => {
                            setIdEvent(e.target.value);
                        }}
                    >
                        <option value={""}>All</option>
                        {eventsData?.events
                            .filter((e) => e.id_topic == idTopic)
                            .map((e) => {
                                return (
                                    <option key={e.event} value={e.id}>
                                        {e.event}
                                    </option>
                                );
                            })}
                    </select>
                </div>
            </Filter>
            <GraphContainer
                sourceData={sourceData}
                sourceFrequencyData={sourceFrequencyData}
                mediumFrequencyData={mediumFrequencyData}
                mediumFrequencyByDateData={mediumFrequencyByDateData}
                mediumData={mediumData}
                trendingFrequencyData={trendingFrequencyData}
            />
        </div>
    );
}

export default Statistics;
