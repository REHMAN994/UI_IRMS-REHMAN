import React, { useState, useEffect } from "react";
import axios from "axios";

const RiskRuleUndeleteDeployed = () => {
  const [selectmasterRule, setSelectMasterRule] = useState([]);
  const [masterRule, setMasterRule] = useState([]);
  const [ruleId, setRuleId] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    const getmasterRule = async () => {
      await axios
        .get(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE +`/RiskRule/GetAll`)
        .then((res) => setSelectMasterRule(res.data))
        .then((err) => console.log(err));
    };
    getmasterRule();
  }, []);
  console.log(masterRule)

  const handlechange = (e) => {
    const id = e.target.value;
    
    axios
      .get(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE +`/RiskRule/GetAllWithRelation?id=${id}`)
      .then((res) => {
          setMasterRule(res.data);
          setRuleId(res.data.ruleId);
        })
      .then((err) => console.log(err));
  };
  const handleConfirmed = (e) => {
    const value = e.target.value;
    if (value == "Y") {
      axios
        .put(
          process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE +`/MasterRule/UpdateForUnDeleteRiskRule?id=${ruleId}`
        )
        .then((res) => console.log(res))
        .then((err) => console.log(err));
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-10 col-lg-10">
          <section id="card">
            <div className="well">
              <h1>Undelete Risk Rule </h1>
              <div>
                <form className="ml-auto" method="post">
                  <div style={{ display: "flex" }}>
                    <div>
                      <div style={{ display: "flex" }}>
                        <label>Rule ID:</label>
                        <select className="ml-2 dropdown_value" onChange={handlechange}>
                          <option>Select Rule ID</option>
                          {selectmasterRule.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item.ruleName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Document Type:</label>
                        <p>{masterRule.documentType}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Threat Group:</label>
                        <p>{masterRule.threatGroup}</p>
                      </div>
                    </div>
                    <div style={{ marginLeft: '3rem' }}>
                      <div style={{ display: "flex" }}>
                        <label>Run Number:</label>
                        <p>Run Number</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Rule Type:</label>
                        <p>{masterRule.ruleTypeRef}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Rule Method:</label>
                        <p>{masterRule.ruleMethod}</p>
                      </div>
                    </div>
                    <div style={{ marginLeft: '3rem' }}>
                      <div style={{ display: "flex" }}>
                        <label>Case Type:</label>
                        <p>{masterRule.caseTypeRef}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Document Seq:</label>
                        <p>{masterRule.docSeq}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Rule Name:</label>
                        <p>{masterRule.ruleName}</p>
                      </div>
                    </div>
                    <div style={{ marginLeft: '3rem' }}>
                      <div style={{ display: "flex" }}>
                        <label>Weighting%:</label>
                        <p>{masterRule.weighting}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Number Conditions:</label>
                        <p>{masterRule.numberConditions}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Status:</label>
                        <p>{masterRule.statusProcess}</p>
                      </div>
                    </div>
                    
                  </div>
                  
                  <div style={{ display: "flex" }}>
                    <label>Description:</label>
                    <p>{masterRule.description}</p>
                  </div>

                </form>
              </div>
            </div>
          </section>
          <section id="card">
            <div className="well">
              <h1>Undelete Risk Rule </h1>
              <div>
                <form className="ml-auto" method="post">
                  <label className="discription">Reason for Deletion </label>
                  <br />
                  <textarea
                    onchange={(e) => setReason(e.target.value)}
                    id="w3review"
                    name="w3review"
                    value={masterRule.changeDescription}
                    rows="4"
                    type="text"
                    style={{ height: "5rem" }}
                  ></textarea>
                </form>
                <label>Confirmed:</label>
                <input
                  onChange={handleConfirmed}
                  style={{ width: "100px", marginLeft: 10 }}
                />
              </div>
              <br />
              <div className="button">
                <button
                  type="button"
                  className="btn  btn-md btn-save"
                  style={{ width: "10rem" }}
                >
                  Confirm Deletion
                </button>
                <button
                  type="button"
                  className="btn  btn-md btn-save"
                  style={{
                    marginRight: "0.5rem",
                    float: "left",
                    width: "10rem",
                  }}
                >
                  Review Rules
                </button>
                <button
                  type="button"
                  className="btn  btn-md btn-save"
                  style={{
                    marginRight: "0.5rem",
                    float: "left",
                    width: "12.5rem",
                  }}
                >
                  Review Rule Revisions
                </button>
                <button
                  type="button"
                  style={{ marginRight: "0.5rem" }}
                  className="btn btn-md  btn-back"
                >
                  Cancel
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default RiskRuleUndeleteDeployed;
