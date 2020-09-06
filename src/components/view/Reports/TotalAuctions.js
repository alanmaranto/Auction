import React from "react";
import {
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Text,
  Tooltip,
  Area,
  Label,
} from "recharts";

const data = [
  {
    name: "Enero 2020",
    subastas: 40,
  },
  {
    name: "Febrero ",
    subastas: 12,
  },
  {
    name: "Marzo 2020",
    subastas: 1,
  },
  {
    name: "Abril 2020",
    subastas: 22,
  },
  {
    name: "Mayo 2020",
    subastas: 7,
  },
  {
    name: "Junio 2020",
    subastas: 11,
  },
  {
    name: "Julio 2020",
    subastas: 2,
  },
  {
    name: "Agosto 2020",
    subastas: 30,
  },
  {
    name: "Septiembre 2020",
    subastas: 27,
  },
  {
    name: "Octubre 2020",
    subastas: 34,
  },
  {
    name: "Noviembre 2020",
    subastas: 29,
  },
  {
    name: "Diciembre 2020",
    subastas: 17,
  },
];

const TotalAuctionsReport = () => {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 15, left: 15, bottom: 15 }}
      >
        <defs>
          <linearGradient id="colorAuction" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#58AFCF" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#58AFCF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name">
          <Label value="Meses" offset={0} position="bottom" />
        </XAxis>
        <Text scaleToFit={true}></Text>
        <YAxis
          label={{
            value: "Subastas Totales",
            angle: -90,
            position: "left",
          }}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="subastas"
          stroke="#58AFCF"
          fillOpacity={1}
          fill="url(#colorAuction)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TotalAuctionsReport;
