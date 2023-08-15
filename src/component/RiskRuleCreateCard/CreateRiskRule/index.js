import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { number, string } from 'yup';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const RiskRuleCreate = () => {
  // const check = (e) => {
  //   debugger;
  //   toast.success("Success Fu");
  // }

  const navigate = useHistory();
  const location = useLocation();
  const { state } = location.state;
  const [isDisabled, setIsDisbaled] = useState(true);
  const [Id, setId] = useState("");
  const [ruleName, setruleName] = useState("");
  const [isNextDisbaled, setisNextDisbaled] = useState(true);
  const [isExit, setisExit] = useState(true);
  const [isSave, setisSave] = useState(false);
  const [masterRule, setMasterRule] = useState({
    MasterRuleId: "",
    DocumentType: "",
    DocumentName: "",
    ThreatGroup: "",
    RuleType: "",
    CaseType: "",
    RuleMethod: "",
  });
  const [ruleSelection, setruleSelection] = useState([]);
  const [ischecked, setIschecked] = useState("");
  const [validselectRiskRule, setvalidselectRiskRule] = useState(false);
  const [validReviewRule, setvalidReviewRule] = useState(true);
  const [validRiskRule, setvalidRiskRule] = useState(false);
  const [validRiskRuleReview, setvalidRiskRuleReview] = useState(true);

  const [masterRule2, setmasterRule2] = useState([]);

  
  const [ruleId2, setRuleId2] = useState("");

 //get state object


  const validate = Yup.object({
    docSeq: Yup.string().matches(/[0-99]/,"Required 0 to 99").max(2, "Only two numbers Required").required("empty-select"),
    ruleName: Yup.string().required("empty-select"),
    description: Yup.string().required("empty-select"),
    weighting: Yup.string().matches(/[0-999]/,"Required 0 to 999").max(3, "Only three numbers Required").required("empty-select"),
    numberConditions: Yup.string().matches(/[1-6]/,"Required 1 to 6").max(1, "Only 1 to 6 numbers Required").required("empty-select"),
    
    
  
  });
  const initialValues = {
    docSeq: "",
    ruleName: "",
    description: "",
    weighting: "",
    numberConditions: "",
  };
  const handleReview = () => {
    axios.get(process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE + `/MasterRule/SearchMasterRuleByDocumentType?DocTypeID=${state.DocId}&ThreatRuleID=${0}&RuleID=${0}`).then((res) => {
      setruleSelection(res.data);
  }).catch((err) => console.log(err))
  setvalidReviewRule(false);
  setvalidRiskRule(true);
}


  const bckbutton = () => {
    setvalidReviewRule(true);
    setvalidRiskRule(false);
    setvalidRiskRuleReview(true);
  };

  const handlechange = (e) => {
    const value = e.target.value;
    setValues({ ...values, [e.target.name]: value });
  };
  const handleNext = () => {
    if (state.RuleMethod == "Count") {
                              
      debugger;
      navigate.push("/riskrulecreatecountpage", {
        state: {
          MasterRuleId: Id,
          DocumentType: values.documentTypeId,
          DocumentName: state.DocumentType,
          ThreatGroup: state.ThreatGroupId,
          ThreatGroupName : state.ThreatGroup,
          RuleType: values.ruleTypeRefId,
          RuleTypeName : state.RuleType,
          CaseType: values.caseTypeRefId,
          CaseTypeName : state.CaseType,
          RuleMethod: state.RuleMethod,
          DocSeq : values.docSeq
        },
      });
  }
  if (state.RuleMethod == "Decision")
  {
    navigate.push("/riskrulecreateconditionpage", {
      state: {
        ruleId: Id,
        docname:state.DocumentType,
        casename:state.CaseType,
        ThreatGroupId: state.ThreatGroupId,
        threatGroup: state.ThreatGroup,
        documentTypeId: values.documentTypeId,
        threatGroupId: state.ThreatGroupId,
        ruleTypeRefId: values.ruleTypeRefId,
        caseTypeRefId: values.caseTypeRefId,
        docSeq: values.docSeq,
        ruleName: values.ruleName,
        description: values.description,
        ruleMethod: state.RuleMethod,
        weighting: values.weighting,
        numberConditions: values.numberConditions,
        ruleTypeName: state.RuleType
        
      },
    });
  }
    // console.log({
     
    //     ruleId: Id,
    //     docname:state.DocumentType,
    //     casename:state.CaseType,
    //     ThreatGroupId: state.ThreatGroupId,
    //     threatGroup: state.ThreatGroup,
    //     documentTypeId: values.documentTypeId,
    //     threatGroupId: state.ThreatGroupId,
    //     ruleTypeRefId: values.ruleTypeRefId,
    //     caseTypeRefId: values.caseTypeRefId,
    //     docSeq: values.docSeq,
    //     ruleName: values.ruleName,
    //     description: values.description,
    //     ruleMethod: state.RuleMethod,
    //     weighting: values.weighting,
    //     numberConditions: values.numberConditions,
    //     ruleTypeName: state.RuleType
        

        
    //   })
    
  };
  const handleEntailmentRequest = (e) => {
  //   Swal.fire({
  //     title: 'Oops...',
  //     showConfirmButton: true,
  //     showCancelButton: true,
  //     confirmButtonText: "Proceed",
  //     cancelButtonText: "Cancel",
  //     icon: 'warning',
  //     text: 'If You Proceed, All Data On This Page Will Be Lost'
  // }).then((result) => {
  //     if (result.isConfirmed) {
  //       navigate.push(`/riskrulecreatekeypage`);
  //     }
  // })
  navigate.push(`/riskrulecreatekeypage`);
  };
  const [values , setValues] = useState({})
  const handleCancel = (e) => {
     
  };
  const handlecheck = (e) => {
    setIschecked(e.target.value)
    setvalidselectRiskRule(string().required().isValidSync(e.target.value));
  }


  const SelectRiskRule = (e) => {
    const ruleId = ischecked;

     axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
          `/MasterRule/GetAllById?id=${ruleId}`
      )
      .then((res) => {
        setmasterRule2(res.data);
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
    setRuleId2(ruleId);
    setvalidReviewRule(true);
    setvalidRiskRule(true);
    setvalidRiskRuleReview(false);
  }


  const BckbuttonofReviewRules = (e) => {
    setvalidReviewRule(false);
    setvalidRiskRule(true);
    setvalidRiskRuleReview(true);
  }


//Pagination
const [pageNumber, setPageNumber] = useState(0);
const [serielNum, setSerielNum] = useState(1);
const dataPerPage = 10;
const dataVisited = pageNumber * dataPerPage;

for (var i = 0; i < ruleSelection.length; i++) {
    ruleSelection[i]["sno"] = i + 1;
}

const displayData = ruleSelection.slice(dataVisited, dataVisited + dataPerPage).map((item, index) => (
  <tr key={item.id}>
  <th scope="row">{item.sno}</th>
    <td>{item.ruleId}</td>
  <td>{item.ruleTypeRef == "D" ? "Deductive" : item.ruleTypeRef == "I" ? "Inductive":""}  </td>
  <td>{item.docSeq}</td>
  <td>{item.numberConditions}</td>
  <td>{item.ruleName}</td>
  <td>{item.documentType}</td>
  <td>{item.ruleMethod == "D" ? "Decision" : item.ruleMethod == "C" ? "Count" :""}</td>
  <td>{item.statusCode}</td>


    <td>
        <form>
            <input type="radio" value={item.ruleId} checked={ischecked == item.ruleId ? true : false} onChange={handlecheck} style={{ width: "1rem" }} />
        </form>
    </td>
    </tr>
));
const PageCount = Math.ceil(ruleSelection.length / dataPerPage);
const chnagePage = ({ selected }) => {
    setPageNumber(selected);
}


//Pagination 

  return (
    <div>
       <ToastContainer />
      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={(values, { resetForm }) => {
          console.log({
            "documentTypeId": state.DocId,
            "threatGroupId": state.ThreatGroupId,
            "ruleTypeRefId": state.RuleTypeId,
            "caseTypeRefId": state.CaseTypeId,
            "docSeq": values.docSeq,
            "ruleName": values.ruleName,
            "description": values.description,
            "ruleMethod": state.RuleMethod,
            "weighting": values.weighting,
            "numberConditions": values.numberConditions,
            "StatusRef": 1,
        });

        setValues({
          documentTypeId: state.DocId,
          threatGroupId: state.ThreatGroupId,
          ruleTypeRefId: state.RuleTypeId,
          caseTypeRefId: state.CaseTypeId,
          docSeq: values.docSeq,
          ruleName: values.ruleName,
          description: values.description,
          ruleMethod: state.RuleMethod,
          weighting: values.weighting,
          numberConditions: values.numberConditions,
        })


        if(state.RuleMethod == "Count" && values.numberConditions != "1"){
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          //   text: 'Select Only 1 in Number Condition'
          // })
          toast.error("Select Only 1 in Number Condition");
        }else{
          Swal.fire({
              title: 'Are you sure you want to save?',
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: "OK",
              cancelButtonText: "Cancel"
          }
          ).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                  var myHeaders = new Headers();
                  myHeaders.append("Content-Type", "application/json");
                  
                  var raw = JSON.stringify({
                      "documentTypeId": state.DocId,
                      "threatGroupId": state.ThreatGroupId,
                      "ruleTypeRefId": state.RuleTypeId,
                      "caseTypeRefId": state.CaseTypeId,
                      "docSeq": values.docSeq,
                      "ruleName": values.ruleName,
                      "description": values.description,
                      "ruleMethod": state.RuleMethod,
                      "weighting": values.weighting,
                      "numberConditions": values.numberConditions,
                      "StatusRef": 1,
                  });

                  var requestOptions = {
                      method: 'POST',
                      headers: myHeaders,
                      body: raw,
                      redirect: 'follow'
                  };

                  fetch(process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE + "/MasterRule/Add", requestOptions)
                      .then(response => response.text())
                      .then((result) => {
                          const rule = JSON.parse(result);
                            if (rule.active =='Duplicate MasterRule') {
                                // Swal.fire({
                                //     icon: 'error',
                                //     title: 'Oops...',
                                //     text : "Rule Name Already Exists"
                                // })
                                toast.error("Rule Name Already Exists");
                                    
                    
                            }else if (rule.active='Y' ){
                                //Swal.fire('Added Successfully', '', 'success')
                                toast.success("Added Successfully");
                                setId(rule.ruleId);
                                setruleName(rule.ruleName);
                                setIsDisbaled(false);
                                setisSave(true);
                                setisNextDisbaled(false);
                                setisExit(false);
                            }else
                                Swal.fire(' Cancelled', '', 'error')
                          
                          

                          // rule.ruleMethod == "C" ? navigate.push("/riskrulecreatecountpage", {
                          //     state:
                          //     {
                          //         DocumentType: JSON.parse(result.documentType),
                          //         ThreatGroup: JSON.parse(result.documentType),
                          //         RuleType: JSON.parse(result.ruleType),
                          //         CaseType: JSON.parse(result.caseType),
                          //         RuleMethod: JSON.parse(result.ruleMethod)

                          //     }
                          // }) : "";
                      })
                      .catch(error => console.log('error', error));
                  //resetForm();
                  //window.location.reload();
                  
                    
                
              } 

          })
        }
        }}
      >
        {(formik) => (
          <div hidden={validRiskRule} className="row">
            <div className="col-md-10 col-lg-10">
              <section id="card">
                <div className="well">
                  <h1 style={{ marginTop: "0rem" }}>Create Risk Rule Keys</h1>
                  <form className="ml-auto">
                    <div style={{ display: "flex" }}>
                      <div>
                        <div style={{ display: "flex" }}>
                          <label>Document Type</label>
                          <p>{state.DocumentType}</p>
                        </div>
                        <div style={{ display: "flex" }}>
                          <label>Rule Method</label>
                          <p>{state.RuleMethod}</p>
                        </div>
                      </div>
                      <div style={{ marginLeft: '3rem' }}>
                        <div style={{ display: "flex" }}>
                          <label>Threat Rule set</label>
                          <p>{state.ThreatGroup}</p>
                        </div>
                        <div style={{ display: "flex" }}>
                          <label>Case Type</label>
                          <p>{state.CaseType}</p>
                        </div>
                      </div>
                      <div style={{ marginLeft: '3rem' }}>
                        <div style={{ display: "flex" }}>
                          <label className="ml-5">Rule Type</label>
                          <p>{state.RuleType}</p>
                        </div>
                      </div>
                    </div>
                  

                  </form>
                </div>
              </section>
              <section id="card">
                <div className="well">
                  <h1> Create Risk Rule </h1>
                  <div>
                    <form className="ml-auto" method="post">
                      <div style={{ display: "flex" }}>
                        <div>
                          <label>Document Seq <i style={{ color: "red"}}>*</i> </label>
                          <br />
                          <input className={`select_condition ${formik.errors.docSeq}`}
                            onChange={formik.handleChange("docSeq")}
                            onBlur={formik.handleBlur("docSeq")}
                            value={formik.values.docSeq}
                            placeholder="Doc Seq"
                            type="text"
                            style={{ width: "28rem" }}
                          />
                          <p
                            style={{
                              color: "red",
                              fontSize: 13,
                              margin: "0px",
                              marginTop: "5px",
                            }}
                          >  {formik.errors.docSeq == "empty-select" ? "" : formik.errors.docSeq}
                          </p>
                        </div>

                        <div style={{ marginLeft: "4rem" }}>
                          <label>Rule Name <i style={{ color: "red"}}>*</i> </label>
                          <br />
                          <input className={`select_condition ${formik.errors.ruleName}`}
                            onChange={formik.handleChange("ruleName")}
                            placeholder="Rule Name"
                            type="text"
                            style={{ width: "28rem" }}
                          />
                          {/* <p
                            style={{
                              color: "red",
                              fontSize: 13,
                              margin: "0px",
                              marginTop: "5px",
                            }}
                          >
                            {formik.errors.ruleName}
                          </p> */}
                        </div>
                      </div>

                      <label style={{ marginTop: "1rem" }}>Description <i style={{ color: "red"}}>*</i> </label>
                      <br />
                      <input className={`select_condition ${formik.errors.description}`}
                        onChange={formik.handleChange("description")}
                        type="text"
                        placeholder=" Description here.."
                        style={{ width: "60rem" }}
                      />
                      {/* <p
                        style={{
                          color: "red",
                          fontSize: 13,
                          margin: "0px",
                          marginTop: "5px",
                        }}
                      >
                        {formik.errors.description}
                      </p> */}
                      <div style={{ display: "flex", marginTop: "1rem" }}>
                        <div>
                          <label>Weighting% <i style={{ color: "red"}}>*</i> </label>
                          <br />
                          <input className={`select_condition ${formik.errors.weighting}`}
                            onChange={formik.handleChange("weighting")}
                            placeholder="Weighting%"
                            type="text"
                            style={{ width: "28rem" }}
                          />
                          <p
                            style={{
                              color: "red",
                              fontSize: 13,
                              margin: "0px",
                              marginTop: "5px",
                            }}
                          >
                            {formik.errors.weighting == "empty-select" ? "" : formik.errors.weighting}

          
                          </p>
                        </div>
                        <div style={{ marginLeft: "4rem" }}>
                          <label>Number Conditions <i style={{ color: "red"}}>*</i> </label>
                          <br />
                          <input className={`select_condition ${formik.errors.numberConditions}`}
                            onChange={formik.handleChange("numberConditions")}
                            placeholder="Number Conditions"
                            type="text"
                            style={{ width: "28rem" }}
                          
                          />
                          <p
                            style={{
                              color: "red",
                              fontSize: 13,
                              margin: "0px",
                              marginTop: "5px",
                            }}
                          >
                            {formik.errors.numberConditions == "empty-select" ? "" : formik.errors.numberConditions}
                         
                          </p>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="button" style={{ marginTop: "2rem" }}>
                    <button
                     // disabled={validReviewRule}
                      onClick={handleReview}
                      type="button"
                      className="btn  btn-md btn-save"
                      style={{ float: "left", width: "9rem" }}
                    >
                      Review Rules
                    </button>
                    <button
                      disabled={isNextDisbaled}
                      onClick={handleNext}
                      type="button"
                      className="btn  btn-md btn-save"
                      style={{
                        marginLeft: "12px",
                        float: "left",
                        width: "7rem",
                      }}
                    >
                      Next
                    </button>
                    <button
                      disabled={isSave}
                      onClick={formik.handleSubmit}
                      type="button"
                      className="btn  btn-md btn-save"
                      style={{ width: "7rem" }}
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      type="button"
                      className="btn btn-md  btn-back"
                      style={{ width: "7rem"  }}
                    >
                      Cancel
                    </button>
                    
                    <button
                      onClick={handleEntailmentRequest}
                      type="button"
                      className="btn btn-md  btn-back"
                    >
                      Back
                    </button>
                  </div>
                </div>
                
              </section>
            </div>
          </div>
        )}
      </Formik>
      <div>
            <section hidden={validReviewRule} id="card">

            <div className="well" style={{ width: '64rem' }}>
                    <h1 >Review Risk Rule Sequence </h1>
                    <div>
                        <form className="ml-auto" >
                            <div style={{ display: 'flex' }}>
                                {/* <label>Option Method</label> */}
                                <p style={{ marginLeft: 'initial' }}>Document Type : {state.DocumentType}</p>
                                
                                <br />


                            </div>



                        </form>
                    </div>
                    <table className="table table-striped" style={{ marginTop: "1rem" }}>
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">S.No</th>
                                <th scope="col">Risk ID</th>
                                <th scope="col">Type</th>
                                <th scope="col">Seq</th>
                                <th scope="col">Conditions</th>
                                <th scope="col">Rule Name</th>
                                <th scope="col">Threat Group</th>
                                <th scope="col">Method</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>

                            </tr>
                        </thead>
                        {/* <tbody>


                            {
                                ruleSelection.map((e) => (
                                    <tr>
                                        <td>{e.ruleTypeRef}  </td>
                                        <td>{e.ruleId}</td>
                                        <td>{e.documentType}</td>
                                        <td>{e.ruleName}</td>
                                        <td>{e.documentType}</td>

                                        <td>{e.threatGroup}</td>


                                        <td>
                                            <form>
                                                <input type="radio" value={e.ruleId} checked={ischecked == e.ruleId ? true : false} onChange={handlecheck} style={{ width: "1rem" }} />
                                            </form>
                                        </td>



                                    </tr>
                                ))
                            }

                        </tbody> */}
                        <tbody>
                                    {displayData}
                                </tbody>
                    </table>
                    <ReactPaginate
                                previousLabel="Previous"
                                nextLabel="Next"
                                pageCount={PageCount}
                                onPageChange={chnagePage}
                                containerClassName={"conatinerpage"}
                                previousClassName={displayData.length < 9 && ruleSelection.length > 10 ? "prevbtn" : "prevbtn2"}
                                nextClassName={displayData.length > 9 ? "nextbtn" : "nextbtn2"}
                                activeClassName={"activepage"}

                            />
                    <hr style={{ border: '1px solid #2d3f61' }} />
                    <div className="inner-card">
                        <form className="ml-auto" method="post">
                            <h1 >Risk Rule Selection </h1>
                            <br />
                            <div style={{ display: 'flex' }}>

                                <div style={{ marginLeft: '' }}>
                                    <label className="">Reference</label>
                                    <br />
                                    <input className={`${validselectRiskRule ? "" : "empty-select"}`} value={ischecked} type="text" placeholder="Reference" style={{ width: '46.5rem', height: '40px' }} />
                                </div>

                                <div style={{ marginLeft: '1rem', marginTop: '0.9rem' }}>
                                    <label className=""></label>
                                    <br />

                                    <button disabled={validselectRiskRule ? false : true}  onClick={SelectRiskRule}  type="button" className="btn  btn-md btn-save" style={{ width: '14rem', height: '40px', marginTop:'-6px' }}>Select Risk Rule</button>

                                </div>
                            </div>


                        </form>

                    </div>
                    <div className="button">
                        {/* <button type="button" className="btn  btn-md btn-save">Next</button> */}
                        <button onClick={bckbutton}  type="button" className="btn  btn-md btn-back" style={{ marginRight: '0.5rem', }}>Back</button>
                        {/* <button type="button" style={{ marginRight: '0.5rem', }} className="btn btn-md  btn-back">Cancel</button> */}

                    </div>
                </div>
            </section>
        </div>

        <div>
      <div hidden={validRiskRuleReview} className="row">
        <div className="col-md-10 col-lg-10">
          <section id="card">
            <div className="well">
              <h1 style={{ marginTop: "0rem" }}>Review Risk Rule</h1>
              <form className="ml-auto">
                <div style={{ display: "flex" }}>
                  <div>
                    <div style={{ display: "flex" }}>
                      <label>Rule ID:</label>
                     <p>{masterRule2.ruleId}</p>
                    </div>

                    <div style={{ display: "flex" }}>
                      <label>Document Type: </label>
                      <p>{masterRule2.documentType} </p>
                    </div>

                    <div style={{ display: "flex" }}>
                      <label>Threat Group:</label>
                      <p>{masterRule2.threatGroup}</p>
                    </div>
                  </div>
                  <div style={{ marginLeft: "4rem" }}>
                    <div style={{ display: "flex" }}>
                      <label>Rule Type:</label>
                      <p>{masterRule2.ruleTypeRef == "I" ? "Inductive" : masterRule2.ruleTypeRef == "D" ? "Deductive" :""}</p>
                    </div>

                    <div style={{ display: "flex" }}>
                      <label>Rule Method:</label>
                      <p>{masterRule2.ruleMethod}</p>
                      {masterRule2.ruleMethod === "C" ? (
                        <p>(Count)</p>
                      ) : <></> && masterRule2.ruleMethod === "D" ? (
                        <p>(Decision)</p>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div style={{ display: "flex" }}>
                      <label>Case Type:</label>
                      <p>{masterRule2.caseTypeRef}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", marginLeft: "4rem" }}>
                    <label>Status:</label>
                    <p>{masterRule2.statusCode}</p>
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
                        placeholder=""
                        type="text"
                        style={{ width: "28rem" }}
                      />
                    </div>
                  </div>
                  
                </form>
                
              </div>
              
              <div className="button">
                <button
                  type="button"
                  onClick={BckbuttonofReviewRules}
                  className="btn btn-md  btn-back"
                  style={{marginTop: '-1rem'}}
                
                >
                  Back
                </button>
              </div>
              
              
            </div>
          </section>
        </div>
      </div>
    </div>
    </div>
  );
};
export default RiskRuleCreate;
