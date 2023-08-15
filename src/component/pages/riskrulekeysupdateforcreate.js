import React from "react";

import Header from "../header";
import RiskRuleUpdateforCreate from "../UpdateScreenForCreate/RiskRuleForUpdate";
import Sidebar from "../side-bar";


const RiskRuleUpdateforCreatePage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                 <RiskRuleUpdateforCreate/>          
            </div>
            
        </>
    )
}
export default RiskRuleUpdateforCreatePage