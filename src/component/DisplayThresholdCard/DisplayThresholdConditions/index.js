import axios from "axios";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Swal from "sweetalert2";

const DisplayThresholdCondition = () => {
  const navigate = useHistory();
  const location = useLocation();
  const { state } = location.state;

  const [Id, setId] = useState([]);
  const [thresholdData, setThresholdData] = useState([]);
  const [todo, setTodo] = useState([]);
  const [seqRes, setSeqres] = useState("");
  const [conditionRef, setconditionRef] = useState([]);
  const [caseType, setCaseType] = useState([]);

  const [fromCondition, setFromCondition] = useState("");
  const [toCondition, setToCondition] = useState("");
  const [tocaseType, setTocaseType] = useState("case type");
  const [fromScore, setFromscore] = useState("");
  const [toScore, setToScore] = useState("");

  const [deleteId, setDeleteId] = useState("");
  const [addcondition, setaddcondition] = useState(false);
  const [editcondition, seteditcondition] = useState("");
  const [editId, setEditId] = useState("");

  const [editeddata, setEditedData] = useState(null);
  const [CaseTypeName, setCaseTypeName] = useState(null);

  useEffect(async () => {
    const id = state.id;
    axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/MasterThreshold/GetAllWithStatus?id=${id}`
      )
      .then((res) => {
        setThresholdData(res.data);
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

const bckbtn = (e) => {
  navigate.push(`/displaythresholdrevisionpage`);
}
  const deleteHandle = () => {
    axios
      .delete(
        process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/ThresholdCondition/RemoveBySqNo?id=${deleteId}`
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  const handlemodify = ()=>{
    axios.get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/ThresholdCondition/GetBySqNo?id=${editcondition}`).then((res)=> {
      console.log(res.data);
      setFromCondition(res.data.fromScoreCondition);
      setToCondition(res.data.toScoreCondition);
      setFromscore(res.data.fromScore);
      setToScore(res.data.toScore);
      setTocaseType(res.data.caseTypeRef);
      setaddcondition(true);
      setEditId(res.data.id);
    }).catch((err)=> console.log(err))
  }

  const handleCange = (e) => {
    debugger;
    const value = e.target.value;
    setInput({ ...input, [e.target.name]: value });
   
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


  const confirmUpdate = () =>{
    axios.post(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/ThresholdCondition/Add`,{
      revisionNo: parseInt(thresholdData.revisionNo),
      seqNo: seqRes,
      documentTypeId: parseInt(thresholdData.documentTypeId),
      fromScoreCondition: parseInt(fromCondition),
      fromScore: parseInt(fromScore),
      toScoreCondition: parseInt(toCondition),
      toScore: parseInt(toScore),
      caseTypeRefId: parseInt(tocaseType),
      createdDate: "2022-05-10T20:14:27.870Z",
      active: "Y",
      MasterThresholdId: parseInt(thresholdData.id),
    })
    .then((res) => {
      console.log(res.data[0]);
      const data = res.data[0];
      setTodo([...todo,
        {
            id : data.id,
            seqNo : data.seqNo,
            caseTypeRef: data.caseTypeRef,
            fromScore : data.fromScore,
            fromScoreCondition : data.fromScoreCondition,
            toScore : data.toScore,
            toScoreCondition: data.toScoreCondition
        }
    ]);
    })
    .catch((err) => console.log(err));
    toast.success("Added Successfully");
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

  return (
    <div>
    <ToastContainer />
<div className="row">
  <div className="col-md-10 col-lg-10">
    <section id="card">
      <div className="well">
        <h1 style={{ marginTop: "0rem" }}>Display Threshold Revision</h1>
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
  );
};
export default DisplayThresholdCondition;
