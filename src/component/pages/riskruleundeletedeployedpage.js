import React from "react";

import Header from "../header";
import RiskRuleUndeleteDeployed from "../RiskRuleUndeleteCard/Undelete Deployed";
import Sidebar from "../side-bar";


const RiskRuleUndeleteDeployedPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <RiskRuleUndeleteDeployed/>             
            </div>
            
        </>
    )
}
export default RiskRuleUndeleteDeployedPage