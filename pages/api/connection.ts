import mysql from 'mysql2/promise';

const connection = mysql.createConnection({
	host: process.env.DB_IP,
	port: parseInt(process.env.DB_Port || '3306'),
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: 'diplomacy'
});
export default connection;