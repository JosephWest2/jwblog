"use client";

import { Create } from "@/app/actions/create";

export default function page() {


    function Submit(e: FormData) {
        const file = e.get("file") as any;
        const title = e.get("title");
        console.log(file);
        console.log(file.toString())
        console.log(JSON.stringify(file))
        if (file && title) {
           Create(title.toString(), file.toString()) 
        } else {
            alert("please fill out all fields");
        }
    }

    return (<div>

        <form action={Submit}>
            <input type="file" name="file" id="file"></input>
            <input type="text" name="title" id="title"></input>
            <input type="submit" value="Submit"></input>

        </form>
    </div>)
}
