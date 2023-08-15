import axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { number, string } from 'yup';

const DeployThresholdCondition = () =>{
  const navigate = useHistory();
  const location = useLocation();
  const { state } = location.state;
  const [Id, setId] = useState([]);
  const [thresholdData, setThresholdData] = useState([]);
  const [todo, setTodo] = useState([]);


  const [validDeploy , setvalidDeploy] =  useState(false);
  const [validCondtion , setvalidCondtion] =  useState(false);
  const [validError , setvalidError] =  useState(false);


  const [thresholdRevision, setthresholdRevision] = useState([]);
  const [ischecked, setIschecked] = useState("");
  const [validselectRiskRule, setvalidselectRiskRule] = useState(false);
  const [thresholdData2, setThresholdData2] = useState([]);
  const [todo2, setTodo2] = useState([]);
  const [seqRes, setSeqres] = useState("");
  const [conditionRef, setconditionRef] = useState([]);
  const [caseType, setCaseType] = useState([]);
  const [validDeployRev , setvalidDeployRev] =  useState(false);
  const [validReviewRev , setvalidReviewRev] =  useState(false);
  const [validDisplayRev , setvalidDisplayRev] =  useState(false);

  useEffect(async () => {
    const id = state.id;
    axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/MasterThreshold/GetAllWithStatus?id=${id}`
      )
      .then((res) => {
        setThresholdData(res.data);
        axios
        .get(
          process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/ThresholdCondition/GetAllBYMasterThresholdId?id=${id}&RevisionNo=${res.data.revisionNo}`
        )
        .then((res) =>{ 
          setTodo(res.data);
          if(res.data.length == 0){
            debugger;
            setvalidCondtion(true);
            setvalidError(false);
          }
          else{
            setvalidCondtion(false);
            setvalidError(true);
          }
        }
        )
        .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
      setvalidDeployRev(false)
       setvalidReviewRev(true)
      setvalidDisplayRev(true)
  }, []);

  const btnDeploy = () => {
    debugger;
    console.log(state.id);
    Swal.fire({
      title: 'Are you sure you want to Deploy?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel"
    }
    ).then((result) => {
      if (result.isConfirmed) {
        debugger;
        axios
          .put(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION + `/MasterThreshold/UpdateForModifyStatus?id=${state.id}&code=${0}`)
          .then((res) => {
            debugger;
            console.log(res.data);  
          })
          .catch((err) => console.log(err));
          
          setvalidDeploy(true);
          toast.success("Deployed Successfully");
      }
    });
  }

  const btnThresholdRev = () => {
    axios
    .get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION + `/MasterThreshold/GetAllWithDocumentTypebyDocType?id=${thresholdData.documentTypeId}`)
    .then((res) => {
      debugger;
      console.log(res.data);
      setthresholdRevision(res.data);
      setvalidDeployRev(true)
      setvalidReviewRev(false)
      setvalidDisplayRev(true)  
    })
    .catch((err) => console.log(err));
  }

  
  const btnBack = () => {
    navigate.push(`/deploythresholdrevisionpage`);
  }

const selectThreshold = () => {
  const id = ischecked;
    axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/MasterThreshold/GetAllWithoutStatusValidation?id=${id}`
      )
      .then((res) => {
        setThresholdData2(res.data);
        debugger;
        axios
          .get(
            process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/ThresholdCondition/GetSqNo?id=${id}&RevisionNo=${res.data.revisionNo}`
          )
          .then((res) => setSeqres(res.data + 1))
          .catch((err) => console.log(err));

        // setTodo
        axios
          .get(
            process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/ThresholdCondition/GetAllBYMasterThresholdId?id=${id}&RevisionNo=${res.data.revisionNo}`
          )
          .then((res) => setTodo2(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    //conditionref
    axios
      .get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/ConditionRef/GetAllIDs`)
      .then((res) => setconditionRef(res.data))
      .catch((err) => console.log(err));

    //caseref
    axios
      .get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/CaseTypeRef/GetAllIDs`)
      .then((res) => setCaseType(res.data))
      .catch((err) => console.log(err));

      setvalidDeployRev(true)
      setvalidReviewRev(true)
      setvalidDisplayRev(false)
} 


  const handlecheck = (e) => {
    setIschecked(e.target.value)
    setvalidselectRiskRule(string().required().isValidSync(e.target.value));
}

const bckbtn = (e) => {
  setvalidDeployRev(true)
  setvalidReviewRev(false)
  setvalidDisplayRev(true)
}

const BckBtnSelection = (e) => {
  setvalidDeployRev(false)
  setvalidReviewRev(true)
  setvalidDisplayRev(true)
}


//Pagination
const [pageNumber, setPageNumber] = useState(0);
const [serielNum, setSerielNum] = useState(1);
const dataPerPage = 10;
const dataVisited = pageNumber * dataPerPage;

for (var i = 0; i < thresholdRevision.length; i++) {
    thresholdRevision[i]["sno"] = i + 1;
}

const displayData = thresholdRevision.slice(dataVisited, dataVisited + dataPerPage).map((item, index) => (
    <tr key={item.id}>
    <th scope="row">{item.sno}</th>
    <td>{item.id} </td>
    <td>{item.revisionNo}</td>
    <td>{item.description}</td>
    <td>{item.createdDate}</td>
    <td>{item.statusCode}</td>
    <td>
        <form>
            <input type="radio" value={item.id} checked={ischecked == item.id ? true : false} onChange={handlecheck} style={{ width: "1rem" }} />
        </form>
    </td>
    </tr>
));
const PageCount = Math.ceil(thresholdRevision.length / dataPerPage);
const chnagePage = ({ selected }) => {
    setPageNumber(selected);
}
//Pagination 

    return(
        <div>
             <ToastContainer />
      <div className="row">
        <div hidden={validDeployRev} className="col-md-10 col-lg-10">
          <section id="card">
            <div className="well">
              <h1 style={{ marginTop: "0rem" }}>
                Deploy Threshold Revision
              </h1>
              <div style={{ display: "flex" }}>
                <label>Threshold ID:</label>
                <p>{state.id}</p>
                <br />
                <label className="ml-5">Document Type:</label>
                <p>{thresholdData.documentType}</p>
                <br />
              </div>
              <div style={{ display: "flex" }}>
                <label>Descripton:</label>
                <p>{thresholdData.description}</p>
                <br />
              </div>
              <div style={{ display: "flex", textAlign: "center" }}>
                <label>Revision No:</label>
                <p>{thresholdData.revisionNo}</p>
                <br />
                <label className="ml-5">Status:</label>
                <p>{thresholdData.statusCode}</p>
                <br />
              </div>
            </div>
          </section>

          <section id="card">
            <div className="well">
              <h1 style={{ marginTop: "0rem" }}>
                Deploy Threshold Condition
              </h1>
              <table
                className="table table-striped"
                style={{ marginTop: "1rem" }}
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Seq No.</th>
                    <th scope="col">From Condition</th>
                    <th scope="col">From Score</th>
                    <th scope="col">To Condition</th>
                    <th scope="col">To Score</th>
                    <th scope="col">Case Type</th>
                  </tr>
                </thead>
                <tbody>
                {todo.map((item, index) => (
                    <tr>
                      <th scope="col">{item.seqNo}</th>
                      <th hidden scope="col">{item.fromScoreCondition}</th>
                      <th scope="col">{item.fromScoreConditionValue}</th>
                      <th scope="col">{item.fromScore}</th>
                      <th hidden scope="col">{item.toScoreCondition}</th>
                      <th scope="col">{item.toScoreConditionValue}</th>
                      <th scope="col">{item.toScore}</th>
                      <th scope="col">{item.caseTypeRef}</th>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="button">
                <button 
                onClick={btnDeploy} disabled={validDeploy} type="button" className="btn  btn-md btn-save ml-2">
                  Deploy
                </button>
                <button
                onClick={btnThresholdRev}
                  type="button"
                  className="btn  btn-md btn-save"
                  style={{ width: "11.5rem" }}
                >
                  Threshold Revisions
                </button>
                <button
                onClick={btnBack}
                  type="button"
                  className="btn btn-md  btn-back"
                  style={{ width: "7rem" }}
                >
                  Back
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div hidden={validReviewRev}>
            <div className="row" >
                <div className="col-md-10 col-lg-10">
                    <section id="card">
                        <div className="well">
                            <h1 style={{ marginTop: '0rem' }}>Review Threshold Revision </h1>
                            <div style={{ display: 'flex' }}>
                                <label>Document Type:</label>
                                <p>{thresholdData.documentType}</p>
                                <br />
                            </div>
                        </div>
                    </section>

                    <section id="card">
                        <div className="well" >
                            <h1 style={{ marginTop: '0rem' }}> Review Threshold Revision  </h1>
                            <table className="table table-striped" style={{ marginTop: "1rem" }}>
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Thershold ID</th>
                                        <th scope="col">Rev No.</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Dated</th>
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
                                previousClassName={displayData.length < 9 && thresholdRevision.length > 10 ? "prevbtn" : "prevbtn2"}
                                nextClassName={displayData.length > 9 ? "nextbtn" : "nextbtn2"}
                                activeClassName={"activepage"}

                            />
                              <hr style={{ border: '1px solid #2d3f61' }} />
                    <div className="inner-card">
                        <form className="ml-auto" method="post">
                            <h1 >Threshold Selection </h1>
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

                                    <button disabled={validselectRiskRule ? false : true} onClick={selectThreshold}  type="button" className="btn  btn-md btn-save" style={{ width: '14rem', height: '40px', marginTop:'-6px' }}>Select Threshold</button>

                                </div>
                            </div>


                        </form>

                    </div>
                            <div className="button">
                             
                                <button onClick={BckBtnSelection} type="button" className="btn btn-md  btn-back" style={{ width: '', marginRight: '0rem' }}>Back</button>

                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        <div className="col-md-10 col-lg-10">
          <div hidden={validDisplayRev}>
    <section id="card">
      <div className="well">
        <h1 style={{ marginTop: "0rem" }}>Display Threshold Revision</h1>
        <div style={{ display: "flex" }}>
          <label>Threshold ID:</label>
         <p>{ischecked}</p>
          <br />
          <label className="ml-5">Document Type:</label>
          <p>{thresholdData2.documentType}</p>
          <br />
        </div>
        <div style={{ display: "flex" }}>
          <label>Descripton:</label>
          <p>{thresholdData2.description}</p>
          <br />
        </div>
        <div style={{ display: "flex", textAlign: "center" }}>
          <label>Revision No:</label>
          <p>{thresholdData2.revisionNo}</p>
          <br />
          <label className="ml-5">Status:</label>
          <p>{thresholdData2.statusCode}</p>
          <br />
        </div>
      </div>
    </section>

    <section id="card">
      <div className="well">
        <h1 style={{ marginTop: "0rem" }}>Display Threshold Condition</h1>
        <table
          className="table table-striped"
          style={{ marginTop: "1rem" }}
        >
          <thead className="thead-dark">
            <tr>
              <th scope="col">Seq No.</th>
              <th scope="col">From Condition</th>
              <th scope="col">From Score</th>
              <th scope="col">To Condition</th>
              <th scope="col">To Score</th>
              <th scope="col">Case Type</th>
            </tr>
          </thead>
          <tbody>
            {todo2.map((item, index) => (
              <tr>
                <th scope="col">{item.seqNo}</th>
                <th hidden scope="col">{item.fromScoreCondition}</th>
                <th scope="col">{item.fromScoreConditionValue}</th>
                <th scope="col">{item.fromScore}</th>
                <th hidden scope="col">{item.toScoreCondition}</th>
                <th scope="col">{item.toScoreConditionValue}</th>
                <th scope="col">{item.toScore}</th>
                <th scope="col">{item.caseTypeRef}</th>
              
              </tr>
            ))}
          </tbody>
        </table>
        <hr style={{ border: "1px solid #2d3f61" }} />
       
        <div className="button">
          <button
         onClick={bckbtn}
            type="button"
            className="btn btn-md  btn-back"
            style={{ width: "7rem" }}
          >
            Back
          </button>
        </div>
      </div>
    </section>
    </div>
  </div>
    </div>
    )
}
export default DeployThresholdCondition