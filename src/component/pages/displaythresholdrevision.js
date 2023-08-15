import React from "react";
import DisplayThresholdRevision from "../DisplayThresholdCard/DisplayThresholdRevision";

import Header from "../header";
import Sidebar from "../side-bar";


const DisplayThresholdRevisionPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar />
                <DisplayThresholdRevision/>
                
            </div>
            
        </>
    )
}
export default DisplayThresholdRevisionPage