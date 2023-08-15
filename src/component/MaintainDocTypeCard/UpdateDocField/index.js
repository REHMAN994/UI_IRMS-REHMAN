import React from "react";

const UpdateDocFiled = () =>{
    return (
        <div>
            <div className="row" >
                <div className="col-md-10 col-lg-10">
                    <section id="card">
                        <div className="well">

                            <h1>UPDATE DOCUMENT FIELD </h1>
                            <div>
                                <form className="ml-auto" method="post">
                                    <label>Document Type</label>
                                    <input className="ml-2" type="text" style={{ width: '150px' }} />
                                    <label className="ml-5">Process Type</label>
                                    <input className="ml-2" type="text" style={{ width: '60px' }} />
                                    <br />
                                    <label style={{ marginTop: '30px' }}>Agency Code</label>
                                    <input className="ml-2" type="text" style={{ width: '50px' }} />
                                    <input className="ml-2" type="text" style={{ width: '70px' }} />

                                    <label className="ml-3">Transport Mode</label>
                                    <input className="ml-2" type="text" style={{ width: '50px' }} />

                                    <label className="ml-3">Movement Type</label>
                                    <input className="ml-2" type="text" style={{ width: '50px' }} />
                                    <br />
                                    <label className="ml-3" style={{ marginTop: '35px' }}>Description</label>
                                    <input className="ml-2" type="text" style={{ width: '382px' }} />
                                </form>
                            </div>

                            <table className="table" style={{ marginTop: '20px' }}>

                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Field Name</th>
                                        <th scope="col">Field Type </th>
                                        <th scope="col">Field Size</th>
                                        <th scope="col">System Ref </th>

                                    </tr>
                                </thead>
                            </table>
                            <hr style={{ border: '1px solid #2d3f61' }} />
                            <form method="post">
                                <table className="table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <td><input type="text" style={{ width: '90px', float: 'left' }} /></td>
                                            <td><input type="text" style={{ width: '50px', float: 'left' }} /></td>
                                            <td><input type="text" style={{ width: '50px' }} /></td>
                                            <td><input type="text" style={{ width: '60px' }} /></td>
                                        </tr>
                                    </thead>
                                </table>
                            </form>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                <h4>Delete Entry </h4>
                                <input className="ml-2" type="text" style={{ width: '50px' }} />
                                    <h4 className="ml-3">Confirm Update </h4>
                                <input className="ml-2" type="text" style={{ width: '50px' }} />
                            </div>
                        </div>
                        <input type="Submit" name="Submit" className="btn btn-md" value="Cancel" style={{ backgroundColor: '#d90f23', color: '#fff', float: 'left' }} />
                        <input type="Submit" name="Submit" className="btn btn-md" value="Submit" style={{ backgroundColor: '#2d3f61', color: '#fff', float: 'right' }} />
                    </section>
                </div>
            </div>
        </div>
    )
}
export default UpdateDocFiled
