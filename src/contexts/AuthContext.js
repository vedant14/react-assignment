import React, { useState, useEffect, createContext, useContext } from "react";

import { auth } from "../services/firebaseConfig";
import axios from "axios";
const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [status, setStatus] = useState(false);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	useEffect(() => {
		if (currentUser) {
			axios
				.post("https://vedant-test.free.beeceptor.com/init", {
					email: currentUser.email,
					uid: currentUser.uid,
				})
				.then(
					(response) => {
						if (response.status === 1) {
							setStatus(true);
						}
					},
					(error) => {
						console.log(error);
					}
				);
		}
	}, [currentUser]);

	const value = {
		currentUser,
		signup,
		status,
		login,
	};

	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function signup(email, password) {
		return auth.createUserWithEmailAndPassword(email, password);
	}

	return (
		<div>
			<AuthContext.Provider value={value}>
				{!loading && children}
			</AuthContext.Provider>
		</div>
	);
}
