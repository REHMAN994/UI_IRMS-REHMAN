import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const RiskRuleDisplay = () => {
  const navigate = useHistory();
  const location = useLocation();
  const { state } = location.state;
  console.log(state);
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Authorization", "Basic ");
  headers.append("Origin", "http://localhost:3000");
  const [selectedData, setSelectedData] = useState([]);
  const [DocId, setDocId] = useState("");
  const [singleDoc, setSingleDoc] = useState("");
  const [MasterRule, setMasterRule] = useState([]);

  useEffect(() => {
    const getdocType = async () => {
      await axios
        .get(
          process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE + "/MasterRule/GetAll"
        )
        .then((res) => setMasterRule(res.data))
        .catch((err) => console.log(err));
      axios
        .get(
          process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
            `/MasterRule/GetAllById?id=${state.Id}`
        )
        .then((res) => setSelectedData(res.data))
        .catch((err) => console.log(err));
    };
    getdocType();
  }, []);

  const handleMasterRule = (e) => {
    const value = e.target.value;
    setSingleDoc(value);
    if (value == "") {
      alert("Please select Rule");
      setSelectedData([]);
    } else {
      axios
        .get(
          process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
            `/MasterRule/GetAllById?id=${value}`
        )
        .then((res) => setSelectedData(res.data))
        .catch((err) => console.log(err));
    }
    setDocId(value);
  };

  const handleNext = () => {
    console.log(selectedData.ruleTypeRef);
    console.log(selectedData.caseTypeRef);
    console.log(selectedData.MasterRule);
    console.log(selectedData.documentType);
    console.log(selectedData.ruleMethod);
    // navigate.push('/riskrulecreatecountpage', {
    //     state: {
    //         MasterRuleId: masterRule.MasterRuleId,
    //         DocumentType: masterRule.DocumentType,
    //         DocumentName: masterRule.DocumentName,
    //         ThreatGroup: masterRule.ThreatGroup,
    //         RuleType: masterRule.RuleType,
    //         CaseType: masterRule.CaseType,
    //         RuleMethod: masterRule.RuleMethod
    //     }
    // })
  };
  //console.log(selectedData);
  return (
    <div>
      <div className="row">
        <div className="col-md-10 col-lg-10">
          <section id="card">
            <div className="well">
              <h1 style={{ marginTop: "0rem" }}> Display Risk Rule </h1>
              <div style={{ display: "flex" }}>
                <div>
                  <div style={{ display: "flex" }}>
                    <label>Rule ID:</label>
                    <select
                      style={{ width: "14rem", marginLeft: "1rem" }}
                      className="dropdown_value"
                      onChange={handleMasterRule}
                    >
                      <option value={state.Id}>{state.ruleName}</option>
                      {MasterRule.map((doc) => (
                        <option key={doc.ruleId} value={doc.ruleId}>
                          {doc.ruleName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: "flex" }}>
                    <label>Document Type:</label>
                    <p>{selectedData ? selectedData.documentType : "null"}</p>
                  </div>

                  <div style={{ display: "flex" }}>
                    <label>Threat Group:</label>
                    <p>{selectedData ? selectedData.threatGroup : "null"}</p>
                  </div>
                </div>
                <div style={{ marginLeft: "3rem" }}>
                  <div style={{ display: "flex" }}>
                    <label>Rule Type:</label>
                    <p>{selectedData ? selectedData.ruleTypeRef : "null"}</p>
                  </div>

                  <div style={{ display: "flex" }}>
                    <label>Rule Method:</label>
                    <p>{selectedData ? selectedData.ruleMethod : "null"}</p>
                  
                  </div>

                  <div style={{ display: "flex" }}>
                    <label>Case Type:</label>
                    <p>{selectedData ? selectedData.caseTypeRef : "null"}</p>
                  </div>

                  <div style={{ display: "flex" }}>
                    <label>Status:</label>
                    <p>{selectedData ? selectedData.statusCode : "null"}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="card">
            <div className="well">
              <h1 style={{ marginTop: "0rem" }}> Display Risk Rule </h1>
              <div style={{ display: "flex" }}>
                <label>Document Seq:</label>
                <p>{selectedData ? selectedData.docSeq : "null"}</p>
                <br />
                <label className="ml-5">Rule Name:</label>
                <p>{selectedData ? selectedData.ruleName : "null"}</p>
              </div>
              <div style={{ display: "flex" }}>
                <label>Description:</label>
                <p>{selectedData ? selectedData.description : "null"}</p>
              </div>
              <div style={{ display: "flex" }}>
                <label>Weighting%:</label>
                <p>{selectedData ? selectedData.weighting : "null"}</p>
                <br />
                <label className="ml-5">Number Conditions:</label>
                <p>{selectedData ? selectedData.numberConditions : "null"}</p>
              </div>
              <div style={{ display: "flex" }}>
                <label>Description:</label>
                <p>Description comes here..</p>
              </div>
              <div className="button">
                <button
                  onClick={handleNext}
                  type="button"
                  className="btn  btn-md btn-save"
                >
                  Rule Detail
                </button>
                {/* <button type="button" className="btn  btn-md btn-save" style={{float:'left',width:'8rem'}}>Review Rule</button> */}
                <Link className="link" to="/riskrulecreatekeypage">
                  <button type="button" className="btn btn-md  btn-back">
                    Exit
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default RiskRuleDisplay;
