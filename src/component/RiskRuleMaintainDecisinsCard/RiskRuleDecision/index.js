import React from "react";

const RiskRuleMaintenanceDecision = () => {
    return(
        <div>
            <div className="row" >
                <div className="col-md-10 col-lg-10">
                <section id="card">
                        <div className="well">
                            <h1 style={{ marginTop: '0rem' }}>Maintain Risk Rule Decision </h1>
                            <div style={{ display: 'flex' }}>
                                <div >
                                    <div style={{ display: 'flex' }}>
                                        <label>Rule ID:</label>
                                        <p>Rule ID</p>
                                    </div>

                                    <div style={{ display: 'flex' }}>
                                        <label>Document Type:</label>
                                        <p>Document Type</p>
                                    </div>

                                    <div style={{ display: 'flex' }}>
                                        <label>Threat Group:</label>
                                        <p>Threat Group</p>
                                    </div>
                                </div>
                                <div style={{ marginLeft: '3rem' }}>
                                    <div style={{ display: 'flex' }}>
                                        <label>Rule Type:</label>
                                        <p>Rule Type</p>
                                    </div>

                                    <div style={{ display: 'flex' }}>
                                        <label>Rule Method:</label>
                                        <p>Rule Method</p>
                                    </div>

                                    <div style={{ display: 'flex' }}>
                                        <label>Case Type:</label>
                                        <p>Case Type</p>
                                    </div>
                                </div>
                                <div style={{ marginLeft: '3rem' }}>
                                    <div style={{ display: 'flex' }}>
                                        <label>Document Seq:</label>
                                        <p>350</p>
                                    </div>

                                    <div style={{ display: 'flex' }}>
                                        <label>Rule Name:</label>
                                        <p>Rule Name</p>
                                    </div>

                                    <div style={{ display: 'flex' }}>
                                        <label>Weighting %:</label>
                                        <p>50</p>
                                    </div>


                                </div>
                            </div>
                            
                            <div style={{display:'flex'}}>
                                <label>Number Conditions:</label>
                                <p>2</p>
                                <br/>
                                <label style={{marginLeft:'8rem' }}>Status:</label>
                                <p>Status</p>
                            </div>

                        </div>
                    </section>
                    <section id="card">
                        <div className="well">
                            <h1 style={{ marginTop: '0rem' }}> Conditions </h1>
                        
                            <div style={{ display: 'flex' }}>
                                <label>Field Name:</label>
                                <p>Condition Value</p>
                                <br />
                                <label className="ml-5">Field Name:</label>
                                <p>Condition Value</p>
                                <br />
                                <label className="ml-5">Field Name:</label>
                                <p>Condition Value</p>

                            </div>

                        </div>
                    </section>
                    <section id="card">
                        <div className="well" >
                            <h1 style={{ marginTop: '0rem' }}> Maintain Risk Rule Condition  </h1>
                            <table className="table table-striped" style={{ marginTop: "1rem" }}>
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Ref</th>
                                        <th scope="col">Score </th>
                                        <th scope="col">Value 1</th>
                                        <th scope="col">Value 2</th>
                                        <th scope="col">Value 3</th>
                                        <th scope="col">Value 4</th>
                                        <th scope="col">Value 5</th>
                                        <th scope="col">Value 6</th>
                                        <th scope="col" className="mw-100">Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Score</td>
                                        <td>value 1</td>
                                        <td>value 2</td>
                                        <td>value 3</td>
                                        <td>value 4</td>
                                        <td>value 5</td>
                                        <td>value 6</td>
                                        <td><button  data-toggle="modal" data-target="#myModal" style={{border:'none'}}><i className="fas fa-edit"></i></button> <i class="fa fa-trash ml-2" aria-hidden="true"></i></td>

                                    </tr>
                                </tbody>
                            </table>
                            <hr style={{ border: '1px solid #2d3f61' }} />
                            <form className="ml-auto" method="post">
                                <h1>Add New Entry </h1>
                                <div style={{ display: 'flex' }}>
                                    <div >
                                        <label className="">Score </label>
                                        <br />
                                        <input type="text" placeholder="Score" style={{ width: '5rem', height: '40px' }} />
                                    </div>
                                    <div style={{ marginLeft: '3rem' }}>    
                                        <label className="">Value 1</label>
                                        <br />
                                        <input type="text" placeholder="Value 1" style={{ width: '5rem', height: '40px' }} />
                                    </div>
                                    <div style={{ marginLeft: '3rem' }}>    
                                        <label className="">Value 2</label>
                                        <br />
                                        <input type="text" placeholder="Value 2" style={{ width: '5rem', height: '40px' }} />
                                    </div>
                                    <div style={{ marginLeft: '3rem' }}>
                                        <label className="">Value 3</label>
                                        <br />
                                        <input type="text" placeholder="Value 3" style={{ width: '5rem', height: '40px' }} />
                                    </div> 
                                    <div style={{ marginLeft: '3rem' }}>
                                        <label className="">Value 4</label>
                                        <br />
                                        <input type="text" placeholder="Value 4" style={{ width: '5rem', height: '40px' }} />
                                    </div>
                                    <div style={{ marginLeft: '3rem' }}>
                                        <label className="">Value 5</label>
                                        <br />
                                        <input type="text" placeholder="Value 5" style={{ width: '5rem', height: '40px' }} />
                                    </div>    
                                    <div style={{ marginLeft: '3rem' }}>
                                        <label className="">Value 6</label>
                                        <br />
                                        <input type="text" placeholder="Value 6" style={{ width: '5rem', height: '40px' }} />
                                    </div>    
                                    <div style={{  marginTop: '0.5rem' }}>
                                        <label className=""></label>
                                        <br />
                                        <button type="button" className="btn btn-md" style={{
                                            backgroundColor: '#ECF7F2',
                                            color: '#03995D',
                                            borderColor: '#03995D',
                                            fontWeight: '600',
                                            marginLeft: '1rem',
                                            width: '7rem'
                                        }}> <i class="fa fa-plus mr-1" aria-hidden="true"></i> Add Field </button>
                                    </div>   

                                    
                                </div>
                            </form>
                            <div className="button">
                                <button type="button" className="btn  btn-md btn-save">Exit Screen</button>
                                <button type="button" className="btn btn-md  btn-back">Cancel</button>

                            </div>
                        </div>
                    </section>        
                </div>
            </div>    
        </div>
    )
}
export default RiskRuleMaintenanceDecision        