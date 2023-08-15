import React from "react";

import Header from "../header";
import RiskRuleUpdateDecision from "../RiskRuleMaintainDecisinsCard/RiskRuleUpdateDecision";
import Sidebar from "../side-bar";


const RiskRuleUpdateDecisionPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                 <RiskRuleUpdateDecision/>            
            </div>
            
        </>
    )
}
export default RiskRuleUpdateDecisionPage