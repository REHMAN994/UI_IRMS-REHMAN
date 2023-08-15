import React from "react";
import DisplayRiskRule from "../DisplayRules/DisplayRiskRule";
import Header from "../header";
import Sidebar from "../side-bar";


const DisplayRiskRulePage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial', backgroundColor: '#f3f3f6b5'}}>
                <Sidebar />
                <DisplayRiskRule/>
                
            </div>
            
        </>
    )
}
export default DisplayRiskRulePage