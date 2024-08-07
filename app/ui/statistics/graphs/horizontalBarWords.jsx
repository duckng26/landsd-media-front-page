import React from "react";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { scaleLinear, scaleBand } from "@visx/scale";
import { Axis } from "@visx/visx";

function HorizontalBarWords({ width, height, trendingFrequencyData, visible }) {
    if (!visible) return <></>;
    const words = [];
    trendingFrequencyData.trending_keywords.forEach((kw) => {
        words.push({
            text: kw.keyword_chinese[0].toString(),
            value: kw.frequency,
        });
    });

    // words are in format list[{word: string, value: int}]
    // want to convert to {word: value} so that it's more easily accessible
    const data = words.reduce(
        (obj, item) => Object.assign(obj, { [item.text]: item.value }),
        {}
    );

    const margin = { top: 30, bottom: 30, left: 30, right: 30 };
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const y = (d) => d;
    const x = (d) => data[d];

    // And then scale the graph by our data
    const yScale = scaleBand({
        range: [0, yMax],
        round: true,
        domain: Object.keys(data),
        paddingInner: 0.3,
    });
    const xScale = scaleLinear({
        range: [0, xMax],
        round: true,
        domain: [0, Math.max(...Object.values(data))],
    });

    // Compose together the scale and accessor functions to get point functions
    const compose = (scale, accessor) => (data) => scale(accessor(data));
    const xPoint = compose(xScale, x);
    const yPoint = compose(yScale, y);
    return (
        <svg width={width} height={height}>
            {Object.keys(data).map((d, i) => {
                const barHeight = xPoint(d);
                return (
                    <Group key={`bar-${i}`}>
                        <Bar
                            x={margin.left}
                            y={yPoint(d)}
                            width={barHeight}
                            height={yScale.bandwidth()}
                            fill="#00b19f"
                        />
                    </Group>
                );
            })}
            <Axis.AxisLeft
                scale={yScale}
                left={margin.left}
                label={"Keywords"}
                stroke={"#1b1a1e"}
                tickLength={5}
                tickTextFill={"#1b1a1e"}
                tickLabelProps={{
                    angle: -90,
                    dy: -10,
                }}
            />
            <Axis.AxisBottom
                scale={xScale}
                top={yMax}
                left={margin.left}
                label={"Number of occurances"}
                stroke={"#1b1a1e"}
                tickTextFill={"#1b1a1e"}
                tickLength={5}
                numTicks={Object.keys(data).length}
            />
        </svg>
    );
}

export default HorizontalBarWords;
