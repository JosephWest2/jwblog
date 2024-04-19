"use client";

import { Create } from "@/app/actions/create";
import { useState } from "react";

export default function page() {

    const [file, setFile] = useState<any>();
    const [title, setTitle] = useState<string>();
    const [imageUrl, setImageUrl] = useState<string>();
    const [description, setDescription] = useState<string>();


    async function Submit() {
        const fileString = await file.text();
        if (file && title) {
            Create(title, fileString)
        } else {
            alert("please fill out all fields");
        }
    }

    function SetFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length < 1) {
            return;
        }
        setFile(e.target.files[0])
    }

    return (<div>
        <input type="file" onChange={SetFile}></input>
        <input type="text" onChange={e => setTitle(e.target.value)}></input>
        <input type="submit" onClick={Submit}></input>
    </div>)
}
