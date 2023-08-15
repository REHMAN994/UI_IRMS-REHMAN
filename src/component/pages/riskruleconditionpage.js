import React from "react";

import Header from "../header";
import RiskRuleCreateCondition from "../RiskRuleConditionCard/riskrulecreatecondition";
import Sidebar from "../side-bar";


const RiskRuleCreateConditionPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                 <RiskRuleCreateCondition/>           
            </div>
            
        </>
    )
}
export default RiskRuleCreateConditionPage