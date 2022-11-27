import { useEffect } from "react";

const useTitle = (title: string) => {
	useEffect(() => {
		const prevTitle = document.title;
		const renameTitle = () => {
			document.title = title;
		};

		renameTitle();

		return () => {
			document.title = prevTitle;
		};
	}, [title]);
};

export default useTitle;
