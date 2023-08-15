import React from "react";

import Header from "../header";
import RiskRuleSearch from "../RiskRuleSearchCard/RiskRuleSearch";
import Sidebar from "../side-bar";


const RiskRuleSearchPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <RiskRuleSearch/>              
            </div>
            
        </>
    )
}
export default RiskRuleSearchPage