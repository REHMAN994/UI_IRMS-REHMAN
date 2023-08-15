import React from "react";

import Header from "../header";
import RiskRuleCount from "../UpdateScreenForCreate/RiskRuleForCount";
import Sidebar from "../side-bar";


const RiskRuleCountPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex'}}>
                <Sidebar/>
                <RiskRuleCount/>              
            </div>
            
        </>
    )
}
export default RiskRuleCountPage