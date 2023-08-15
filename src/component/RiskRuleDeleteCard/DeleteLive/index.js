import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import { number, string } from 'yup';
import { ToastContainer, toast } from 'react-toastify';


const RiskRuleDeleteLive = () => {
  const navigate = useHistory();
  const location = useLocation();
  const { state } = location.state;
  const [selectmasterRule, setSelectMasterRule] = useState([]);
  const [masterRule, setMasterRule] = useState([]);
  const [reason, serReason] = useState("");
  const [ruleId, setRuleId] = useState("");

  const [ruleSelection, setruleSelection] = useState([]);
  const [RiskRule, setRiskRule] = useState([]);
  const [RiskRule2, setRiskRule2] = useState([]);
  const [validselectRiskRule, setvalidselectRiskRule] = useState(false);
  const [ischecked, setIschecked] = useState("");
  const [masterRule2, setmasterRule2] = useState([]);
  const [values , setValues] = useState({})
  const [masterRule4, setMasterRule4] = useState([]);


  const [validDeleteLive, setvalidDeleteLive] = useState(false);
  const [validReviewRuleRevision, setvalidReviewRuleRevision] = useState(false);
  const [validReviewRuleSequence, setvalidReviewRuleSequence] = useState(false);
  const [validReviewRiskRule, setvalidReviewRiskRule] = useState(false);
  const [validUndeployedDeleteLive, setvalidUndeployedDeleteLive] = useState(false);


  const [validforbtndelete, setvalidforbtndelete] = useState(false);
  const [validforbtndeleteUndeployed, setvalidforbtndeleteUndeployed] = useState(false);

  const [search, setSearch] = useState("");


  useEffect(() => {
    debugger;
    if(state.Status == "Deployed"){
      axios
      .get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION + `/RiskRule/GetAllWithRelation?id=${state.Id}`)
      .then((res) => setMasterRule(res.data))
      .then((err) => console.log(err));
      setvalidDeleteLive(false);
      setvalidReviewRuleRevision(true);
      setvalidReviewRuleSequence(true);
      setvalidReviewRiskRule(true);
      setvalidUndeployedDeleteLive(true);
      
    }else if(state.Status == "Undeployed"){
      axios
      .get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/MasterRule/GetAllById?id=${state.Id}`)
      .then((res) => setMasterRule4(res.data))
      .then((err) => console.log(err));
      setvalidDeleteLive(true);
      setvalidReviewRuleRevision(true);
      setvalidReviewRuleSequence(true);
      setvalidReviewRiskRule(true);
      setvalidUndeployedDeleteLive(false);
    }
  }, []);

  const handlechange = (e) => {
    const id = e.target.value;
    //getAllBtId not working
    setRuleId(id);
    axios
      .get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION + `/RiskRule/GetAllWithRelation?id=${id}`)
      .then((res) => setMasterRule(res.data))
      .then((err) => console.log(err));
  };
  const handleConfirmed = (e) => {
    if(reason ==""){
      toast.error("Description is not filled");
      return false;
    }
    axios.put(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION + `/MasterRule/UpdateForDeleteUndeployedRiskRule?id=${masterRule.ruleId}`).then((res) => console.log(res)).then((err) => console.log(err));
      axios.put(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION + `/RiskRule/RemoveLiveRiskRule`, {
        changeDescription: reason,
        ruleId: masterRule.ruleId,
        documentTypeId: masterRule.documentTypeId,
        threatGroupId: masterRule.threatGroupId,
        ruleTypeRefId: masterRule.ruleTypeRefId,
        caseTypeRefId: masterRule.caseTypeRefId,
        docSeq: masterRule.docSeq,
        ruleName: masterRule.ruleName,
        description: masterRule.description,
        ruleMethod: masterRule.ruleMethod,
        weighting: masterRule.weighting,
        numberConditions: masterRule.numberConditions,
        statusRef: masterRule.statusRef,
        ruleRunNo: masterRule.ruleRunNo,

      }).then((res) => console.log(res)).then((err) => console.log(err));
      toast.success("Live Risk Rule has been Deleted Successfully");
      setvalidforbtndelete(true);
  }

  const handleConfirmedforDelete = (e)=>{
        axios.put(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/MasterRule/UpdateForDeleteUndeployedRiskRule?id=` + state.Id).then((res)=> console.log(res)).then((err)=> console.log(err));
        toast.success("Risk Rule has been Deleted Successfully");
        setvalidforbtndeleteUndeployed(true);
      }
  const SelectRiskRuleforDelete = (e) => {
    axios
      .get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION + `/RiskRule/GetAllWithRelation?id=${e}`)
      .then((res) => setMasterRule(res.data))
      .then((err) => console.log(err));
     
  }


  const bckbutton = (e) => {
    if(state.Status == "Deployed"){
      setvalidDeleteLive(false)
      setvalidReviewRuleRevision(true)
      setvalidReviewRuleSequence(true)
      setvalidReviewRiskRule(true)
      setvalidUndeployedDeleteLive(true)
    }else if(state.Status == "Undeployed")
    {
      setvalidDeleteLive(true)
      setvalidReviewRuleRevision(true)
      setvalidReviewRuleSequence(true)
      setvalidReviewRiskRule(true)
      setvalidUndeployedDeleteLive(false)
    }
    
     
  }
  

  const BckbuttonofReviewRules = (e) => {
    setvalidDeleteLive(true)
    setvalidReviewRuleRevision(true)
    setvalidReviewRuleSequence(false)
    setvalidReviewRiskRule(true)
    setvalidUndeployedDeleteLive(true)
  }

  const handleReview = () => {
    axios.get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION + `/MasterRule/SearchMasterRuleByDocumentType?DocTypeID=${state.docType}&ThreatRuleID=${0}&RuleID=${0}`).then((res) => {
      setruleSelection(res.data);
      setvalidDeleteLive(true)
      setvalidReviewRuleRevision(true)
      setvalidReviewRuleSequence(false)
      setvalidReviewRiskRule(true)
      setvalidUndeployedDeleteLive(true)
  }).catch((err) => console.log(err));
}
const handlecheck = (e) => {
  setIschecked(e.target.value)
  setvalidselectRiskRule(string().required().isValidSync(e.target.value));
}

const btnBack = (e) => {
  navigate.push(`/listofriskruledelete`);
}

const ReviewRuleRevisions = () => {
  debugger;
  axios.get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION + `/RiskRule/GetAllWithRelationByRuleId?id=${state.Id}`).then((res) => setRiskRule2(res.data)).then((err) => console.log(err));
  setvalidDeleteLive(true)
  setvalidReviewRuleRevision(false)
  setvalidReviewRuleSequence(true)
  setvalidReviewRiskRule(true)
  setvalidUndeployedDeleteLive(true)
}
const bckreviewRuleRevision = () => {
  if(state.Status == "Deployed"){
    setvalidDeleteLive(false)
    setvalidReviewRuleRevision(true)
    setvalidReviewRuleSequence(true)
    setvalidReviewRiskRule(true)
    setvalidUndeployedDeleteLive(true)
  }else if(state.Status == "Undeployed")
  {
    setvalidDeleteLive(true)
    setvalidReviewRuleRevision(true)
    setvalidReviewRuleSequence(true)
    setvalidReviewRiskRule(true)
    setvalidUndeployedDeleteLive(false)
  }
}


const SelectRiskRule = (e) => {
   axios
    .get(
      process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +
        `/MasterRule/GetAllById?id=${ischecked}`
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
    setvalidDeleteLive(true)
    setvalidReviewRuleRevision(true)
    setvalidReviewRuleSequence(true)
    setvalidReviewRiskRule(false)
    setvalidUndeployedDeleteLive(true)
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


//Pagination 
  
  return (
    <div>
        <ToastContainer />
      <div hidden={validDeleteLive} className="row">
        <div className="col-md-10 col-lg-10">
          <section id="card">
            <div className="well">
              <h1>Delete Live Risk Rule </h1>
              <div>
                <form className="ml-auto" method="post">
                  <div style={{ display: "flex" }}>
                    <div>
                      <div style={{ display: "flex" }}>
                        <label>Rule ID:</label>
                        <p>{masterRule.ruleId}</p>
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
                        <p>{masterRule.ruleTypeRef == "D" ? "Deductive" : masterRule.ruleTypeRef == "I" ? "Inductive" : ""}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Rule Method:</label>
                        <p>{masterRule.ruleMethod == "D" ? "Decision" : masterRule.ruleMethod == "C" ? "Count" : ""}</p>
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
                        <p>{masterRule.statusCode}</p>
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
              <h1>Delete Risk Rule </h1>
              <div>
                <form className="ml-auto" method="post">
                  <label className="discription">Reason for Deletion </label>
                  <br />
                  <textarea
                    onChange={(e) => serReason(e.target.value)}
                    id="w3review"
                    name="w3review"
                    rows="4"
                    type="text"
                    placeholder=" Mention your reason here.."
                    style={{ height: "5rem" }}
                  ></textarea>
                </form>
                {/* <label>Confirmed:</label>
                <input
                  onChange={handleConfirmed}
                  style={{ width: "100px", marginLeft: 10 }}
                /> */}
              </div>
              <br />
              <div className="button">
                <button
                disabled={validforbtndelete}
                onClick={handleConfirmed}
                  type="button"
                  className="btn  btn-md btn-save"
                  style={{ width: "10rem" }}
                >
                  Confirm Deletion
                </button>
                <button
                  type="button"
                  onClick={handleReview}
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
                  onClick={ReviewRuleRevisions}
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
                onClick={btnBack}
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
      <div hidden={validReviewRuleRevision} className="row">
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
                        <p>{masterRule.ruleName}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Rule Type: </label>
                        <p>{masterRule.ruleTypeRef == "D" ? "Deductive" : masterRule.ruleTypeRef == "I" ? "Inductive" : ""} </p>
                      </div>

                      <div style={{ display: "flex" }}>
                        <label>Description:</label>
                        <p>{masterRule.description}</p>
                        <br />
                      </div>
                    </div>
                    <div style={{ marginLeft: '3rem' }}>
                      <div style={{ display: "flex" }}>
                        <label>Threat Group:</label>
                        <p>{masterRule.threatGroup}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Rule Method:</label>
                        <p>{masterRule.ruleMethod == "D" ? "Decision" : masterRule.ruleMethod == "C" ? "Count" : ""}</p>
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
                  {RiskRule2.map((e, i) => (
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
      <div hidden={validReviewRuleSequence}>
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
      <div hidden={validReviewRiskRule} className="row">
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
      <div hidden={validUndeployedDeleteLive} className="row">
             <div className="col-md-10 col-lg-10">
                 <section id="card">
                     <div className="well">
                         <h1>Delete Undeployed Risk Rule </h1>
                         <div>
                             <form className="ml-auto" method="post">
                                 <div style={{ display: 'flex' }}>
                                     <div>
                                         <div style={{ display: 'flex' }}>
                                             <label>Rule ID:</label>
                                             <p>{state.Id}</p>
                                         </div>
                                         <div style={{ display: 'flex' }}>
                                             <label >Document Type:</label>
                                             <p>{masterRule4.documentType}</p>
                                         </div>
                                         <div style={{ display: 'flex' }}>
                                             <label>Threat Group:</label>
                                             <p>{masterRule4.threatGroup}</p>
                                         </div>
                                     </div>
                                     <div style={{ marginLeft: '3rem' }}>
                                         <div style={{ display: "flex" }}>
                                             <label>Run Number:</label>
                                             <p>Run Number</p>
                                         </div>
                                         <div style={{ display: "flex" }}>
                                             <label>Rule Type:</label>
                                             <p>{masterRule4.ruleTypeRef == "D" ? "Deductive" : masterRule4.ruleTypeRef == "I" ? "Inductive" : ""}</p>
                                         </div>
                                         <div style={{ display: "flex" }}>
                                             <label>Rule Method:</label>
                                             <p>{masterRule4.ruleMethod == "D" ? "Decision" : masterRule4.ruleMethod == "C" ? "Count" : ""}</p>
                                         </div>

                                     </div>
                                     <div style={{ marginLeft: '3rem' }}>
                                         <div style={{ display: "flex" }}>
                                             <label>Case Type:</label>
                                             <p>{masterRule4.caseTypeRef}</p>
                                         </div>
                                         <div style={{ display: "flex" }}>
                                             <label>Document Seq:</label>
                                             <p>{masterRule4.docSeq}</p>
                                         </div>
                                         <div style={{ display: "flex" }}>
                                             <label>Rule Name:</label>
                                             <p>{masterRule4.ruleName}</p>
                                         </div>
                                     </div>
                                     <div style={{ marginLeft: '3rem' }}>
                                         <div style={{ display: "flex" }}>
                                             <label>Weighting%:</label>
                                             <p>{masterRule4.weighting}</p>
                                         </div>
                                         <div style={{ display: "flex" }}>
                                             <label>Number Conditions:</label>
                                             <p>{masterRule4.numberConditions}</p>
                                         </div>
                                         <div style={{ display: "flex" }}>
                                             <label>Status:</label>
                                             <p>{masterRule4.statusCode}</p>
                                         </div>
                                     </div>


                                 </div>
                                 <div style={{ display: "flex" }}>
                                     <label>Description:</label>
                                     <p>{masterRule4.description}</p>
                                 </div>
                                 
                             </form>
                         </div>
                         
                     </div>

                 </section>
                 <section id="card">
                     <div className="well">
                         <h1>Delete Risk Rule </h1>
                         <div className="warring_card">
                             <h2>NOTE</h2>
                             <p>THIS RISK RULE HAS NEVER BEEN DEPLOYED</p>
                         </div>
                         <br />
                         <div className="button">
                             <button disabled={validforbtndeleteUndeployed} onClick={handleConfirmedforDelete} type="button" className="btn  btn-md btn-save" style={{width: '10rem'}}>Confirm Deletion</button>
                             <button onClick={handleReview} type="button" className="btn  btn-md btn-save" style={{ marginRight: '0.5rem', float:'left', width: '10rem' }}>Review Rules</button>
                             {/* <button onClick={ReviewRuleRevisions} type="button" className="btn  btn-md btn-save" style={{ marginRight: '0.5rem', float:'left', width: '12.5rem' }}>Review Rule Revisions</button> */}
                             <button onClick={btnBack} type="button" style={{ marginRight: '0.5rem', }} className="btn btn-md  btn-back">Back</button>

                         </div>
                     </div>
                 </section>            
             </div>
         </div>
    </div>
  );
};
export default RiskRuleDeleteLive;
