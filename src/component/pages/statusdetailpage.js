import React from "react";
import Header from "../header";
import Sidebar from "../side-bar";
import DetailsStatus from "../StatusCard";

const StatusDetailPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
               <DetailsStatus/>
            </div>
            
        </>
    )
}
export default StatusDetailPage