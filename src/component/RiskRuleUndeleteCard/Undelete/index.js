import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import { number, string } from 'yup';
import { faFaceKissBeam, faListNumeric } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';


const RiskRuleUndelete = () => {
  const [selectmasterRule, setSelectMasterRule] = useState([]);
  const [masterRule, setMasterRule] = useState([]);
  const [ruleId, setRuleId] = useState("");
  
  const navigate = useHistory();
  const location = useLocation();
  const { state } = location.state;

  const [masterRule2, setMasterRule2] = useState([]);
  const [reason, setReason] = useState("");
  const [ruleSelection, setruleSelection] = useState([]);
  const [ischecked, setIschecked] = useState("");
  const [validselectRiskRule, setvalidselectRiskRule] = useState(false);
  const [values , setValues] = useState({})

  const [masterRule3, setMasterRule3] = useState([]);
  const [RiskRule, setRiskRule] = useState([]);
  const [masterRule4, setMasterRule4] = useState([]);

  const [validbtnConfirmed, setvalidbtnConfirmed] = useState(false);
  const [validbtnConfirmedforLive, setvalidbtnConfirmedforLive] = useState(false);

  const [validRiskRuleUndeployed, setvalidRiskRuleUndeployed] = useState(false);
  const [validRiskRuledeployed, setvalidRiskRuledeployed] = useState(false);
  const [validRiskRuleSequence, setvalidRiskRuleSequence] = useState(false);
  const [validRiskRuleReview, setvalidRiskRuleReview] = useState(false);
  const [validRiskRuleRevision, setvalidRiskRuleRevision] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    debugger;
    if(state.Status == "Undeployed"){
      axios
      .get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/MasterRule/GetAllById?id=${state.Id}`)
      .then((res) => setMasterRule(res.data))
      .then((err) => console.log(err));
      setvalidRiskRuleUndeployed(false)
      setvalidRiskRuledeployed(true)
      setvalidRiskRuleSequence(true)
      setvalidRiskRuleReview(true)
      setvalidRiskRuleRevision(true)
    }else if(state.Status == "Deployed"){
      axios
      .get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/RiskRule/GetAllWithRelation?id=${state.Id}`)
      .then((res) => {
          setMasterRule2(res.data);
          setvalidRiskRuleUndeployed(true)
          setvalidRiskRuledeployed(false)
          setvalidRiskRuleSequence(true)
          setvalidRiskRuleReview(true)
          setvalidRiskRuleRevision(true)
        })
      .then((err) => console.log(err));
    }
    setvalidbtnConfirmed(false);
    
  }, []);
  console.log(masterRule);

  const handlechange = (e) => {
    const id = e.target.value;
    //getAllBtId not working
    setRuleId(id);
    axios
      .get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/MasterRule/GetAllById?id=${id}`)
      .then((res) => setMasterRule(res.data))
      .then((err) => console.log(err));
  };
  const handleConfirmed = (e)=>{
    axios.put(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/MasterRule/UpdateForUnDeleteRiskRule?id=${state.Id}`).then((res)=> console.log(res)).then((err)=> console.log(err));
    setvalidbtnConfirmed(true);
    setvalidbtnConfirmedforLive(true);
    toast.success("Risk Rule Reactivated Successfully");
  }
  const handleConfirmedforLive = (e) => {
    axios
        .put(
          process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/MasterRule/UpdateForUnDeleteRiskRule?id=${state.Id}`
        )
        .then((res) => console.log(res))
        .then((err) => console.log(err));
        toast.success("Live Risk Rule Reactivated Successfully");
        setvalidbtnConfirmedforLive(true);
  };
  const handleReview = () => {
    axios.get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION + `/MasterRule/SearchMasterRuleByDocumentType?DocTypeID=${state.docType}&ThreatRuleID=${0}&RuleID=${0}`).then((res) => {
      setruleSelection(res.data);
  }).catch((err) => console.log(err));
  setvalidRiskRuleUndeployed(true)
  setvalidRiskRuledeployed(true)
  setvalidRiskRuleSequence(false)
  setvalidRiskRuleReview(true)
  setvalidRiskRuleRevision(true)
}
const handlecheck = (e) => {
  setIschecked(e.target.value)
  setvalidselectRiskRule(string().required().isValidSync(e.target.value));
}

const ReviewRuleRevisions = () => {
  axios.get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION + `/RiskRule/GetAllWithRelationByRuleId?id=${state.Id}`).then((res) => setRiskRule(res.data)).then((err) => console.log(err));
  setvalidRiskRuleUndeployed(true)
  setvalidRiskRuledeployed(true)
  setvalidRiskRuleSequence(true)
  setvalidRiskRuleReview(true)
  setvalidRiskRuleRevision(false)
}

const BckbuttonofReviewRules = (e) => {
  setvalidRiskRuleUndeployed(true)
  setvalidRiskRuledeployed(true)
  setvalidRiskRuleSequence(false)
  setvalidRiskRuleReview(true)
  setvalidRiskRuleRevision(true)
}

const bckreviewRuleRevision = (e) => {
  setvalidRiskRuleUndeployed(true)
  setvalidRiskRuledeployed(false)
  setvalidRiskRuleSequence(true)
  setvalidRiskRuleReview(true)
  setvalidRiskRuleRevision(true)
}

const bckbutton = (e) => {
  if(state.Status == "Undeployed"){
    setvalidRiskRuleUndeployed(false)
    setvalidRiskRuledeployed(true)
    setvalidRiskRuleSequence(true)
    setvalidRiskRuleReview(true)
    setvalidRiskRuleRevision(true)
  }else if(state.Status == "Deployed"){
    setvalidRiskRuleUndeployed(true)
    setvalidRiskRuledeployed(false)
    setvalidRiskRuleSequence(true)
    setvalidRiskRuleReview(true)
    setvalidRiskRuleRevision(true)
  }
  
}

  //Pagination
const [pageNumber, setPageNumber] = useState(0);
const [serielNum, setSerielNum] = useState(1);
const dataPerPage = 10;
const dataVisited = pageNumber * dataPerPage;

for (var i = 0; i < ruleSelection.length; i++) {
    ruleSelection[i]["sno"] = i + 1;
}

const displayData = ruleSelection.slice(dataVisited, dataVisited + dataPerPage).filter((item) => item.ruleName.toLowerCase().includes(search.toLowerCase())).map((item, index) => (
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

const SelectRiskRule = (e) => {
  axios
   .get(
     process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +
       `/MasterRule/GetAllById?id=${ischecked}`
   )
   .then((res) => {
    setMasterRule3(res.data);
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
   setvalidRiskRuleUndeployed(true)
    setvalidRiskRuledeployed(true)
    setvalidRiskRuleSequence(true)
    setvalidRiskRuleReview(false)
    setvalidRiskRuleRevision(true)
}

//Pagination 


  return (
    <div>
       <ToastContainer />
    <div hidden={validRiskRuleUndeployed} className="row">
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
                      <p>{state.Id}</p>
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
                  <div style={{ marginLeft:'3rem' }}>
                    <div style={{ display: "flex" }}>
                      <label>Run Number:</label>
                      <p>Run Number</p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <label>Rule Type:</label>
                      <p>{masterRule.ruleTypeRef == "D" ? "Deductive" : masterRule.ruleTypeRef == "I" ? "Inductive" : ""}</p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <label>Rule Method:</label>
                      <p>{masterRule.ruleMethod == "D" ? "Decision" : masterRule.ruleMethod == "C" ? "Count" :""}</p>
                    </div>
                   
                  </div>
                  <div style={{ marginLeft:'3rem' }}>
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
            <div className="warring_card">
              <h2>NOTE</h2>
              <p>THIS RISK RULE HAS NEVER BEEN DEPLOYED</p>
            </div>
            {/* <label>Confirmed:</label>
              <input
                //onChange={handleConfirmed}
                style={{ width: "100px", marginLeft: 10 }}
              /> */}
            <br />
            <div className="button">
              <button
              onClick={handleConfirmed}
              disabled={validbtnConfirmed}
                type="button"
                className="btn  btn-md btn-save"
                style={{ width: "12rem" }}
              >
                Confirm Reactivation
              </button>
              <button
                onClick={handleReview}
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
              {/* <button
                type="button"
                className="btn  btn-md btn-save"
                style={{
                  marginRight: "0.5rem",
                  float: "left",
                  width: "12.5rem",
                }}
              >
                Review Rule Revisions
              </button> */}
              <button
              onClick={() => navigate.push("/listofRiskRuleUnDelete")}
                type="button"
                style={{ marginRight: "0.5rem" }}
                className="btn btn-md  btn-back"
              >
                Back
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div hidden={validRiskRuledeployed} className="row">
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
                        <p>{state.Id}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Document Type:</label>
                        <p>{masterRule2.documentType}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Threat Group:</label>
                        <p>{masterRule2.threatGroup}</p>
                      </div>
                    </div>
                    <div style={{ marginLeft: '3rem' }}>
                      <div style={{ display: "flex" }}>
                        <label>Run Number:</label>
                        <p>Run Number</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Rule Type:</label>
                        <p>{masterRule2.ruleTypeRef == "D" ? "Deductive" : masterRule2.ruleTypeRef == "I" ? "Inductive" : ""}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Rule Method:</label>
                        <p>{masterRule2.ruleMethod == "D" ? "Decision" :masterRule2.ruleMethod == "C" ? "Count":"" }</p>
                      </div>
                    </div>
                    <div style={{ marginLeft: '3rem' }}>
                      <div style={{ display: "flex" }}>
                        <label>Case Type:</label>
                        <p>{masterRule2.caseTypeRef}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Document Seq:</label>
                        <p>{masterRule2.docSeq}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Rule Name:</label>
                        <p>{masterRule2.ruleName}</p>
                      </div>
                    </div>
                    <div style={{ marginLeft: '3rem' }}>
                      <div style={{ display: "flex" }}>
                        <label>Weighting%:</label>
                        <p>{masterRule2.weighting}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Number Conditions:</label>
                        <p>{masterRule2.numberConditions}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Status:</label>
                        <p>{masterRule2.statusProcess}</p>
                      </div>
                    </div>
                    
                  </div>
                  
                  <div style={{ display: "flex" }}>
                    <label>Description:</label>
                    <p>{masterRule2.description}</p>
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
                    value={masterRule2.changeDescription}
                    rows="4"
                    type="text"
                    style={{ height: "5rem" }}
                  ></textarea>
                </form>
                {/* <label>Confirmed:</label> */}
                {/* <input
                  onChange={handleConfirmedforLive}
                  style={{ width: "100px", marginLeft: 10 }}
                /> */}
              </div>
              <br />
              <div className="button">
                <button
                disabled={validbtnConfirmedforLive}
                onClick={handleConfirmedforLive}
                  type="button"
                  className="btn  btn-md btn-save"
                  style={{ width: "10rem" }}
                >
                  Confirm Undelete
                </button>
                <button
                 onClick={handleReview}
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
                  onClick={ReviewRuleRevisions}
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
                  onClick={() => navigate.push("/listofRiskRuleUnDelete")}
                  type="button"
                  style={{ marginRight: "0.5rem" }}
                  className="btn btn-md  btn-back"
                >
                  Back
                </button>
              </div>
            </div>
          </section>
        </div>
    </div>
    <div hidden={validRiskRuleSequence} >
        <section id="card">

          <div className="well" style={{ width: '64rem' }}>
            <h1 >Review Risk Rule Sequence </h1>
            <div>
              <form className="ml-auto" >
                <div style={{ display: 'flex' }}>
                  {/* <label>Option Method</label> */}
                  <p style={{ marginLeft: 'initial' }}>Document Type : {state.doctypeName}</p>

                  <br />


                </div>



              </form>
            </div>
            <div className='searchdiv'>
                  <input placeholder='Search by Rule Name' className='input' onChange={(e) => setSearch(e.target.value)} value={search} />
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

                    <button disabled={validselectRiskRule ? false : true} onClick={SelectRiskRule} type="button" className="btn  btn-md btn-save" style={{ width: '14rem', height: '40px', marginTop: '-6px' }}>Select Risk Rule</button>

                  </div>
                </div>


              </form>

            </div>
            <div className="button">
              {/* <button type="button" className="btn  btn-md btn-save">Next</button> */}
              <button onClick={bckbutton} type="button" className="btn  btn-md btn-back" style={{ marginRight: '0.5rem', }}>Back</button>
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
                     <p>{masterRule3.ruleId}</p>
                    </div>

                    <div style={{ display: "flex" }}>
                      <label>Document Type: </label>
                      <p>{masterRule3.documentType} </p>
                    </div>

                    <div style={{ display: "flex" }}>
                      <label>Threat Group:</label>
                      <p>{masterRule3.threatGroup}</p>
                    </div>
                  </div>
                  <div style={{ marginLeft: "4rem" }}>
                    <div style={{ display: "flex" }}>
                      <label>Rule Type:</label>
                      <p>{masterRule3.ruleTypeRef == "I" ? "Inductive" : masterRule3.ruleTypeRef == "D" ? "Deductive" :""}</p>
                    </div>

                    <div style={{ display: "flex" }}>
                      <label>Rule Method:</label>
                      <p>{masterRule3.ruleMethod}</p>
                      {masterRule3.ruleMethod === "C" ? (
                        <p>(Count)</p>
                      ) : <></> && masterRule3.ruleMethod === "D" ? (
                        <p>(Decision)</p>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div style={{ display: "flex" }}>
                      <label>Case Type:</label>
                      <p>{masterRule3.caseTypeRef}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", marginLeft: "4rem" }}>
                    <label>Status:</label>
                    <p>{masterRule3.statusCode}</p>
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
                        //onChange={handlechange}
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
                        //onChange={handlechange}
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
                    //onChange={handlechange}
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
                        //onChange={handlechange}
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
    <div hidden={validRiskRuleRevision} className="row">
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
                        <p>{masterRule2.ruleName}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Rule Type: </label>
                        <p>{masterRule2.ruleTypeRef == "D" ? "Deductive" : masterRule2.ruleTypeRef == "I" ? "Inductive" : ""} </p>
                      </div>

                      <div style={{ display: "flex" }}>
                        <label>Description:</label>
                        <p>{masterRule2.description}</p>
                        <br />
                      </div>
                    </div>
                    <div style={{ marginLeft: '3rem' }}>
                      <div style={{ display: "flex" }}>
                        <label>Threat Group:</label>
                        <p>{masterRule2.threatGroup}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Rule Method:</label>
                        <p>{masterRule2.ruleMethod == "D" ? "Decision" : masterRule2.ruleMethod == "C" ? "Count" : ""}</p>
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
                    {/* <th scope="col">S.No</th> */}
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
                  {RiskRule.map((e, i) => (
                    <tr key={e.id}>
                    {/* <th scope="row">{e.sno}</th> */}
                    <td>{e.id}</td>
                    <td>{e.ruleRunNo}</td>
                    <td>{e.changeDescription}</td>
                    <td>{e.createdDate}</td>
                    <td>{e.statusCode}</td>
                  </tr>
                  ))}

                </tbody>
              </table>

              <div className="button">
                {/* <button type="button" className="btn  btn-md btn-save">
                    Next
                    </button> */}

                <button
                  onClick={bckreviewRuleRevision}
                  type="button"
                  style={{ marginRight: "0.5rem" }}
                  className="btn  btn-md btn-back"
                >
                  Back
                </button>
                {/* <button
                    type="button"
                    style={{ marginRight: "0.5rem" }}
                    className="btn btn-md  btn-back"
                    >
                    Exit
                    </button> */}
              </div>
            </div>
          </section>
        </div>
    </div>
  </div>
  );
};
export default RiskRuleUndelete;
