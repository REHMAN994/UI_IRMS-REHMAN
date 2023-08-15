import React from "react";

import Header from "../header";
import RiskRuleDisplayDetails from "../RiskRuleDisplay/DisplayRiskDetails";
import Sidebar from "../side-bar";


const RiskRuleDisplayDetailsPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <RiskRuleDisplayDetails/>              
            </div>
            
        </>
    )
}
export default RiskRuleDisplayDetailsPage