import React from "react";
import { useAuth } from "contexts/AuthContext";
import { useHistory } from "react-router-dom";

const Dummy = () => {
	const { status } = useAuth();
	const history = useHistory();
	console.log("status", status);
	if (status === false) {
		history.push("/");
	}
	return <div>Hi Vedant, nice work, you got the status.</div>;
};

export default Dummy;
