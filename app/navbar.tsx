import { cookies } from "next/headers"
import { ParseJWT } from "./actions/auth";
import NavClient from "./navClient";

export default async function NavBar() {

    const jwtCookie = cookies().get("auth");
    let authenticated = false;
    if (jwtCookie) {
        const jwt = await ParseJWT(jwtCookie.value);
        if (jwt && jwt.payload.admin === true) {
            authenticated = true;
        }
    }

    return <NavClient authenticated={authenticated}></NavClient>
}
