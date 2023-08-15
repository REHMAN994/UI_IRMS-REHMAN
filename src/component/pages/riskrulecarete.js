import React from "react";

import Header from "../header";
import RiskRuleCreate from "../RiskRuleCreateCard/CreateRiskRule";
import Sidebar from "../side-bar";


const RiskRuleCreatePage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <RiskRuleCreate/>        
            </div>
            
        </>
    )
}
export default RiskRuleCreatePage