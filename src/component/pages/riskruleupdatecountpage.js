import React from "react";

import Header from "../header";

import RiskRuleUpdateCount from "../RiskRuleUpdateCard/UpadateRiskRuleCount";
import Sidebar from "../side-bar";


const RiskRuleUpdateCountPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <RiskRuleUpdateCount/>                
            </div>
            
        </>
    )
}
export default RiskRuleUpdateCountPage