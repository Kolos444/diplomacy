import React from 'react';

import {unstable_getServerSession} from 'next-auth/next';
import Link from 'next/link';
import Header from "./Header";

export default async function RootLayout({
	children
}: {
	children: React.ReactNode
}) {

	const session = await unstable_getServerSession({
		secret:process.env.AUTH_SECRET
	});

	return (<>
			{session?.user ? (
				<Header>
					{children}
				</Header>
				) : (<div>
				<h2>Du bist nicht angemeldet und hast nicht das Recht auf diese Seite zuzugreifen</h2>
				<Link href="/login">Anmelden</Link>
			</div>)}
	</>);
}