"use server";

const bcrypt = require('bcrypt');

const saltRounds = 12;
const salt = bcrypt.genSaltSync(saltRounds);
const masterHash = bcrypt.hashSync(process.env.MASTER_PASSWORD, salt);

const crypto = require('node:crypto');

export async function verifyJWT(jwt: string) {
    const parts = jwt.split(".");

    const hmac = crypto.createHmac("sha256", process.env.AUTH_SECRET);
    hmac.setEncoding("base64");
    hmac.update(parts[0] + "." + parts[1]);
    const digest = hmac.digest('base64');
    if (digest === parts[2]) {
        return true;
    }
    return false;
}

export async function ParseJWT(jwt: string) {

	if (!verifyJWT(jwt)) {
		return null
	}
	
	const output = {} as {header: any, payload: any, signature: string }
	const parts = jwt.split(".");

	output.header = JSON.parse(atob(parts[0]));
	output.payload = JSON.parse(atob(parts[1]));
	output.signature = parts[2];

	return output;
}

export async function signin(password: string) {
    if (!masterHash) {
        return { success: false, jwt: null };
    }
    const match = await bcrypt.compare(password, masterHash);

    if (match) {

        const hmac = crypto.createHmac("sha256", process.env.AUTH_SECRET);
        hmac.setEncoding("base64");

        const header = {
            alg: "HS256",
            typ: "JWT",
            id: crypto.randomUUID()
        }
        const payload = {
            exp: Date.now() + 10 * 60 * 1000,
            admin: true
        }

        let output = btoa(JSON.stringify(header)) + "." + btoa(JSON.stringify(payload))

        hmac.update(output);
        output += "." + hmac.digest("base64");
        return { success: true, jwt: output };
    }
    return { success: false, jwt: null }
} 
