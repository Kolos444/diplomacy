'use client';
import {FormEvent} from 'react';
import {signIn, signOut} from "next-auth/react";


const Logout = () => {
	const handleLogout = async() => {

		await signOut();

	};
	return (
		<input type="button" onClick={handleLogout} value="Ausloggen"/>
	);
};

export default Logout;