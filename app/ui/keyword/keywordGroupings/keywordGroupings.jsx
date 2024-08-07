import { useEffect, useState } from "react";
import styles from "./keywordGroupings.module.css";
import {
    MdArrowRight,
    MdArrowDropDown,
    MdCancel,
    MdMore,
} from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import KeywordCreate from "../keywordCreate/keywordCreate";
import { MdMoreHoriz } from "react-icons/md";
import EditToolTip from "../editToolTip/editToolTip";
import { useOutsideClick } from "@/app/lib/hooks";
import {
    deleteKeyword,
    createEvents,
    createTopics,
    deleteTopic,
    updateTopics,
    deleteEvent,
    updateEvents,
    fetchTrendingKeywordData,
    fetchEmergingKeywordData,
    updateKeyword,
} from "@/app/lib/clientActions";
import EditKeywordPopup from "../editKeywordPopup/editKeywordPopup";

const Event = ({ event, setEvent, currEvent }) => {
    const [isMouseHover, setIsMouseHover] = useState(false);
    const [isEditingEvent, setIsEditingEvent] = useState(false);
    const [isShowingEdit, setIsShowingEdit] = useState(false);

    const [newEventName, setNewEventName] = useState(event.event);

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: (id) => {
            return deleteEvent(`id=${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["events"],
            });
            queryClient.invalidateQueries({
                queryKey: ["core_keywords"],
            });
            queryClient.invalidateQueries({
                queryKey: ["trending_keywords"],
            });
            queryClient.invalidateQueries({
                queryKey: ["suggested_keywords"],
            });
        },
    });

    const updateEventMutation = useMutation({
        mutationFn: (qs) => {
            return updateEvents(qs);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["events"],
            });
        },
    });

    return (
        <div
            className={styles.event}
            style={{
                backgroundColor:
                    currEvent?.id == event.id ? "#00b19f" : "inherit",
                color: currEvent?.id == event.id ? "white" : "inherit",
            }}
            onClick={() => {
                queryClient.invalidateQueries(["trending_keywords"]);
                setEvent(event);
            }}
            onMouseEnter={() => setIsMouseHover(true)}
            onMouseLeave={() => setIsMouseHover(false)}
        >
            {isEditingEvent ? (
                <input
                    type="text"
                    className={styles.editTitle}
                    autoFocus
                    value={newEventName}
                    onChange={(e) => setNewEventName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setIsEditingEvent(false);
                            setIsShowingEdit(false);

                            let query = new URLSearchParams();
                            query.append("id", event.id);
                            query.append("event", newEventName);
                            query.append("updated_by", "S1_P1");

                            updateEventMutation.mutate(query.toString());
                            // TODO: change user once auth implemented
                        }
                    }}
                />
            ) : (
                <p className={styles.topicTitle}> {newEventName} </p>
            )}
            {isMouseHover && (
                <MdMoreHoriz
                    size={15}
                    color="var(--textSoft)"
                    onClick={() => setIsShowingEdit(true)}
                />
            )}
            {isShowingEdit && (
                <EditToolTip
                    setIsShowingEdit={setIsShowingEdit}
                    handleDelete={() => deleteMutation.mutate(event.id)}
                    handleEdit={() => setIsEditingEvent(true)}
                />
            )}
        </div>
    );
};

const TopicGroup = ({
    topic,
    events,
    setTopic,
    setEvent,
    currTopic,
    currEvent,
    handleDelete,
    getTrendingMutation,
    getEmergingMutation,
}) => {
    const [isShowingEvents, setIsShowingEvents] = useState(false);
    const [isShowingMore, setIsShowingMore] = useState(false);
    const [isOnMore, setIsOnMore] = useState(false);
    const [isShowingEdit, setIsShowingEdit] = useState(false);

    const [isEditingTopic, setIsEditingTopic] = useState(false);
    const [newTitle, setNewTitle] = useState(topic.topic);

    const [isCreatingEvent, setIsCreatingEvent] = useState(false);
    const [newEvent, setNewEvent] = useState("");

    const ref = useOutsideClick(() => setIsEditingTopic(false));

    const queryClient = useQueryClient();

    const createEventsMutation = useMutation({
        mutationFn: (item) => {
            return createEvents(item);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["events"],
            });
        },
    });

    const updateTopicMutation = useMutation({
        mutationFn: (qs) => {
            return updateTopics(qs);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["topics"],
            });
        },
    });

    const handleClick = () => {
        setIsShowingEvents(!isShowingEvents);
        setTopic(topic);
        setEvent(null);

        getTrendingMutation.mutate();
        getEmergingMutation.mutate();
    };

    return (
        <div
            className={styles.topic}
            style={{
                backgroundColor:
                    topic.id == currTopic?.id ? "#E6F6F4" : "transparent",
            }}
            onMouseEnter={() => setIsShowingMore(true)}
            onMouseLeave={() => setIsShowingMore(false)}
            ref={ref}
        >
            <div
                className={styles.topicHeader}
                onClick={isOnMore || isEditingTopic ? () => {} : handleClick}
            >
                {isEditingTopic ? (
                    <input
                        type="text"
                        className={styles.editTitle}
                        autoFocus
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setIsEditingTopic(false);
                                setIsShowingEdit(false);

                                let query = new URLSearchParams();
                                query.append("id", topic.id);
                                query.append("topic", newTitle);
                                query.append("updated_by", "S1_P1");

                                updateTopicMutation.mutate(query.toString());
                                // TODO: change user once auth implemented
                            }
                        }}
                    />
                ) : (
                    <p className={styles.topicTitle}> {newTitle} </p>
                )}

                {isShowingMore ? (
                    <MdMoreHoriz
                        size={20}
                        color="var(--textSoft)"
                        cursor="pointer"
                        onClick={() => setIsShowingEdit(true)}
                        onMouseEnter={() => setIsOnMore(true)}
                        onMouseLeave={() => setIsOnMore(false)}
                    />
                ) : isShowingEvents ? (
                    <MdArrowDropDown size={20} color="#00b19f" />
                ) : (
                    <MdArrowRight size={20} color="#00b19f" />
                )}
            </div>
            {isShowingEdit ? (
                <EditToolTip
                    setIsShowingEdit={setIsShowingEdit}
                    handleEdit={() => setIsEditingTopic(true)}
                    handleDelete={() => handleDelete(topic)}
                />
            ) : (
                ""
            )}
            {isShowingEvents ? (
                <div className={styles.eventList}>
                    <div className={styles.eventHeader}>
                        <b>EVENT</b>
                        <h3
                            className={styles.icon}
                            onClick={() => {
                                setIsCreatingEvent(!isCreatingEvent);
                            }}
                        >
                            +
                        </h3>
                    </div>
                    {isCreatingEvent && (
                        <div className={styles.newTopic}>
                            <input
                                autoFocus
                                className={styles.newTopicInput}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        createEventsMutation.mutate({
                                            event: newEvent,
                                            id_topic: topic.id,
                                            created_by: "S1_P1",
                                            updated_by: "S1_P1",
                                            // TODO: change created by and updated by when auth implemented
                                        });

                                        setIsCreatingEvent(false);
                                    }
                                }}
                                onChange={(e) => setNewEvent(e.target.value)}
                            />
                        </div>
                    )}
                    <div className={styles.eventContent}>
                        {events.map((e) => {
                            return (
                                <Event
                                    event={e}
                                    setEvent={setEvent}
                                    currEvent={currEvent}
                                    key={e.event}
                                />
                            );
                        })}
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

function KeywordGroupings({
    keywords,
    topics,
    events,
    idTrendingKeywords,
    idEmergingKeywords,
}) {
    // topic or event object
    const [currTopic, setCurrTopic] = useState(null);
    const [currEvent, setCurrEvent] = useState(null);
    const [trendingKeywords, setTrendingKeywords] = useState(
        idTrendingKeywords ? idTrendingKeywords : []
    );
    const [emergingKeywords, setEmergingKeywords] = useState(
        idEmergingKeywords ? idEmergingKeywords : []
    );

    const [isCreatingTopic, setIsCreatingTopic] = useState(false);
    const [isCreatingKeyword, setIsCreatingKeyword] = useState(false);
    const [isEditingKeyword, setIsEditingKeyword] = useState(false);
    const [keywordToEdit, setKeywordToEdit] = useState();

    const [topicGroupArray, setTopicGroupArray] = useState([]);
    const [allKeywords, setAllKeywords] = useState(new Set());
    const [newTopic, setNewTopic] = useState("");

    // ----------------------------------------------------------------
    // QUERIES & MUTATIONS
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: (item) => {
            return deleteKeyword(`id=${item.id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["core_keywords"],
            });
            queryClient.invalidateQueries({
                queryKey: ["trending_keywords"],
            });
        },
    });

    const deleteTopicsMutation = useMutation({
        mutationFn: (topic) => {
            return deleteTopic(`id=${topic.id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["topics"],
            });
        },
    });

    const createTopicsMutation = useMutation({
        mutationFn: (item) => {
            return createTopics(item);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["topics"],
            });
        },
    });

    const updateTopicsMutation = useMutation({
        mutationFn: (item) => {
            return updateTopics(item);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["topics"],
            });
        },
    });

    const getTrendingMutation = useMutation({
        mutationFn: () => {
            const q = new URLSearchParams();
            if (currTopic) q.append("id_topic", currTopic.id);
            const queryString = q.toString();
            return fetchTrendingKeywordData(queryString);
        },
        mutationKey: ["trending_keywords"],
        onSuccess: async (data) => {
            const d = await data;

            setTrendingKeywords(d?.id_trending_keywords);
        },
    });

    const getEmergingMutation = useMutation({
        mutationFn: () => {
            const q = new URLSearchParams();
            if (currTopic) q.append("id_topic", currTopic.id);
            const queryString = q.toString();
            return fetchEmergingKeywordData(queryString);
        },
        mutationKey: ["emerging_keywords"],
        onSuccess: async (data) => {
            const d = await data;

            setEmergingKeywords(d?.id_emerging_keywords);
        },
    });

    const updateKeywordMutation = useMutation({
        mutationFn: (data) => updateKeyword(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["core_keywords"],
            });
        },
    });

    const handleDelete = (item) => {
        console.log("Delete item: " + item.id + ", " + item.keyword_chinese);
        deleteMutation.mutate(item);
    };

    const handleClickCreateTopic = () => {
        setIsCreatingTopic(!isCreatingTopic);
    };

    const handleEditSubmit = (item) => {
        updateKeywordMutation.mutate(item);
    };

    // for updating topics or events
    useEffect(() => {
        let eventsByTopic = {};

        topics?.forEach((t) => {
            eventsByTopic[t.id] = [];
        });

        events?.forEach((e) => {
            if (e.id_topic in eventsByTopic) {
                eventsByTopic[e.id_topic].push(e);
            }
        });

        setTopicGroupArray(
            topics?.map((t) => {
                return (
                    <TopicGroup
                        topic={t}
                        events={eventsByTopic[t.id]}
                        setTopic={setCurrTopic}
                        setEvent={setCurrEvent}
                        currTopic={currTopic}
                        currEvent={currEvent}
                        key={t.topic}
                        handleDelete={deleteTopicsMutation.mutate}
                        handleUpdate={updateTopicsMutation.mutate}
                        getTrendingMutation={getTrendingMutation}
                        getEmergingMutation={getEmergingMutation}
                    />
                );
            })
        );
    }, [currTopic, currEvent, topics, events]);

    useEffect(() => {
        // push each keyword to keywordsByTopic (group keywords by topic)
        // also removes duplicate keywords

        allKeywords.clear();
        keywords?.forEach((item) => {
            if ((currTopic && item.id_topic == currTopic?.id) || !currTopic) {
                if ((currEvent && item.id_event == currEvent?.id) || !currEvent)
                    allKeywords.add(item);
            }
        });

        setAllKeywords(new Set(allKeywords));
    }, [currTopic, currEvent, keywords]);

    useEffect(() => {
        setTrendingKeywords(idTrendingKeywords);
    }, [idTrendingKeywords]);

    useEffect(() => {
        setEmergingKeywords(idEmergingKeywords);
    }, [idEmergingKeywords]);

    return (
        <div className={styles.container}>
            <div className={styles.categoryContainer}>
                <div className={styles.categoryHeader}>
                    <h3>TOPIC</h3>
                    <h3
                        className={styles.icon}
                        onClick={handleClickCreateTopic}
                    >
                        +
                    </h3>
                </div>

                <div className={styles.categoryContent}>
                    <div className={styles.categoryInner}>
                        <div className={styles.topic}>
                            {isCreatingTopic && (
                                <div className={styles.newTopic}>
                                    <input
                                        autoFocus
                                        className={styles.newTopicInput}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                createTopicsMutation.mutate({
                                                    topic: newTopic,
                                                    created_by: "S1_P1",
                                                    updated_by: "S1_P1",
                                                });

                                                setIsCreatingTopic(false);
                                            }
                                        }}
                                        onChange={(e) =>
                                            setNewTopic(e.target.value)
                                        }
                                    />
                                </div>
                            )}

                            <div
                                className={styles.topicHeader}
                                onClick={() => {
                                    setCurrTopic();
                                    setCurrEvent(null);
                                    getEmergingMutation.mutate();
                                    getTrendingMutation.mutate();
                                }}
                            >
                                All
                            </div>
                        </div>

                        {topicGroupArray}
                    </div>
                </div>
            </div>
            <div className={styles.keywordContainer}>
                <div className={styles.keywordHeader}>
                    <h3>
                        All Keywords
                        {!currTopic ? "" : ` / ${currTopic.topic}`}
                        {!currEvent ? "" : ` / ${currEvent.event}`}
                    </h3>
                    <h3
                        className={styles.icon}
                        onClick={() => setIsCreatingKeyword(!isCreatingKeyword)}
                    >
                        +
                    </h3>
                    {isCreatingKeyword ? (
                        <KeywordCreate
                            setIsCreatingKeyword={setIsCreatingKeyword}
                            topics={topics}
                            events={events}
                        />
                    ) : (
                        ""
                    )}
                </div>
                <div className={styles.keywordContainerInner}>
                    {isEditingKeyword && (
                        <EditKeywordPopup
                            handleCancel={() => setIsEditingKeyword(false)}
                            keyword={keywordToEdit}
                            handleSubmit={(item) => handleEditSubmit(item)}
                            topics={topics}
                            events={events}
                        />
                    )}
                    {[...allKeywords].map((item) => {
                        let kw = item.keyword_chinese.toString();

                        if (item.is_trending) {
                            kw = kw + "🔥👤";
                        } else if (trendingKeywords) {
                            if (trendingKeywords.includes(item.id)) {
                                kw = kw + "🔥🤖";
                            }
                        }

                        if (item.is_emerging) {
                            kw = kw + "📈👤";
                        } else if (emergingKeywords) {
                            if (emergingKeywords.includes(item.id)) {
                                kw = kw + "📈🤖";
                            }
                        }

                        return (
                            <div
                                className={styles.keyword}
                                key={item.id}
                                onClick={() => {
                                    setKeywordToEdit(item);
                                    setIsEditingKeyword(true);
                                }}
                            >
                                {kw}
                                <MdCancel
                                    size={15}
                                    onClick={() => handleDelete(item)}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default KeywordGroupings;
