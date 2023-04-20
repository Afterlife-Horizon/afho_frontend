import React from "react";
import { ClipLoader } from "react-spinners";

const Spinner: React.FC<{ size: number }> = ({ size }) => {
	return (
		<div className="grid h-full place-items-center">
			<ClipLoader color={"#ffffff"} loading={true} size={size} aria-label="Loading Spinner" data-testid="loader" />
		</div>
	);
};

export default Spinner;
