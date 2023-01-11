import '../styles/globals.css';
import React from 'react';

export default async function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (<html>
	<head>
		<title>Website</title>
	</head>
	<body>{children}</body>
	</html>);
}