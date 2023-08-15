import React from "react";

import Header from "../header";
import RiskRuleDeleteUndeployed from "../RiskRuleDeleteCard/DeleteUndeployed";
import Sidebar from "../side-bar";


const RiskRuleDeleteUndeployedPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <RiskRuleDeleteUndeployed/>                
            </div>
            
        </>
    )
}
export default RiskRuleDeleteUndeployedPage