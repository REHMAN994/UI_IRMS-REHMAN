import React from "react";
import DisplayRiskRuleDecision from "../DisplayRules/DisplayRiskRuleDecision";
import Header from "../header";
import Sidebar from "../side-bar";


const DisplayRiskRuleDecisionPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial', backgroundColor: '#f3f3f6b5'}}>
                <Sidebar />
                <DisplayRiskRuleDecision/>
                
            </div>
            
        </>
    )
}
export default DisplayRiskRuleDecisionPage