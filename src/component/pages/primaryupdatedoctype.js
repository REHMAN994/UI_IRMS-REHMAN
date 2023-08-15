import React from "react";

import Header from "../header";
import PrimaryUpdateDocType from "../RelationshipUpdateCard/PrimaryUpdateDocType";
import Sidebar from "../side-bar";


const PrimaryUptadeDocTypePage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <PrimaryUpdateDocType/>
            </div>
            
        </>
    )
}
export default PrimaryUptadeDocTypePage