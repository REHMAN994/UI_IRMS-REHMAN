import React from "react";

const DeleteStatus = () => {
    return(
        <div>
            <div class="row" >
                <div class="col-md-10 col-lg-10">
                    <section id="card">
                        <div class="well">
                            <h1> SELECT & DELETE STATUS Ref Table </h1>
                            <table class="table">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">STATUS_CODE </th>
                                        <th scope="col">PROCESS</th>
                                        <th scope="col">DESCRIPTION</th>
                                        <th scope="col">SELECT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>XYZ</td>
                                        <td>pending</td>
                                        <td>Case_Type Reference Detail </td>
                                        <td><input type="checkbox" /></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>ABC</td>
                                        <td>Complete</td>
                                        <td>Case Type Reference Detail</td>
                                        <td ><input type="checkbox" /></td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <input type="Submit" name="Submit" class="btn btn-md" value="Delete" style={{ backgroundColor: '#2d3f61', color: '#fff', float: 'right' }} />
                    </section>
                </div>
            </div>

        </div>        
    )
}
export default DeleteStatus