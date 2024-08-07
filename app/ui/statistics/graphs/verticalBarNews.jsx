import React from "react";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { scaleLinear, scaleBand } from "@visx/scale";
import { Axis } from "@visx/visx";
import { useParentSize } from "@visx/responsive";
import styles from "../graphContainer/graphContainer.module.css";

export default function VerticalBarNews({ width, height, data, visible }) {
    if (!visible) return <></>;

    const margin = { top: 20, bottom: 20, left: 20, right: 20 };

    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const x = (d) => d;
    const y = (d) => data[d];

    const xScale = scaleBand({
        range: [0, xMax],
        round: true,
        domain: Object.keys(data),
        paddingInner: 0.5,
    });
    const yScale = scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...Object.values(data))],
    });

    const compose = (scale, accessor) => (data) => scale(accessor(data));
    const xPoint = compose(xScale, x);
    const yPoint = compose(yScale, y);
    return (
        <svg width={width} height={height}>
            {Object.keys(data).map((d, i) => {
                const barHeight = yMax - yPoint(d);
                return (
                    <Group key={`bar-${i}`} top={margin.top} left={margin.left}>
                        <Bar
                            x={xPoint(d)}
                            y={yMax - barHeight}
                            height={barHeight}
                            width={xScale.bandwidth()}
                            fill="#00b19f"
                        />
                    </Group>
                );
            })}
            <Axis.AxisLeft
                scale={yScale}
                top={margin.top}
                left={margin.left}
                label={"Number of News"}
                stroke={"#1b1a1e"}
                tickLength={5}
                tickTextFill={"#1b1a1e"}
            />
            <Axis.AxisBottom
                scale={xScale}
                top={yMax + margin.top}
                left={margin.left}
                label={"Dates"}
                stroke={"#1b1a1e"}
                tickTextFill={"#1b1a1e"}
                tickLength={5}
                numTicks={Object.keys(data).length}
            />
        </svg>
    );
}
