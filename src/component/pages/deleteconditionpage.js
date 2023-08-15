import React from "react";

import Header from "../header";
import Sidebar from "../side-bar";
import DeleteCondition from "../ConditionCards/DeleteCondition";

const DeleteConditionPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <DeleteCondition/>
                
            </div>
            
        </>
    )
}
export default DeleteConditionPage