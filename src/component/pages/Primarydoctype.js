import React from "react";

import Header from "../header";
import PrimaryDocType from "../RelationshipCard/PrimaryDocType";
import Sidebar from "../side-bar";


const PrimaryDocTypePage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <PrimaryDocType/>
                
            </div>
            
        </>
    )
}
export default PrimaryDocTypePage