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
            Create(title, await file.text(), description, imageUrl)
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
        <h4>File</h4>
        <input type="file" onChange={SetFile}></input>
        <h4>Title</h4>
        <input type="text" onChange={e => setTitle(e.target.value)}></input>
        <h4>ImageUrl</h4>
        <input type="text" onChange={e => setImageUrl(e.target.value)}></input>
        <h4>Description</h4>
        <textarea onChange={e => setDescription(e.target.value)}></textarea>
        <input type="submit" onClick={Submit}></input>
    </div>)
}
