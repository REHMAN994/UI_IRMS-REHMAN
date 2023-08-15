import React from "react";
import Header from "../header";
import Sidebar from "../side-bar";
import CreateStatus from "../StatusCard/CreateStatus";


const StatusCreatePage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <CreateStatus/>
                
            </div>
            
        </>
    )
}
export default StatusCreatePage