import {
  AccountBalanceWalletOutlined,
  MonetizationOnOutlined,
  ShoppingCartOutlined,
  ConstructionOutlined,
  KeyboardArrowUp,
  ListAltOutlined,
  PaidOutlined,
  PersonOutlined,
} from "@mui/icons-material";
import { WidgetDataTypes, WidgetProps, WidgetTypes } from "../../../types";
import "./widget.scss";

const Widget = ({ type }: WidgetProps) => {
  let data: WidgetDataTypes = {
    title: "",
    isMoney: false,
    link: "",
    icon: <></>,
  };

  //temporary
  const amount = 100;
  const diff = 20;

  data = getWidgetData(data, type);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUp />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};
export default Widget;

const getWidgetData = (data: WidgetDataTypes, type: WidgetTypes): WidgetDataTypes => {
  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlined
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;

    case "product":
      data = {
        title: "PRODUCTS",
        isMoney: false,
        link: "see all products",
        icon: (
          <ConstructionOutlined
            className="icon"
            style={{
              backgroundColor: "rgba(0, 128, 0, 0.2)",
              color: "green",
            }}
          />
        ),
      };
      break;
    case "project":
      data = {
        title: "PROJECTS",
        isMoney: false,
        link: "see all projects",
        icon: (
          <ListAltOutlined
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    case "transaction":
      data = {
        title: "TRANSACTIONS",
        isMoney: false,
        link: "see all transactions",
        icon: (
          <PaidOutlined
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return data;
};
