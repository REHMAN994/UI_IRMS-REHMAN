import React from "react";

const SelectCaseType = () => {
    return(
        <div>
            <div class="row" >
                <div class="col-md-10 col-lg-10">
                    <section id="card">
                        <div class="well">
                            <h1>Select CASE TYPE Reference Table   </h1>
                            <div>
                                <form class="ml-auto" method="post">
                                    <label> CASE_TYPE </label>
                                    <select style={{ width: '162px',height: '33px' }}>
                                        <option value="">Case_Type </option>
                                        <option value="">Type 1</option>
                                        <option value="">Type 2</option>
                                    </select>

                                    <label class="ml-2"> ACTION </label>
                                    <select style={{ width: '162px' ,height: '33px' }}>
                                        <option value="">Action </option>
                                        <option value="">Action 1</option>
                                        <option value="">Action 2</option>
                                    </select>

                                    <label class="ml-2"> ACTION DETAILS</label>
                                    <select style={{ width: '200px' ,height: '33px' }}>
                                        <option value="">Action-Details </option>
                                        <option value="">Detail 1</option>
                                        <option value="">Detail 2</option>
                                    </select>

                                    <label class="ml-2">DESCRIPTION</label>
                                    <input type="text" placeholder="Description" style={{ width: '217px' ,height: '33px' }} />

                                    <label class="ml-2">ON/OFF
                                        <div class="custom-control custom-switch">
                                            <input type="checkbox" class="custom-control-input" id="customSwitches" />
                                            <label class="custom-control-label" for="customSwitches"></label>
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
export default SelectCaseType