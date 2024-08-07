import { Wordcloud, Text } from "@visx/visx";
import { scaleLog } from "@visx/scale";
import React from "react";

function WordCloudWords({ width, height, trendingFrequencyData, visible }) {
    if (!visible) return <></>;

    // clean data from api call
    const words = [];
    trendingFrequencyData.trending_keywords.forEach((kw) => {
        words.push({
            text: kw.keyword_chinese[0].toString(),
            value: kw.frequency,
        });
    });

    const fontScale = scaleLog({
        domain: [
            Math.min(...words.map((w) => w.value)),
            Math.max(...words.map((w) => w.value)) + 1,
        ],
        range: [20, 80],
    });
    const fontSizeSetter = (datum) => fontScale(datum.value);
    return (
        <div>
            <Wordcloud.Wordcloud
                width={width}
                height={height}
                words={words}
                padding={2}
                spiral={"archimedean"}
                font={"Roboto"}
                rotate={0}
                fontSize={fontSizeSetter}
                random={() => 0.5}
            >
                {(cloudWords) =>
                    cloudWords.map((w, i) => {
                        return (
                            <Text.Text
                                key={w.text}
                                fill={"#00b19f"}
                                textAnchor={"middle"}
                                transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
                                fontSize={w.size}
                                fontFamily={w.font}
                            >
                                {w.text}
                            </Text.Text>
                        );
                    })
                }
            </Wordcloud.Wordcloud>
        </div>
    );
}

export default WordCloudWords;
