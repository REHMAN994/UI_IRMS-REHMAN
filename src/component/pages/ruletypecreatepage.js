import React from "react";


import Header from "../header";
import CreateRuleType from "../RuleTypeCards/CreateRuleType";
import Sidebar from "../side-bar";


const RuleTypeCreatePage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <CreateRuleType/>
                
            </div>
            
        </>
    )
}
export default RuleTypeCreatePage