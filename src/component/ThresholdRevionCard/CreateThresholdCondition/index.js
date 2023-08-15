import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Swal from "sweetalert2";
import ReactPaginate from 'react-paginate';
import { number, string } from 'yup';


const ThresholdConditionsCreate = () => {
  const navigate = useHistory();
  const location = useLocation();
  const { state } = location.state;

  const [Id, setId] = useState([]);
  const [thresholdData, setThresholdData] = useState([]);
  const [seqRes, setSeqres] = useState("");
  const [conditionRef, setconditionRef] = useState([]);
  const [caseType, setCaseType] = useState([]);

  //onchange state
  const [fromCondition, setFromCondition] = useState("");
  const [toCondition, setToCondition] = useState("");
  const [tocaseType, setTocaseType] = useState("");
  const [fromScore, setFromscore] = useState("");
  const [toScore, setToScore] = useState("");
  const [todo, setTodo] = useState([]);

  const [editeddata, setEditedData] = useState(null);

  const [CaseTypeName, setCaseTypeName] = useState(null);


  const [validDeploy , setvalidDeploy] =  useState(false);
  const [thresholdRevision, setthresholdRevision] = useState([]);
  const [ischecked, setIschecked] = useState("");
  const [validselectRiskRule, setvalidselectRiskRule] = useState(false);
  const [thresholdData2, setThresholdData2] = useState([]);
  const [todo2, setTodo2] = useState([]);
  const [seqRes2, setSeqres2] = useState("");
  const [conditionRef2, setconditionRef2] = useState([]);
  const [caseType2, setCaseType2] = useState([]);
  const [validDeployRev , setvalidDeployRev] =  useState(false);
  const [validReviewRev , setvalidReviewRev] =  useState(false);
  const [validDisplayRev , setvalidDisplayRev] =  useState(false);


  const [validFromScore, setvalidFromScore] = useState(false);
  const [validToScore, setvalidToScore] = useState(false);
  

  useEffect(async () => {
    axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/MasterThreshold/GetAllWithStatus?id=${state.id}`
      )
      .then((res) => {
        setThresholdData(res.data);
        console.log(res.data);
        axios
          .get(
            process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/ThresholdCondition/GetSqNo?id=${state.id}&RevisionNo=${res.data.revisionNo}`
          )
          .then((res) => {
            setSeqres(res.data == null ? 1 : res.data + 1);
            console.log(res.data + 1)

          })
          .catch((err) => console.log(err));

        // setTodo
        axios
          .get(
            process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/ThresholdCondition/GetAllBYMasterThresholdId?id=${state.id}&RevisionNo=${res.data.revisionNo}`
          )
          .then((res) => setTodo(res.data))
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
      setvalidDeployRev(false)
      setvalidReviewRev(true)
     setvalidDisplayRev(true)
  }, []);

  const [input, setInput] = useState(
    {
        id:"",
        SeqNo: "",
        FromCondition: "",
        FromScore: "",
        ToCondition: "",
        ToScore: "",
        CaseType:""
    }
)


  const handlechange = (e) => {
    const id = e.target.value;
    axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/MasterThreshold/GetAllWithStatus?id=${state.id}`
      )
      .then((res) => {
        setThresholdData(res.data);
        console.log(res.data);
        axios
          .get(
            process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/ThresholdCondition/GetSqNo?id=${state.id}&RevisionNo=${res.data.revisionNo}`
          )
          .then((res) => {
            setSeqres(res.data + 1);
            console.log(res.data)

          })
          .catch((err) => console.log(err));

        // setTodo
        axios
          .get(
            process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/ThresholdCondition/GetAllBYMasterThresholdId?id=${state.id}&RevisionNo=${res.data.revisionNo}`
          )
          .then((res) => setTodo(res.data))
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
  }; //handlechange

  const handleCange = (e) => {
    debugger;
    const value = e.target.value;
    setInput({ ...input, [e.target.name]: value });

    if(e.target.name == "FromScore"){
      setvalidFromScore(value);
    }
    if(e.target.name == "ToScore"){
      setvalidToScore(value);
    }

    
   
  }

  const bckbtn = (e) => {
    navigate.push(`/thresholdrevisioncreatepage`);
  }

  const handlesubmit = () => {
    if(input.CaseType == "" || input.FromCondition == "" || input.FromScore == "" || seqRes =="" || input.ToCondition =="" || input.ToScore==""){
      toast.error("Fill All The Fields");  
      return false;
    }
    axios
      .post(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/ThresholdCondition/Add`, {
        revisionNo: parseInt(thresholdData.revisionNo),
        seqNo: seqRes,
        documentTypeId: parseInt(thresholdData.documentTypeId),
        fromScoreCondition: input.FromCondition,
        fromScore: input.FromScore,
        toScoreCondition: input.ToCondition,
        toScore: input.ToScore,
        caseTypeRefId: input.CaseType,
        createdDate: "2022-05-10T20:14:27.870Z",
        active: "Y",
        MasterThresholdId: parseInt(thresholdData.id),
      })
      .then((res) => {
        debugger;
        console.log(res.data[0]);
        const data = res.data[0];
        setTodo([...todo,
          {
              id : data.id,
              seqNo : data.seqNo,
              caseTypeRef: data.caseTypeRef,
              fromScore : data.fromScore,
              fromScoreCondition : data.fromScoreCondition,
              fromScoreConditionValue : data.fromScoreConditionValue,
              toScore : data.toScore,
              toScoreCondition: data.toScoreCondition,
              toScoreConditionValue: data.toScoreConditionValue
          }
        ]);
        setSeqres(data.seqNo +1);
        setvalidFromScore(false);
        setvalidToScore(false);
        setInput({
          id: "",
          SeqNo: "",
          FromCondition: "",
          FromScore: "",
          ToCondition: "",
          ToScore: "",
          CaseType:""
        });
        })
      .catch((err) => console.log(err));
      toast.success("Added Successfully");
      
  }; 

  const handleEdit = (id) => {
    const newEditedTodo = todo.find((item) => { return item.id === id });
    setInput({
      id:newEditedTodo.id,
      SeqNo: newEditedTodo.seqNo,
      FromCondition: newEditedTodo.fromScoreCondition,
      FromScore: newEditedTodo.fromScore,
      ToCondition: newEditedTodo.toScoreCondition,
      ToScore: newEditedTodo.toScore,
      CaseType:newEditedTodo.caseTypeRefId
    });
    setEditedData(newEditedTodo.id);
}

const deletehandle = async (id, i) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
}).then((result) => {
    if (result.isConfirmed) {
        if (id != null) {
            axios.delete(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/ThresholdCondition/Remove?id=${id}`)
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
        }

        const newTodo = todo.filter((e) => e.id !== id);
        setTodo(newTodo);
        toast.success("Deleted Successfully");
        
    }
})
}


const refreshBckBtn = (e) => {
  setInput({
    id: "",
    SeqNo: "",
    FromCondition: "",
    FromScore: "",
    ToCondition: "",
    ToScore: "",
    CaseType:""
  });
}

const addTodo = (e) => {
  e.preventDefault();
  Swal.fire({
    title: 'Are you sure you want to Update?',
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel"
}
).then((result) => {  
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({
          "id": input.id,
          "seqNo": input.SeqNo,
          "fromScoreCondition": input.FromCondition,
          "fromScore": input.FromScore,
          "toScoreCondition": input.ToCondition,
          "toScore": input.ToScore,
          "caseTypeRefId":input.CaseType

      });
      
      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      axios
      .put(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/ThresholdCondition/Update`,  {
        id: input.id,
        seqNo: input.SeqNo,
        fromScoreCondition: input.FromCondition,
        fromScore: input.FromScore,
        toScoreCondition: input.ToCondition,
        toScore: input.ToScore,
        caseTypeRefId:input.CaseType
      })
        .then((res) => {
          console.log(res.data[0].caseTypeRef);
          const data = res.data[0].caseTypeRef;
          setCaseTypeName(res.data[0].caseTypeRef);
        })
        .catch(error => console.log('error', error));
      //   setTodo(
      //     todo.map((item) => {
      //         if (item.id === editeddata) {
      //             return {
      //                 ...e,
      //                 id: input.id,
      //                 seqNo: input.SeqNo,
      //                 fromScoreCondition: input.FromCondition,
      //                 fromScore: input.FromScore,
      //                 toScoreCondition : input.ToCondition,
      //                 toScore: input.ToScore,
      //                 caseTypeRefId : CaseTypeName
      //             }

      //         }
      //         return item;
      //     })
      // )
      //window.location.reload(true);
      setvalidFromScore(false);
      setvalidToScore(false);
        toast.success("Updated Successfully");
        setInput({
          id:"",
          SeqNo: "",
          FromCondition: "",
          FromScore: "",
          ToCondition: "",
          ToScore: "",
          CaseType:""
        });

    }

})
}


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

const bckbtn2 = (e) => {
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
  <td>{item.date}</td>
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


  return (
    <div>
          <ToastContainer />
      <div className="row">
        <div hidden={validDeployRev} className="col-md-10 col-lg-10">
          <section id="card">
            <div className="well">
              <h1 style={{ marginTop: "0rem" }}>Create Threshold Condition </h1>
              <div style={{ display: "flex" }}>
                <div>
                  <div style={{ display: "flex" }}>
                    <label>Threshold ID:</label>
                    <p>{state.id}</p>
                  </div>
                  <div style={{ display: "flex" }}>
                    <label>Document Type:</label>
                    <p>{thresholdData.documentType}</p>
                  </div>
                  <div style={{ display: "flex" }}>
                    <label>Descripton:</label>
                    <p>{thresholdData.description}</p>
                  </div>

                </div>
                <div style={{ marginLeft:'3rem'}}>
                  <div style={{ display: "flex" }}>
                    <label>Status:</label>
                    <p>{thresholdData.statusCode}</p>
                  </div>
                  <div style={{ display: "flex" }}>
                    <label>Revision No:</label>
                    <p>{thresholdData.revisionNo}</p>
                  </div>

                </div>
              </div>

            </div>
          </section>

          <section id="card">
            <div className="well">
              <h1 style={{ marginTop: "0rem" }}>
                {" "}
                Create Threshold Condition{" "}
              </h1>
              <table
                className="table table-striped"
                style={{ marginTop: "1rem" }}
              >
                <thead className="thead-dark">
                  <tr>
                  <th hidden scope="col">ID</th>
                    <th scope="col">Seq No.</th>
                    <th scope="col">From Condition</th>
                    <th scope="col">From Score</th>
                    <th scope="col">To Condition</th>
                    <th scope="col">To Score</th>
                    <th scope="col">Case Type</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {todo.map((item, index) => (
                    <tr key={index} >
                       <th hidden scope="col">{item.id}</th>
                      <th scope="col">{item.seqNo}</th>
                      <th hidden scope="col">{item.fromScoreCondition}</th>
                      <th scope="col">{item.fromScoreConditionValue}</th>
                      <th scope="col">{item.fromScore}</th>
                      <th hidden scope="col">{item.toScoreCondition}</th>
                      <th scope="col">{item.toScoreConditionValue}</th>
                      <th scope="col">{item.toScore}</th>
                      <th scope="col">{item.caseTypeRef}</th>
                      <td>
                        {/* <button 
                        onClick={() => handleEdit(item.id)} data-toggle="modal" data-target="#myModal" style={{ border: 'none' }}><i className="fas fa-edit"></i>
                        </button> */}
                      <i onClick={() => deletehandle(item.id, index)} class="fa fa-trash ml-4" aria-hidden="true"></i></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr style={{ border: "1px solid #2d3f61" }} />
              <form className="ml-auto" method="post">
                <h1>Entry </h1>
                <div style={{ display: "flex" }}>
                  <div>
                    <label className="">Seq No. </label>
                    <br />

                    <input
                    onChange={handleCange}
                      type="number"
                      placeholder="Seq No."
                      style={{ width: "7rem", height: "40px" }}
                      //value={input.SeqNo} 
                      name="SeqNo"
                      value={seqRes}
                    />
                  </div>
                  <div style={{ marginLeft: "3rem" }}>
                    <label style={{ marginLeft: "-2rem" }} className="">From Condition</label>
                    <br />
                    <select
                      className="dropdown_value"
                      placeholder="From Condition"
                      style={{marginLeft: "-2rem", width: "11rem", height: "40px" }}
                      onChange={handleCange}
                      name="FromCondition"
                      value={input.FromCondition} 
                      //onChange={(e) => setFromCondition(e.target.value)}
                    >
                      <option value="">Select Condition </option>
                      {conditionRef.map((item, index) => (
                        <option value={item.id}>{item.conditionValue}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ marginLeft: "3rem" }}>
                    <label style={{ marginLeft: "-2rem" }} className="">From Score</label>
                    <br />
                    <input
                    className={validFromScore ? "" : "empty-select"}
                    maxLength="3"
                     onChange={handleCange}
                     name="FromScore"
                     value={input.FromScore} 
                      type="text"
                      placeholder="From Score"
                      style={{ marginLeft: "-2rem", width: "7rem", height: "40px" }}
                    //  onChange={(e) => setFromscore(e.target.value)}
                    />
                    <br /><p style={{ fontSize: '12px', color: 'red', marginLeft: "-2rem" }}>{validFromScore ? "" : "Required 1 to 999"}</p>
                  </div>
                  <div style={{ marginLeft: "3rem" }}>
                    <label style={{ marginLeft: "-2rem" }}  className="">To Condition</label>
                    <br />
                    <select
                     onChange={handleCange}
                     name="ToCondition"
                     value={input.ToCondition} 
                      className="dropdown_value"
                      placeholder="To Condition"
                      style={{ marginLeft: "-2rem",  width: "11rem", height: "40px" }}
                      //onChange={(e) => setToCondition(e.target.value)}
                    >
                      <option value="">Select Condition </option>
                      {conditionRef.map((item, index) => (
                        <option value={item.id}>{item.conditionValue}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ marginLeft: "3rem" }}>
                    <label style={{ marginLeft: "-2rem" }} className="">To Score</label>
                    <br />
                    <input
                       className={validToScore ? "" : "empty-select"}
                       maxLength="3"
                     onChange={handleCange}
                     name="ToScore"
                     value={input.ToScore} 
                      type="text"
                      placeholder="To Score"
                      style={{ marginLeft: "-2rem", width: "7rem", height: "40px" }}
                      //onChange={(e) => setToScore(e.target.value)}
                    />
                  <br /><p style={{ fontSize: '12px', color: 'red', marginLeft: "-2rem" }}>{validToScore ? "" : "Required 1 to 999"}</p>

                  </div>
                  <div style={{ marginLeft: "3rem" }}>
                    <label style={{ marginLeft: "-2rem" }} className="">Case Type</label>
                    <br />
                    <select
                     onChange={handleCange}
                     name="CaseType"
                     value={input.CaseType} 
                      className="dropdown_value"
                      placeholder="Case Type"
                      style={{marginLeft: "-2rem" , width: "11rem", height: "40px" }}
                      //onChange={(e) => setTocaseType(e.target.value)}
                    >
                      <option value="">Select Case Type</option>
                      {caseType.map((item, index) => (
                        <option value={item.id}>{item.caseType}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>
              <div className="button">
                <button
                  type="button"
                  className="btn  btn-md btn-save"
                  style={{ marginLeft:"12px" ,width: "9rem" }}
                  onClick={handlesubmit}
                >
                  Confirm Entry
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
                  onClick={bckbtn}
                  type="button"
                  className="btn btn-md  btn-back"
                  style={{ width: "9rem" }}
                >
                  Back
                </button>
              </div>
            </div>
          </section>
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
         onClick={bckbtn2}
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
  );
};
export default ThresholdConditionsCreate;
