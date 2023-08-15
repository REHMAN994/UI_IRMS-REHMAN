import React from "react";
import DisplayRiskRuleCondition from "../DisplayRules/DisplayRiskRuleConditions";
import Header from "../header";
import Sidebar from "../side-bar";


const DisplayRiskRuleConditionPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial', backgroundColor: '#f3f3f6b5'}}>
                <Sidebar />
                <DisplayRiskRuleCondition/>
                
            </div>
            
        </>
    )
}
export default DisplayRiskRuleConditionPage