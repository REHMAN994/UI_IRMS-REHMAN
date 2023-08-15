import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory,useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { string, number, matches, max } from "yup";
import { ToastContainer, toast } from 'react-toastify';


const RiskRuleCreateDecision = () => {
  const [checkCreateORUpdate, setcheckCreateORUpdate] = useState("NotCreated");

  const [fieldHeader1, setfieldHeader1] = useState([]);
  const [fieldHeader2, setfieldHeader2] = useState([]);
  const [fieldHeader3, setfieldHeader3] = useState([]);
  const [fieldHeader4, setfieldHeader4] = useState([]);
  const [fieldHeader5, setfieldHeader5] = useState([]);
  const [fieldHeader6, setfieldHeader6] = useState([]);

  const [btnforupdatecreate, setbtnforupdatecreate] = useState(true);

  const location = useLocation();
  const [editeddata, setEditedData] = useState(null);
  const { state } = location.state;
  console.log(state);
  const navigate = useHistory();
  const [ruleType, setRuleType] = useState([]);
  const [masterRule, setmasterRule] = useState([]);
  const [masterCondition, setmasterCondition] = useState([]);
  const [toddleAction,setToggleAction] = useState(false)
  const [values, setValues] = useState({
    id: "",
    fieldName1: "",
    fieldName2: "",
    fieldName3: "",
    fieldName4: "",
    fieldName5: "",
    fieldName6: "",
    scoreValue: "",
    caseTypeRefId: "",
    documentTypeId: "",
    ruleId: "",
    scoreValue: "",
    threatGroupId: "",
  });
  const [todo, setTodo] = useState([]);
  const [isDisbaled, setisDisbaled] = useState(false);
  const [editId, setEditId] = useState("");
  const [toggle, setToggle] = useState(false);
  useState(() => {
    // const getRuleType = async () => {
    //   await axios
    //     .get(
    //       process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE + "/MasterRule/GetAll"
    //     )
    //     .then((res) => setRuleType(res.data))
    //     .catch((err) => console.log(err));
    // };
    // getRuleType();

    axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
        `/MasterDecision/GetAllByMasterRuleId?id=${state.Id}`
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.length > 0) {
          // setTodo({
          //   id: res.data[0].id,
          //   fieldName1: res.data[0].fieldName1,
          //   fieldName2: res.data[0].fieldName2,
          //   fieldName3: res.data[0].fieldName3,
          //   fieldName4: res.data[0].fieldName4,
          //   fieldName5: res.data[0].fieldName5,
          //   fieldName6: res.data[0].fieldName6,
          //   scoreValue: res.data[0].scoreValue,
          //   caseTypeRefId: res.data[0].caseTypeRefId,
          //   documentTypeId: res.data[0].documentTypeId,
          //   ruleId: res.data[0].ruleId,
          //   threatGroupId: res.data[0].threatGroupId,
          // });
          setValidFieldName1(false);
          setValidFieldName2(false);
          setValidFieldName3(false);
          setValidFieldName4(false);
          setValidFieldName5(false);
          setValidFieldName6(false);
          setBtnD(true);
          setToggleAction(true);

        } else {
          //setTodo(null);
          setValidFieldName1(false);
          setValidFieldName2(false);
          setValidFieldName3(false);
          setValidFieldName4(false);
          setValidFieldName5(false);
          setValidFieldName6(false);
          setBtnD(false);
          setToggleAction(false);
        }


      })
      .catch((err) => console.log(err));

    axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
        `/MasterRule/GetAllById?id=${state.Id}`
      )
      .then((res) => {
        setmasterRule(res.data);
        getdata(state.Id);

      })
      .catch((err) => console.log(err));
    console.log(state.Id);




  }, []);
  const getdata = (e) => {

debugger;
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
    //https://localhost:7220/api/MasterCondition/GetAllByMasterRuleId?id=9
  };

  const [prefilled, setPrefilled] = useState([]);

  const ruleIdhandle = (e) => {
    const ruleId = e.target.value;


  };



  const [validFieldName1, setValidFieldName1] = useState(false);
  const [validFieldName2, setValidFieldName2] = useState(false);
  const [validFieldName3, setValidFieldName3] = useState(false);
  const [validFieldName4, setValidFieldName4] = useState(false);
  const [validFieldName5, setValidFieldName5] = useState(false);
  const [validFieldName6, setValidFieldName6] = useState(false);
  const [isDisabled, setIsDisbaled] = useState(true);

  const [checkvalidate, setcheckvalidate] = useState(false);


  const handlevalue = (e) => {
    console.log(masterCondition[0].fieldName);
    const value = e.currentTarget.value;
    const name =e.target.name;
    // setValidFieldName1(string().matches(/[0-999]/,).max(1).required().isValidSync(values.fieldName1));
    // setValidFieldName2(string().matches(/[0-999]/,).max(1).required().isValidSync(values.fieldName2));
    // setValidFieldName3(string().matches(/[0-999]/,).max(1).required().isValidSync(values.fieldName3));
    // setValidFieldName4(string().matches(/[0-999]/,).max(1).required().isValidSync(values.fieldName4));
    // setValidFieldName5(string().matches(/[0-999]/,).max(1).required().isValidSync(values.fieldName5));
    // setValidFieldName6(string().matches(/[0-999]/,).max(1).required().isValidSync(values.fieldName6));

    if (name == 'fieldName1') {
      values.fieldName1 = value;
    } else if (name == 'fieldName2') {
      values.fieldName2 = value;
    } else if (name == 'fieldName3') {
      values.fieldName3 = value;
    } else if (name == 'fieldName4') {
      values.fieldName4 = value;
    } else if (name == 'fieldName5') {
      values.fieldName5 = value;
    } else if (name == 'fieldName6') {
      values.fieldName6 = value;
    }

    if(masterRule.numberConditions == 1){
        setcheckvalidate(string().required().isValidSync(values.fieldName1));
    }else if(masterRule.numberConditions > 1 && masterRule.numberConditions < 3){
      setcheckvalidate(string().required().isValidSync(values.fieldName2));
    }else if(masterRule.numberConditions > 2 && masterRule.numberConditions < 4){
      setcheckvalidate(string().required().isValidSync(values.fieldName3));
    }else if(masterRule.numberConditions > 3 && masterRule.numberConditions < 5){
      setcheckvalidate(string().required().isValidSync(values.fieldName4));
    }else if(masterRule.numberConditions > 4 && masterRule.numberConditions < 6){
      setcheckvalidate(string().required().isValidSync(values.fieldName5));
    }else if(masterRule.numberConditions > 5 && masterRule.numberConditions < 8){
      setcheckvalidate(string().required().isValidSync(values.fieldName6));
    }

    setValues({ ...values, [e.target.name]: value });
  };

  const [btnD, setBtnD] = useState(false);

  const add = () => {
    if (!values) {
      alert("add first");
    } else if (toggle) {
      Swal.fire({
        title: "Are you sure you want to Update?",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel"
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

          axios.put(process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
            "/MasterDecision/Update", {
            id: values.id,
            fieldName1: values.fieldName1,
            fieldName2: values.fieldName2,
            fieldName3: values.fieldName3,
            fieldName4: values.fieldName4,
            fieldName5: values.fieldName5,
            fieldName6: values.fieldName6,
            scoreValue: values.scoreValue,
            caseTypeRefId: values.caseTypeRefId,
            documentTypeId: values.documentTypeId,
            ruleId: values.ruleId,
            scoreValue: values.scoreValue,
            threatGroupId: values.threatGroupId,
          }).then((res) => {
            debugger;
            console.log(res.data);
            setTodo(
              todo.map((e, i) => {
                  if (i === editeddata) {
                      return {
                          ...e,
                          id: res.data.id,
                          fieldName1: res.data.fieldName1,
                          fieldName2: res.data.fieldName2,
                          fieldName3: res.data.fieldName3,
                          fieldName4: res.data.fieldName4,
                          fieldName5: res.data.fieldName5,
                          fieldName6: res.data.fieldName6,
                          scoreValue: res.data.scoreValue,
                      }

                  }
                  return e;
              })
          )
          toast.success("Updated Successfully");
          setcheckvalidate(false);
          setbtnforupdatecreate(true);
          }).catch((err) => {
            console.log(err)
          })


        }
        else
      //   Swal.fire(" Cancelled", "", "error").then((result) => {
      //     setcheckvalidate(false);
      //     setbtnforupdatecreate(true);
      // });
      setcheckvalidate(false);
      setbtnforupdatecreate(true);
      });







      setToggle(false);
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



      Swal.fire({
        title: "Are you sure you want to save?",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel"
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            RuleId: masterRule.ruleId,
            documentTypeId: masterRule.documentTypeId,
            threatGroupId: masterRule.threatGroupId,
            ruleTypeRefId: masterRule.ruleTypeRefId,
            caseTypeRefId: masterRule.caseTypeRefId,
            description: "",
            FieldName1: values.fieldName1,
            FieldName2: values.fieldName2,
            FieldName3: values.fieldName3,
            FieldName4: values.fieldName4,
            FieldName5: values.fieldName5,
            FieldName6: values.fieldName6,
            ScoreValue: values.scoreValue,
          });

          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch(
            process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
            "/MasterDecision/Add",
            requestOptions
          )
            .then((response) => response.text())
            .then((result) => {
              const res = JSON.parse(result);
              setTodo([...todo,{
                caseTypeRefId: res.caseTypeRefId,
                description: "",
                documentTypeId: res.documentTypeId,
                fieldName1: res.fieldName1,
                fieldName2: res.fieldName2,
                fieldName3: res.fieldName3,
                fieldName4: res.fieldName4,
                fieldName5: res.fieldName5,
                fieldName6: res.fieldName6,
                id: res.id,
                ruleId: res.ruleId,
                scoreValue: res.scoreValue,
                threatGroupId: res.threatGroupId,
              }]);
              // setValidFieldName1(false);
              // setValidFieldName2(false);
              // setValidFieldName3(false);
              // setValidFieldName4(false);
              // setValidFieldName5(false);
              // setValidFieldName6(false);
              // setBtnD(true)

              setcheckCreateORUpdate("Created");
            })

            .catch((error) => console.log("error", error));

            toast.success("Added Successfully");

          //resetForm();

          setcheckvalidate(false);

        }
        else
        // Swal.fire(" Cancelled", "", "error").then((result) => {
        //     setcheckvalidate(false);
        //     setbtnforupdatecreate(true);
        // });
        setcheckvalidate(false);
        setbtnforupdatecreate(true);
      });

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

  const handleDelete = (id,deleteId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
      if (result.isConfirmed) {
        const newTodo = todo.filter((e, i) => i !== id);
        setTodo(newTodo);
        setToggle(false);
        setisDisbaled(false);
          axios
          .delete(
            process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
            `/MasterDecision/Remove?id=${deleteId}`
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));

          // Swal.fire(
          //     'Deleted!',
          //     'Your file has been deleted.',
          //     'success'
          // )
          toast.success("Deleted Successfully");
      }
  })

  };

  const handleEdit = (id) => {
    debugger;
    setToggle(true);
    const newEditedTodo = todo.find((e, i) => { return i === id });
    // setValidFieldName1(true);
    // setValidFieldName2(true);
    // setValidFieldName3(true);
    // setValidFieldName4(true);
    // setValidFieldName5(true);
    // setValidFieldName6(true);
    // setBtnD(false)
    setValues({
      id: newEditedTodo.id,
      fieldName1: newEditedTodo.fieldName1,
      fieldName2: newEditedTodo.fieldName2,
      fieldName3: newEditedTodo.fieldName3,
      fieldName4: newEditedTodo.fieldName4,
      fieldName5: newEditedTodo.fieldName5,
      fieldName6: newEditedTodo.fieldName6,
      scoreValue: newEditedTodo.scoreValue,
    });
    setEditedData(id);
    setcheckvalidate(true);
    setbtnforupdatecreate(false);
  };

  const bckbutton = () => {
    if(masterRule.ruleMethod == "C"){
      navigate.push('/updateRiskRuleCountAfterCreate',
      { state: {
        id: state.Id

      }
    })
    }else if(masterRule.ruleMethod == "D"){
      navigate.push('/updateRiskRuleConditionAfterCreate',
      { state: {
        id: state.Id,
        check :checkCreateORUpdate  }
    })
  }
  }

  return (  
    <div>
          <ToastContainer />
      <div className="row">
        <div className="col-md-10 col-lg-10">
          <section id="card">
            <div className="well">
              <h1 style={{ marginTop: "0rem" }}>Create Risk Rule Decision </h1>
              <div style={{ display: "flex" }}>
                <div>
                  <div style={{ display: "flex" }}>
                    <label>Rule ID:</label>
                    <p>{state.Id}</p>
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
                </div>
                <div style={{ marginLeft: "3rem" }}>
                <div style={{ display: "flex" }}>
                    <label>Rule Name:</label>
                    <p>{masterRule.ruleName}</p>
                  </div>

                  <div style={{ display: "flex" }}>
                    <label>Rule Method:</label>
                    {/* <p>{masterRule.ruleMethod}</p> */}
                    {masterRule.ruleMethod === "C" ? (
                      <p>Count</p>
                    ) : <></> && masterRule.ruleMethod === "D" ? (
                      <p>Decision</p>
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
                <div style={{ marginLeft: "3rem" }}>
                  <div style={{ display: "flex" }}>
                    <label>Document Seq:</label>
                    <p>{masterRule.docSeq}</p>
                  </div>





                  <div style={{ display: "flex" }}>
                  <label>Rule Type:</label>
                    <p>{masterRule.ruleTypeRef === "D" ? "Deductive" :  masterRule.ruleTypeRef === "I" ? "Inductive" : ""}</p>
                    <p hidden>{masterRule.ruleId}</p>
                  </div>

                  <div style={{ display: "flex" }}>
                    <label>Weighting %:</label>
                    <p>{masterRule.weighting}</p>
                  </div>
                </div>
                <div style={{ display: "flex", marginLeft: "3rem" }}>
                  <label>Number Conditions:</label>
                  <p>{masterRule.numberConditions}</p>
                </div>
              </div>
            </div>
          </section>
          <section id="card">
            <div className="well">
              <h1 style={{ marginTop: "0rem" }}> Decision Name Fields </h1>
              <div style={{ display: "flex" }}>
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
              <h1 style={{ marginTop: "0rem" }}> Create Decision Fields </h1>
              <table
                className="table table-striped"
                style={{ marginTop: "1rem" }}
              >
                <thead className="thead-dark">

                  <tr>
                    <th scope="col">Score Value</th>

                    <th scope="col">{fieldHeader1 == "" ? "-" : fieldHeader1}</th>
                    <th scope="col">{fieldHeader2 == "" ? "-" : fieldHeader2}</th>
                    <th scope="col">{fieldHeader3 == "" ? "-" : fieldHeader3}</th>
                    <th scope="col">{fieldHeader4 == "" ? "-" : fieldHeader4}</th>
                    <th scope="col">{fieldHeader5 == "" ? "-" : fieldHeader5}</th>
                    <th scope="col">{fieldHeader6 == "" ? "-" : fieldHeader6}</th>

                    <th scope="col">Action</th>

                  </tr>
                </thead>
                <tbody>
                {
                    todo.map((e, i) => (
                        <tr key={e.id} >

                        <td>{e.scoreValue}</td>
                        <td>{e.fieldName1== "" ? "-" : e.fieldName1}</td>
                        <td>{e.fieldName2== "" ? "-" : e.fieldName2}</td>
                        <td>{e.fieldName3== "" ? "-" : e.fieldName3}</td>
                        <td>{e.fieldName4== "" ? "-" : e.fieldName4}</td>
                        <td>{e.fieldName5== "" ? "-" : e.fieldName5}</td>
                        <td>{e.fieldName6== "" ? "-" : e.fieldName6}</td>
                        <td><button onClick={() => handleEdit(i)} data-toggle="modal" data-target="#myModal" style={{ border: 'none' }}><i className="fas fa-edit"></i></button>
                        <i onClick={() => handleDelete(i,e.id)} class="fa fa-trash ml-4" aria-hidden="true"></i></td>
                                            </tr>
                                        ))
                                    }


                </tbody>
              </table>
              <hr style={{ border: "1px solid #2d3f61" }} />
              <form className="ml-auto" method="post">
                <h1>Add New Entry </h1>
                <div style={{ display: "flex" }}>
                  <div>
                    <label className="">Score </label>
                    <br />
                    <input
                      value={values.scoreValue}
                    //  disabled={btnD}
                      name="scoreValue"
                      onChange={handlevalue}
                      type="number"
                      min={0}
                      required

                      placeholder="Score"
                      style={{ width: "5rem", height: "40px" }}
                    />
                  </div>

                  <div style={{ marginLeft: "3rem"}}>
                    <label className="">{fieldHeader1 == "" ? "-" : fieldHeader1}</label>
                    <br />
                    <input
                      value={values.fieldName1}
                      //disabled={btnD}
                      className={validFieldName1 ? "" : "empty-select"}
                      name="fieldName1"
                      onChange={handlevalue}
                      disabled={fieldHeader1 == "" ? true : false}
                      placeholder="Value 1"
                      style={{ width: "5rem", height: "40px" }}
                    />
                  </div>
                  <div style={{ marginLeft: "3rem" }}>
                    <label className="">{fieldHeader2 == "" ? "-" : fieldHeader2}</label>
                    <br />
                    <input
                      value={values.fieldName2}
                      //disabled={btnD}
                      name="fieldName2"
                      className={validFieldName2 ? "" : "empty-select"}
                      onChange={handlevalue}
                      disabled={fieldHeader2 == "" ? true : false}
                      placeholder="Value 2"
                      style={{ width: "5rem", height: "40px" }}
                    />
                  </div>
                  <div style={{ marginLeft: "3rem" }}>
                    <label className="">{fieldHeader3 == "" ? "-" : fieldHeader3}</label>
                    <br />
                    <input
                      value={values.fieldName3}
                      name="fieldName3"
                      className={validFieldName3 ? "" : "empty-select"}
                      onChange={handlevalue}
                      disabled={fieldHeader3 == "" ? true : false}
                      placeholder="Value 3"
                      style={{ width: "5rem", height: "40px" }}
                    />
                  </div>
                  <div style={{ marginLeft: "3rem" }}>
                    <label className="">{fieldHeader4 == "" ? "-" : fieldHeader4}</label>
                    <br />
                    <input
                      value={values.fieldName4}
                      className={validFieldName4 ? "" : "empty-select"}
                      name="fieldName4"
                      onChange={handlevalue}
                      disabled={fieldHeader4 == "" ? true : false}
                      placeholder="Value 4"
                      style={{ width: "5rem", height: "40px" }}
                    />
                  </div>
                  <div style={{ marginLeft: "3rem" }}>
                    <label className="">{fieldHeader5 == "" ? "-" : fieldHeader5}</label>
                    <br />
                    <input
                      value={values.fieldName5}
                      className={validFieldName5 ? "" : "empty-select"}
                      name="fieldName5"
                      onChange={handlevalue}
                      disabled={fieldHeader5 == "" ? true : false}
                      placeholder="Value 5"
                      style={{ width: "5rem", height: "40px" }}
                    />
                  </div>
                  <div style={{ marginLeft: "3rem" }}>
                    <label className="">{fieldHeader6 == "" ? "-" : fieldHeader6}</label>
                    <br />
                    <input
                      value={values.fieldName6}
                      className={validFieldName6 ? "" : "empty-select"}
                      name="fieldName6"
                      onChange={handlevalue}
                      disabled={fieldHeader6 == "" ? true : false}
                      placeholder="Value 6"
                      style={{ width: "5rem", height: "40px" }}
                    />
                  </div>
                  <div style={{ marginTop: "0.5rem" }}>
                    <label className=""></label>
                    <br />
                    <button
                      disabled={checkvalidate ? false : true}
                      onClick={add}
                      type="button"
                      className="btn btn-md"
                      style={{
                        backgroundColor: "#ECF7F2",
                        color: "#03995D",
                        borderColor: "#03995D",
                        fontWeight: "600",
                        marginLeft: "1rem",
                        width: "7rem",
                      }}

                    >
                      {" "}
                      <i class="fa fa-plus mr-1" aria-hidden="true"></i>{btnforupdatecreate == true ? "Add" : btnforupdatecreate == false ? "Update":""}
                    </button>
                  </div>
                </div>
              </form>
              <div className="button">

                <button
                  type="button"

                  className="btn  btn-md btn-save"
                  onClick={() => navigate.push('/riskrulecreatekeypage')}
                >
                  Exit Screen
                </button>
                <button
                  type="button"
                  onClick={() => window.location.reload(true)}
                  className="btn btn-md  btn-back"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={bckbutton}
                  className="btn btn-md  btn-back"
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
export default RiskRuleCreateDecision;
