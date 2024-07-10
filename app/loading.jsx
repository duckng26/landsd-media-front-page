import React from "react";
import LoadingSpinner from "./ui/util/loadingSpinner/loadingSpinner";

function Loading() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
            }}
        >
            <LoadingSpinner />
        </div>
    );
}

export default Loading;
