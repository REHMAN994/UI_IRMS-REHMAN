import React from "react";

import Header from "../header";
import MaintainDocFiled from "../MaintainDocTypeCard/MaintainDocField";
import Sidebar from "../side-bar";


const DocMaintainFieldPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <MaintainDocFiled/>
                
            </div>
            
        </>
    )
}
export default DocMaintainFieldPage