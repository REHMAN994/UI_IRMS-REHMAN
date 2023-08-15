import React from "react";

import Header from "../header";
import RiskRuleCreateDecision from "../RiskRuleDecisionCard/riskrulecreatdecision";
import Sidebar from "../side-bar";


const RiskRuleCreateDecisionPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                 <RiskRuleCreateDecision/>          
            </div>
            
        </>
    )
}
export default RiskRuleCreateDecisionPage