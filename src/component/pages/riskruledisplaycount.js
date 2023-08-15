import React from "react";

import Header from "../header";
import RiskRuleDisplayCount from "../RiskRuleDisplay/DisplayRiskCount";
import Sidebar from "../side-bar";


const RiskRuleDisplayCountPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <RiskRuleDisplayCount/>              
            </div>
            
        </>
    )
}
export default RiskRuleDisplayCountPage