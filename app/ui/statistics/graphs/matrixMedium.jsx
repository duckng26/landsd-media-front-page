import React from "react";
import styles from "./matrixMedium.module.css";
import {
    MdRemoveRedEye,
    MdThumbUp,
    MdChatBubble,
    MdReply,
    MdRestartAlt,
} from "react-icons/md";

function MatrixMedium({ data, width, height, visible }) {
    if (!visible) return <></>;

    return (
        <div
            className={styles.container}
            style={{
                width: width,
                height: height,
            }}
        >
            <table className={styles.table}>
                <thead>
                    <tr className={styles.headerRow}>
                        <th>Medium</th>
                        <th>Posts with keywords</th>
                        <th>
                            <MdRemoveRedEye size={20} />
                        </th>
                        <th>
                            <MdThumbUp size={20} />
                        </th>
                        <th>
                            <MdReply size={20} />
                        </th>

                        <th>
                            <MdChatBubble size={20} />
                        </th>
                        <th>
                            <MdRestartAlt size={20} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map((medium) => {
                        const d = data[medium];
                        return (
                            <tr className={styles.row}>
                                <td>{medium}</td>
                                <td>{d.posts_with_keywords}</td>
                                <td>{d.count_view}</td>
                                <td>{0}</td>
                                <td>{d.count_share}</td>
                                <td>{d.count_comment}</td>
                                <td>{d.count_retweet}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default MatrixMedium;
