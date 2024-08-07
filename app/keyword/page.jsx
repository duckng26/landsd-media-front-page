"use client";

import { useState, forwardRef, useCallback, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../ui/keyword/keyword.module.css";
import { Filter } from "../ui/news/filter/filter";
import { KeywordContainer } from "../ui/keyword/keywordContainer/keywordContainer";
import KeywordGroupings from "../ui/keyword/keywordGroupings/keywordGroupings";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
    fetchCoreKeywordData,
    fetchTrendingKeywordData,
    fetchSuggestedKeywordData,
    fetchEmergingKeywordData,
    fetchTopicsData,
    fetchEventsData,
} from "../lib/clientActions";
import KeywordSuggestions from "../ui/keyword/keywordSuggestions/keywordSuggestions";

function debounce(func, delay) {
    let timer;
    return (...args) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

const getWeek = function (date) {
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return (
        1 +
        Math.round(
            ((date.getTime() - week1.getTime()) / 86400000 -
                3 +
                ((week1.getDay() + 6) % 7)) /
                7
        )
    );
};

const Keyword = () => {
    // query data
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [idTopic, setIdTopic] = useState(null);
    const [idEvent, setIdEvent] = useState(null);
    const [keywordChinese, setKeywordChinese] = useState("");
    const [keywordEnglish, setKeywordEnglish] = useState("");
    const [yearStart, setYearStart] = useState("");
    const [yearEnd, setYearEnd] = useState("");
    const [weekStart, setWeekStart] = useState("");
    const [weekEnd, setWeekEnd] = useState("");
    const [queryString, setQueryString] = useState("");

    const debouncedSetQueryString = useCallback(
        debounce((query) => setQueryString(query), 500),
        []
    );

    // change query params when input changes
    useEffect(() => {
        let query = new URLSearchParams();

        if (idTopic) query.append("id_topic", idTopic);
        if (idEvent) query.append("id_event", idEvent);
        if (keywordChinese) query.append("keyword_chinese", keywordChinese);
        if (keywordEnglish) query.append("keyword_english", keywordEnglish);
        if (location) query.append("location", location);
        if (yearStart) query.append("year_start", yearStart);
        if (yearEnd) query.append("year_end", yearEnd);
        if (weekStart) query.append("week_start", weekStart);
        if (weekEnd) query.append("week_end", weekEnd);

        debouncedSetQueryString(query.toString());
    }, [
        idTopic,
        idEvent,
        keywordChinese,
        keywordEnglish,
        yearStart,
        yearEnd,
        weekStart,
        weekEnd,
    ]);

    // change date params when date field changes
    useEffect(() => {
        if (startDate && endDate) {
            setWeekStart(getWeek(startDate));
            setWeekEnd(getWeek(endDate));

            setYearStart(startDate.getFullYear());
            setYearEnd(endDate.getFullYear());
        }
    }, dateRange);

    // queries
    const { data: coreData, isLoading: isCoreLoading } = useQuery({
        queryKey: ["core_keywords", queryString],
        queryFn: () => fetchCoreKeywordData(queryString),
    });

    const { data: trendingData, isLoading: isTrendingLoading } = useQuery({
        queryKey: ["trending_keywords", queryString],
        queryFn: () => fetchTrendingKeywordData(queryString),
    });

    const { data: emergingData, isLoading: isEmergingLoading } = useQuery({
        queryKey: ["emerging_keywords", queryString],
        queryFn: () => fetchEmergingKeywordData(queryString),
    });

    const { data: suggestedData, isLoading: isSuggestedLoading } = useQuery({
        queryKey: ["suggested_keywords", queryString],
        queryFn: () => fetchSuggestedKeywordData(queryString),
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
        <div className={styles.wrapper}>
            <Filter>
                <div className={styles.inputContainter} style={{ zIndex: 3 }}>
                    <label>Time</label>
                    <DatePicker
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update) => {
                            setDateRange(update);
                        }}
                        isClearable={true}
                        placeholderText="I have been cleared!"
                        customInput={
                            <ExampleCustomInput
                                value={"02/05/2024 - 02/14/2024"}
                            />
                        }
                    />
                </div>
                {/* <div className={styles.inputContainter}>
                    <label>Email</label>
                    <input className={styles.inputFilter} type="email"></input>
                </div>
                <div className={styles.inputContainter}>
                    <label>District</label>
                    <input className={styles.inputFilter} type="text"></input>
                </div> */}
                <div className={styles.inputContainter}>
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
                <div className={styles.inputContainter}>
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
                <div className={styles.inputContainter}>
                    <label>Keyword (Chinese)</label>
                    <input
                        className={styles.inputFilter}
                        type="text"
                        value={keywordChinese}
                        onChange={(e) => setKeywordChinese(e.target.value)}
                        placeholder="地政總署"
                    ></input>
                </div>
                <div className={styles.inputContainter}>
                    <label>Keyword (English)</label>
                    <input
                        className={styles.inputFilter}
                        type="text"
                        onChange={(e) => setKeywordEnglish(e.target.value)}
                        value={keywordEnglish}
                        placeholder="Lands Department"
                    ></input>
                </div>
            </Filter>
            <div className={styles.main}>
                <KeywordContainer title={"Core Keyword"}>
                    {isCoreLoading ? (
                        <div className={styles.loadingKeyword}>Loading...</div>
                    ) : (
                        <KeywordGroupings
                            keywords={coreData?.core_keywords}
                            idTrendingKeywords={
                                trendingData?.id_trending_keywords
                            }
                            idEmergingKeywords={
                                emergingData?.id_emerging_keywords
                            }
                            topics={topicsData?.topics}
                            events={eventsData?.events}
                        />
                    )}
                </KeywordContainer>
                <KeywordContainer title={"Keyword Suggestions"}>
                    {isSuggestedLoading ? (
                        <div className={styles.loadingKeyword}>Loading...</div>
                    ) : (
                        <KeywordSuggestions
                            keywords={suggestedData?.suggested_keywords}
                            topics={topicsData?.topics}
                            events={eventsData?.events}
                        />
                    )}
                </KeywordContainer>
            </div>
        </div>
    );
};

export default Keyword;
