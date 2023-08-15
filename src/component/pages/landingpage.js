import React from "react";

import Header from "../header";
import landingPageImg from '../../Images/landingPageImg.jpeg';
import Sidebar from "../side-bar";


const LandingPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: 'flex',flexWrap: 'initial'}}>
                <Sidebar/>
                <div className="row">
                    <div className="col-md-9 col-lg-9">
                        <section id="card">
                            <div className="">
                                
                                <img src={landingPageImg} alt="landingPag eImg" />

                            </div>
                        </section>


                    </div>
                </div>
                
            </div>
            
        </>
    )
}
export default LandingPage