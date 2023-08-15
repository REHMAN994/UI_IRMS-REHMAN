import React from "react";

import Header from "../header";
import RiskRuleDeleteLive from "../RiskRuleDeleteCard/DeleteLive";
import Sidebar from "../side-bar";


const RiskRuleDeleteLivePage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <RiskRuleDeleteLive/>                
            </div>
            
        </>
    )
}
export default RiskRuleDeleteLivePage