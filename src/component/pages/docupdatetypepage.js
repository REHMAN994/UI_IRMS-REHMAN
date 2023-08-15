import React from "react";

import Header from "../header";
import UpdateDocType from "../MaintainDocTypeCard/UpdateDocType";
import Sidebar from "../side-bar";


const DocUpdateTypePage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <UpdateDocType/>
                
            </div>
            
        </>
    )
}
export default DocUpdateTypePage