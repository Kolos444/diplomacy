import Link from "next/link";
import React from "react";
import styles from '../../styles/Header.module.css';


const Header = ({
					children
				}: {
	children: React.ReactNode
}) => {
	return (
		<>
			<header className={styles.header}>
				<nav className={styles.navBar}>
					<Link href="/login" className={styles.link}>Einloggen</Link>
					<Link href="/logout" className={styles.link}>Ausloggen</Link>
					<Link href="/game" className={styles.link}>Game</Link>
				</nav>
			</header>
			{children}
		</>
	);
};

export default Header;