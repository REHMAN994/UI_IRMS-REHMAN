import React from "react";

const DeleteRuleType = () => {
    return(
        <div>
            <div className="row" >
                <div className="col-md-10 col-lg-10">
                    <section id="card">
                        <div className="well" style={{ width: '74rem' }}>
                            <h1 style={{ marginTop: '1rem' }}> Delete Rule Type </h1>
                            <table className="table table-striped" style={{ marginTop: "1rem" }}>
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Rule Type</th>
                                        <th scope="col">Case_Type</th>
                                        <th scope="col">Decision</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td scope="row">1</td>
                                        <td>Admin</td>
                                        <td>X</td>
                                        <td>Rule Type Reference Details </td>
                                        <td>  ON  </td>
                                        <td><button type="button" className="btn btn-md" style={{ backgroundColor: '#FFEBEB', color: '#E61313', borderColor: '#E61313' }}>Delete</button></td>

                                    </tr>
                                    <tr>
                                        <td scope="row">2</td>
                                        <td>HR</td>
                                        <td>X</td>
                                        <td>Rule Type Reference Details</td>
                                        <td>OFF</td>
                                        <td><button type="button" className="btn btn-md" style={{ backgroundColor: '#FFEBEB', color: '#E61313', borderColor: '#E61313' }}>Delete</button></td>
                                    </tr>
                                    <tr>
                                        <td scope="row">3</td>
                                        <td>HR</td>
                                        <td>X</td>
                                        <td>Rule Type Reference Details</td>
                                        <td>OFF</td>
                                        <td><button type="button" className="btn btn-md" style={{ backgroundColor: '#FFEBEB', color: '#E61313', borderColor: '#E61313' }}>Delete</button></td>
                                    </tr>

                                </tbody>
                            </table>
                            <div className="button">
                                <button type="button" className="btn  btn-md btn-save">Save</button>
                                <button type="button" className="btn btn-md  btn-back">Back</button>

                            </div>
                        </div>
                    </section>
                </div>
            </div>

        </div>        
    )
}
export default DeleteRuleType