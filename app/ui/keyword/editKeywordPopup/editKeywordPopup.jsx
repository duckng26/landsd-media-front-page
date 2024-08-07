import React, { useEffect, useState } from "react";
import styles from "./editKeywordPopup.module.css";

function EditKeywordPopup({
    handleCancel,
    keyword,
    handleSubmit,
    topics,
    events,
}) {
    const [keywordChinese, setKeywordChinese] = useState(
        keyword?.keyword_chinese
    );
    const [keywordEnglish, setKeywordEnglish] = useState(
        keyword?.keyword_english
    );
    const [isTrending, setIsTrending] = useState(keyword?.is_trending);
    const [isEmerging, setIsEmerging] = useState(keyword?.is_emerging);
    const [idTopic, setIdTopic] = useState(keyword?.id_topic);
    const [idEvent, setIdEvent] = useState(keyword?.id_event);

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h3>Editing keyword: {keyword.keyword_chinese.toString()}</h3>
                <div className={styles.fields}>
                    <div className={styles.field}>
                        <label>Keyword Chinese</label>
                        <input
                            value={keywordChinese}
                            onChange={(e) =>
                                setKeywordChinese(e.target.value.split(","))
                            }
                            type="text"
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Keyword English</label>
                        <input
                            value={keywordEnglish}
                            onChange={(e) =>
                                setKeywordEnglish(e.target.value.split(","))
                            }
                            type="text"
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Is Emerging</label>
                        <select
                            value={isEmerging}
                            onChange={(e) => setIsEmerging(e.target.value)}
                        >
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </div>
                    <div className={styles.field}>
                        <label>Is Trending</label>
                        <select
                            value={isTrending}
                            onChange={(e) => setIsTrending(e.target.value)}
                        >
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                    </div>
                    <div className={styles.field}>
                        <label>Topics</label>
                        <select
                            value={idTopic}
                            onChange={(e) => setIdTopic(e.target.value)}
                        >
                            {topics?.map((t) => {
                                return (
                                    <option value={t.id} key={t.id}>
                                        {t.topic}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className={styles.field}>
                        <label>Events</label>
                        <select
                            value={idEvent}
                            onChange={(e) => setIdEvent(e.target.value)}
                        >
                            {events?.map((e) => {
                                if (e.id_topic == idTopic) {
                                    return (
                                        <option value={e.id} key={e.id}>
                                            {e.event}
                                        </option>
                                    );
                                }
                            })}
                        </select>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.cancel} onClick={handleCancel}>
                        Cancel
                    </button>
                    <button
                        className={styles.submit}
                        onClick={() => {
                            handleSubmit({
                                id: keyword.id,
                                keyword_chinese: keywordChinese,
                                keyword_english: keywordEnglish,
                                id_topic: idTopic,
                                id_event: idEvent,
                                is_emerging: isEmerging,
                                is_trending: isTrending,
                            });
                            handleCancel();
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditKeywordPopup;
