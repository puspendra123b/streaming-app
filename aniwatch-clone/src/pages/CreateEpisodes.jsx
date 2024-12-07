import { useState } from "react";
import UploadVideo from "../components/UploadVideo";

export function CreateEpisodes(){

    const [display,setDisplay]=useState('none')

    return(
        <div>
            <h3>Collection name</h3>
            <button>Delete Collection</button>
            <button onClick={()=>{
                setDisplay(display === 'none' ? 'block' : 'none')
            }} >{display === 'none' ? "Add Episode" : "Hide the add ep window"}</button>
            <div style={{
                display : display
            }}>
                <UploadVideo />
            </div>
        </div>
    )
}