import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { computeHeadingLevel } from "@testing-library/react";
import { number, string } from "yup";
import { useHistory } from "react-router-dom";

const RiskRuleCreateKey = () => {
  useEffect(() => {
    const getDocType = async () => {
      await axios
        .get(
          process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
            "/DocumentType/GetAllIDs"
        )
        .then((res) => {
          setDocType(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };
    getDocType();

    const threatGroup = async () => {
      await axios
        .get(
          process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
            "/ThreatGroup/GetAllIDs"
        )
        .then((res) => {
          setThreatGroup(res.data);
        })
        .catch((err) => console.log(err));
    };
    const ruleType = async () => {
      await axios
        .get(
          process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
            "/RuleTypeRef/GetAllIDs"
        )
        .then((res) => {
          setRuleType(res.data);
        })
        .catch((err) => console.log(err));
    };
    const caseType = async () => {
      debugger;
      await axios
        .get(
          process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
            "/CaseTypeRef/GetAllIDs"
        )
        .then((res) => {
          setCaseType(res.data);
        })
        .catch((err) => console.log(err));
    };

    threatGroup();
    ruleType();
    caseType();
  }, []);

  const caseType1 = async () => {
    await axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
          "/CaseTypeRef/GetAllIDs"
      )
      .then((res) => {
        setCaseType(res.data);
      })
      .catch((err) => console.log(err));
  };
  const navigate = useHistory();
  const [doctype, setDocType] = useState([]);
  const [threatGroup, setThreatGroup] = useState([]);
  const [ruleType, setRuleType] = useState([]);
  const [caseType, setCaseType] = useState([]);
  const [ruleMethod, setRuleMethod] = useState("");

  
  const [valDoctype, setValDoctype] = useState({});
  const [valThreatGroup, setValThreatGroup] = useState("");
  const [valRuleMethod, setValRuleMethod] = useState("");
  const [valCaseType, setValCaseType] = useState("");
  const [ruleTypeDoc, setRuleTypeDoc] = useState("");
  
 

  const [validDocType, setValidDocType] = useState(false);
  const [validThreatGroup, setValidThreatGroup] = useState(false);
  const [validMethod, setValidMethod] = useState(false);
  const [validCaseType, setValidCaseType] = useState(false);
  const [validRuleTypeDoc, setValidRuleTypeDoc] = useState(false);


  const [validForRuleType, setvalidForRuleType] = useState("");

  const handleEntailmentRequest = (e) => {
    e.preventDefault();
    window.location.reload(true);
  };

  const nextPage = (e) => {
    navigate.push(`/riskrulecraetepage`, {
      state:{
        DocumentType: valDoctype.documentType1,
        DocumentTypeID : valDoctype.id,
        ThreatGroup: valThreatGroup.threatGroup1,
        RuleType: ruleTypeDoc.ruleType,
        CaseType: valCaseType.caseType,
        RuleMethod: valRuleMethod,
        DocId: valDoctype.id,
        ThreatGroupId: valThreatGroup.id,
        RuleTypeId: ruleTypeDoc.id,
        CaseTypeId: valCaseType.id,
        
      },
    });
    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "You want to create a new Risk Rule?",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes, create it!",
    // }).then((result) => {
    //   if (result.value) {
    //     Swal.fire("Created!", "Your Risk Rule has been created.", "success");
    //     navigate.push(`/riskrulecraetepage`, {
    //       state:{
    //         DocumentType: valDoctype.documentType1,
    //         DocumentTypeID : valDoctype.id,
    //         ThreatGroup: valThreatGroup.threatGroup1,
    //         RuleType: ruleTypeDoc.ruleType,
    //         CaseType: valCaseType.caseType,
    //         RuleMethod: valRuleMethod,
    //         DocId: valDoctype.id,
    //         ThreatGroupId: valThreatGroup.id,
    //         RuleTypeId: ruleTypeDoc.id,
    //         CaseTypeId: valCaseType.id,
            
    //       },
    //     });

       
    //   }
    // });
  };

  //START OF RULE METHOD
  const handleRuleType = (e) => {
    const id = e.target.value;
    setRuleMethod(id);
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-10 col-lg-10">
          <section id="card">
            <div className="well">
              <h1>Create Risk Rule Keys </h1>
              <div>
                <form className="ml-auto" method="post">
                  <div>
                    <label>Document Type<i style={{ color: "red"}}>*</i> </label>
                    <br />
                    <select
                      value={valDoctype.name}
                      onChange={(e) => {
                        setValDoctype(JSON.parse(e.target.value));
                        setValidDocType(string().required().isValidSync(e.target.value));
                      }}
                      name="DocumentType"
                      style={{ width: "60rem" }}
                      className={`dropdown_value ${validDocType ? "" : "empty-select"}`}
                      >
                      <option value="">Select Doc Type</option>
                      {doctype.map((doc) => (
                        <option value={JSON.stringify(doc)}>{doc.documentType1}</option>
                      ))}
                    </select>
                    {/* <p style={{ color: 'red' }}>{validDocType ? "" : "Document Type is Required"}</p> */}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <label>Threat Rule Set <i style={{ color: "red"}}>*</i></label>
                      <br />

                      <select
                        value={valThreatGroup.name}
                        onChange={(e) => {
                          setValThreatGroup(JSON.parse(e.target.value));
                          setValidThreatGroup(string().required().isValidSync(e.target.value));
                        }}
                        name="ThreatGroup"
                        className={`dropdown_value ${validThreatGroup ? "" : "empty-select"}`}
                        style={{ width: "28rem" }}
                      >
                        <option value="">Select Threat </option>
                        {threatGroup.map((doc) => (
                          <option value={JSON.stringify(doc)}>{doc.threatGroup1}</option>
                        ))}
                      </select>
                      {/* <p style={{ color: 'red' }}>{validThreatGroup ? "" : "Threat group is Required"}</p> */}
                    </div>

                    <div style={{ marginLeft: "4rem" }}>
                      <label>Rule Type <i style={{ color: "red"}}>*</i></label>
                      <br />
                      <select
                        defaultValue={ruleTypeDoc.ruleType}
                        onChange={(e) => {
                          debugger;
                          var ruletype =JSON.parse(e.target.value);
                          if(ruletype.caseType == "Y"){
                            setvalidForRuleType("Y");
                          }
                          else{
                            setvalidForRuleType("N");
                          }
                          setCaseType([]);
                          setRuleTypeDoc(JSON.parse(e.target.value))
                          setValidRuleTypeDoc(string().required().isValidSync(e.target.value));
                          //setvalidForRuleType(ruleTypeDoc.caseType == "Y" ? "Y" : ruleTypeDoc.caseType == "N" ? "" : false);
                          caseType1();
                          setValCaseType("");
                        }}
                        name="RuleType"
                        className={`dropdown_value ${validRuleTypeDoc ? "" : "empty-select"}`}
                        style={{ width: "28rem" }}
                      >
                        <option value="">Select Rule </option>
                        {ruleType.map((doc) => (
                          <option value={JSON.stringify(doc)}>
                            {doc.ruleType}
                          </option>
                        ))}
                      </select>
                      {/* <p style={{ color: 'red' }}>{validRuleTypeDoc ? "" : "Rule Type is Required"}</p> */}
                    </div>
                    {/* <div
                      style={{
                        width: "16.5rem",
                        marginLeft: 20,
                        marginBottom: '36px',
                      }}
                    >
                      <label>decription</label>
                      <input
                        disabled
                        value={ruleTypeDoc.description}
                        style={{
                          width: "16.5rem",
                        }}
                      />
                    </div> */}
                  </div>

                  <div style={{ display: "flex", marginTop: "1rem" }}>
                    <div>
                      <label>Rule Method<i style={{ color: "red"}}>*</i></label>
                      <br />
                      {/* <input  name="RuleMethod" placeholder="Rule Method" type="text" style={{ width: '28rem' }} /> */}
                      <select
                        name="RuleMethod"
                        className={`dropdown_value ${validMethod ? "" : "empty-select"}`}
                        value={valRuleMethod.name}
                        onChange={(e) => {
                          setValRuleMethod(e.target.value);
                          setValidMethod(string().required().isValidSync(e.target.value));
                        }}
                        style={{ width: "28rem" }}
                      >
                        <option value={""}>Select Rule Method</option>
                        <option value={"Count"}>{"Count"}</option>
                        <option value={"Decision"}>{"Decision"}</option>
                      </select>
                      {/* <p style={{ color: 'red' }}>{validMethod ? "" : "RuleMethod is Required"}</p> */}
                    </div>

                    <div style={{ marginLeft: "4rem" }}>
                      <label> Case Type<i style={{ color: "red"}}>*</i> </label>
                      <br />
                      <select
                        disabled={validForRuleType == "Y" ? false : true}
                        value={valCaseType.name}
                        onChange={(e) => {
                          setValCaseType(JSON.parse(e.target.value));
                          setValidCaseType(string().required().isValidSync(e.target.value));
                          setvalidForRuleType(ruleTypeDoc.caseType == "Y" ? "Y" : ruleTypeDoc.caseType == "N" ? "" : false);
                         
                        }}
                        name="CaseType"
                        //className={`dropdown_value ${validCaseType ?  "" : "empty-select"}`}
                        className={`dropdown_value ${validForRuleType ?  "" : "empty-select"}`}
                        style={{ width: "28rem" }}
                      >
                        <option value="">Select Case </option>
                        {caseType.map((doc) => (
                          <option value={JSON.stringify(doc)}>{doc.caseType}</option>
                        ))}
                      </select>
                      {/* <p style={{ color: 'red' }}>{validCaseType ? "" : "CaseType is Required"}</p> */}
                    </div>
                  </div>
                </form>
              </div>
              <div className="button" style={{ marginTop: "2rem" }}>
                {/* <button type="button" className="btn  btn-md btn-save" style={{ float: 'left', width: '10rem' }}>Review Rules</button> */}
                <button
                  type="button"
                  onClick={nextPage}
                  className="btn  btn-md btn-save"
                  style={{ width: "7rem" }}
                  disabled={validDocType && validThreatGroup  && validMethod && validForRuleType == "N" ? false : validForRuleType == "Y" ? false : true}


                >
                  Next
                </button>
                <button
                  onClick={handleEntailmentRequest}
                  type="button"
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
export default RiskRuleCreateKey;
