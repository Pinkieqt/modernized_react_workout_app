import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ThemeContext } from "../providers/ThemeProvider";

const MetricsLineChart = ({ data }) => {
  const { theme } = React.useContext(ThemeContext);
  const lines = () => {
    let tmpData = [];
    let i = 1;

    data.forEach((element) => {
      tmpData.push({ entry: i, Vaha: element.weight, date: element.date.toDate() });
      i++;
    });

    return tmpData;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      let tmp = [];
      for (let el in payload) {
        tmp.push(
          <div key={payload[el].dataKey} className={"m-3"}>
            {`${payload[el].dataKey} : ${payload[el].value} kg`}
            <p>
              {payload[el].payload.date.getDate() + "." + (payload[el].payload.date.getMonth() + 1) + ". " + payload[el].payload.date.getFullYear()}
            </p>
          </div>
        );
      }

      return <div className={`bg-${theme}-bg text-${theme}-tpr text-center py-1 rounded-lg`}>{tmp}</div>;
    }
    return null;
  };

  function renderColorfulLegendText(value, entry) {
    const { color } = entry;

    return (
      <span style={{ color }} className="text-xs">
        Váha
      </span>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={lines()}>
        {/* <CartesianGrid strokeDasharray="10 10" /> */}
        <XAxis dataKey="entry" tickLine={false} tick={{ fontSize: 14 }} interval={3} />
        <YAxis domain={["dataMin", "dataMax"]} hide={true} />
        <Tooltip content={<CustomTooltip />} />
        <Legend formatter={renderColorfulLegendText} align="center" iconSize="7" iconType="circle" />

        <Line type="monotone" dataKey="Vaha" stroke="#FF476C" strokeWidth={3} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MetricsLineChart;
