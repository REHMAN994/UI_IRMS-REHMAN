import React from "react";


const CreateChan = () =>{
    return(
      <div className="contaner-fluid">
        <div className="row">
          <div className="col-md-10 col-lg-10">
            <section id="card" >
              <div className="well">
                <h1>Create Channels</h1>
                <table className="table">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Rul</th>
                      <th scope="col">Action</th>
                      <th scope="col">ON/OFF</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>
                        <div className="custom-control custom-switch">
                          <input type="checkbox" className="custom-control-input" id="customSwitches" />
                          <label className="custom-control-label" for="customSwitches"></label>
                        </div>
                      </td>

                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                      <td>
                        <div className="custom-control custom-switch">
                          <input type="checkbox" className="custom-control-input" id="customSwitches" />
                          <label className="custom-control-label" for="customSwitches"></label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                      <td>
                        <div className="custom-control custom-switch">
                          <input type="checkbox" className="custom-control-input" id="customSwitches" />
                          <label className="custom-control-label" for="customSwitches"></label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td>Ersse</td>
                      <td>the Dark</td>
                      <td>@snap</td>
                      <td>
                        <div className="custom-control custom-switch">
                          <input type="checkbox" className="custom-control-input" id="customSwitches" />
                          <label className="custom-control-label" for="customSwitches"></label>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

              </div>
              <input type="Submit" name="Submit" className="btn btn-md" value="Submit" style={{ backgroundColor: '#2d3f61', color: '#fff', float: 'right' }} />
            </section>
          </div>
        </div>

      </div>    
    )
}
export default CreateChan