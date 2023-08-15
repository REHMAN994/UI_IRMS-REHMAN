import React from "react";
import SelectCaseType from "../CaseTypeCard/SelectCaseType";

import Header from "../header";
import Sidebar from "../side-bar";



const CaseTypeSelectPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <Sidebar/>
                <SelectCaseType/>
                
            </div>
            
        </>
    )
}
export default CaseTypeSelectPage