"use client"

import { signin } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function SignIn() {

    const [password, setPassword] = useState("");
    const router = useRouter();

    function SignIn() {
        if (password !== "") {
            signin(password).then(response => {
                if (response.success) {
                    document.cookie = `auth=${response.jwt}; expires=${new Date(Date.now() + 1000 * 60 * 30)}; SameSite=strict;`
                    router.push("/")
                }
            })
        }
    }


    return (
        <>
            <div className="box col" style={{width: "15rem"}}>
                <h2>Admin signin</h2>
                    <input className="input" type="password" onChange={e => setPassword(e.target.value)} value={password}></input>
                    <button className="btn" style={{width: "100%"}} onClick={SignIn}>Sign In</button>
            </div>
        </>
    )

}
