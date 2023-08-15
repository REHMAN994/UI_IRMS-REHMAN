import React from "react";
import AgencyDelete from "../AgencyCard/DeleteAgency";
import Header from "../header";
import Sidebar from "../side-bar";


const AgencyDeletePage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <Sidebar/>
                <AgencyDelete/>
                
            </div>
            
        </>
    )
}
export default AgencyDeletePage