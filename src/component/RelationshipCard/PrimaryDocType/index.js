import React from "react";

const PrimaryDocType = () => {
    return(
        <div>
            <div className="row" >
                <div className="col-md-10 col-lg-10">
                <section id="card">
                    <div className="well">
                        <h1 style={{marginLeft:'1rem'}}>Select Primary Document Type</h1>

                        <div className="inner-card">
                            <form className="ml-auto" method="post">
                           
                                    <br />
                                    <div style={{display:'flex'}}>
                                    
                                    <div style={{marginLeft:'1rem'}} >
                                        <label>Primary Document Type </label>
                                        <br />
                                     
                                    <select className="dropdown_value"  style={{ width: '28rem', height: '31px', }}>
                                        <option value="">Select Document Type </option>
                                        <option value=""> 2</option>
                                        <option value=""> 3</option>
                                    </select>
                                        
                                 
                                      
                                    {/* <input type="text" placeholder="Agency Name" style={{width: '19.5rem'}} /> */}
                                    </div>
                                    <div style={{marginLeft:'4rem'}} >
                                        <label>Field Name </label>
                                        <br />
                                        <input type="text" placeholder="Field Name" style={{width: '28rem'}} />
                                    </div>
                                </div>
                              
                                <div style={{display:'flex'}}>
                                  
                                </div>
                                   
                            <div style={{marginLeft:'1rem'}} >
                                <label className="discription" style={{marginTop: '2rem',}}>Description </label>
                                <br />
                                <textarea id="w3review" name="w3review" rows="4" type="text" placeholder=" Description here.." style={{height: '5rem'}}></textarea>
                            </div>
                            </form>

                        </div>
                        <div className="button">
                            <button type="button" className="btn  btn-md btn-save" >Save</button>
                            <button type="button" className="btn btn-md  btn-back" >Cancle</button>

                        </div>

                    </div>
                </section>
                </div>
            </div>
        </div>            
    )
}
export default PrimaryDocType