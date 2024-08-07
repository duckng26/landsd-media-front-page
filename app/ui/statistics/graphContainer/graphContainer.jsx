import React, { useRef, useState } from "react";
import { useParentSize } from "@visx/responsive";
import styles from "./graphContainer.module.css";
import VerticalBarNews from "../graphs/verticalBarNews";
import WordCloudWords from "../graphs/wordCloudWords";
import HorizontalBarWords from "../graphs/horizontalBarWords";
import PieChartMediums from "../graphs/pieChartMediums";
import LineChartMediums from "../graphs/lineChartMediums";
import MatrixMedium from "../graphs/matrixMedium";
import { MdDownload, MdExpandMore, MdExpandLess } from "react-icons/md";

const LST_GRAPH = [
    "vertical-bar-news",
    "wordcloud-words",
    "horizontal-bar-words",
    "pie-medium",
    "line-medium",
    "matrix-medium",
];

const GraphControls = ({ title, onHide, onDownload, isVisible }) => {
    return (
        <div className={styles.controlWrapper}>
            <h5>{title}</h5>
            <div className={styles.controls}>
                <button className={styles.controlButton} onClick={onHide}>
                    {isVisible ? (
                        <MdExpandLess size={20} />
                    ) : (
                        <MdExpandMore size={20} />
                    )}
                </button>
                {/* <button className={styles.controlButton}>
                    <MdDownload size={20} onClick={onDownload} />
                </button> */}
            </div>
        </div>
    );
};

function GraphContainer({
    mediumData,
    sourceFrequencyData,
    mediumFrequencyData,
    mediumFrequencyByDateData,
    trendingFrequencyData,
}) {
    const [isVerticalBarNewsVisible, setIsVerticalBarNewsVisible] =
        useState(true);
    const [isWordcloudWordsVisible, setIsWordcloudWordsVisible] =
        useState(true);
    const [isHorizontalBarWordsVisible, setIsHorizontalBarWordsVisible] =
        useState(true);
    const [isPieMediumVisible, setIsPieMediumVisible] = useState(true);
    const [isLineMediumVisible, setIsLineMediumVisible] = useState(true);
    const [isMatrixMediumVisible, setIsMatrixMediumVisible] = useState(true);

    const width = 500;
    const height = 500;

    const noData = (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "10rem",
                height: "100%",
            }}
        >
            <h4>No data available!</h4>
        </div>
    );

    return (
        <div className={styles.graphContainer}>
            <div className={styles.graphColumn}>
                <div className={styles.graphWrapper}>
                    <GraphControls
                        title={"Number of news by date"}
                        onHide={() => {
                            setIsVerticalBarNewsVisible(
                                !isVerticalBarNewsVisible
                            );
                        }}
                        isVisible={isVerticalBarNewsVisible}
                    />

                    {sourceFrequencyData &&
                    Object.keys(sourceFrequencyData).length > 0 ? (
                        <VerticalBarNews
                            width={width}
                            height={height}
                            data={sourceFrequencyData}
                            visible={isVerticalBarNewsVisible}
                        />
                    ) : (
                        noData
                    )}
                </div>
                <div className={styles.graphWrapper}>
                    <GraphControls
                        title={"Top keywords by number of occurrances"}
                        onHide={() => {
                            setIsWordcloudWordsVisible(
                                !isWordcloudWordsVisible
                            );
                        }}
                        isVisible={isWordcloudWordsVisible}
                    />
                    {trendingFrequencyData &&
                    Object.keys(trendingFrequencyData).length > 0 ? (
                        <WordCloudWords
                            width={width}
                            height={height}
                            trendingFrequencyData={trendingFrequencyData}
                            visible={isWordcloudWordsVisible}
                        />
                    ) : (
                        noData
                    )}
                </div>
                <div className={styles.graphWrapper}>
                    <GraphControls
                        title={"Top 10 keywords by number of occurances"}
                        onHide={() => {
                            setIsHorizontalBarWordsVisible(
                                !isHorizontalBarWordsVisible
                            );
                        }}
                        isVisible={isHorizontalBarWordsVisible}
                    />
                    {trendingFrequencyData &&
                    Object.keys(trendingFrequencyData).length > 0 ? (
                        <HorizontalBarWords
                            width={width}
                            height={height}
                            trendingFrequencyData={trendingFrequencyData}
                            visible={isHorizontalBarWordsVisible}
                        />
                    ) : (
                        noData
                    )}
                </div>
            </div>
            <div className={styles.graphColumn}>
                <div className={styles.graphWrapper}>
                    <GraphControls
                        title={"% of posts and comments by medium"}
                        onHide={() => {
                            setIsPieMediumVisible(!isPieMediumVisible);
                        }}
                        isVisible={isPieMediumVisible}
                    />
                    {mediumFrequencyData &&
                    Object.keys(mediumFrequencyData).length > 0 ? (
                        <PieChartMediums
                            width={width}
                            height={height}
                            data={mediumFrequencyData}
                            visible={isPieMediumVisible}
                        />
                    ) : (
                        noData
                    )}
                </div>
                <div className={styles.graphWrapper}>
                    <GraphControls
                        title={"Post and comment by medium by date"}
                        onHide={() => {
                            setIsLineMediumVisible(!isLineMediumVisible);
                        }}
                        isVisible={isLineMediumVisible}
                    />
                    {mediumFrequencyByDateData &&
                    Object.keys(mediumFrequencyByDateData).length > 0 ? (
                        <LineChartMediums
                            width={width}
                            height={height}
                            data={mediumFrequencyByDateData}
                            visible={isLineMediumVisible}
                        />
                    ) : (
                        noData
                    )}
                </div>
                <div className={styles.graphWrapper}>
                    <GraphControls
                        title={"Media metadata"}
                        onHide={() => {
                            setIsMatrixMediumVisible(!isMatrixMediumVisible);
                        }}
                        isVisible={isMatrixMediumVisible}
                    />
                    {mediumData && Object.keys(mediumData).length > 0 ? (
                        <MatrixMedium
                            data={mediumData}
                            width={width}
                            height={height}
                            visible={isMatrixMediumVisible}
                        />
                    ) : (
                        noData
                    )}
                </div>
            </div>
        </div>
    );
}

export default GraphContainer;
