import React from "react";
import DeleteCaseType from "../CaseTypeCard/DeleteCaseType";

import Header from "../header";
import Sidebar from "../side-bar";


const CaseTypeDeletePage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <Sidebar/>
                <DeleteCaseType/>
                
            </div>
            
        </>
    )
}
export default CaseTypeDeletePage