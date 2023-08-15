import React from "react";

import Header from "../header";
import RiskRuleSelect from "../RiskRuleSearchCard/RiskRuleSelect";

import Sidebar from "../side-bar";


const RiskRuleSelectPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex'}}>
                <Sidebar/>
                <RiskRuleSelect/>              
            </div>
            
        </>
    )
}
export default RiskRuleSelectPage