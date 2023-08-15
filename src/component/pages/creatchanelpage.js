import React from "react";
import CreateChan from "../CreateChanelCard";

import Header from "../header";
import Sidebar from "../side-bar";


const CreatChanel = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <Sidebar/>
                <CreateChan/>
            </div>
            
        </>
    )
}
export default CreatChanel