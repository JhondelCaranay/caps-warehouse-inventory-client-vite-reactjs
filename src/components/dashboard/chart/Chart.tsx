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
  { name: "January", users: 10, products: 50, transactions: 100 },
  { name: "February", users: 20, products: 55, transactions: 60 },
  { name: "March", users: 30, products: 70, transactions: 90 },
  { name: "April", users: 40, products: 100, transactions: 100 },
  { name: "May", users: 30, products: 50, transactions: 50 },
  { name: "June", users: 20, products: 90, transactions: 80 },
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
