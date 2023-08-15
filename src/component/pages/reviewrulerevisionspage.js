import React from "react";

import Header from "../header";
import ReviewRuleRevisions from "../ReviewRiskCard";
import Sidebar from "../side-bar";

const ReviewRuleRevisionsPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar />
                <ReviewRuleRevisions/>
                
            </div>
            
        </>
    )
}
export default ReviewRuleRevisionsPage