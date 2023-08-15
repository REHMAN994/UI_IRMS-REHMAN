import React from "react";

import Header from "../header";
import RiskRuleCreateKey from "../RiskRuleCreateCard/CreateRiskRuleKey";
import Sidebar from "../side-bar";


const RiskRuleCreateKeyPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <RiskRuleCreateKey/>            
            </div>
            
        </>
    )
}
export default RiskRuleCreateKeyPage