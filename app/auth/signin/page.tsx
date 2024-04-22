"use client"

import { signin } from "@/app/actions/auth";
import { useRouter } from "next/router";
import { useState } from "react"

export default function SignIn() {

    const [password, setPassword] = useState("");
    const router = useRouter();

    function SignIn() {
        if (password !== "") {
            signin(password).then(response => {
                if (response.success) {
                    document.cookie = `auth=${response.jwt}; expires=${new Date(Date.now() + 1000 * 60 * 30)}; SameSite=strict;`
                    alert("signed in successfully")
                    router.push("/")
                    
                }
            })
        }
    }


    return (
        <>
            <div>
                <h2>Admin signin</h2>
                <input type="password" onChange={e => setPassword(e.target.value)} value={password}></input>
                <button onClick={SignIn}>Sign In</button>
            </div>
        </>
    )

}
