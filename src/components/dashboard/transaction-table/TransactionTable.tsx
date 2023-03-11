import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Transaction } from "../../../types";
import styles from "./TransactionTable.module.scss";
import noImage from "../../../assets/img/noimage.png";
import moment from "moment";
import { Link } from "react-router-dom";

type TransactionTableProps = {
  transactions: Transaction[];
};

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  return (
    <TableContainer component={Paper} className={styles.transactionTable}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={styles.tableCell}>#</TableCell>
            <TableCell className={styles.tableCell}>Product</TableCell>
            <TableCell className={styles.tableCell}>Quantity</TableCell>
            <TableCell className={styles.tableCell}>Created</TableCell>
            <TableCell className={styles.tableCell}>Status</TableCell>
            <TableCell className={styles.tableCell}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions &&
            transactions.map((transaction, index) => (
              <TableRow key={transaction.id}>
                <TableCell className={styles.tableCell}>{index + 1}</TableCell>
                <TableCell className={styles.tableCell}>
                  <div className={styles.cellWrapper}>
                    <img
                      src={transaction?.Item?.pictureUrl || noImage}
                      alt=""
                      className={styles.image}
                    />
                    {transaction.Item.name}
                  </div>
                </TableCell>
                <TableCell className={styles.tableCell}>{transaction.quantity}</TableCell>
                <TableCell className={styles.tableCell}>
                  {moment(transaction.createdAt).format("ddd YYYY-MM-DD hh:mm a")}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  <span className={`${styles.status} ${styles[transaction.status]}`}>
                    {transaction.status}
                  </span>
                </TableCell>

                <TableCell>
                  <div className={styles.cellAction}>
                    <Link
                      className={styles.viewButton}
                      to={`/me/transaction/${transaction.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      View
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default TransactionTable;

// const rows = [
//   {
//     id: 1143155,
//     product: "Acer Nitro 5",
//     img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
//     customer: "John Smith",
//     date: "1 March",
//     amount: 785,
//     method: "Cash on Delivery",
//     status: "Approved",
//   },
//   {
//     id: 2235235,
//     product: "Playstation 5",
//     img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
//     customer: "Michael Doe",
//     date: "1 March",
//     amount: 900,
//     method: "Online Payment",
//     status: "Pending",
//   },
//   {
//     id: 2342353,
//     product: "Redragon S101",
//     img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
//     customer: "John Smith",
//     date: "1 March",
//     amount: 35,
//     method: "Cash on Delivery",
//     status: "Pending",
//   },
//   {
//     id: 2357741,
//     product: "Razer Blade 15",
//     img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
//     customer: "Jane Smith",
//     date: "1 March",
//     amount: 920,
//     method: "Online",
//     status: "Approved",
//   },
//   {
//     id: 2342355,
//     product: "ASUS ROG Strix",
//     img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
//     customer: "Harold Carol",
//     date: "1 March",
//     amount: 2000,
//     method: "Online",
//     status: "Pending",
//   },
// ];

// // sort the rows by id and status , put approved below
// const sortedRows = rows.sort((a, b) => {
//   if (a.status === "Approved" && b.status !== "Approved") {
//     return 1;
//   } else if (a.status !== "Approved" && b.status === "Approved") {
//     return -1;
//   } else {
//     return a.id - b.id;
//   }
// });
