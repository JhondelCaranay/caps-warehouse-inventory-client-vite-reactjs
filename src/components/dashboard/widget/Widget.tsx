import {
  // AccountBalanceWalletOutlined,
  // MonetizationOnOutlined,
  // ShoppingCartOutlined,
  ConstructionOutlined,
  KeyboardArrowUp,
  ListAltOutlined,
  PaidOutlined,
  PersonOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { WidgetDataTypes, WidgetTypes } from "../../../types";
import styles from "./Widget.module.scss";

type WidgetProps = {
  type: WidgetTypes;
  amount: number;
};

const Widget = ({ type, amount }: WidgetProps) => {
  const navigate = useNavigate();
  let data: WidgetDataTypes = {
    title: "",
    isMoney: false,
    link: "",
    url: "",
    icon: <></>,
  };

  //temporary
  // const amount = 100;
  // const diff = 20;

  data = getWidgetData(data, type);

  return (
    <div className={styles.widget}>
      <div className={styles.left}>
        <span className={styles.title}>{data.title}</span>
        <span className={styles.counter}>
          {/* {data.isMoney && "$"} */}
          {amount}
        </span>
        <span className={styles.link} onClick={() => navigate(data.url)}>
          {data.link}
        </span>
      </div>
      <div className={styles.right}>
        {/* <div className={`${styles.percentage} ${styles.positive}`}>
          <KeyboardArrowUp />
          {diff} %
        </div> */}
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
        url: "/dash/users",
        icon: (
          <PersonOutlined
            className={`${styles.icon}`}
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;

    case "item":
      data = {
        title: "ITEMS",
        isMoney: false,
        link: "see all items",
        url: "/dash/items",
        icon: (
          <ConstructionOutlined
            className={`${styles.icon}`}
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
        url: "/dash/projects",
        icon: (
          <ListAltOutlined
            className={`${styles.icon}`}
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
        url: "/dash/transactions",
        icon: (
          <PaidOutlined
            className={`${styles.icon}`}
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
