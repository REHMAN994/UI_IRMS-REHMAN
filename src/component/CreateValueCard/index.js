import React from "react";


const CreateValu = () =>{
    return(
        <div className="contaner-fluid">
            <div className="row">
                <div className="col-md-10 col-lg-10">
                    <section id="card" style={{width: '80%'}}>
                        <div className="well">
                            <h1>List Of Values</h1>
                            <div>
                                <form class="ml-auto" method="post">
                                    <label>List Of Value Name</label>
                                    <input type="text" placeholder="Value Name" style={{ width: '217px' }} />

                                    <label className="ml-2"> Type Of Value </label>
                                    <select placeholder="Document Type" style={{ width: '162px' }}>
                                        <option value="">Type of Value</option>
                                        <option value="">Value 1</option>
                                        <option value="">Value 2</option>
                                    </select>

                                    <label style={{ marginTop: '2%' }}> Availables Countries </label>
                                    <select style={{ width: '162px' }}>
                                        <option value="">Coustres</option>
                                        <option value="">Pakistan</option>
                                        <option value="">UAE</option>
                                    </select>
                                </form>
                            </div>
                        </div>
                        <input type="Submit" name="Submit" className="btn btn-md" value="Submit" style={{ backgroundColor: '#2d3f61', color: '#fff', float: 'right' }} />
                    </section>
                </div>
            </div>

        </div>    
    )
}
export default CreateValu