import axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useHistory, useLocation } from "react-router-dom";

const RiskRuleMaintain = () => {
  let history = useHistory();
  const navigate = useHistory();
  const location = useLocation();
  const { state } = location.state;
  console.log(state.id);
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
  const [toggle, setToggle] = useState(false);
  const [editId, setEditId] = useState();

  const [resultState, setResultState] = useState([]);

  const handlechange = (e) => {
    const value = e.target.value;
    setValues({ ...values, [e.target.name]: value });
  };

  const handleTodo = () => {
    if (
      values.conditionValue == "" ||
      values.fieldName == "" ||
      values.seqNo == ""
    ) {
      Swal.fire({
        icon: "error",
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
              cancelButtonText: "Cancel",
              icon: "warning",
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
                Swal.fire("Updated Successfully", "", "success");
                // window.location.reload(true)
              } else Swal.fire(" Cancelled", "", "error");
            });
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
        cancelButtonText: "Cancel",
        icon: "warning",
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
              setmasterCondition([...masterCondition, JSON.parse(result)])
            )
            .catch((error) => console.log("error", error));

          Swal.fire("Added Successfully", "", "success");
        } else Swal.fire(" Cancelled", "", "error");
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
          "/MasterCondition/Remove?id=" +
          id,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .then(setmasterCondition(deletedData))
          .catch((error) => console.log("error", error));

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
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
    navigate.push("/displayriskruledecision", {
      state: {
        id: state.id
      }
    })
  }
  return (
    <div>
      <div className="row">
        <div className="col-md-10 col-lg-10">
          <section id="card">
            <div className="well">
              <h1>Review Risk Rule Conditions </h1>
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
                        <p>{masterRule.ruleTypeRef == "I" ? "Inductive" : masterRule.ruleTypeRef == "D" ? "Deductive": ""}</p>
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
              <h1> Review Risk Rule Conditions </h1>
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
                   
                  </tr>
                </thead>
                <tbody>
                  {masterCondition.map((e, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{e.seqNo}</td>
                      <td>{e.fieldName}</td>
                      <td>{e.conditionValueName}</td>
                     
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr style={{ border: "1px solid #2d3f61" }} />
           
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
                  data-dismiss="modal"
                  onClick={() => history.goBack()}
                  type="button"
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
export default RiskRuleMaintain;
