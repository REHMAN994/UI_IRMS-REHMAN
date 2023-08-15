import React from "react";

import Header from "../header";
import RiskRuleUpdate from "../RiskRuleUpdateCard/UpdateRiskRule";
import Sidebar from "../side-bar";


const RiskRuleUpdatePage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <RiskRuleUpdate/>                
            </div>
            
        </>
    )
}
export default RiskRuleUpdatePage