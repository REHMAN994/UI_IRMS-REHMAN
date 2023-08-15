import React from "react";

import Header from "../header";
import RiskRuleReview from "../RiskRuleSearchCard/RiskRuleReview";
import Sidebar from "../side-bar";


const RiskRuleReviewPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex'}}>
                <Sidebar/>
                <RiskRuleReview/>              
            </div>
            
        </>
    )
}
export default RiskRuleReviewPage