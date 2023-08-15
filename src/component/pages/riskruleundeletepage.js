import React from "react";

import Header from "../header";
import RiskRuleUndelete from "../RiskRuleUndeleteCard/Undelete";
import Sidebar from "../side-bar";


const RiskRuleUndeletePage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <RiskRuleUndelete/>            
            </div>
            
        </>
    )
}
export default RiskRuleUndeletePage