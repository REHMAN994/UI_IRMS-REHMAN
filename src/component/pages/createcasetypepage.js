import React from "react";
import CreateCaseType from "../CaseTypeCard/CreateCaseType";


import Header from "../header";
import Sidebar from "../side-bar";


const CreateCaseTypePage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <CreateCaseType/>
                
            </div>
            
        </>
    )
}
export default CreateCaseTypePage