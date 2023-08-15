import React from "react";
import CreateCondition from "../ConditionCards/CreateCondition";

import Header from "../header";
import Sidebar from "../side-bar";


const CreateConditionPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <CreateCondition/>
                
            </div>
            
        </>
    )
}
export default CreateConditionPage