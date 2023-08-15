import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory,useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { number, string } from 'yup';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';

const RiskRuleUpdate = () => {
  const [validRiskRuleReview, setvalidRiskRuleReview] = useState(true);
  const [ruleId2, setRuleId2] = useState("");
  const [ruleSelection, setruleSelection] = useState([]);
  const [masterRule2, setmasterRule2] = useState([]);
  const [validselectRiskRule, setvalidselectRiskRule] = useState(false);
  let history = useHistory();
    const navigate = useHistory();
    const [ischecked, setIschecked] = useState("");
    const [validReviewRule, setvalidReviewRule] = useState(true);
    const [validRiskRule, setvalidRiskRule] = useState(false);
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
  const handleReview = () => {
    axios.get(process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE + `/MasterRule/SearchMasterRuleByDocumentType?DocTypeID=${masterRule.documentTypeId}&ThreatRuleID=${0}&RuleID=${0}`).then((res) => {
      setruleSelection(res.data);
  }).catch((err) => console.log(err))
  setvalidReviewRule(false);
  setvalidRiskRule(true);
}
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

  const bckbutton = () => {
    setvalidReviewRule(true);
    setvalidRiskRule(false);
    setvalidRiskRuleReview(true);
  };
  const handlechange = (e) => {
    const value = e.target.value;
    setValues({ ...values, [e.target.name]: value });
  };


  const BckbuttonofReviewRules = (e) => {
    setvalidReviewRule(false);
    setvalidRiskRule(true);
    setvalidRiskRuleReview(true);
  }
  const handlesave = () => {
    if(masterRule.ruleMethod == "C" && values.numberConditions != "1"){
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Oops...',
      //   text: 'Select Only 1 in Number Condition'
      // })
      toast.error("Select Only 1 in Number Condition");
    }else{
    Swal.fire({
      title: "Are you sure you want to Update?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel"
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
          .then((result) =>{ 
            debugger;
            if(result!= ''){
                //const data = JSON.parse(result);
                toast.success("Updated Successfully");
                window.location.reload(true);
            }
            else{
            //     Swal.fire({
            //         icon: 'error',
            //         title: 'Oops...',
            //         text : "Rule Name Already Exists"
            //     }).then((result) => {
            //       if (result.isConfirmed) {
            //         window.location.reload(true);
            //       }
            // })
            toast.error("Rule Name Already Exists");
            window.location.reload(true);
            } 

        })    
          .catch((error) => console.log("error", error));
      } else window.location.reload(true);
      
    });

    setValues({
      docSeq: "",
      ruleName: "",
      description: "",
      weighting: "",
      numberConditions: "",
    });
  }
  };

  const handleNext = () =>{
    if(masterRule.ruleMethod == "C"){
        navigate.push("/riskruleupdatecountpage",{
          state:{
            id:state.id
          }
        })
    }else if(masterRule.ruleMethod == "D"){
      navigate.push("/riskrulemaintainpage",{
        state:{
          id:state.id
        }
      })
    }

    console.log("NEXT")

  }
  const handlecheck = (e) => {
    setIschecked(e.target.value)
    setvalidselectRiskRule(string().required().isValidSync(e.target.value));
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
      <div hidden={validRiskRule} className="row">
        <div className="col-md-10 col-lg-10">
          <section id="card">
            <div className="well">
              <h1 style={{ marginTop: "0rem" }}>Update Risk Rule Keys</h1>
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
                      <p>{masterRule.ruleTypeRef == "I"?"Inductive" : masterRule.ruleTypeRef =="D"?"Deductive":""}</p>
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
              <h1> Update Risk Rule </h1>
              <div>
                <form className="ml-auto" method="post">
                  <div style={{ display: "flex" }}>
                    <div>
                      <label>Document Seq</label>
                      <br />
                      <input
                        name="docSeq"
                        value={values.docSeq}
                        onChange={handlechange}
                        placeholder="Doc Seq"
                        type="text"
                        style={{ width: "28rem" }}
                      />
                    </div>

                    <div style={{ marginLeft: "4rem" }}>
                      <label>Rule Name</label>
                      <br />
                      <input
                        name="ruleName"
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
                        onChange={handlechange}
                        placeholder="Weighting%"
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
                        onChange={handlechange}
                        placeholder="Number Conditions"
                        type="text"
                        style={{ width: "28rem" }}
                      />
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
                  onClick={handlesave}
                  type="button"
                  className="btn  btn-md btn-save"
                  style={{ width: "7rem" }}
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => history.goBack()}
                  className="btn btn-md  btn-back"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-md  btn-back"
                >
                  Next
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div>
            <section hidden={validReviewRule} id="card">

            <div className="well" style={{ width: '64rem' }}>
                    <h1 >Review Risk Rule Sequence </h1>
                    <div>
                        <form className="ml-auto" >
                            <div style={{ display: 'flex' }}>
                                {/* <label>Option Method</label> */}
                                <p style={{ marginLeft: 'initial' }}>Document Type : {masterRule.documentType}</p>
                                
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
                        placeholder="2"
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
  );
};
export default RiskRuleUpdate;
