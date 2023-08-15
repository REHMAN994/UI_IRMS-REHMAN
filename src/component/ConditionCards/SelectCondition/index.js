import React from "react";

const SelectCondition = () => {
    return(
        <div>
            <div className="row" >
                <div className="col-md-10 col-lg-10">
                    <section id="card">
                        <div className="well">
                            <h1>Select CONDITION Reference Table   </h1>
                            <div>
                                <form className="ml-auto" method="post">
                                    <label> CONDITION </label>
                                    <select style={{ width: '162px' , height: '33px' }}>
                                        <option value="">Condition </option>
                                        <option value="">Condition 1</option>
                                        <option value="">Condition 2</option>
                                    </select>

                                    <label className="ml-2"> TYPE </label>
                                    <select style={{ width: '162px' , height: '33px' }}>
                                        <option value="">Type </option>
                                        <option value="">Type 1</option>
                                        <option value="">Type 2</option>
                                    </select>
                                    <label className="ml-2">DESCRIPTION</label>
                                    <input type="text" placeholder="Description" style={{ width: '217px', height: '33px' }} />

                                    <label className="ml-2">ON/OFF
                                        <div className="custom-control custom-switch">
                                            <input type="checkbox" className="custom-control-input" id="customSwitches" />
                                            <label className="custom-control-label" for="customSwitches"></label>
                                        </div>
                                    </label>
                                </form>
                            </div>
                        </div>
                        <input type="Submit" name="Submit" class="btn btn-md" value="Save" style={{ backgroundColor: '#2d3f61', color: '#fff', float: 'right' }} />
                    </section>
                </div>
            </div>
        </div>
    )
}
export default SelectCondition