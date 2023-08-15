import React from "react";

import Header from "../header";
import ModifyThresholdRevision from "../ModifyThresholdCard/ModifyRevision";
import Sidebar from "../side-bar";


const ModifyThresholdRevisionPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar />
                <ModifyThresholdRevision/>
                
            </div>
            
        </>
    )
}
export default ModifyThresholdRevisionPage