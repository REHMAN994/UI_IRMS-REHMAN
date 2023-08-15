import React from "react";
import ListRiskRuleDeleteCard from "../RiskRuleDeleteCard/ListRiskRuleDeleteCard";

import Header from "../header";
import Sidebar from "../side-bar";


const ListRiskRuleDelete = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <Sidebar/>
                <ListRiskRuleDeleteCard/>
                
            </div>
            
        </>
    )
}
export default ListRiskRuleDelete