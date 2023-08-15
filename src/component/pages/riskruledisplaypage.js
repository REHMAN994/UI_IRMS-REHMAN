import React from "react";

import Header from "../header";
import RiskRuleDisplay from "../RiskRuleDisplay/DisplayRisk";
import Sidebar from "../side-bar";


const RiskRuleDisplayPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex'}}>
                <Sidebar/>
                <RiskRuleDisplay/>              
            </div>
            
        </>
    )
}
export default RiskRuleDisplayPage