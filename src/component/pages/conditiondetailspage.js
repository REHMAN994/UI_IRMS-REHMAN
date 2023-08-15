import React from "react";

import Header from "../header";
import Sidebar from "../side-bar";
import ConditionDetails from "../ConditionCards";

const ConditionDetailsPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex', flexWrap: 'initial'}}>
                <Sidebar/>
                <ConditionDetails/>
                
            </div>
            
        </>
    )
}
export default ConditionDetailsPage