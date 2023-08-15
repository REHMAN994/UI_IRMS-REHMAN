import React from "react";

const SelectStatus = () => {
    return(
        <div>
            <div class="row" >
                <div class="col-md-10 col-lg-10">
                    <section id="card">
                        <div class="well">
                            <h1>Select STATUS Reference Table </h1>
                            <div>
                                <form class="ml-auto" method="post">
                                    <label> STATUS_CODE </label>
                                    <select style={{ width: '155px' ,height: '33px' }}>
                                        <option value="">Status_Code </option>
                                        <option value="">Code 1</option>
                                        <option value="">Code 2</option>
                                    </select>

                                    <label class="ml-2"> PROCESS </label>
                                    <select style={{ width: '155px' ,height: '33px' }}>
                                        <option value="">Process </option>
                                        <option value="">Process 1</option>
                                        <option value="">Process 2</option>
                                    </select>

                                    <label class="ml-2"> SEQ_NO </label>
                                    <select style={{ width: '140px' ,height: '33px' }}>
                                        <option value="">Seq_No </option>
                                        <option value="">Seq 1</option>
                                        <option value="">seq 2</option>
                                    </select>

                                    <label class="ml-2">DESCRIPTION</label>
                                    <input type="text" placeholder="Description" style={{ width: '217px' }} />

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
export default SelectStatus