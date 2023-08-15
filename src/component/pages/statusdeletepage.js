import React from "react";
import Header from "../header";
import Sidebar from "../side-bar";
import DeleteStatus from "../StatusCard/DeleteStatus";



const StatusDeletePage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <Sidebar/>
                <DeleteStatus/>
            
                
            </div>
            
        </>
    )
}
export default StatusDeletePage