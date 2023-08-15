import React from "react";
import DeployThresholdRevision from "../DeployThresholdCard/DeployThresholdRevision";

import Header from "../header";
import Sidebar from "../side-bar";


const DeployThresholdRevisionPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex', flexWrap: 'initial'}}>
                <Sidebar />
                <DeployThresholdRevision/>
                
            </div>
            
        </>
    )
}
export default DeployThresholdRevisionPage