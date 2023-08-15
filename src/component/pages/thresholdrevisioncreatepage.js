import React from "react";

import Header from "../header";
import Sidebar from "../side-bar";
import ThresholdRevisionCreate from "../ThresholdRevionCard/CreateThresholdRevision";

const ThresholdRevisionCreatePage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar />
                <ThresholdRevisionCreate/>
                
            </div>
            
        </>
    )
}
export default ThresholdRevisionCreatePage