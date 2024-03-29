import styles from "./Chart.module.scss";

import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { ChartType } from "../../../app/services/stats/statChartApiSlice";

export type ChartProps = {
  aspect: number;
  title: string;
  data: ChartType[];
};

// const data = [
//   { name: "January", users: 10, items: 50, transactions: 100 },
//   { name: "February", users: 20, items: 55, transactions: 60 },
//   { name: "March", users: 30, items: 70, transactions: 90 },
//   { name: "April", users: 40, items: 100, transactions: 100 },
//   { name: "May", users: 30, items: 50, transactions: 50 },
//   { name: "June", users: 20, items: 90, transactions: 80 },
// ];

const Chart = ({ aspect, title, data }: ChartProps) => {
  return (
    <div className={styles.chart}>
      <div className={styles.title}>{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="userColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="itemsColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="transactionsColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" stroke="gray" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" className={styles.chartGrid} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="users"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#userColor)"
          />
          <Area
            type="monotone"
            dataKey="items"
            stackId="1"
            stroke="#0ea5e9"
            fillOpacity={1}
            fill="url(#itemsColor)"
          />
          <Area
            type="monotone"
            dataKey="transactions"
            stackId="1"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#transactionsColor)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Chart;
