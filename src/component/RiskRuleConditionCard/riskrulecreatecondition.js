import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { number, string } from 'yup';
import { ToastContainer, toast } from 'react-toastify';


const RiskRuleCreateCondition = () => {
  const navigate = useHistory();
  const location = useLocation();
  const [ruleType, setRuleType] = useState([]);
  const [masterRule, setmasterRule] = useState([]);
  const [ConditionRef, setConditionRef] = useState([]);
  const [masterCondition, setmasterCondition] = useState([]);
  const [fieldNames, setFieldNames] = useState([]);
  const [todo, setTodo] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [editId, setEditId] = useState();
  const [IDRule, setIDRule] = useState();
  const { state } = location.state;
  console.log(state);




  useEffect(() => {
    const getRuleType = async () => {
      await axios
        .get(
          process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE + "/MasterRule/GetAll"
        )
        .then((res) => setRuleType(res.data))
        .catch((err) => console.log(err));
    };

    const getconditionRef = (e) => {
      axios
        .get(
          process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
          `/ConditionRef/GetAllIDs`
        )
        .then((res) => setConditionRef(res.data))
        .catch((err) => console.log(err));
    };

    // const getFieldNameabc =  () =>{
    //   axios.get(`https://localhost:7220/api/DocumentField/GetAllFields`).then((res)=>{
    //       console.log(res.data);
    //       setFieldName(res.data);
    //   }).catch((err)=>{
    //     console.log(err)
    //   })

    // }
    // getFieldNameabc();

    axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
        `/DocumentField/GetAllFields?documnetTypeId=${state.documentTypeId}`
      )
      .then((res) => setFieldNames(res.data))
      .catch((err) => console.log(err));

    getRuleType();
    getconditionRef();
  }, []);

  const getdata = (e) => {
    axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
        `/MasterCondition/GetAllByMasterRuleId?id=${e}`
      )
      .then((res) => setmasterCondition(res.data))
      .catch((err) => console.log(err));
  };
  // const getFieldName = async (id) => {
  //   alert(id);
  //   await axios
  //     .get(
  //       process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
  //         `/DocumentField/GetAllFields?documnetTypeId=${id}`
  //     )
  //     .then((res) => {
  //       setFieldNames(res.data)
  //       console.log(res.data)
  //     })
  //     .catch((err) => console.log(err));
  // };
  const ruleIdhandle = async (e) => {
    const value = e.target.value;
    if (value == "") {
      Swal.fire({
        title: 'Oops...',
        text: 'Please Select Doc Type!'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload(true);
        }
      })

    } else {
      const ruleId = e.target.value;
      await axios
        .get(
          process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
          `/MasterRule/GetAllById?id=${ruleId}`
        )
        .then((res) => {
          setmasterRule(res.data);

          // getFieldName(res.data.documentTypeId);
        })
        .catch((err) => console.log(err));
      console.log(ruleId);
      getdata(ruleId);
      // setTodoValues({
      //   seqNo: "",
      //   fieldName: "",
      //   conditionValue: "",
      // });
      setmasterCondition([]);
    }


  };
  const [todoValues, setTodoValues] = useState({
    seqNo: "",
    fieldName: "",
    conditionValue: "",

  });
  const [conditionName, setConditonName] = useState({});
  const [validSeqNo, setvalidSeqNo] = useState(false);
  const [validfieldName, setvalidfieldName] = useState(false);
  const [validconditionValue, setvalidconditionValue] = useState(false);
  const [dataId, setDataId] = useState(null);

  const handleTodo = (e) => {
    const value = e.currentTarget.value;
    console.log(todoValues.seqNo);
    setvalidSeqNo(string().required().isValidSync(todoValues.seqNo));
    setvalidfieldName(string().required().isValidSync(todoValues.fieldName));
    setvalidconditionValue(string().required().isValidSync(todoValues.conditionValue));
    setTodoValues({ ...todoValues, [e.target.name]: value });
    console.log(todoValues);
    if (todoValues.seqNo == '') {
      setvalidSeqNo(true);
    }
    else if (todoValues.fieldName == '') {
      setvalidfieldName(true);
    }
    else if (todoValues.conditionValue == '') {
      setvalidconditionValue(true);
    }
  };

  const [exitbtn, setExitBtn] = useState(true);

  const refreshBckBtn = (e) => {
    setTodoValues({
      seqNo: "",
      fieldName: "",
      conditionValue: "",
    });
}

  const addTodo = (e) => {
    e.preventDefault();
    console.log({
      "id": state.ruleId,
      "ruleId": state.ruleId,
      "documentTypeId": state.documentTypeId,
      "seqNo": todoValues.seqNo,
      "fieldName": todoValues.fieldName,
      "conditionValue": todoValues.conditionValue,
      "riskCount": 1
    });
    if (!todoValues) {
      alert("add todo");
    } else if (toggle) {
      setmasterCondition(
        masterCondition.map((e, i) => {
          if (e.id === editId) {
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
                  "id": dataId,
                  "ruleId": state.ruleId,
                  "documentTypeId": state.documentTypeId,
                  "seqNo": todoValues.seqNo,
                  "fieldName": todoValues.fieldName,
                  "conditionValue": todoValues.conditionValue,
                  "riskCount": 1
                });

                var requestOptions = {
                  method: 'PUT',
                  headers: myHeaders,
                  body: raw,
                  redirect: 'follow'
                };

                fetch(process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE + "/MasterCondition/Update", requestOptions)
                  .then(response => response.text())
                  .then(result => {
                    console.log(result);
                    setvalidSeqNo(false);
                    setvalidfieldName(false);
                    setvalidconditionValue(false);
                  })
                  .catch(error => console.log('error', error));
                toast.success("Updated Successfully");
              } 
            });
            return {
              ...e,

              seqNo: todoValues.seqNo,
              fieldName: todoValues.fieldName,
              conditionValue: todoValues.conditionValue,

            };
          }
          return e;
        })
      );
      setToggle(false);
      setTodoValues({
        seqNo: "",
        fieldName: "",
        conditionValue: "",
      });
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
            ruleId: state.ruleId,
            documentTypeId: state.documentTypeId,
            seqNo: todoValues.seqNo,
            fieldName: todoValues.fieldName,
            conditionValue: todoValues.conditionValue,
            riskCount: 0
          });

          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch(
            process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
            "/MasterCondition/Add",
            requestOptions
          )
            .then((response) => response.text())
            .then((result) => {
              const data = JSON.parse(result);
              console.log(data);
              setDataId(data.id)
              axios.get(process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE+`/ConditionRef/GetById?id=${data.conditionValue}`).then((res) => {
                console.log(res.data);
                setConditonName(res.data);
                setmasterCondition([...masterCondition, {
                  id: data.id,
                  conditionValue: data.conditionValue,
                  fieldName: data.fieldName,
                  seqNo: data.seqNo,
                  conName: res.data.conditionValue,
                }]);
                toast.success("Added Successfully");
                setvalidSeqNo(false);
                setvalidfieldName(false);
                setvalidconditionValue(false);
              }).catch((err) => {
                console.log(err)
              })


            })
            .catch((error) => console.log("error", error));

          ;

          setTodoValues({
            seqNo: "",
            fieldName: "",
            conditionValue: "",
          });
        } 
      });
    }


  };

  const handleDelete = (id, deleteId) => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const newTodo = masterCondition.filter((e, i) => i !== id);
        axios
          .delete(
            process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
            `/MasterCondition/Remove?id=${deleteId}`
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => console.log(err));
          toast.success("Deleted Successfully");
        setmasterCondition(newTodo);
        setToggle(false);
      } 
    });
  };

  const handleEdit = (id) => {
    setToggle(true);
    const editTodo = masterCondition.find((e, i) => {
      return e.id === id;
    });
    console.log(editTodo);
    setTodoValues({
      seqNo: editTodo.seqNo,
      fieldName: editTodo.fieldName,
      conditionValue: editTodo.conditionValue,
    });
    console.log(todoValues);
    setEditId(id);
  };

  const handleNext = () =>{
      navigate.push('/riskrulecreatedecisionpage',{
        state:{
          Id:state.ruleId
        }
      })
  }

  return (
    <div>
             <ToastContainer />
      <div className="row">
        <div className="col-md-10 col-lg-10">
          <section id="card">
            <div className="well">
              <h1 style={{ marginTop: "0rem" }}>
                {" "}
                Create Risk Rule Condition{" "}
              </h1>
              <div style={{ display: "flex" }}>
                <div>
                  <div style={{ display: "flex" }}>
                    <label>Rule ID:</label>
                    <p>{state.ruleId}</p>
                  </div>
                  <div style={{ display: "flex" }}>
                    <label>Document Type:</label>
                    <p hidden>{state.documentTypeId}</p>
                    <p>{state.docname}</p>
                  </div>
                  <div style={{ display: "flex" }}>
                    <label>Threat Group:</label>
                    <p hidden>{state.threatGroupId}</p>
                    <p>{state.threatGroup}</p>
                  </div>
                </div>
                <div style={{ marginLeft: "3rem" }}>
                  <div style={{ display: "flex" }}>
                    <label>Rule Name:</label>

                    <p>{state.ruleName}</p>
                  </div>

                  <div style={{ display: "flex" }}>
                    <label>Rule Method:</label>
                    <p>{state.ruleMethod}</p>

                  </div>

                  <div style={{ display: "flex" }}>
                    <label>Case Type:</label>
                    <p hidden>{masterRule.caseTypeRefId}</p>
                    <p>{state.casename}</p>
                  </div>
                </div>
                <div style={{ marginLeft: "3rem" }}>
                  <div style={{ display: "flex" }}>
                    <label>Document Seq:</label>
                    <p>{state.docSeq}</p>
                  </div>

                  <div style={{ display: "flex" }}>
                    <label>Rule Type:</label>
                    <p>{state.ruleTypeName}</p>
                  </div>

                  <div style={{ display: "flex" }}>
                    <label>Weighting %:</label>
                    <p>{state.weighting}</p>
                  </div>
                </div>
                <div style={{ display: "flex", marginLeft: "3rem" }}>
                  <label>Number Conditions:</label>
                  <p>{state.numberConditions}</p>
                </div>
              </div>
            </div>
          </section>
          <section id="card">
            <div className="well">
              <h1 style={{ marginTop: "0rem" }}>
                {" "}
                Create Risk Rule Condition{" "}
              </h1>
              <table
                className="table table-striped"
                style={{ marginTop: "1rem" }}
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Seq.No</th>
                    <th scope="col">Field Name</th>
                    <th scope="col">Condition Value</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {masterCondition.map((e, i) => (
                    <tr key={i}>
                      <td>{e.seqNo}</td>
                      <td>{e.fieldName}</td>
                      <td>{e.conName}</td>
                      <td hidden>{e.conditionValue}</td>
                      <td>
                        <button
                          onClick={() => handleEdit(e.id)}
                          data-toggle="modal"
                          data-target="#myModal"
                          style={{ border: "none" }}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <i
                          onClick={() => handleDelete(i, e.id)}
                          class="fa fa-trash ml-4"
                          aria-hidden="true"
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr style={{ border: "1px solid #2d3f61" }} />
              <div className="inner-card">
                <form className="ml-auto" method="post">
                  <h1>Add New Entry </h1>
                  <div style={{ display: "flex" }}>
                    <div>
                      <label className="">Seq No.</label>
                      <br />
                      <input className={validSeqNo ? "" : "empty-select"}
                        name="seqNo"
                        value={todoValues.seqNo}
                        onChange={handleTodo}
                        type="text"
                        placeholder="Seq No."
                        style={{ width: "14rem", height: "40px" }}
                      />
                    </div>
                    <div style={{ marginLeft: "4rem" }}>
                      <label className="">Field Name</label>
                      <br />

                      <select className={`select_condition ${validfieldName ? "" : "empty-select"}`}
                        value={todoValues.fieldName}
                        onChange={handleTodo}
                        name="fieldName"
                        style={{ width: "14rem", height: "40px" }}
                      >
                        <option>Select Field Name</option>
                        {fieldNames.map((doc) => (
                          <option value={doc.fieldName}>{doc.fieldName}</option>
                        ))}
                      </select>
                      <br />
                    </div>

                    <div style={{ marginLeft: "4rem" }}>
                      <label className="">Condition Value </label>
                      <br />
                      <select className={`select_condition ${validconditionValue ? "" : "empty-select"}`}
                        value={todoValues.conditionValue}
                        name="conditionValue"
                        onChange={handleTodo}
                        type="text"
                        style={{ width: "14rem", height: "40px" }}
                      >
                        <option value="">Select Condition Value</option>
                        {ConditionRef.map((conref) => (
                          <option value={conref.id}>
                            {conref.conditionValue}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div style={{ marginLeft: "0.5rem", marginTop: "0.5rem" }}>
                      <label className=""></label>
                      <br />
                      <button disabled={masterCondition.length < state.numberConditions ? false : true}
                        onClick={addTodo}
                        type="button"
                        className="btn btn-md"
                        style={{
                          backgroundColor: "#ECF7F2",
                          color: "#03995D",
                          borderColor: "#03995D",
                          fontWeight: "600",
                          marginLeft: "2rem",
                          width: "8rem",

                        }}

                      >
                        {" "}
                        <i class="fa fa-plus mr-1" aria-hidden="true"></i> Add
                        Field{" "}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="button">
                {/* <button
                  type="button"
                  disabled={
                    masterCondition.length < state.numberConditions
                      ? true
                      : false
                  }
                  className="btn  btn-md btn-save"
                  onClick={() => navigate.push("/riskrulecreatekeypage")}
                >
                  Exit Screen
                </button> */}
                <button
                  type="button"
                  onClick={() => navigate.push('/updateRiskRuleKeysAfterCreate', { state: { id: state.ruleId } })}
                  className="btn btn-md  btn-back"
                >
                  Back
                </button>
                
                <button
                      type="button"
                      disabled={
                        masterCondition.length < state.numberConditions
                          ? true
                          : false
                      }   
                      onClick={handleNext}
                      className="btn btn-md  btn-save"
                      style={{ marginRight: 10 }}
                    >
                      Next
                    </button>

                {/* {masterCondition.length < state.numberConditions ? (
                  <>

                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn btn-md  btn-save"
                      style={{ marginRight: 10 }}
                    >
                      Next
                    </button>
                  </>
                )} */}

              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="modal fade" id="myModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="row">
              <div className="col-md-10 col-lg-10">
                <section id="card">
                  <div className="well" style={{ width: "43rem" }}>
                    <h1> Risk Rule Condition Edit </h1>
                    <div className="inner-card">
                      <form className="ml-auto" method="post">
                        <div style={{ display: "flex" }}>
                          <div>
                            <label className="">Seq No.</label>
                            <br />
                            <input
                              name="seqNo"
                              value={todoValues.seqNo}
                              onChange={handleTodo}
                              type="text"
                              placeholder="Seq No."
                              style={{ width: "14rem", height: "40px" }}
                            />
                          </div>

                          <div style={{ marginLeft: "4rem" }}>
                            <label className="">Field Name</label>
                            <br />

                            <select
                              value={todoValues.fieldName}
                              onChange={handleTodo}
                              className="select_condition"
                              name="fieldName"
                              style={{ width: "14rem", height: "40px" }}
                            >
                              <option>Select Field Name</option>
                              {fieldNames.map((doc) => (
                                <option value={doc.fieldName}>
                                  {doc.fieldName}
                                </option>
                              ))}
                            </select>
                            <br />
                          </div>
                        </div>
                        <br />
                        <div>
                          <label className="">Condition Value </label>
                          <br />
                          <select
                            value={todoValues.conditionValue}
                            name="conditionValue"
                            onChange={handleTodo}
                            className="select_condition"
                            type="text"
                            style={{ width: "14rem", height: "40px" }}
                          >
                            <option value="">Select Condition Value</option>
                            {ConditionRef.map((conref) => (
                              <option value={conref.id}>
                                {conref.conditionValue}
                              </option>
                            ))}
                          </select>
                        </div>
                      </form>
                    </div>
                    <div className="button">
                      <button
                        data-dismiss="modal"
                        onClick={addTodo}
                        type="button"
                        className="btn  btn-md btn-save"
                      >
                        Update
                      </button>
                      <button
                        data-dismiss="modal"
                        type="button"
                        className="btn btn-md  btn-back"
                        onClick={refreshBckBtn}
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
      </div>
    </div>
  );
};
export default RiskRuleCreateCondition;
