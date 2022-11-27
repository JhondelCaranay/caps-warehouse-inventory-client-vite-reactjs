import { KeyboardArrowDown, KeyboardArrowUpOutlined, MoreVert } from "@mui/icons-material";
import "./featured.scss";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Featured = () => {
	return (
		<div className="featured">
			<div className="top">
				<h1 className="title">Total Transactions</h1>
				<MoreVert fontSize="small" />
			</div>
			<div className="bottom">
				<div className="featuredChart">
					<CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
				</div>
				<p className="title">Transactions made today</p>
				<p className="amount">40</p>
				<p className="desc">Previous transactions processing.</p>
				<div className="summary">
					{/* <div className="item">
						<div className="itemTitle">Target</div>
						<div className="itemResult negative">
							<KeyboardArrowDown fontSize="small" />
							<div className="resultAmount">12</div>
						</div>
					</div> */}
					<div className="item">
						<div className="itemTitle">Last Week</div>
						<div className="itemResult positive">
							<KeyboardArrowUpOutlined fontSize="small" />
							<div className="resultAmount">12</div>
						</div>
					</div>
					<div className="item">
						<div className="itemTitle">Last Month</div>
						<div className="itemResult positive">
							<KeyboardArrowUpOutlined fontSize="small" />
							<div className="resultAmount">12</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Featured;
