import React from "react";

import Header from "../header";
import RiskRuleMaintenanceDecision from "../RiskRuleMaintainDecisinsCard/RiskRuleDecision";
import Sidebar from "../side-bar";


const RiskRuleMaintenanceDecisionPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                 <RiskRuleMaintenanceDecision/>              
            </div>
            
        </>
    )
}
export default RiskRuleMaintenanceDecisionPage