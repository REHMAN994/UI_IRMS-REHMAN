import React from "react";

import Header from "../header";
import RelationshipUpdateeDoc from "../RelationshipUpdateCard/RelationshipUptadeDoc";
import Sidebar from "../side-bar";


const RelationshipUpdateDocPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                
                <RelationshipUpdateeDoc/>                
            </div>
            
        </>
    )
}
export default RelationshipUpdateDocPage