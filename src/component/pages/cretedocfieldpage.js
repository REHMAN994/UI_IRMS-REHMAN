import React from "react";
import Header from "../header";
import Sidebar from "../side-bar";
import CreatDocField from "../CreateDocCard/CreateDocField";

const CreateDocumentFieldpage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <CreatDocField/>
            </div>
            
        </>
    )
}
export default CreateDocumentFieldpage