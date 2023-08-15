import React from "react";

import Header from "../header";
import Sidebar from "../side-bar";
import SelectThreatRule from "../ThreadCards/SelectThreatRule"

const ThreatRuleSelectPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <SelectThreatRule/>
                
            </div>
            
        </>
    )
}
export default ThreatRuleSelectPage