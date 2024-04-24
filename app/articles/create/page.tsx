"use client";

import { Create } from "@/app/actions/create";
import { useState } from "react";

export default function page() {

    const [file, setFile] = useState<any>();
    const [title, setTitle] = useState<string>();
    const [imageUrl, setImageUrl] = useState<string | undefined>();
    const [description, setDescription] = useState<string | undefined>();

    async function Submit() {
        if (file && title) {
            Create(title, file, description, imageUrl)
            alert("article created");
        } else {
            alert("please fill out all fields");
        }
    }

    async function SetFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length < 1) {
            return;
        }
        setFile(await e.target.files[0].text())
    }

    return (<div className="box col" style={{gap: "0.5rem", width: "30rem", maxWidth: "100svw"}}>
        <h4>File</h4>
        <input type="file" onChange={SetFile}></input>
        <h4>Title</h4>
        <input className="input" type="text" onChange={e => setTitle(e.target.value)}></input>
        <h4>ImageUrl</h4>
        <input className="input" type="text" onChange={e => setImageUrl(e.target.value)}></input>
        <h4>Description</h4>
        <textarea className="input" style={{minHeight: "5rem"}} onChange={e => setDescription(e.target.value)}></textarea>
        <input className="input" type="submit" onClick={Submit} value="Submit"></input>
    </div>)
}
