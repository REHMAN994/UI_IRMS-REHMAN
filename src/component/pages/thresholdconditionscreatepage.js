import React from "react";

import Header from "../header";
import Sidebar from "../side-bar";
import ThresholdConditionsCreate from "../ThresholdRevionCard/CreateThresholdCondition";

const ThresholdConditionsCreatePage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar />
                <ThresholdConditionsCreate/>
                
            </div>
            
        </>
    )
}
export default ThresholdConditionsCreatePage