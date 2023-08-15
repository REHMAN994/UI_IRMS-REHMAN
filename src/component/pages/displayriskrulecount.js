import React from "react";
import DisplayRiskRuleCount from "../DisplayRules/DisplayRiskRuleCount";
import Header from "../header";
import Sidebar from "../side-bar";


const DisplayRiskRuleCountPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial', backgroundColor: '#f3f3f6b5'}}>
                <Sidebar />
                <DisplayRiskRuleCount/>
                
            </div>
            
        </>
    )
}
export default DisplayRiskRuleCountPage