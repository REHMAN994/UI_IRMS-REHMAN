import React from "react";

import Header from "../header";
import RiskRuleCondition from "../UpdateScreenForCreate/RiskRuleCondition";
import Sidebar from "../side-bar";


const RiskRuleConditionPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex'}}>
                <Sidebar/>
                <RiskRuleCondition/>              
            </div>
            
        </>
    )
}
export default RiskRuleConditionPage