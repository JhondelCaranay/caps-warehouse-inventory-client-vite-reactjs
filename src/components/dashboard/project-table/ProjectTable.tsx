import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Project } from "../../../types";
import "./projectTable.scss";

type ProjectTableProps = {
  projects: Project[];
};

const ProjectTable = ({ projects }: ProjectTableProps) => {
  // sort the rows by id and status , put approved below
  // const sortedRows = projects.sort((a, b) => {
  //   if (a.status === "Approved" && b.status !== "Approved") {
  //     return 1;
  //   } else if (a.status !== "Approved" && b.status === "Approved") {
  //     return -1;
  //   } else {
  //     return a.id - b.id;
  //   }
  // });

  return (
    <TableContainer component={Paper} className="projectTable">
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Project Name</TableCell>
            <TableCell className="tableCell md">Address</TableCell>
            <TableCell className="tableCell">Phase</TableCell>

            <TableCell className="tableCell">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.name}</TableCell>
              <TableCell className="tableCell md">{row.address}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ONGOING`}>Ongoing</span>
              </TableCell>
              <TableCell className="tableCell">
                <Link to={`/dash/projects/${row.id}`} className={`viewButton`}>
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ProjectTable;
