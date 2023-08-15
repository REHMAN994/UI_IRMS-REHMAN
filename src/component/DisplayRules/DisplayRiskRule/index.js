import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory,useLocation } from "react-router-dom";
import Swal from "sweetalert2";


const RiskRuleUpdate = () => {
  let history = useHistory();
    const navigate = useHistory();
    const location = useLocation();
    const {state} = location.state;
    console.log(state);
  const [ruleType, setRuleType] = useState([]);
  const [masterRule, setmasterRule] = useState([]);
  const [ruleId, setRuleId] = useState("");
  const [values, setValues] = useState({
    docSeq: "",
    ruleName: "",
    description: "",
    weighting: "",
    numberConditions: "",
  });
  useState(() => {
     axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
          `/MasterRule/GetAllById?id=${parseInt(state.id)}`
      )
      .then((res) => {
        setmasterRule(res.data);
        setValues({
          ...values,
          docSeq: res.data.docSeq,
          ruleName: res.data.ruleName,
          description: res.data.description,
          weighting: res.data.weighting,
          numberConditions: res.data.numberConditions,
        });
      })
      .catch((err) => console.log(err));
      setRuleId(parseInt(state.id));




  }, []);

  const ruleIdhandle = async (e) => {
    const ruleId = e.target.value;

    await axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
          `/MasterRule/GetAllById?id=${ruleId}`
      )
      .then((res) => {
        setmasterRule(res.data);
        setValues({
          ...values,
          docSeq: res.data.docSeq,
          ruleName: res.data.ruleName,
          description: res.data.description,
          weighting: res.data.weighting,
          numberConditions: res.data.numberConditions,
        });
      })
      .catch((err) => console.log(err));
    console.log(ruleId);
    setRuleId(ruleId);
  };

  const handlechange = (e) => {
    const value = e.target.value;
    setValues({ ...values, [e.target.name]: value });
  };

  const handlesave = () => {
    Swal.fire({
      title: "Are you sure you want to Update?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          ruleId: ruleId,
          documentTypeId: masterRule.documentTypeId,
          threatGroupId: masterRule.threatGroupId,
          ruleTypeRefId: masterRule.ruleTypeRefId,
          caseTypeRefId: masterRule.caseTypeRefId,
          docSeq: values.docSeq,
          ruleName: values.ruleName,
          description: values.description,
          ruleMethod: masterRule.ruleMethod,
          weighting: values.weighting,
          numberConditions: values.numberConditions,
          statusRef: masterRule.statusRef,
        });

        var requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(
          process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
            "/MasterRule/Update",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
        window.location.reload(true);
      } else Swal.fire(" Cancelled", "", "error");
    });

    setValues({
      docSeq: "",
      ruleName: "",
      description: "",
      weighting: "",
      numberConditions: "",
    });
  };

  const handleNext = () =>{
    if(masterRule.ruleMethod == "C"){
        navigate.push("/displayriskrulecount",{
          state:{
            id:state.id
          }
        })
    }else if(masterRule.ruleMethod == "D"){
      navigate.push("/displayriskrulecondition",{
        state:{
          id:state.id
        }
      })
    }
  }
  const handleBack = () =>{
    navigate.push("/riskruleselectpage")
    }
  return (
    <div>
      <div className="row">
        <div className="col-md-10 col-lg-10">
          <section id="card">
            <div className="well">
              <h1 style={{ marginTop: "0rem" }}>Review Risk Rule Keys</h1>
              <form className="ml-auto">
                <div style={{ display: "flex" }}>
                  <div>
                    <div style={{ display: "flex" }}>
                      <label>Rule ID:</label>
                     <p>{state.id}</p>
                    </div>

                    <div style={{ display: "flex" }}>
                      <label>Document Type: </label>
                      <p>{masterRule.documentType} </p>
                    </div>

                    <div style={{ display: "flex" }}>
                      <label>Threat Group:</label>
                      <p>{masterRule.threatGroup}</p>
                    </div>
                  </div>
                  <div style={{ marginLeft: "4rem" }}>
                    <div style={{ display: "flex" }}>
                      <label>Rule Type:</label>
                      <p>{masterRule.ruleTypeRef == "I" ? "Inductive" : masterRule.ruleTypeRef == "D" ? "Deductive" : ""}</p>
                    </div>

                    <div style={{ display: "flex" }}>
                      <label>Rule Method:</label>
                      <p>{masterRule.ruleMethod}</p>
                      {masterRule.ruleMethod === "C" ? (
                        <p>(Count)</p>
                      ) : <></> && masterRule.ruleMethod === "D" ? (
                        <p>(Decision)</p>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div style={{ display: "flex" }}>
                      <label>Case Type:</label>
                      <p>{masterRule.caseTypeRef}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", marginLeft: "4rem" }}>
                    <label>Status:</label>
                    <p>{masterRule.statusCode}</p>
                  </div>
                </div>
              </form>
            </div>
          </section>

          <section id="card">
            <div className="well">
              <h1> Review Risk Rule </h1>
              <div>
                <form className="ml-auto" method="post">
                  <div style={{ display: "flex" }}>
                    <div>
                      <label>Document Seq</label>
                      <br />
                      <input
                        name="docSeq"
                        disabled={true}
                        value={values.docSeq}
                        onChange={handlechange}
                        placeholder="Document Seq"
                        type="text"
                        style={{ width: "28rem" }}
                      />
                    </div>

                    <div style={{ marginLeft: "4rem" }}>
                      <label>Rule Name</label>
                      <br />
                      <input
                        name="ruleName"
                        disabled={true}
                        value={values.ruleName}
                        onChange={handlechange}
                        placeholder="Rule Name"
                        type="text"
                        style={{ width: "28rem" }}
                      />
                    </div>
                  </div>

                  <label style={{ marginTop: "1rem" }}>Description</label>
                  <br />
                  <input
                    name="description"
                    value={values.description}
                    disabled={true}
                    onChange={handlechange}
                    type="text"
                    placeholder=" Description here.."
                    style={{ width: "60rem" }}
                  />
                  <div style={{ display: "flex", marginTop: "1rem" }}>
                    <div>
                      <label>Weighting%</label>
                      <br />
                      <input
                        value={values.weighting}
                        name="weighting"
                        disabled={true}
                        onChange={handlechange}
                        placeholder="50"
                        type="text"
                        style={{ width: "28rem" }}
                      />
                    </div>
                    <div style={{ marginLeft: "4rem" }}>
                      <label>Number Conditions</label>
                      <br />
                      <input
                        value={values.numberConditions}
                        name="numberConditions"
                        disabled={true}
                        onChange={handlechange}
                        placeholder="2"
                        type="text"
                        style={{ width: "28rem" }}
                      />
                    </div>
                  </div>
                  
                </form>
                
              </div>
              <div className="button" >
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-md  btn-back"
                >
                  Next
                </button>
              </div>
              <div className="button">
                <button
                  type="button"
                   onClick={() => history.goBack()}
                  className="btn btn-md  btn-back"
                  style={{marginTop: '-2rem'}}
                
                >
                  Back
                </button>
              </div>
              
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default RiskRuleUpdate;
