import React from "react";

const AgencySeletc = () =>{
    return(
        <div>
            <div className="row" >
                <div className="col-md-10 col-lg-10">
                    <section id="card">
                        <div className="well">
                            <h1>Select Agency Reference Table</h1>
                            <div>
                                <form className="ml-auto" method="post">
                                    <label> AGENCY CODE </label>
                                    <select className="ml-2" style={{width: '120px'}}>
                                        <option value="">Code </option>
                                        <option value=""> 1</option>
                                        <option value=""> 2</option>
                                    </select>
                                    <label className="ml-4"> UN/CEFACT </label>
                                    <select className="ml-2" style={{width:'150px'}}>
                                        <option value="">Code </option>
                                        <option value=""> 1</option>
                                        <option value=""> 2</option>
                                    </select>
                                    <br />
                                    <label> AGENCY NAME </label>
                                    <select  className="ml-2" style={{width: '250px'}}>
                                        <option value="">Name </option>
                                        <option value=""> 1</option>
                                        <option value=""> 2</option>
                                    </select>

                                    <label className="ml-4">ON/OFF
                                        <div className="custom-control custom-switch">
                                            <input type="checkbox" className="custom-control-input" id="customSwitches" />
                                            <label className="custom-control-label" for="customSwitches"></label>
                                        </div>
                                    </label>
                                </form>
                            </div>
                        </div>
                        <input type="Submit" name="Submit" className="btn btn-md" value="Save" style={{backgroundColor: '#2d3f61', color: '#fff', float: 'right'}} />
                    </section>
                </div>
            </div>
        </div>

    )
}
export default AgencySeletc