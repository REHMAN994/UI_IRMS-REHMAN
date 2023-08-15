import React from "react";
import Header from "../header";
import Sidebar from "../side-bar";
import SelectStatus from "../StatusCard/SelectStatus";

const StatusSelectPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <Sidebar/>
                <SelectStatus/>
            </div>
            
        </>
    )
}
export default StatusSelectPage