import React from "react";

import Header from "../header";
import RiskRuleDecision from "../UpdateScreenForCreate/RiskRuleDecision";
import Sidebar from "../side-bar";


const RiskRuleDecisionPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex'}}>
                <Sidebar/>
                <RiskRuleDecision/>              
            </div>
            
        </>
    )
}
export default RiskRuleDecisionPage