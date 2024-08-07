import React from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleOrdinal } from "@visx/scale";
import {
    HtmlLabel,
    Label,
    Connector,
    CircleSubject,
    LineSubject,
} from "@visx/annotation";
import { LinePath } from "@visx/shape";
import { Annotation } from "@visx/visx";

function PieChartMediums({ width, height, data, visible }) {
    if (!visible) return <></>;
    const margin = {
        top: 30,
        right: 30,
        left: 30,
        bottom: 30,
    };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const radius = Math.min(innerWidth, innerHeight) / 2;
    const centerY = innerHeight / 2;
    const centerX = innerWidth / 2;
    const top = centerY + margin.top;
    const left = centerX + margin.left;

    const getLetterFrequencyColor = scaleOrdinal({
        domain: Object.keys(data),
        range: [
            "rgba(0, 177, 159,1)",
            "rgba(0, 177, 159,0.8)",
            "rgba(0, 177, 159,0.6)",
        ],
    });

    let total = 0;
    Object.values(data).forEach((d) => {
        total += d;
    });

    const targetLabelOffset = (width / 2) * 0.6;

    return (
        <svg width={height} height={height}>
            <Group top={top} left={left}>
                <Pie
                    data={Object.keys(data)}
                    pieValue={(d) => data[d]}
                    outerRadius={radius}
                >
                    {(pie) => {
                        return pie.arcs.map((arc, index) => {
                            const medium = arc.data;
                            const [centroidX, centroidY] =
                                pie.path.centroid(arc);
                            const hasSpaceForLabel =
                                arc.endAngle - arc.startAngle >= 0.1;
                            const arcPath = pie.path(arc);
                            const arcFill = getLetterFrequencyColor(medium);

                            return (
                                <g key={`arc-${medium}-${index}`}>
                                    <path d={arcPath} fill={arcFill} />
                                    {hasSpaceForLabel && (
                                        <Annotation.Annotation
                                            x={centroidX}
                                            y={centroidY}
                                            dx={
                                                // offset label to a constant left- or right-coordinate
                                                (centroidX < 0
                                                    ? -targetLabelOffset
                                                    : targetLabelOffset) -
                                                centroidX
                                            }
                                            dy={centroidY < 0 ? -50 : 50}
                                        >
                                            <Annotation.Label
                                                showBackground={false}
                                                title={medium}
                                                subtitle={`${(
                                                    (100 * arc.value) /
                                                    total
                                                ).toFixed(1)}%`}
                                                subtitleFontWeight={400}
                                                subtitleFontSize={15}
                                                fontColor="#000"
                                                width={100}
                                            />
                                            <Annotation.Connector stroke="#000" />
                                        </Annotation.Annotation>
                                    )}
                                </g>
                            );
                        });
                    }}
                </Pie>
            </Group>
        </svg>
    );
}

export default PieChartMediums;
