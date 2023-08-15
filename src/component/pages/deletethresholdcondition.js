import React from "react";
import DeleteThresholdCondition from "../DeleteThresholdCard/DeleteThresholdCondition";
import Header from "../header";

import Sidebar from "../side-bar";


const DeleteThresholdConditionPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar />
                <DeleteThresholdCondition/>
                
            </div>
            
        </>
    )
}
export default DeleteThresholdConditionPage