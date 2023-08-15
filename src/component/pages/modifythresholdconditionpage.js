import React from "react";

import Header from "../header";
import ModifyThresholdCondition from "../ModifyThresholdCard/ModifyCondition";
import Sidebar from "../side-bar";


const ModifyThresholdConditionPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar />
                <ModifyThresholdCondition/>
                
            </div>
            
        </>
    )
}
export default ModifyThresholdConditionPage