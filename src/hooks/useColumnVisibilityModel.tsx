import { GridColumnVisibilityModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const useColumnVisibilityModel = () => {
	const [windowSize, setWindowSize] = useState(window.innerWidth);

	const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>({
		id: false,
		username: true,
		email: true,
		age: true,
		status: true,
		action: true,
	});

	useEffect(() => {
		const handleResize = () => {
			setWindowSize(window.innerWidth);
			if (window.innerWidth < 640) {
				setColumnVisibilityModel({
					id: false,
					username: true,
					email: false,
					age: false,
					status: false,
					action: true,
				});
			} else if (window.innerWidth < 768) {
				setColumnVisibilityModel({
					id: false,
					username: true,
					email: false,
					age: false,
					status: true,
					action: true,
				});
			} else if (window.innerWidth < 1024) {
				setColumnVisibilityModel({
					id: false,
					username: true,
					email: true,
					age: false,
					status: true,
					action: true,
				});
			} else {
				setColumnVisibilityModel({
					id: false,
					username: true,
					email: true,
					age: true,
					status: true,
					action: true,
				});
			}
		};
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return {
		columnVisibilityModel,
		setColumnVisibilityModel,
		windowSize,
	};
};
export default useColumnVisibilityModel;
