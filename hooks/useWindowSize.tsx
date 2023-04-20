import { useEffect, useState } from "react";

export default function useWindowSize() {
	const [windowSize, setWindowSize] = useState<{ width: number | undefined; height: number | undefined }>({
		width: undefined,
		height: undefined,
	});

	function handleResize() {
		// Set window width/height to state
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("resize", handleResize);
			handleResize();

			return () => window.removeEventListener("resize", handleResize);
		}
	}, []);
	return windowSize;
}
