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
import { Link, useLocation } from "react-router-dom";
import { Capitalize } from "../../../config/utils/functions";

type TransactionTableProps = {
  transactions: Transaction[];
};

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  const { pathname } = useLocation();

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
                    {Capitalize(transaction.status)}
                  </span>
                </TableCell>

                <TableCell>
                  <div className={styles.cellAction}>
                    <Link
                      className={styles.viewButton}
                      to={`/${pathname.startsWith("/dash") ? "dash" : "me"}/transactions/${
                        transaction.id
                      }`}
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
