import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {signIn} from "next-auth/react";

const options: NextAuthOptions = {
	session: {
		strategy: "jwt"
	}, providers: [CredentialsProvider({
		type: "credentials",
		credentials: {},
		async authorize(credentials, req) {

			const {username, password} = credentials as {
				username: string, password: string
			};

			const response = await fetch("http://localhost:3000/api/verifyUser", {
				method: "POST",
				body: JSON.stringify(credentials),
				headers: {
					"Content-Type": "application/json"
				}
			});

			const verfied: {
				verified: boolean,
				reason: string,
				id: number
			} = await response.json();

			if (verfied.verified) {
				return {id: verfied.id.toString()};
			}

			console.log(verfied.reason);
			return null;
		}
	})],
	pages: {
		signIn: "/login",
		signOut: "/logout",
		newUser: "/register"
	},
	callbacks: {
		async redirect(){
			return "/";
		}
	},
	secret: process.env.AUTH_SECRET
};
export default NextAuth(options);