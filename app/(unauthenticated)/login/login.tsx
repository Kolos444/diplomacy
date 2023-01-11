'use client';
import {FormEvent} from 'react';
import { signIn } from 'next-auth/react';


const Login = () => {
	const handleLogin = async(e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const eventTarget = e.target as HTMLFormElement;

		const antwort = await signIn('credentials',{
			username: (eventTarget[0] as HTMLInputElement).value,
			password: (eventTarget[1] as HTMLInputElement).value
		})

		console.log(antwort);
	};
	return (<form onSubmit={handleLogin}>
		<input type="text" id="username" required/>
		<input type="password" id="password" required/>
		<input type="submit"/>
	</form>);
};

export default Login;