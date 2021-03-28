import React from "react";
import { Card } from "semantic-ui-react";
import { ResponsiveLine } from "@nivo/line";
import NoData from "../../../../core/500/NoData";

const RealTimeGraph = ({ data }) => {
  return (
    <Card fluid>
      {data.length > 0 ? (
        <div style={{ height: 400 }}>
          <ResponsiveLine
            data={data}
            margin={{ top: 20, right: 100, bottom: 50, left: 65 }}
            yScale={{ type: "linear" }}
            xScale={{
              type: "time",
              format: "%Y-%m-%d %H:%M:%S",
              precision: "minute",
              useUTC: false,
            }}
            xFormat="time:%Hh %Mm %S [%d]"
            axisLeft={{
              legend: "Pujas",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            axisBottom={{
              orient: "bottom",
              format: "%Hh [%d]",
              legend: "Tiempo",
              legendOffset: 40,
              legendPosition: "middle",
            }}
            curve="monotoneX"
            pointSize={5}
            pointColor="white"
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            useMesh={true}
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 85,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 14,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      ) : (
        <NoData size="medium" title="Nadie ha pujado aún" />
      )}
    </Card>
  );
};

export default RealTimeGraph;
