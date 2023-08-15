import React from "react";
import DisplayThresholdCondition from "../DisplayThresholdCard/DisplayThresholdConditions";
import Header from "../header";

import Sidebar from "../side-bar";


const DisplayThresholdConditionPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar />
                <DisplayThresholdCondition/>
                
            </div>
            
        </>
    )
}
export default DisplayThresholdConditionPage