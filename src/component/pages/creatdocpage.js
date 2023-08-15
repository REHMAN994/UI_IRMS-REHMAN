import React from "react";
import CreatDoc from "../CreateDocCard";
import Header from "../header";
import Sidebar from "../side-bar";


const CreateDocument = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex', flexWrap: 'initial'}}>
                <Sidebar/>
                <CreatDoc/>
            </div>
            
        </>
    )
}
export default CreateDocument