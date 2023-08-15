import React from "react";

import Header from "../header";
import Sidebar from "../side-bar";
import SelectCondition from "../ConditionCards/SelectCondition"

const SelectConditionPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <SelectCondition/>
                
            </div>
            
        </>
    )
}
export default SelectConditionPage