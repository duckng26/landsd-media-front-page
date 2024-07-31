import React, { useContext, useEffect, useState } from "react";
import styles from "./editProfile.module.css";
import { ProfilePageContext } from "@/app/profile/page";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProfile } from "@/app/lib/clientActions";

function EditProfile({ profile }) {
    const pageContext = useContext(ProfilePageContext);
    const [queryString, setQueryString] = useState("");
    const queryClient = useQueryClient();

    // edit variables
    const [name, setName] = useState(profile?.name);
    const [yearStart, setYearStart] = useState(profile?.year_start);
    const [yearEnd, setYearEnd] = useState(profile?.year_end);
    const [weekStart, setWeekStart] = useState(profile?.week_start);
    const [weekEnd, setWeekEnd] = useState(profile?.week_end);
    const [idTopic, setIdTopic] = useState(profile?.id_topic);
    const [idEvent, setIdEvent] = useState(profile?.id_event);
    const [keywordChinese, setKeywordChinese] = useState(
        profile?.keyword_chinese
    );
    const [keywordEnglish, setKeywordEnglish] = useState(
        profile?.keyword_english
    );
    const [location, setLocation] = useState(profile?.location);

    // mutation
    const editMutation = useMutation({
        mutationFn: async () => {
            const res = await editProfile(queryString);
        },
        onSuccess: () => queryClient.refetchQueries({ queryKey: ["profile"] }),
    });

    // events
    const handleCancel = () => {
        pageContext.setCurrPage("display");
    };

    const handleSubmit = () => {
        editMutation.mutate();
        pageContext.setCurrPage("display");
    };

    useEffect(() => {
        const params = new URLSearchParams();
        params.append("id", profile?.id);

        if (name) params.append("name", name);
        if (yearStart) params.append("year_start", yearStart);
        if (yearEnd) params.append("year_end", yearEnd);
        if (weekStart) params.append("week_start", weekStart);
        if (weekEnd) params.append("week_end", weekEnd);
        if (idTopic) params.append("id_topic", idTopic);
        if (idEvent) params.append("id_event", idEvent);
        if (keywordChinese) params.append("keyword_chinese", keywordChinese);
        if (keywordEnglish) params.append("keyword_english", keywordEnglish);
        if (location) params.append("location", location);

        setQueryString(params.toString());
    }, [
        name,
        yearStart,
        yearEnd,
        weekStart,
        weekEnd,
        idTopic,
        idEvent,
        keywordChinese,
        keywordEnglish,
        location,
    ]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.inputs}>
                    <div className={styles.item}>
                        <label>Profile Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={styles.item}>
                        <label>Year Start</label>
                        <input
                            type="text"
                            value={yearStart}
                            onChange={(e) => setYearStart(e.target.value)}
                        />
                    </div>
                    <div className={styles.item}>
                        <label>Year End</label>
                        <input
                            type="text"
                            value={yearEnd}
                            onChange={(e) => setYearEnd(e.target.value)}
                        />
                    </div>
                    <div className={styles.item}>
                        <label>Week Start</label>
                        <input
                            type="text"
                            value={weekStart}
                            onChange={(e) => setWeekStart(e.target.value)}
                        />
                    </div>
                    <div className={styles.item}>
                        <label>Week End</label>
                        <input
                            type="text"
                            value={weekEnd}
                            onChange={(e) => setWeekEnd(e.target.value)}
                        />
                    </div>
                    <div className={styles.item}>
                        <label>Topic</label>
                        <input
                            type="text"
                            value={idTopic}
                            onChange={(e) => setIdTopic(e.target.value)}
                        />
                    </div>
                    <div className={styles.item}>
                        <label>Event</label>
                        <input
                            type="text"
                            value={idEvent}
                            onChange={(e) => setIdEvent(e.target.value)}
                        />
                    </div>
                    <div className={styles.item}>
                        <label>Keyword (Chinese)</label>
                        <input
                            type="text"
                            value={keywordChinese}
                            onChange={(e) => setKeywordChinese(e.target.value)}
                        />
                    </div>
                    <div className={styles.item}>
                        <label>Keyword (English)</label>
                        <input
                            type="text"
                            value={keywordEnglish}
                            onChange={(e) => setKeywordEnglish(e.target.value)}
                        />
                    </div>
                    <div className={styles.item}>
                        <label>Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.cancel} onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className={styles.save} onClick={handleSubmit}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
