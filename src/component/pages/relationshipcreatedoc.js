import React from "react";

import Header from "../header";
import RelationshipCreateDoc from "../RelationshipCard/RelationshipCreateDoc";
import Sidebar from "../side-bar";


const RelationshipCreateDocPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <RelationshipCreateDoc/>
                
            </div>
            
        </>
    )
}
export default RelationshipCreateDocPage