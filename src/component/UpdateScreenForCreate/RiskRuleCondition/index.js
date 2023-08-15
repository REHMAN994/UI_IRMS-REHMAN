import axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useHistory, useLocation } from "react-router-dom";
import * as YUP from "yup";
import { ToastContainer, toast } from 'react-toastify';

const RiskRuleMaintainAfterCreate = () => {
  let history = useHistory();
  const navigate = useHistory();
  const location = useLocation();
  const { state } = location.state;
  console.log(state);
  const [ruleType, setRuleType] = useState([]);
  const [masterRule, setmasterRule] = useState([]);
  const [masterCondition, setmasterCondition] = useState([]);
  const [fieldName, setFieldName] = useState([]);
  const [conditionValue, setConditionValue] = useState([]);

  useState(() => {
    const getRuleType = async () => {
      await axios
        .get(
          process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE + "/MasterRule/GetAll"
        )
        .then((res) => setRuleType(res.data))
        .catch((err) => console.log(err));
    };
    const getConditionValue = async () => {
      await axios
        .get(
          process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
          "/ConditionRef/GetAllIDs"
        )
        .then((res) => setConditionValue(res.data))
        .catch((err) => console.log(err));
    };
    getConditionValue();
    getRuleType();
    axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
        `/MasterRule/GetAllById?id=${parseInt(state.id)}`
      )
      .then((res) => {
        setmasterRule(res.data);
        getdata(res.data.ruleId);
        getFieldName(res.data.documentTypeId);
      })
      .catch((err) => console.log(err));



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
  const getFieldName = async (id) => {
    await axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
        `/DocumentField/GetAllFields?documnetTypeId=${id}`
      )
      .then((res) => setFieldName(res.data))
      .catch((err) => console.log(err));
  };


  // TODO

  const [values, setValues] = useState({
    seqNo: "",
    fieldName: "",
    conditionValue: "",
  });
  const [validseqNo, setseqValidNo] = useState(false);
  const [validFieldName, setFieldNameValid] = useState(false);
  const [validConditionValue, setConditionValueValid] = useState(false);

  const [toggle, setToggle] = useState(false);
  const [editId, setEditId] = useState();

  const [resultState, setResultState] = useState([]);


  const handlechange = (e) => {
    const value = e.target.value;
    setValues({ ...values, [e.target.name]: value });
  };
  const schema = YUP.object().shape({
    seqNo: YUP.number().required("seqNo is required"),
    fieldName: YUP.string().required("fieldName is required"),
    conditionValue: YUP.string().required("conditionValue is required"),
  });
  schema.isValid(values).then((valid) => {
    setseqValidNo(valid);

  });
  schema.isValid(values).then((valid) => {
    setFieldNameValid(valid);
  });
  schema.isValid(values).then((valid) => {
    setConditionValueValid(valid);
  });



  
  
  

  const handleTodo = () => {
    if (
      values.conditionValue == "" ||
      values.fieldName == "" ||
      values.seqNo == ""
    ) {
      Swal.fire({
        title: "Oops...",
        text: "Please Fill Required Fields!",
      });
    } else if (toggle) {
      setmasterCondition(
        masterCondition.map((e, i) => {
          console.log(editId);
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
                  Id: editId,
                  ruleId: masterRule.ruleId,
                  documentTypeId: masterRule.documentTypeId,
                  seqNo: values.seqNo,
                  fieldName: values.fieldName,
                  conditionValue: values.conditionValue,
                });

                var requestOptions = {
                  method: "PUT",
                  headers: myHeaders,
                  body: raw,
                  redirect: "follow",
                };

                fetch(
                  process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
                  "/MasterCondition/Update",
                  requestOptions
                )
                  .then((response) => response.text())
                  .then((result) => console.log(result))
                  .catch((error) => console.log("error", error));
                  toast.success("Updated Successfully");
              //   Swal.fire("Updated Successfully", "", "success")
              //   .then(function() {
              //     window.location.reload(true)
              // });
                window.location.reload(true)
              } 
            });
            debugger;
            return {
              ...e,
              seqNo: values.seqNo,
              fieldName: values.fieldName,
              conditionValue: values.conditionValue,
            };
          }
          return e;
        })
      );
      setToggle(false);

      setValues({
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
            ruleId: masterRule.ruleId,
            documentTypeId: masterRule.documentTypeId,
            seqNo: values.seqNo,
            fieldName: values.fieldName,
            conditionValue: values.conditionValue,
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
            .then((result) =>
              setmasterCondition([
                ...masterCondition,
                {
                  fieldName: JSON.parse(result).fieldName ,
                  conditionValue: JSON.parse(result).conditionValue,
                  seqNo: JSON.parse(result).seqNo ,
                },
              ])
            )
            .catch((error) => console.log("error", error));

            toast.success("Added Successfully");
        } 
      });
      console.log(masterCondition);
      // setmasterCondition([...masterCondition, values])
      setValues({
        seqNo: "",
        fieldName: "",
        conditionValue: "",
      });
    }
  };
  const handleDelete = (id) => {
    const deletedData = masterCondition.filter((e) => e.id !== id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
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
          "/MasterCondition/Remove?id=" +
          id,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .then(setmasterCondition(deletedData))
          .catch((error) => console.log("error", error));

          toast.success("Deleted Successfully");
        //Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleEdit = (id) => {
    setToggle(true);
    const editTodo = masterCondition.find((e, i) => {
      return i === id;
    });
    setValues({
      Id: editTodo.id,
      seqNo: editTodo.seqNo,
      fieldName: editTodo.fieldName,
      conditionValue: editTodo.conditionValue,
    });
    setEditId(editTodo.id);
  };
  const handleNext = () => {
    if(state.check == "Created"){
      navigate.push("/updateRiskRuleDecisionAfterCreate", {
        state: {
          Id: state.id
        }
      })
    }else if(state.check == "NotCreated"){
      navigate.push("/riskrulecreatedecisionpage", {
        state: {
          Id: state.id
        }
      })
    }
    
  }

  const refreshBckBtn = (e) => {
    setValues({
      seqNo: "",
      fieldName: "",
      conditionValue: "",
    });
    setToggle(false);
}
  return (
    <div>
       <ToastContainer />
      <div className="row">
        <div className="col-md-10 col-lg-10">
          <section id="card">
            <div className="well">
              <h1>Create Risk Rule Conditions</h1>
              <div>
                <form className="ml-auto">
                  <div style={{ display: "flex" }}>
                    <div>
                      <div style={{ display: "flex" }}>
                        <label>Rule ID:</label>
                        <p>{state.id}</p>
                      </div>

                      <div style={{ display: "flex" }}>
                        <label>Document Type: </label>
                        <p>{masterRule.documentType}</p>
                      </div>

                      <div style={{ display: "flex" }}>
                        <label>Threat Group:</label>
                        <p hidden>{masterRule.threatGroupId}</p>
                        <p>{masterRule.threatGroup}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <label>Number Conditions:</label>
                        <p>{masterRule.numberConditions}</p>
                      </div>
                    </div>
                    <div style={{ marginLeft: "3rem" }}>
                      <div style={{ display: "flex" }}>
                        <label>Rule Type:</label>
                        <p hidden>{masterRule.ruleId}</p>
                        <p>{masterRule.ruleTypeRef}</p>
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
                        <p hidden>{masterRule.caseTypeRefId}</p>
                        <p>{masterRule.caseTypeRef}</p>
                      </div>
                    </div>
                    <div style={{ marginLeft: "3rem" }}>
                      <div style={{ display: "flex" }}>
                        <label>Document seq:</label>
                        <p>{masterRule.docSeq}</p>
                      </div>

                      <div style={{ display: "flex" }}>
                        <label>Rule Name:</label>
                        <p>{masterRule.ruleName}</p>
                      </div>

                      <div style={{ display: "flex" }}>
                        <label>Weighting %</label>
                        <p>{masterRule.weighting}</p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="well">
              <h1> Create Risk Rule Conditions </h1>
              <table
                className="table table-striped"
                style={{ marginTop: "1rem" }}
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Ref</th>
                    <th scope="col">Seq No.</th>
                    <th scope="col">Field Name</th>
                    <th scope="col">Condition Value</th>
                    <th scope="col" className="mw-100">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {masterCondition.map((e, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{e.seqNo}</td>
                      <td>{e.fieldName}</td>
                      <td>{e.conditionValueName}</td>
                      <td>
                        <button
                          onClick={() => handleEdit(index)}
                          data-toggle="modal"
                          data-target="#myModal"
                          style={{ border: "none" }}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <i
                          onClick={() => handleDelete(e.id)}
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
                  <h1>Add New Field </h1>
                  <br />
                  <div style={{ display: "flex" }}>
                    <div>
                      <label className="">Seq No.</label>
                      <br />
                      <input
                      id="seqNo"
                        name="seqNo"
                        value={values.seqNo}
                        onChange={handlechange}
                        //if validseq is true then only class is success else class is danger
                        className={validseqNo ? "success" : "danger"}
                        type="text"
                        placeholder="Seq No."
                        style={{ width: "13rem", height: "40px" }}
                      />
                    </div>

                    <div style={{ marginLeft: "3.5rem" }}>
                      <label className="">Field Name </label>
                      <br />
                      <select
                        value={values.fieldName}
                        onChange={handlechange}
                        className={validFieldName ? "dropdown_value success" : "dropdown_value danger"}
                        name="fieldName"
                       
                        style={{ width: "13rem", height: "40px" }}
                      >
                        <option value="">Field Name </option>
                        {fieldName.map((doc) => (
                          <option value={doc.fieldName}>{doc.fieldName}</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ marginLeft: "3.5rem" }}>
                      <label className="">Condition Value</label>
                      <br />
                      <select
                        value={values.conditionValue}
                        onChange={handlechange}
                        name="conditionValue"
                        className={validConditionValue ? "dropdown_value success" : "dropdown_value danger"}
                      
                        style={{ width: "14rem", height: "40px" }}
                      >
                        <option value="">Condition value </option>
                        {conditionValue.map((doc) => (
                          <option value={doc.id}>{doc.conditionValue}</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ marginLeft: "5rem", marginTop: "0.6rem" }}>
                      <label className=""></label>
                      <br />

                      <button style={{ width: '8rem' }}
                        onClick={handleTodo}
                        type="button"
                        className="btn  btn-md btn-back"
                        disabled={
                          validseqNo && validFieldName && validConditionValue
                            ? false
                            : true
                        }
                      >
                        + Add Field
                      </button>
                    </div>
                  </div>

                  <br />
                </form>
              </div>
              <div className="button">
                {/* <button type="button" className="btn  btn-md btn-save">Save</button> */}
                
                <button
                  data-dismiss="modal"
                  onClick={handleNext}
                  type="button"
                  className="btn btn-md  btn-back"
                >
                  Next
                </button>
                <button
                  type="button"
                  onClick={() => navigate.push('/updateRiskRuleKeysAfterCreate', { state: { id: state.id, check:"Created" } })}
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
      <div className="modal fade" id="myModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="row">
              <div className="col-md-10 col-lg-10">
                <section id="card">
                  <div className="well" style={{ width: "43rem" }}>
                    <h1> Maintain Risk Rule Edit </h1>
                    <div className="inner-card">
                      <form className="ml-auto" method="post">
                        <div style={{ display: "flex" }}>
                          <div>
                            <label>seq no </label>
                            <br />
                            <input
                              name="seqNo"
                              value={values.seqNo}
                              onChange={handlechange}
                              type="text"
                              style={{ width: "15rem" }}
                            />
                          </div>
                          <div style={{ marginLeft: "4rem" }}>
                            <label>Seq No. </label>
                            <br />
                            <select
                              value={values.fieldName}
                              onChange={handlechange}
                              name="fieldName"
                              className="dropdown_value"
                              style={{ width: "14rem", height: "40px" }}
                            >
                              <option value="">Field Name </option>
                              {fieldName.map((doc) => (
                                <option value={doc.fieldName}>
                                  {doc.fieldName}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div style={{ display: "flex", marginTop: "1rem" }}>
                          <div>
                            <label>Detail Document Type</label>
                            <br />
                            <select
                              value={values.conditionValue}
                              onChange={handlechange}
                              name="conditionValue"
                              className="dropdown_value"
                              style={{ width: "14rem", height: "40px" }}
                            >
                              <option value="">Condition value </option>
                              {conditionValue.map((doc) => (
                                <option value={doc.id}>
                                  {doc.conditionValue}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="button">
                    <button
                        data-dismiss="modal"
                        type="button"
                        className="btn btn-md  btn-save"
                        onClick={handleTodo}
                      >
                        Save
                      </button>
                      <button
                        data-dismiss="modal"
                        onClick={refreshBckBtn}
                       
                        type="button"
                        className="btn  btn-md btn-back"
                        style={{marginRight:"10px"}}
                      >
                        Cancel
                        
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
export default RiskRuleMaintainAfterCreate;
