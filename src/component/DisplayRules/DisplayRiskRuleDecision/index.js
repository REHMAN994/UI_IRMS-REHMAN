import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory,useLocation } from "react-router-dom";
import Swal from "sweetalert2";


const RiskRuleUpdateDecision = () => {
  const [fieldHeader1, setfieldHeader1] = useState([]);
  const [fieldHeader2, setfieldHeader2] = useState([]);
  const [fieldHeader3, setfieldHeader3] = useState([]);
  const [fieldHeader4, setfieldHeader4] = useState([]);
  const [fieldHeader5, setfieldHeader5] = useState([]);
  const [fieldHeader6, setfieldHeader6] = useState([]);



  let history = useHistory();
  const [ruleType, setRuleType] = useState([]);
  const [masterRule, setmasterRule] = useState([]);
  const [masterCondition, setmasterCondition] = useState([]);
  const navigate = useHistory();
  const location = useLocation();
  const {state} = location.state;
  console.log(state.id);
  
  const [values, setValues] = useState({
    fieldName1: "",
    fieldName2: "",
    fieldName3: "",
    fieldName4: "",
    fieldName5: "",
    fieldName6: "",
    scoreValue: "",
  });
  const [todoValues, setTodoValues] = useState([]);
  const [isDisbaled, setisDisbaled] = useState(true);
  const [editId, setEditId] = useState();
  const [toggle, setToggle] = useState(false);
  useState(() => {
    const getRuleType = async () => {
      await axios
        .get(
          process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE + "/MasterRule/GetAll"
        )
        .then((res) => setRuleType(res.data))
        .catch((err) => console.log(err));
    };
    getRuleType();


     axios
    .get(
      process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
        `/MasterRule/GetAllById?id=${parseInt(state.id)}`
    )
    .then((res) => {
      setmasterRule(res.data);
      getdata(parseInt(state.id));
      getvalues(parseInt(state.id));
    })
    .catch((err) => console.log(err));



  }, []);



  const getdata = (e) => {
    axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
          `/MasterCondition/GetAllByMasterRuleId?id=${e}`
      )
      .then((res) => {
        setmasterCondition(res.data);
        debugger;
        if(res.data.length == 1){
          setfieldHeader1(res.data[0].fieldName);
        }else if(res.data.length == 2){
          setfieldHeader1(res.data[0].fieldName);
          setfieldHeader2(res.data[1].fieldName);
        }else if(res.data.length == 3){
          setfieldHeader1(res.data[0].fieldName);
          setfieldHeader2(res.data[1].fieldName);
          setfieldHeader3(res.data[2].fieldName);
        }else if(res.data.length == 4){
          setfieldHeader1(res.data[0].fieldName);
          setfieldHeader2(res.data[1].fieldName);
          setfieldHeader3(res.data[2].fieldName);
          setfieldHeader4(res.data[3].fieldName);
        }else if(res.data.length == 5){
          setfieldHeader1(res.data[0].fieldName);
          setfieldHeader2(res.data[1].fieldName);
          setfieldHeader3(res.data[2].fieldName);
          setfieldHeader4(res.data[3].fieldName);
          setfieldHeader5(res.data[4].fieldName);
        }else if(res.data.length == 6){
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
        process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
          `/MasterDecision/GetAllByMasterRuleId?id=${e}`
      )
      .then((res) => setTodoValues(res.data))
      .catch((err) => console.log(err));
  };

 

  const handlevalue = (e) => {
    const value = e.target.value;
    setValues({ ...values, [e.target.name]: value });
  };

  console.log(masterRule);

  const handletodo = () => {
    if (!values) {
      alert("add first");
    } else if (toggle) {
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
            id: editId,
            ruleId: masterRule.ruleId,
            documentTypeId: masterRule.documentTypeId,
            threatGroupId: masterRule.threatGroupId,
            caseTypeRefId: masterRule.caseTypeRefId,
            description: masterRule.description,
            fieldName1: values.fieldName1,
            fieldName2: values.fieldName2,
            fieldName3: values.fieldName3,
            fieldName4: values.fieldName4,
            fieldName5: values.fieldName5,
            fieldName6: values.fieldName6,
            scoreValue: values.scoreValue,
          });

          var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch(
            process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
              "/MasterDecision/Update",
            requestOptions
          )
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
        } else Swal.fire(" Cancelled", "", "error");
      });
      setTodoValues(
        todoValues.map((e, i) => {
          if (e.id === editId) {
            return {
              ...e,
              fieldName1: values.fieldName1,
              fieldName2: values.fieldName2,
              fieldName3: values.fieldName3,
              fieldName4: values.fieldName4,
              fieldName5: values.fieldName5,
              fieldName6: values.fieldName6,
              scoreValue: values.scoreValue,
            };
          }
          return e;
        })
      );
      setToggle(true);

      setValues({
        fieldName1: "",
        fieldName2: "",
        fieldName3: "",
        fieldName4: "",
        fieldName5: "",
        fieldName6: "",
        scoreValue: "",
      });
      setisDisbaled(true);
    } else {
      setTodoValues([...todoValues, values]);
      setValues({
        fieldName1: "",
        fieldName2: "",
        fieldName3: "",
        fieldName4: "",
        fieldName5: "",
        fieldName6: "",
        scoreValue: "",
      });
      setisDisbaled(true);
    }
  };

  const handleDelete = (id, deleteId) => {
    console.log(deleteId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        var requestOptions = {
          method: "DELETE",
          redirect: "follow",
        };

        fetch(
          process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
            "/MasterDecision/Remove?id=" +
            deleteId,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
    const newTodo = todoValues.filter((e, i) => i !== id);
    setTodoValues(newTodo);
    setToggle(false);
    setisDisbaled(false);
  };

  const handleEdit = (id) => {
    console.log(id);
    const editTodo = todoValues.find((e, i) => {
      return e.id === id;
    });
    setValues({
      fieldName1: editTodo.fieldName1,
      fieldName2: editTodo.fieldName2,
      fieldName3: editTodo.fieldName3,
      fieldName4: editTodo.fieldName4,
      fieldName5: editTodo.fieldName5,
      fieldName6: editTodo.fieldName6,
      scoreValue: editTodo.scoreValue,
    });
    setEditId(id);
    setToggle(true);
    setisDisbaled(false);
  };

  const handleExit = () => {
    console.log({
      documentTypeId: masterRule.documentTypeId,
      threatGroupId: masterRule.threatGroupId,
      ruleTypeRefId: masterRule.ruleTypeRefId,
      caseTypeRefId: masterRule.caseTypeRefId,
      description: "str",
      fieldName1: todoValues[0].fieldName1,
      fieldName2: todoValues[0].fieldName2,
      fieldName3: todoValues[0].fieldName3,
      fieldName4: todoValues[0].fieldName4,
      fieldName5: todoValues[0].fieldName5,
      fieldName6: todoValues[0].fieldName6,
      scoreValue: todoValues[0].scoreValue,
    });
  };
  console.log(masterCondition.length);

  return (
    <div>
      <div className="row">
        <div className="col-md-10 col-lg-10">
          <section id="card">
            <div className="well">
              <h1 style={{ marginTop: "0rem" }}>
              Review Risk Rule Decision{" "}
              </h1>
              <div style={{ display: "flex" }}>
                <div>
                  <div style={{ display: "flex" }}>
                    <label>Rule ID:</label>
                   <p>{state.id}</p>
                  </div>

                  <div style={{ display: "flex" }}>
                    <label>Document Type:</label>
                    <p>{masterRule.documentType}</p>
                    <p hidden>{masterRule.documentTypeId}</p>
                  </div>

                  <div style={{ display: "flex" }}>
                    <label>Threat Group:</label>
                    <p>{masterRule.threatGroup}</p>
                    <p hidden>{masterRule.threatGroupId}</p>
                  </div>
                  <div style={{ display: "flex" }}>
                    <label>Number Conditions:</label>
                    <p>{masterRule.numberConditions}</p>
                  </div>
                </div>
                <div style={{ marginLeft: "4rem" }}>
                  <div style={{ display: "flex" }}>
                    <label>Rule Type:</label>
                    <p>{masterRule.ruleTypeRef === "D" ? "Deductive" :  masterRule.ruleTypeRef === "I" ? "Inductive" : ""}</p>
                    <p hidden>{masterRule.ruleId}</p>
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
                    <p hidden>{masterRule.caseTypeRefId}</p>
                  </div>
                </div>
                <div style={{ marginLeft: "4rem" }}>
                  <div style={{ display: "flex" }}>
                    <label>Document Seq:</label>
                    <p>{masterRule.docSeq}</p>
                  </div>

                  <div style={{ display: "flex" }}>
                    <label>Rule Name:</label>
                    <p>{masterRule.ruleName}</p>
                  </div>

                  <div style={{ display: "flex" }}>
                    <label>Weighting %:</label>
                    <p>{masterRule.weighting}</p>
                  </div>
                </div>
              </div>

              {/* <div style={{display:'flex'}}>
                                <label>Number Conditions:</label>
                                <p>{masterRule.numberConditions}</p>
                                <br/>
                                <label className="ml-5">Status:</label>
                                <p>Status</p>
                            </div> */}
            </div>
          </section>
          <section id="card">
            <div className="well">
              <h1 style={{ marginTop: "0rem" }}> Conditions </h1>
              <div style={{ display: "flex" }}>
                {/* {masterCondition.map((e) => (
                  <>
                    <label>Field Name: </label>
                    <p>{e.fieldName}</p>
                    <label style={{ marginLeft: "2rem" }}>
                      Condition Value:
                    </label>
                    <p> {e.conditionValue}</p>
                    <br />
                  </>
                ))} */}

                <div>
                  <label>Field Name: </label>
                  <br/>
                  <label>Condition Value:</label>
                </div>
                {masterCondition.map((e) => (
                  <div style={{  marginLeft: 'auto'}}>
                    <p>{e.fieldName}</p>
                      
                    <p> {e.conditionValueName}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section id="card">
            <div className="well">
              <h1 style={{ marginTop: "0rem" }}>
                {" "}
                Review Risk Rule Condition{" "}
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
                    {/* <th scope="col" className="mw-100">
                      Action
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {todoValues.map((e, i) => (
                    <tr>
                      <td>{e.id}</td>
                      <td>{e.scoreValue}</td>
                      <td>{e.fieldName1== "" ? "-" : e.fieldName1}</td>
                        <td>{e.fieldName2== "" ? "-" : e.fieldName2}</td>
                        <td>{e.fieldName3== "" ? "-" : e.fieldName3}</td>
                        <td>{e.fieldName4== "" ? "-" : e.fieldName4}</td>
                        <td>{e.fieldName5== "" ? "-" : e.fieldName5}</td>
                        <td>{e.fieldName6== "" ? "-" : e.fieldName6}</td>  

                      {/* <td>
                        <button
                          onClick={() => handleEdit(e.id)}
                          data-toggle="modal"
                          data-target="#myModal"
                          style={{ border: "none" }}
                        >
                          <i className="fas fa-edit"></i>
                        </button>{" "}
                        <i
                          class="fa fa-trash ml-2"
                          onClick={() => handleDelete(i, e.id)}
                          aria-hidden="true"
                        ></i>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr style={{ border: "1px solid #2d3f61" }} />
              
              <div className="button">
                <button
                 
                  type="button"
                  className="btn  btn-md btn-save"
                 onClick={()=> navigate.push('/riskrulesearchpage')}
                >
                  Exit Screen
                </button>
              </div>
              <div className="button">
                <button
                  onClick={() => history.goBack()}
                  type="button"
                  className="btn  btn-md btn-back"
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
export default RiskRuleUpdateDecision;
