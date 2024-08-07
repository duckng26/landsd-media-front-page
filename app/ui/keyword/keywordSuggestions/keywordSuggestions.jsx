import React, { useEffect, useState } from "react";
import styles from "./keywordSuggestions.module.css";
import { MdArrowDropDown, MdArrowDropUp, MdOutlineCheck } from "react-icons/md";
import { useOutsideClick } from "@/app/lib/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    createKeyword,
    updateSuggestedKeyword,
    fetchCoreKeywordData,
} from "@/app/lib/clientActions";

const AddKwPopup = ({ keywords, handleCreate, topics, events }) => {
    const [topicId, setTopicId] = useState(topics && topics[0].id);
    const [eventId, setEventId] = useState(
        topics && events && events.find((e) => e.id_topic == topics[0].id)?.id
    );

    return (
        <div className={styles.popup}>
            <p className={styles.popupInfo}>
                Add <b>{keywords ? keywords.length : 0}</b> keyword(s) to:
            </p>
            <div className={styles.selectContainer}>
                <label>TOPIC</label>
                <select
                    className={styles.dropdown}
                    onChange={(e) => {
                        setTopicId(e.target.value);
                        setEventId(
                            events.find((ev) => ev.id_topic == e.target.value)
                                ?.id
                        );
                    }}
                >
                    {topics?.map((t) => {
                        return (
                            <option key={t.topic} value={t.id}>
                                {t.topic}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className={styles.selectContainer}>
                <label>EVENT</label>
                <select
                    className={styles.dropdown}
                    disabled={!setTopicId}
                    onChange={(e) => setEventId(e.target.value)}
                >
                    {events
                        ?.filter((e) => e.id_topic == topicId)
                        .map((e) => {
                            return (
                                <option key={e.event} value={e.id}>
                                    {e.event}
                                </option>
                            );
                        })}
                </select>
            </div>
            <button
                className={styles.popupConfirmButton}
                onClick={() => handleCreate(keywords, topicId, eventId)}
            >
                Add
            </button>
        </div>
    );
};

const Nuggy = ({ keyword, location, selected, handleClick }) => {
    const [showTt, setShowTt] = useState(false);

    const LocationTooltip = ({ location }) => {
        return (
            <div className={styles.tt}>
                {location.map((l) => (
                    <div key={keyword + "-" + l} className={styles.location}>
                        {l}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div
            className={styles.nuggy}
            onMouseEnter={() => setShowTt(true)}
            onMouseLeave={() => setShowTt(false)}
            onClick={handleClick}
        >
            <div className={styles.ttContainer}>
                {showTt && <LocationTooltip location={location} />}
            </div>
            <div className={styles.checkbox}>
                {selected && <MdOutlineCheck color="#00b19f" />}
            </div>
            <p className={styles.nuggyKw}>{keyword}</p>
        </div>
    );
};

function KeywordSuggestions({ keywords, topics, events }) {
    // popupFor = either "core", 'trending" or null
    // indicates which function the popup is for
    const [popupFor, setPopupFor] = useState();
    const ref = useOutsideClick(() => setPopupFor(null));
    const queryClient = useQueryClient();

    const [selectedKwIds, setSelectedKwIds] = useState(new Set());

    const createQueryString = (obj) => {
        let qs = new URLSearchParams();

        Object.keys(obj).forEach((k) => {
            qs.append(k, obj[k]);
        });

        return qs.toString();
    };

    const createKwMutation = useMutation({
        mutationFn: async (data) => {
            const newCoreKw = data.newCoreKw;
            const suggestedKwId = data.suggestedKwId;

            let success = await createKeyword(newCoreKw);

            if (success) {
                // get new keyword
                const qsCore = createQueryString(newCoreKw);
                let coreKw = await fetchCoreKeywordData(qsCore);
                coreKw = coreKw.core_keywords;

                if (coreKw.length === 0) {
                    console.log("failed create");
                    return false;
                }

                const qsSug = createQueryString({
                    id: suggestedKwId,
                    id_keyword_core: coreKw[0].id,
                });

                await updateSuggestedKeyword(qsSug);
            }

            return true;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["suggested_keywords"],
            });
            queryClient.invalidateQueries({
                queryKey: ["core_keywords"],
            });
            queryClient.invalidateQueries({
                queryKey: ["trending_keywords"],
            });

            setSelectedKwIds(new Set());
        },
    });

    const handleCreate = (keywords, id_topic, id_event) => {
        keywords.forEach(async (kw) => {
            const newCoreKw = {
                // TODO: change created and updated when auth implemented
                id_topic: id_topic,
                id_event: id_event,
                keyword_chinese: [kw.keyword],
                keyword_english: [],
                created_by: "S1_P1",
                updated_by: "S1_P1",
            };

            const success = await createKwMutation.mutate({
                newCoreKw: newCoreKw,
                suggestedKwId: kw.id,
            });
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.keywordContainer}>
                <div className={styles.keywordInner}>
                    {keywords?.map((kw) => {
                        return (
                            <Nuggy
                                key={"nuggy-" + kw.id}
                                keyword={kw.keyword}
                                location={kw.location}
                                selected={selectedKwIds.has(kw.id)}
                                handleClick={() => {
                                    if (selectedKwIds.has(kw.id)) {
                                        selectedKwIds.delete(kw.id);
                                    } else {
                                        selectedKwIds.add(kw.id);
                                    }

                                    setSelectedKwIds(new Set(selectedKwIds));
                                }}
                            />
                        );
                    })}
                </div>
            </div>
            <div className={styles.buttons} ref={ref}>
                <div className={styles.buttonContainer}>
                    {popupFor == "core" && (
                        <div className={styles.popupContainer}>
                            <AddKwPopup
                                keywords={keywords.filter((kw) =>
                                    selectedKwIds.has(kw.id)
                                )}
                                topics={topics}
                                events={events}
                                handleCreate={handleCreate}
                            />
                        </div>
                    )}
                    <button
                        className={styles.addButton}
                        onClick={() =>
                            popupFor != "core"
                                ? setPopupFor("core")
                                : setPopupFor(null)
                        }
                    >
                        Add to Core Keyword
                        {popupFor == "core" ? (
                            <MdArrowDropUp size={20} />
                        ) : (
                            <MdArrowDropDown size={20} />
                        )}
                    </button>
                </div>
                <div className={styles.buttonContainer}>
                    {popupFor == "trending" && (
                        <div className={styles.popupContainer}>
                            <AddKwPopup
                                keywords={selected}
                                topics={topics}
                                events={events}
                            />
                        </div>
                    )}
                    <button
                        className={styles.addButton}
                        onClick={() =>
                            popupFor != "trending"
                                ? setPopupFor("trending")
                                : setPopupFor(null)
                        }
                    >
                        Add to Trending Keyword
                        {popupFor == "trending" ? (
                            <MdArrowDropUp size={20} />
                        ) : (
                            <MdArrowDropDown size={20} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default KeywordSuggestions;
