import axios from "axios";
import React, { useState, useEffect } from "react";

const ReviewRuleRevisions = () => {
  const [selectmasterRule, setSelectMasterRule] = useState([]);
  const [masterRule, setMasterRule] = useState([]);
  const [relationRule,setRelationRule] = useState([]);

  useEffect(() => {
    const getmasterRule = async () => {
      await axios
        .get(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE +`/MasterRule/GetMasterRuleJust`)
        .then((res) => setSelectMasterRule(res.data))
        .then((err) => console.log(err));
    };
    getmasterRule();
  }, []);



  const handlechange = (e) => {
    const id = e.target.value;
   
    // setRuleId(id);
    axios
      .get(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE +`/RiskRule/GetAllWithRelationByRuleId?id=${id}`)
      .then((res) => setRelationRule(res.data))
      .then((err) => console.log(err));
  
  axios
  .get(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE +`/MasterRule/GetAllById?id=${id}`)
  .then((res) => setMasterRule(res.data))
  .then((err) => console.log(err));
};


  console.log(relationRule);
  return (
    <div>
      <div className="row">
        <div className="col-md-10 col-lg-10">
          <section id="card">
            <div className="well">
              <h1>Review Rule Revision </h1>
              <div>
                <form className="ml-auto">
                  <div style={{ display: "flex" }}>
                    <div>
                      <div style={{ display: "flex" }}>
                        <label>Rule Name:</label>
                        <select className="ml-2 dropdown_value" onChange={handlechange}>
                          <option>Select Rule ID</option>
                          {selectmasterRule.map((item, index) => (
                            <option key={index} value={item.ruleId}>
                              {item.ruleName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Rule Type: </label>
                        <p>{masterRule.ruleTypeRef} </p>
                      </div>

                      <div style={{ display: "flex" }}>
                        <label>Description:</label>
                        <p>{masterRule.description}</p>
                        <br />
                      </div>
                    </div>
                    <div style={{ marginLeft:'3rem'}}>
                      <div style={{ display: "flex" }}>
                      <label>Threat Group:</label>
                        <p>{masterRule.threatGroup}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Rule Method:</label>
                        <p>{masterRule.ruleMethod}</p>
                      </div>
                    </div>
                    
                  </div>
                </form>
              </div>
            </div>

            <div className="well" style={{ width: "64rem" }}>
              <h1> Review Rule Revision </h1>
              <table
                className="table table-striped"
                style={{ marginTop: "1rem" }}
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Risk ID</th>
                    <th scope="col">Run No.</th>
                    <th scope="col">Change Description</th>
                    <th scope="col">Date</th>
                    <th scope="col" className="mw-100">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                    {
                        relationRule.map((item,index)=>(
                            <tr>
                            <td>{item.id}</td>
                            <td>Run No.</td>
                            <td>{item.changeDescription}</td>
                            <td>{item.createdDate}</td>
                            <td>{item.statusCode}</td>
                            {/* <td><button data-toggle="modal" data-target="#myModal" style={{ border: 'none' }}><i className="fas fa-edit"></i></button> <i class="fa fa-trash ml-2" aria-hidden="true"></i></td> */}
                          </tr>
                        ))
                    }
                 
               
                </tbody>
              </table>

              <div className="button">
                <button type="button" className="btn  btn-md btn-save">
                  Next
                </button>

                <button
                  type="button"
                  style={{ marginRight: "0.5rem" }}
                  className="btn  btn-md btn-save"
                >
                  Previous
                </button>
                <button
                  type="button"
                  style={{ marginRight: "0.5rem" }}
                  className="btn btn-md  btn-back"
                >
                  Exit
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default ReviewRuleRevisions;
