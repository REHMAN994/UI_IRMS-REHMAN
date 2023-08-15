import React from "react";
import AlreadyDeployRiskRule from "../DeployRiskRuleCard/AlreadyDeployedRule";
import Header from "../header";
import Sidebar from "../side-bar";


const AlreadyDeployRiskRulePage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex', flexWrap: 'initial'}}>
                <Sidebar/>
                <AlreadyDeployRiskRule/>
                
            </div>
            
        </>
    )
}
export default AlreadyDeployRiskRulePage