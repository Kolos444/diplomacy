import {NextApiRequest, NextApiResponse} from "next";
import connection from "./connection";
import {RowDataPacket} from "mysql2";
import {createHash} from "crypto";


interface usernameApiRequest extends NextApiRequest {
	body: {
		/**
		 * Nutzername in der Datenbank
		 */
		username: string,
		password: string
	};
}

/**
 * Erstellt einen Typ damit mit der SQL Antwort richtig gearbeitet werden kann
 */
interface sqlResponsePassword extends RowDataPacket {
	/**
	 * Hashed Password das aus der Datenbank zurückgegeben wird
	 */
	password: string;
}

/**
 * Fragt für einen angefragten Nutzer das Passwort ab
 */
export default async function verifyUser(req: usernameApiRequest, res: NextApiResponse) {

	const {username, password} = req.body;
	const hashedPassword = createHash("sha512").update(password).digest("hex");

	//Wenn die Anfrage nicht POST ist, dann soll sie abgelehnt werden
	if (req.method !== "POST") {
		res.status(400).json({error: "Nur POST Anfragen"});
		return;
	}

	//TODO Datentyp rausfinden (Das macht mich verrückt)
	const [rows]: any = await (await connection).execute("SELECT password, id FROM userdata WHERE name = ?", [username]).catch((reason) => {
		res.status(500).json({error: "Datenbank queryfehler", errorMessage: reason});
	});

	if (rows.length === 0) {
		res.status(404).json({verified: false, reason: "Nutzer nicht gefunden"});
		return;
	}

	if (rows[0].password === hashedPassword) {
		res.status(200).json({verified: true, id: rows[0].id});
	} else {
		res.status(400).json({verified: false});
	}


	// await test.query("SELECT password FROM userdata WHERE name = ?", [username], (err, result: sqlResponsePassword[]) => {
	// 	if (err !== null) {
	// 		res.status(500).json({error: "Datenbank queryfehler", errorMessage: err});
	// 	} else {
	//
	// 	}
	// });
}