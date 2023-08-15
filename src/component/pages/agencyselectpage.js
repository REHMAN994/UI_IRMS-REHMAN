import React from "react";
import AgencySeletc from "../AgencyCard/SelectAgency";
import Header from "../header";
import Sidebar from "../side-bar";


const AgencySelectPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <Sidebar/>
                <AgencySeletc/>
                
            </div>
            
        </>
    )
}
export default AgencySelectPage