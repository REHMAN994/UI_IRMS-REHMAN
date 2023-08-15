import React from "react";
import CreateThreatRule from "../ThreadCards/CreateThreatRule";
import Header from "../header";
import Sidebar from "../side-bar";


const CreateThreatRulePage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <CreateThreatRule/>
                
            </div>
            
        </>
    )
}
export default CreateThreatRulePage