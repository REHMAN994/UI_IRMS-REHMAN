import React from "react";

import Header from "../header";
import ReviewRuleRevisions from "../ReviewRiskCard";
import ReviewThresholdRevision from "../ReviewThresholdCard";
import Sidebar from "../side-bar";

const ReviewThresholdRevisionPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar />
                <ReviewThresholdRevision/>
                
            </div>
            
        </>
    )
}
export default ReviewThresholdRevisionPage