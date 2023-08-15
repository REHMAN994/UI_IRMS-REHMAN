import React from "react";

const RiskRulepUpdateCondition = () => {
    return(
        <div>
            <div className="row" >
                <div className="col-md-10 col-lg-10">
                    <section id="card">
                        <div className="well">

                            <h1>UPDATE RISK RULE CONDITION </h1>
                            <div>
                                <form className="ml-auto" method="post">
                                    <label> Rule ID</label>
                                    <input className="ml-2" type="text" style={{ width: '60px' }} />
                                    <label className="ml-3">Document Type</label>
                                    <input className="ml-2" type="text" style={{ width: '100px' }} />

                                    <label className="ml-3">Threat Group</label>
                                    <input className="ml-2" type="text" style={{ width: '100px' }} />
                                    <br />
                                    <label style={{marginTop: '10px'}}>Rule Type</label>
                                    <input className="ml-2" type="text" style={{ width: '50px' }} />
                                    <label className="ml-3">Rule Method</label>
                                    <input className="ml-2" type="text" style={{ width: '50px' }} />
                                    <label className="ml-3">Case Type</label>
                                    <input className="ml-2" type="text" style={{ width: '100px' }} />
                                    <label className="ml-3">Document Seq</label>
                                    <input className="ml-2" type="text" style={{ width: '50px' }} />
                                    <br />
                                    <label style={{ marginTop: '10px' }}>Rule Name</label>
                                    <input className="ml-2" type="text" style={{ width: '150px' }} />
                                    <label className="ml-3">Weighting %</label>
                                    <input className="ml-2" type="text" style={{ width: '50px' }} />
                                    <label className="ml-3">Number Conditions</label>
                                    <input className="ml-2" type="text" style={{ width: '50px' }} />
                                    <label className="ml-3">Status</label>
                                    <input className="ml-2" type="text" style={{ width: '50px' }} />
                                </form>
                            </div>

                            <hr style={{ border: '1px solid #2d3f61' }} />
                            <div style={{ display: 'flex'  }}>
                                <label className="ml-3" style={{marginTop: '5px'}}>Seq No</label>
                                <input className="ml-2" type="text" style={{ width: '50px' }} />

                                <label className="ml-3"style={{marginTop: '5px'}}> Field Name </label>
                                <select style={{width: '100px',height: '2rem',  marginLeft: '1rem'}}>
                                    <option value="">Field </option>
                                    <option value=""> 1</option>
                                    <option value=""> 2</option>
                                </select>
                                <label className="ml-3" style={{marginTop: '5px'}}> Condition Value </label>
                                <select style={{width: '100px', height: '2rem', marginLeft: '1rem'}}>
                                    <option value="">Value </option>
                                    <option value=""> 1</option>
                                    <option value=""> 2</option>
                                </select>
                                <br />
                                <h4 className="ml-3" style={{marginTop: '5px'}}>Delete Entry Y/N</h4>
                                <input className="ml-2" type="text" style={{ width: '50px', height: '2rem' }} />

                            </div>
                            
                        </div>

                        <input type="Submit" name="Submit" className="btn btn-md" value="Cancel" style={{backgroundColor: '#d90f23', color: '#fff', float: 'left'}} />
                        <input type="Submit" name="Submit" className="btn btn-md center ml-3" value="CONFIRM UPDATE" style={{backgroundColor:'#2d3f61', color: '#fff', marginTop: '12px' , float: 'right' }} />
                    </section>
                </div>
            </div>
        </div>            
    )
}
export default RiskRulepUpdateCondition