import React from "react";
import CreateValu from "../CreateValueCard";
import Header from "../header";
import Sidebar from "../side-bar";


const CreateValue = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <Sidebar/>
                <CreateValu/>
                
            </div>
            
        </>
    )
}
export default CreateValue