import React from "react";

import Header from "../header";
import Sidebar from "../side-bar";

import DeleteRuleType from "../RuleTypeCards/DeleteRuleType";

const RuleTypeDeletePage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <DeleteRuleType/>
                
            </div>
            
        </>
    )
}
export default RuleTypeDeletePage