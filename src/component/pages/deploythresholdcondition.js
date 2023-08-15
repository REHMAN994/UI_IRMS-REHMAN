import React from "react";
import DeployThresholdCondition from "../DeployThresholdCard/DeployThresholdCondition";
import Header from "../header";

import Sidebar from "../side-bar";


const DeployThresholdConditionPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar />
                <DeployThresholdCondition/>
                
            </div>
            
        </>
    )
}
export default DeployThresholdConditionPage