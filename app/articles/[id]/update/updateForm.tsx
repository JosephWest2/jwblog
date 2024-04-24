"use client";

import { Update } from "@/app/actions/update";
import { useState } from "react";

export default function UpdateForm({article} : {article: {article: string, id: number, title: string, imageUrl: string | null, description: string | null}}) {

    const [file, setFile] = useState<any>(article.article);
    const [title, setTitle] = useState<string>(article.title);
    const [imageUrl, setImageUrl] = useState<string | undefined>(article.imageUrl || undefined);
    const [description, setDescription] = useState<string | undefined>(article.description || undefined);

    async function Submit() {
        if (file && title) {
            Update(article.id, title, file, description, imageUrl); 
            alert("article updated");
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
        <input className="input" type="text" value={title} onChange={e => setTitle(e.target.value)}></input>
        <h4>ImageUrl</h4>
        <input className="input" type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)}></input>
        <h4>Description</h4>
        <textarea className="input" style={{minHeight: "5rem"}} value={description} onChange={e => setDescription(e.target.value)}></textarea>
        <input className="input" type="submit" onClick={Submit} value="Submit"></input>
    </div>)
}
