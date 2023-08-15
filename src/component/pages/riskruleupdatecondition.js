import React from "react";

import Header from "../header";
import RiskRulepUpdateCondition from "../RiskRuleMaintainCard/RiskUpdateCondition";


import Sidebar from "../side-bar";


const RiskRulepUpdateConditionPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <RiskRulepUpdateCondition/>               
            </div>
            
        </>
    )
}
export default RiskRulepUpdateConditionPage