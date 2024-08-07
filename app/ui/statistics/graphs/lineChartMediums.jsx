import React from "react";
import { scaleOrdinal } from "@visx/scale";
import { Axis, Legend, Marker, XYChart } from "@visx/visx";
import { schemeSet1 } from "d3-scale-chromatic";

function LineChartMediums({ width, height, data, visible }) {
    if (!visible) return <></>;
    const margin = { top: 20, bottom: 20, left: 20, right: 20 };

    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const xValues = Object.keys(data).map((medium) =>
        Object.keys(data[medium])
    );
    const yValues = new Set(
        Object.keys(data).map((medium) => Object.values(data[medium]))
    );

    const accessors = {
        xAccessor: (d) => {
            if (!d) return null;
            return d.x;
        },
        yAccessor: (d) => {
            if (!d) return null;
            return d.y;
        },
    };

    const ordinalColorScale = scaleOrdinal({
        domain: Object.keys(data),
        range: schemeSet1,
    });

    const compose = (scale, accessor) => (data) => scale(accessor(data));
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                gap: "10px",
            }}
        >
            <svg width={width} height={height - 100}>
                <XYChart.XYChart
                    height={height - 100}
                    width={width}
                    xScale={{
                        type: "utc",
                    }}
                    yScale={{
                        type: "linear",
                    }}
                >
                    <XYChart.Grid columns={false} numTicks={4} />
                    {Object.keys(data).map((medium) => {
                        let mediumData = data[medium];
                        mediumData = Object.keys(mediumData).map((k) => {
                            const y = mediumData[k];
                            return {
                                x: new Date(k),
                                y,
                            };
                        });

                        mediumData.sort((a, b) => {
                            if (a.x < b.x) {
                                return -1;
                            } else if (a.x === b.x) {
                                return 0;
                            } else {
                                return 1;
                            }
                        });

                        const mediumKey = medium.replace(" ", "-");
                        return (
                            <>
                                <Marker.MarkerCircle
                                    id={`marker-circle-${mediumKey}`}
                                    fill={ordinalColorScale(medium)}
                                    size={1.4}
                                    refX={1}
                                />
                                <XYChart.LineSeries
                                    dataKey={medium}
                                    data={mediumData}
                                    {...accessors}
                                    markerStart={`url(#marker-circle-${mediumKey})`}
                                    markerEnd={`url(#marker-circle-${mediumKey})`}
                                    markerMid={`url(#marker-circle-${mediumKey})`}
                                    stroke={ordinalColorScale(medium)}
                                />
                            </>
                        );
                    })}

                    <XYChart.Axis orientation="left" numTicks={4} />
                    <XYChart.Axis
                        orientation="bottom"
                        numTicks={6}
                        strokeWidth={0}
                        tickLength={10}
                    />
                </XYChart.XYChart>
            </svg>
            <div
                style={{
                    marginLeft: margin.left,
                    border: "1px solid rgba(0, 0, 0, 0.8)",
                    padding: 10,
                    borderRadius: 10,
                }}
            >
                <Legend.LegendOrdinal
                    scale={ordinalColorScale}
                    direction="column-reverse"
                    itemDirection="row-reverse"
                    labelMargin="0 20px 0 0"
                    shapeMargin="1px 0 0"
                />
            </div>
        </div>
    );
}

export default LineChartMediums;
