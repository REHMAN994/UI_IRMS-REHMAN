import React from "react";

import Header from "../header";
import Sidebar from "../side-bar";
import ThreatRuleDetails from "../ThreadCards";

const ThreatRuleUpdateDetails = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <ThreatRuleDetails/>
                
            </div>
            
        </>
    )
}
export default ThreatRuleUpdateDetails