import React from "react";
import AgencyDetails from "../AgencyCard";
import Header from "../header";
import Sidebar from "../side-bar";


const AgencyDetailsPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <AgencyDetails/>
                
            </div>
            
        </>
    )
}
export default AgencyDetailsPage