import React from "react";
import ListofUndeleteRiskRule from "../RiskRuleUndeleteCard/ListofUndeleteRiskRule";

import Header from "../header";
import Sidebar from "../side-bar";


const ListUndeleteRiskRule = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <Sidebar/>
                <ListofUndeleteRiskRule/>
                
            </div>
            
        </>
    )
}
export default ListUndeleteRiskRule