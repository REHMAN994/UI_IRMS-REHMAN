import React from "react";

import Header from "../header";
import RiskRuleCreateCount from "../RiskRuleCreateCard/CreateRiskRuleCount";
import Sidebar from "../side-bar";


const RiskRuleCreateCountPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                   <RiskRuleCreateCount/>         
            </div>
            
        </>
    )
}
export default RiskRuleCreateCountPage