import { useEffect, useState } from "react";

const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState(window.innerWidth);
	// watch window size and set toggleSidebar to false if window size is greater than 768px
	useEffect(() => {
		const handleResize = () => {
			setWindowSize(window.innerWidth);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return { windowSize };
};
export default useWindowSize;
