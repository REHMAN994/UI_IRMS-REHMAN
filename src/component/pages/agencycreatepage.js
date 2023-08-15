import React from "react";
import AgencyCreate from "../AgencyCard/CreateAgency";
import Header from "../header";
import Sidebar from "../side-bar";



const AgencyCreatePage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial', backgroundColor: '#f3f3f6b5'}}>
                <Sidebar />
                <AgencyCreate/>
                
                
            </div>
            
        </>
    )
}
export default AgencyCreatePage