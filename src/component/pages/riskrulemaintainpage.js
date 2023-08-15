import React from "react";

import Header from "../header";
import RiskRuleMaintain from "../RiskRuleMaintainCard/MaintainRiskRule";

import Sidebar from "../side-bar";


const RiskRuleMaintainPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                 <RiskRuleMaintain/>              
            </div>
            
        </>
    )
}
export default RiskRuleMaintainPage