import React, { useRef, useState, useEffect } from "react";
import styles from "./keywordCreate.module.css";
import { createKeyword } from "@/app/lib/clientActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useOutsideClick } from "@/app/lib/hooks";

function KeywordCreate({ setIsCreatingKeyword, topics, events }) {
    const [keywordChinese, setKeywordChinese] = useState("");
    const [keywordEnglish, setKeywordEnglish] = useState("");

    const [currTopicId, setCurrTopicId] = useState(topics && topics[0].id);
    const [currEventId, setCurrEventId] = useState(
        topics && events && events.find((e) => e.id_topic === topics[0].id)?.id
    );

    const ref = useOutsideClick(() => setIsCreatingKeyword(false));

    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: (item) => {
            return createKeyword(item);
        },
        onSuccess: () => {
            queryClient.invalidateQueries([
                [["core_keywords"], ["trending_keywords"]],
            ]);
        },
    });

    const handleCreate = () => {
        setIsCreatingKeyword(false);

        // TODO: add user after auth implemented
        createMutation.mutate({
            id_topic: currTopicId,
            id_event: currEventId,
            keyword_chinese: [keywordChinese],
            keyword_english: [keywordEnglish],
            created_by: "S1_P1",
            updated_by: "S1_P1",
        });
    };

    return (
        <div className={styles.container} ref={ref}>
            <div className={styles.box}>
                <label>Keyword Chinese</label>
                <input
                    type="text"
                    onChange={(e) => setKeywordChinese(e.target.value)}
                />
            </div>
            <div className={styles.box}>
                <label>Keyword English</label>
                <input
                    type="text"
                    onChange={(e) => setKeywordEnglish(e.target.value)}
                />
            </div>
            <div className={styles.box}>
                <label>Topic</label>
                <select
                    onChange={(e) => {
                        setCurrTopicId(e.target.value);
                    }}
                >
                    {topics.map((t) => {
                        return <option value={t.id}>{t.topic}</option>;
                    })}
                </select>
            </div>
            <div className={styles.box}>
                <label>Event</label>
                {events.filter((e) => e.id_topic == currTopicId).length != 0 ? (
                    <select onChange={(e) => setCurrEventId(e.target.value)}>
                        {events
                            .filter((e) => e.id_topic == currTopicId)
                            .map((e) => {
                                return <option value={e.id}>{e.event}</option>;
                            })}
                    </select>
                ) : (
                    "You must create an event in this topic!"
                )}
            </div>
            <div className={styles.submitContainer}>
                <button
                    className={styles.submit}
                    onClick={handleCreate}
                    disabled={
                        events.filter((e) => e.id_topic == currTopicId)
                            .length == 0
                    }
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default KeywordCreate;
