import React from "react";

const ReviewThresholdRevision = () =>{
    return(
        <div>
            <div className="row" >
                <div className="col-md-10 col-lg-10">
                    <section id="card">
                        <div className="well">
                            <h1 style={{ marginTop: '0rem' }}>Review Threshold Revision </h1>
                            <div style={{ display: 'flex' }}>
                                <label>Document Type:</label>
                                <p>Document Type:</p>
                                <br />
                            </div>
                        </div>
                    </section>

                    <section id="card">
                        <div className="well" >
                            <h1 style={{ marginTop: '0rem' }}> Review Threshold Revision  </h1>
                            <table className="table table-striped" style={{ marginTop: "1rem" }}>
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Thershold ID</th>
                                        <th scope="col">Rev No.</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Dated</th>
                                        <th scope="col">Status</th>



                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Thershold ID</td>
                                        <td>Rev No</td>
                                        <td>Description</td>
                                        <td>dd/mm/yyyy</td>
                                        <td>Status</td>



                                    </tr>
                                </tbody>
                            </table>

                            <div className="button">
                                <button type="button" className="btn  btn-md btn-save" style={{ marginLeft: "1rem" }}>Next</button>
                                <button type="button" className="btn  btn-md btn-save" style={{ marginLeft: "1rem" }}>Previous</button>
                                <button type="button" className="btn btn-md  btn-back" style={{ width: '', marginRight: '0rem' }}>Exit</button>

                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
export default ReviewThresholdRevision