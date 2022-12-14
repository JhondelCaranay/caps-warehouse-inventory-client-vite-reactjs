import "./chart.scss";

import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { ChartProps } from "../../../types";

const data = [
  { name: "January", users: 1200, products: 700, transactions: 333 },
  { name: "February", users: 2100, products: 200, transactions: 666 },
  { name: "March", users: 800, products: 500, transactions: 777 },
  { name: "April", users: 1600, products: 300, transactions: 444 },
  { name: "May", users: 900, products: 722, transactions: 555 },
  { name: "June", users: 1700, products: 955, transactions: 666 },
];

const Chart = ({ aspect, title }: ChartProps) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
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
            <linearGradient id="productsColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="transactionsColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          {/* <YAxis /> */}
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
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
            dataKey="products"
            stackId="1"
            stroke="#0ea5e9"
            fillOpacity={1}
            fill="url(#productsColor)"
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
