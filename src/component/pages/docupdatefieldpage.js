import React from "react";

import Header from "../header";
import UpdateDocFiled from "../MaintainDocTypeCard/UpdateDocField";
import Sidebar from "../side-bar";


const DocUpdateFieldPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <UpdateDocFiled/>
                
            </div>
            
        </>
    )
}
export default DocUpdateFieldPage