"use client"

import { signin } from "@/app/actions/auth";
import { useState } from "react"

export default function SignIn() {

    const [password, setPassword] = useState("");

    function SignIn() {
        if (password !== "") {
            signin(password).then(response => {
                if (response.success) {
                    window.sessionStorage.setItem("jwblogjwt", response.jwt || "")
                }
            })
        }
    }


    return (
        <div>
            <input type="password" onChange={e => setPassword(e.target.value)} value={password}></input>
            <button onClick={SignIn}>Sign In</button>
        </div>
    )

}
