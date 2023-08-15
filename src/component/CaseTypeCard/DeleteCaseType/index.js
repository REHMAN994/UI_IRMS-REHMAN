import React from "react";

const DeleteCaseType = () => {
    return(
        <div>
            <div class="row" >
                <div class="col-md-10 col-lg-10">
                <section id="card">
                    <div className="well" style={{ width: '74rem' }}>
                        <h1 style={{ marginTop: '1rem' }}> Delete Case Type </h1>
                        <table className="table table-striped" style={{ marginTop: "1rem" }}>
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Case Type</th>
                                    <th scope="col">Action</th>
                                    <th scope="col">Action Details</th>
                                    <th scope="col">Decision</th>
                                    <th scope="col">Delete</th>
                                   
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td scope="row">1</td>
                                    <td>Admin</td>
                                    <td>OFF </td>
                                    <td>xxxx </td>
                                    <td>Details</td>
                                    <td><button type="button" className="btn btn-md" style={{ backgroundColor: '#FFEBEB', color: '#E61313', borderColor: '#E61313' }}>Delete</button></td>

                                </tr>
                                <tr>
                                <td scope="row">2</td>
                                    <td>Sales</td>
                                    <td>ON </td>
                                    <td>xxxx </td>
                                    <td>Details</td>
                                    <td><button type="button" className="btn btn-md" style={{ backgroundColor: '#FFEBEB', color: '#E61313', borderColor: '#E61313' }}>Delete</button></td>
                                </tr>
                                <tr>
                                <td scope="row">1</td>
                                    <td>HR</td>
                                    <td>OFF </td>
                                    <td>xxxx </td>
                                    <td>Details</td>
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
export default DeleteCaseType