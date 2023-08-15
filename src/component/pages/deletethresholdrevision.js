import React from "react";
import DeleteThresholdRevision from "../DeleteThresholdCard/DeleteThresholdRevision";

import Header from "../header";
import Sidebar from "../side-bar";

const DeleteThresholdRevisionPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex', flexWrap: 'initial'}}>
                <Sidebar />
                <DeleteThresholdRevision/>
                
            </div>
            
        </>
    )
}
export default DeleteThresholdRevisionPage