import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory, useLocation } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { number, string } from 'yup';
import { ToastContainer, toast } from 'react-toastify';

const DeployRiskRule = () => {
  let history = useHistory();
  const navigate = useHistory();
  const [selectmasterRule, setSelectMasterRule] = useState([]);
  const [masterRule, setMasterRule] = useState([]);
  const [RunId, setRubId] = useState("");
  const [changeDescription, setChangeDescription] = useState("");

  const [selectmasterRule2, setSelectMasterRule2] = useState([]);
  const [masterRule2, setMasterRule2] = useState([]);
  const [relationRule, setRelationRule] = useState([]);


  const [ruleSelection, setruleSelection] = useState([]);
  const [masterRule3, setMasterRule3] = useState([]);
  const [ruleId2, setRuleId2] = useState("");
  const [values, setValues] = useState({});
  const [ischecked, setIschecked] = useState("");
  const [validselectRiskRule, setvalidselectRiskRule] = useState(false);
  const [RiskRule, setRiskRule] = useState([]);
  const [masterRule4, setmasterRule4] = useState([]);
  const [masterCondition, setmasterCondition] = useState([]);
  const [todoValues, setTodoValues] = useState([]);

  const [validSelectRiskRuleSeq, setvalidSelectRiskRuleSeq] = useState(false);
  const [validDeployRiskRule, setvalidDeployRiskRule] = useState(true);
  const [validReviewRuleRevision, setvalidReviewRuleRevision] = useState(true);
  const [validReviewRuleDecision, setvalidReviewRuleDecision] = useState(true);
  const [validAlreadyDeployRiskRule, setvalidAlreadyDeployRiskRule] = useState(true);

  const [fieldHeader1, setfieldHeader1] = useState([]);
  const [fieldHeader2, setfieldHeader2] = useState([]);
  const [fieldHeader3, setfieldHeader3] = useState([]);
  const [fieldHeader4, setfieldHeader4] = useState([]);
  const [fieldHeader5, setfieldHeader5] = useState([]);
  const [fieldHeader6, setfieldHeader6] = useState([]);


  const [masterRule5,setMasterRule5] = useState([]);
  const [RunId2,setRunId2] = useState([]);

  const [checkforalreadydeploy, setcheckforalreadydeploy] = useState(false);
  const [checkfordecsion, setcheckfordecsion] = useState(false);
  const [checkfordeploybtn, setcheckfordeploybtn] = useState(false);

  const [search, setSearch] = useState("");


  useEffect(() => {
    axios.get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION + `/MasterRule/GetMasterRuleforDeploy`).then((res) => {
      setruleSelection(res.data);
    }).catch((err) => console.log(err))

  }, []);

  const handlechange = (e) => {
    const id = e.target.value;
    //getAllBtId not working
    axios.get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION + `/MasterRule/GetAllById?id=${id}`).then((res) => setMasterRule(res.data)).then((err) => console.log(err));
    axios.get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION + `/RiskRule/GetRULE_RUN_NO?id=${id}`).then((res) => setRubId(res.data)).then((err) => console.log(err));

  }

  const handlechange2 = (e) => {
    const id = e.target.value;

    // setRuleId(id);
    axios
      .get(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + `/RiskRule/GetAllWithRelationByRuleId?id=${id}`)
      .then((res) => setRelationRule(res.data))
      .then((err) => console.log(err));

    axios
      .get(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + `/MasterRule/GetAllById?id=${id}`)
      .then((res) => setMasterRule(res.data))
      .then((err) => console.log(err));
  };

  const handleConfirmed = (e) => {
    debugger;
    if(changeDescription == ""){
      toast.error("Description is not filled");
      return false;
    }
    axios.post(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION + `/RiskRule/Add`, {
      changeDescription: changeDescription,
      ruleId: masterRule3.ruleId,
      documentTypeId: masterRule3.documentTypeId,
      threatGroupId: masterRule3.threatGroupId,
      ruleTypeRefId: masterRule3.ruleTypeRefId,
      caseTypeRefId: masterRule3.caseTypeRefId,
      docSeq: masterRule3.docSeq,
      ruleName: masterRule3.ruleName,
      description: masterRule3.description,
      ruleMethod: masterRule3.ruleMethod,
      weighting: masterRule3.weighting,
      numberConditions: masterRule3.numberConditions,
      statusRef: masterRule3.statusRef,

    }).then((res) => console.log(res)).then((err) => console.log(err));
    toast.success("Risk Rule Deployed Successfully");
    setcheckfordeploybtn(true);
  }
  const handleNext = () => {
    console.log(ruleId2);
    console.log(checkfordecsion);
    axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +
        `/MasterRule/GetAllById?id=${ruleId2}`
      )
      .then((res) => {
        console.log(res.data);
        setmasterRule4(res.data);
        setvalidSelectRiskRuleSeq(true);
        setvalidDeployRiskRule(true);
        setvalidReviewRuleRevision(true);
        setvalidReviewRuleDecision(false);
        setvalidAlreadyDeployRiskRule(true);
        getdata(parseInt(ruleId2));
        getvalues(parseInt(ruleId2));
        if(res.data.ruleMethod =="C"){
            setcheckfordecsion(true);
        }else if(res.data.ruleMethod =="D"){
          setcheckfordecsion(false);
      }
      })
      .catch((err) => console.log(err));
  }


  const getdata = (e) => {
    axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +
        `/MasterCondition/GetAllByMasterRuleId?id=${e}`
      )
      .then((res) => {
        setmasterCondition(res.data);
        if (res.data.length == 1) {
          setfieldHeader1(res.data[0].fieldName);
        } else if (res.data.length == 2) {
          setfieldHeader1(res.data[0].fieldName);
          setfieldHeader2(res.data[1].fieldName);
        } else if (res.data.length == 3) {
          setfieldHeader1(res.data[0].fieldName);
          setfieldHeader2(res.data[1].fieldName);
          setfieldHeader3(res.data[2].fieldName);
        } else if (res.data.length == 4) {
          setfieldHeader1(res.data[0].fieldName);
          setfieldHeader2(res.data[1].fieldName);
          setfieldHeader3(res.data[2].fieldName);
          setfieldHeader4(res.data[3].fieldName);
        } else if (res.data.length == 5) {
          setfieldHeader1(res.data[0].fieldName);
          setfieldHeader2(res.data[1].fieldName);
          setfieldHeader3(res.data[2].fieldName);
          setfieldHeader4(res.data[3].fieldName);
          setfieldHeader5(res.data[4].fieldName);
        } else if (res.data.length == 6) {
          setfieldHeader1(res.data[0].fieldName);
          setfieldHeader2(res.data[1].fieldName);
          setfieldHeader3(res.data[2].fieldName);
          setfieldHeader4(res.data[3].fieldName);
          setfieldHeader5(res.data[4].fieldName);
          setfieldHeader6(res.data[5].fieldName);
        }

      })
      .catch((err) => console.log(err));
  };


  const getvalues = (e) => {
    axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +
        `/MasterDecision/GetAllByMasterRuleId?id=${e}`
      )
      .then((res) => setTodoValues(res.data))
      .catch((err) => console.log(err));
      if(todoValues.length > 0){
        setcheckfordecsion(false);
      }
      else{
        setcheckfordecsion(true);
      }
  };
  const ReviewRuleRevisions = () => {
    axios.get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION + `/RiskRule/GetAllWithRelationByRuleId?id=${masterRule3.ruleId}`).then((res) => setRiskRule(res.data)).then((err) => console.log(err));
    setvalidSelectRiskRuleSeq(true);
    setvalidDeployRiskRule(true);
    setvalidReviewRuleRevision(false);
    setvalidReviewRuleDecision(true);
    setvalidAlreadyDeployRiskRule(true);
    console.log(RiskRule);
  }
  const bckdeployRiskRule = () => {
    window.location.reload(true);
    // setvalidSelectRiskRuleSeq(false);
    // setvalidDeployRiskRule(true);
    // setvalidReviewRuleRevision(true);
    // setvalidReviewRuleDecision(true);
  }

  const bckreviewRuleRevision = () => {
    if(checkforalreadydeploy){
      setvalidSelectRiskRuleSeq(true);
      setvalidDeployRiskRule(true);
      setvalidReviewRuleRevision(true);
      setvalidReviewRuleDecision(true);
      setvalidAlreadyDeployRiskRule(false);
    }else{
      setvalidSelectRiskRuleSeq(true);
      setvalidDeployRiskRule(false);
      setvalidReviewRuleRevision(true);
      setvalidReviewRuleDecision(true);
      setvalidAlreadyDeployRiskRule(true);
    }
    setcheckfordecsion(false);
  }

  const bckreviewRuleDecision = () => {
    if(checkforalreadydeploy){
      setvalidSelectRiskRuleSeq(true);
      setvalidDeployRiskRule(true);
      setvalidReviewRuleRevision(true);
      setvalidReviewRuleDecision(true);
      setvalidAlreadyDeployRiskRule(false);
    }else{
      setvalidSelectRiskRuleSeq(true);
      setvalidDeployRiskRule(false);
      setvalidReviewRuleRevision(true);
      setvalidReviewRuleDecision(true);
      setvalidAlreadyDeployRiskRule(true);
  }
  setcheckfordecsion(false);
  }

  const handlecheck = (e) => {
    setIschecked(e.target.value)
    setvalidselectRiskRule(string().required().isValidSync(e.target.value));
  }
  const SelectRiskRuleforDeploy = (e) => {
    const ruleId = e;

    axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +
        `/MasterRule/GetAllById?id=${ruleId}`
      )
      .then((res) => {
        console.log(res.data);
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
    setRuleId2(ruleId);
    setvalidSelectRiskRuleSeq(true);
    setvalidDeployRiskRule(false);
    setvalidReviewRuleRevision(true);
    setvalidReviewRuleDecision(true);
    setvalidAlreadyDeployRiskRule(true);
    setcheckforalreadydeploy(false);

  }

  const SelectRiskRuleforAlreadyDeploy = (e) => {
    axios.get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/MasterRule/GetAllById?id=${e}`).then((res)=> setMasterRule3(res.data)).then((err)=> console.log(err));
    axios.get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/RiskRule/GetAllById?id=${e}`).then((res)=> setRunId2(res.data)).then((err)=> console.log(err));
    setRuleId2(e);
    setvalidSelectRiskRuleSeq(true);
    setvalidAlreadyDeployRiskRule(false);
    setvalidDeployRiskRule(true);
    setvalidReviewRuleRevision(true);
    setvalidReviewRuleDecision(true);
    setcheckforalreadydeploy(true);
    
  }

  const bckbutton = () => {
  };

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
      <td>{item.ruleTypeRef == "D" ? "Deductive" : item.ruleTypeRef == "I" ? "Inductive" : ""}  </td>
      <td>{item.docSeq}</td>
      <td>{item.ruleName}</td>
      <td>{item.documentType}</td>
      <td>{item.ruleMethod == "D" ? "Decision" : item.ruleMethod == "C" ? "Count" : ""}</td>
      <td>{item.statusCode}</td>


      <td>
        <div>
          <input hidden={item.statusCode == "Created" || item.statusCode == "Updated" ? false : true} className="btn  btn-md btn-back" value={"Deploy"} type="button" onClick={(e) => SelectRiskRuleforDeploy(item.ruleId)} style={{ width: '5rem', marginRight: '1.7rem' }} />
          <input hidden={item.statusCode == "Deployed" ? false : true} className="btn  btn-md btn-save" value={"Already Deploy"} type="button" onClick={(e) => SelectRiskRuleforAlreadyDeploy(item.ruleId)} style={{ width: '8.5rem', marginTop: '5px' }} />
        </div>

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
      <div hidden={validSelectRiskRuleSeq}>
        <section id="card">
          <div className="well" style={{ width: '64rem' }}>
            <h1 >Select Risk Rule </h1>
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
                  <th scope="col">Rule Name</th>
                  <th scope="col">Threat Group</th>
                  <th scope="col">Method</th>
                  <th scope="col">Status</th>
                  <th style={{ width: "10rem" }} scope="col">Action</th>

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
          </div>
        </section>
      </div>
      <div hidden={validDeployRiskRule} className="row">
        <div className="col-md-10 col-lg-10">
          <section id="card">
            <div className="well">
              <h1>Deploy Risk Rule </h1>
              <div>
                <form className="ml-auto" method="post">
                  <div style={{ display: 'flex' }}>
                    <div>
                      <div style={{ display: 'flex' }}>
                        <label>Rule ID:</label>
                        <p>{masterRule3.ruleId}</p>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <label >Document Type:</label>
                        <p>{masterRule3.documentType}</p>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <label>Threat Group:</label>
                        <p>{masterRule3.threatGroup}</p>
                      </div>
                    </div>
                    <div style={{ marginLeft: '3rem' }}>
                      <div style={{ display: "flex" }}>
                        <label>Run Number:</label>
                        <p>Run Number</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Rule Type:</label>
                        <p>{masterRule3.ruleTypeRef == "D" ? "Deductive" : masterRule3.ruleTypeRef == "I" ? "Inductive" : ""}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Rule Method:</label>
                        <p>{masterRule3.ruleMethod == "D" ? "Decision" : masterRule3.ruleMethod == "C" ? "Count" : ""}</p>
                      </div>

                    </div>
                    <div style={{ marginLeft: '3rem' }}>
                      <div style={{ display: "flex" }}>
                        <label>Case Type:</label>
                        <p>{masterRule3.caseTypeRef}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Document Seq:</label>
                        <p>{masterRule3.docSeq}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Rule Name:</label>
                        <p>{masterRule3.ruleName}</p>
                      </div>
                    </div>
                    <div style={{ marginLeft: '3rem' }}>
                      <div style={{ display: "flex" }}>
                        <label>Weighting%:</label>
                        <p>{masterRule3.weighting}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Number Conditions:</label>
                        <p>{masterRule3.numberConditions}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Status:</label>
                        <p>{masterRule3.statusCode}</p>
                      </div>
                    </div>


                  </div>
                  <div style={{ display: "flex" }}>
                    <label>Description:</label>
                    <p>{masterRule3.description}</p>
                  </div>

                </form>

              </div>

            </div>

          </section>
          <section id="card">
            <div className="well">
              <h1>Deploy Risk Rule </h1>
              <div>
                <form className="ml-auto" method="post">
                  <label className="discription">Change Description</label>
                  <br />
                  <textarea onChange={(e) => setChangeDescription(e.target.value)} id="w3review" name="w3review" rows="4" type="text" style={{ height: '5rem' }}></textarea>
                  <div style={{ display: 'flex' }}>
                    <label >Rule Rev No:</label>
                    <p>{RunId}</p>
                    {/* <label >Confirmed:</label>
                    <input onChange={handleConfirmed} style={{ width: '100px', marginLeft: 10 }} /> */}


                  </div>
                  <button disabled={checkfordeploybtn} onClick={handleConfirmed}  type="button" className="btn  btn-md btn-save" style={{ width: '10rem' }}>Deploy</button>


                </form>
              </div>
              <br />
              <div className="button">
                <button onClick={handleNext} type="button" className="btn  btn-md btn-save" style={{ width: '10rem' }}>Rule Detail</button>

                <button onClick={ReviewRuleRevisions} type="button" className="btn  btn-md btn-save" style={{ marginRight: '0.5rem', float: 'left', width: '12.5rem' }}>Review Rule Revisions</button>
                <button onClick={bckdeployRiskRule} type="button" style={{ marginRight: '0.5rem', }} className="btn btn-md  btn-back">Back</button>

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
                        <p>{masterRule3.ruleName}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Rule Type: </label>
                        <p>{masterRule3.ruleTypeRef == "D" ? "Deductive" : masterRule3.ruleTypeRef == "I" ? "Inductive" : ""} </p>
                      </div>

                      <div style={{ display: "flex" }}>
                        <label>Description:</label>
                        <p>{masterRule3.description}</p>
                        <br />
                      </div>
                    </div>
                    <div style={{ marginLeft: '3rem' }}>
                      <div style={{ display: "flex" }}>
                        <label>Threat Group:</label>
                        <p>{masterRule3.threatGroup}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Rule Method:</label>
                        <p>{masterRule3.ruleMethod == "D" ? "Decision" : masterRule3.ruleMethod == "C" ? "Count" : ""}</p>
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
      <div hidden={validReviewRuleDecision} className="row">
        <div className="col-md-10 col-lg-10">
          <section id="card">
            <div className="well">
              <h1 style={{ marginTop: "0rem" }}>
                Review Risk Rule Decision
              </h1>
              <div style={{ display: "flex" }}>
                <div>
                  <div style={{ display: "flex" }}>
                    <label>Rule ID:</label>
                    <p>{masterRule4.ruleId}</p>
                  </div>

                  <div style={{ display: "flex" }}>
                    <label>Document Type:</label>
                    <p>{masterRule4.documentType}</p>
                    <p hidden>{masterRule4.documentTypeId}</p>
                  </div>

                  <div style={{ display: "flex" }}>
                    <label>Threat Group:</label>
                    <p>{masterRule4.threatGroup}</p>
                    <p hidden>{masterRule4.threatGroupId}</p>
                  </div>
                  <div style={{ display: "flex" }}>
                    <label>Number Conditions:</label>
                    <p>{masterRule4.numberConditions}</p>
                  </div>
                </div>
                <div style={{ marginLeft: "4rem" }}>
                  <div style={{ display: "flex" }}>
                    <label>Rule Type:</label>
                    <p>{masterRule4.ruleTypeRef === "D" ? "Deductive" : masterRule4.ruleTypeRef === "I" ? "Inductive" : ""}</p>
                    <p hidden>{masterRule4.ruleId}</p>
                  </div>

                  <div style={{ display: "flex" }}>
                    <label>Rule Method:</label>
                    <p>{masterRule4.ruleMethod}</p>
                    {masterRule4.ruleMethod === "C" ? (
                      <p>(Count)</p>
                    ) : <></> && masterRule4.ruleMethod === "D" ? (
                      <p>(Decision)</p>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div style={{ display: "flex" }}>
                    <label>Case Type:</label>
                    <p>{masterRule4.caseTypeRef}</p>
                    <p hidden>{masterRule4.caseTypeRefId}</p>
                  </div>
                </div>
                <div style={{ marginLeft: "4rem" }}>
                  <div style={{ display: "flex" }}>
                    <label>Document Seq:</label>
                    <p>{masterRule4.docSeq}</p>
                  </div>

                  <div style={{ display: "flex" }}>
                    <label>Rule Name:</label>
                    <p>{masterRule4.ruleName}</p>
                  </div>

                  <div style={{ display: "flex" }}>
                    <label>Weighting %:</label>
                    <p>{masterRule4.weighting}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="card">
            <div className="well">
              <h1 style={{ marginTop: "0rem" }}> Conditions </h1>
              <div style={{ display: "flex" }}>


                <div>
                  <label>Field Name: </label>
                  <br />
                  <label>Condition Value:</label>
                </div>
                {masterCondition.map((e) => (
                  <div style={{ marginLeft: 'auto' }}>
                    <p>{e.fieldName}</p>

                    <p> {e.conditionValueName}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section  id="card">
            <div className="well">
              <div hidden={checkfordecsion}>
              <h1 style={{ marginTop: "0rem" }}>
                Risk Rule Decision
              </h1>
              <table
                className="table table-striped"
                style={{ marginTop: "1rem" }}
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Ref</th>
                    <th scope="col">Score </th>
                    <th scope="col">{fieldHeader1 == "" ? "-" : fieldHeader1}</th>
                    <th scope="col">{fieldHeader2 == "" ? "-" : fieldHeader2}</th>
                    <th scope="col">{fieldHeader3 == "" ? "-" : fieldHeader3}</th>
                    <th scope="col">{fieldHeader4 == "" ? "-" : fieldHeader4}</th>
                    <th scope="col">{fieldHeader5 == "" ? "-" : fieldHeader5}</th>
                    <th scope="col">{fieldHeader6 == "" ? "-" : fieldHeader6}</th>
                  </tr>
                </thead>
                <tbody>
                  {todoValues.map((e, i) => (
                    <tr>
                      <td>{e.id}</td>
                      <td>{e.scoreValue}</td>
                      <td>{e.fieldName1 == "" ? "-" : e.fieldName1}</td>
                      <td>{e.fieldName2 == "" ? "-" : e.fieldName2}</td>
                      <td>{e.fieldName3 == "" ? "-" : e.fieldName3}</td>
                      <td>{e.fieldName4 == "" ? "-" : e.fieldName4}</td>
                      <td>{e.fieldName5 == "" ? "-" : e.fieldName5}</td>
                      <td>{e.fieldName6 == "" ? "-" : e.fieldName6}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr style={{ border: "1px solid #2d3f61" }} />
              </div>
              <div className="button">
                <button
                  onClick={bckreviewRuleDecision}
                  type="button"
                  className="btn  btn-md btn-back"
                  style={{ marginTop: '-1rem' }}
                >
                  Back
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div hidden={validAlreadyDeployRiskRule} className="row">
            <div className="col-md-10 col-lg-10">
                <section id="card">
                    <div className="well">
                        <h1>Risk Rule Already Deploy Or Deleted</h1>
                        <div>
                            <form className="ml-auto" method="post">
                            <div style={{ display: 'flex' }}>
                                    <div>
                                        <div style={{ display: 'flex' }}>
                                            <label>Rule ID:</label>
                                            <p>{masterRule3.ruleId}</p>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <label >Document Type:</label>
                                            <p>{masterRule3.documentType}</p>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <label>Threat Group:</label>
                                            <p>{masterRule3.threatGroup}</p>
                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '3rem' }}>
                                        <div style={{ display: "flex" }}>
                                            <label>Run Number:</label>
                                            <p>1</p>
                                        </div>
                                        <div style={{ display: "flex" }}>
                                            <label>Rule Type:</label>
                                            <p>{masterRule3.ruleTypeRef=="D"?"Deductive" :  masterRule3.ruleTypeRef=="I" ? "Inductive":""}</p>
                                        </div>
                                        <div style={{ display: "flex" }}>
                                            <label>Rule Method:</label>
                                            <p>{masterRule3.ruleMethod=="D"?"Decision" :  masterRule3.ruleMethod=="C" ? "Count":""}</p>
                                        </div>

                                    </div>
                                    <div style={{ marginLeft: '3rem' }}>
                                        <div style={{ display: "flex" }}>
                                            <label>Case Type:</label>
                                            <p>{masterRule3.caseTypeRef}</p>
                                        </div>
                                        <div style={{ display: "flex" }}>
                                            <label>Document Seq:</label>
                                            <p>{masterRule3.docSeq}</p>
                                        </div>
                                        <div style={{ display: "flex" }}>
                                            <label>Rule Name:</label>
                                            <p>{masterRule3.ruleName}</p>
                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '3rem' }}>
                                        <div style={{ display: "flex" }}>
                                            <label>Weighting%:</label>
                                            <p>{masterRule3.weighting}</p>
                                        </div>
                                        <div style={{ display: "flex" }}>
                                            <label>Number Conditions:</label>
                                            <p>{masterRule3.numberConditions}</p>
                                        </div>
                                        <div style={{ display: "flex" }}>
                                            <label>Status:</label>
                                            <p>{masterRule3.statusProcess}</p>
                                        </div>
                                    </div>


                                </div>
                                <div style={{ display: "flex" }}>
                                    <label>Description:</label>
                                    <p>{masterRule3.description}</p>
                                </div>

                            </form>
                        </div>
                        <br />
                 
                    </div>

                </section>
                <section id="card">
                    <div className="well">
                        <h1> Risk Rule </h1>
                        <div>
                            <form className="ml-auto" method="post">
                                <label className="discription">Change Description</label>
                                <br /><p>{RunId2.changeDescription}</p>
                                <div style={{display:'flex'}}>
                                <label >Rule Rev No:</label>
                                <p>{RunId2.ruleRunNo}</p>
                                </div>
                                
                            </form>
                        </div>
                        <br />
                        <div className="button"> 
                            <button onClick={handleNext} type="button" className="btn  btn-md btn-save" style={{ width: '10rem' }}>Rule Detail</button>
                            <button onClick={ReviewRuleRevisions} type="button" className="btn  btn-md btn-save" style={{ marginRight: '0.5rem', float: 'left', width: '12.5rem' }}>Review Rule Revisions</button>
                            <button onClick={bckdeployRiskRule} type="button" style={{ marginRight: '0.5rem', }} className="btn btn-md  btn-back">Back</button>
                        </div>
                    </div>
                </section>    
            </div>
        </div>
    </div>
  )
}
export default DeployRiskRule