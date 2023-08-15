import { configConsumerProps } from "antd/lib/config-provider";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Swal from "sweetalert2";
import { useHistory,useLocation } from "react-router-dom";


const RiskRuleUpdateCountAfterCreate = () => {
  let history = useHistory();
    const navigate = useHistory();
    const location = useLocation();
    const {state} = location.state;
    console.log(state);
  const [ruleType, setRuleType] = useState([]);
  const [masterRule, setmasterRule] = useState([]);
  const [fieldName, setFieldName] = useState([]);
  const [conditionValue, setConditionValue] = useState([]);
  const [values, setValues] = useState({
    count: "",
    fieldName: "",
    conditionValue: "",
    seqNo:""
  });
  const [id, setId] = useState("");
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

     axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
          `/MasterRule/GetAllById?id=${parseInt(state.id)}`
      )
      .then((res) => {
        setmasterRule(res.data);
        console.log(res.data);

        getfieldName(res.data.documentTypeId);
      })
      .catch((err) => console.log(err));

       axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
          `/MasterRule/GetAllById?id=${parseInt(state.id)}`
      )
      .then((res) => {
        setmasterRule(res.data);
        console.log(res.data);

        getfieldName(res.data.documentTypeId);
      })
      .catch((err) => console.log(err));

       axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
          `/MasterCondition/GetAllByMasterRuleId?id=${parseInt(state.id)}
        `
      )
      .then((res) => {
        setValues({
          ...values,
          count: res.data[0].riskCount,
          fieldName: res.data[0].fieldName,
          conditionValue: res.data[0].conditionValue,
          seqNo : res.data[0].seqNo
        });
        setId(res.data[0].id);
        console.log(res.data);
      })
      .catch((err) => console.log(err));



    getConditionValue();

    getRuleType();
  }, []);

  const getfieldName = async (id) => {
    await axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
          `/DocumentField/GetAllFields?documnetTypeId=${id}`
      )
      .then((res) => setFieldName(res.data))
      .catch((err) => console.log(err));
  };

  

  const handlechange = (e) => {
    const value = e.target.value;
    setValues({ ...values, [e.target.name]: value });
  };

  const handlsave = () => {
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
          id: id,
          ruleId: masterRule.ruleId,
          documentTypeId: masterRule.documentTypeId,
          seqNo: masterRule.docSeq,
          fieldName: values.fieldName,
          conditionValue: parseInt(values.conditionValue),
          riskCount: parseInt(values.count),
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
      } 
    });
  };

  const handleNext = () =>{
    navigate.push("/riskrulecreatedecisionpage",{
      state:{
        Id:state.id
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
              <h1 style={{ marginTop: "0rem" }}>Create Risk Rule Key</h1>
              <form className="ml-auto">
                <div style={{ display: "flex" }}>
                  <div>
                    <div style={{ display: "flex" }}>
                      <label>Rule ID:</label>
                     <p>{state.id}</p>
                    </div>

                    <div style={{ display: "flex" }}>
                      <label>Document Type: </label>
                      <p>{masterRule.documentType} </p>
                    </div>

                    <div style={{ display: "flex" }}>
                      <label>Threat Group:</label>
                      <p>{masterRule.threatGroup}</p>
                      {/* <p>{masterRule.id}</p> */}
                    </div>
                  </div>
                  <div style={{ marginLeft: "4rem" }}>
                    <div style={{ display: "flex" }}>
                      <label>Rule Type:</label>
                      <p>{masterRule.ruleTypeRef == "D" ? "Deductive" :masterRule.ruleTypeRef == "I" ? "Inductive":"" }</p>
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
                    </div>
                  </div>
                  <div style={{ display: "flex", marginLeft: "4rem" }}>
                    <label>Status:</label>
                    <p>{masterRule.statusCode}</p>
                  </div>
                </div>
              </form>
            </div>
          </section>
          <section id="card">
            <div className="well">
              <h1> Create Risk Rule-Count Condition </h1>
              <div>
                <form className="ml-auto" method="post">
                <div style={{ display: 'flex' }}>
                                        <label>Document Seq</label>
                                        <p>{values.seqNo}</p>

                                    </div>
                  <div style={{ display: "flex" ,marginTop: '1rem' }}>
                    
                    <div>
                      <label>Field Name</label>
                      <br />
                      <select
                        value={values.fieldName}
                        onChange={handlechange}
                        name="fieldName"
                        className="dropdown_value"
                        style={{ width: "28rem", height: "31px" }}
                      >
                        <option value="">Field Name </option>
                        {fieldName.map((f) => (
                          <option value={f.fieldName}>{f.fieldName} </option>
                        ))}
                      </select>
                    </div>

                    <div style={{ marginLeft: "4rem" }}>
                      <label>Condition Value</label>
                      <br />
                      <select
                        value={values.conditionValue}
                        onChange={handlechange}
                        name="conditionValue"
                        className="dropdown_value"
                        style={{ width: "28rem", height: "31px" }}
                      >
                        <option value="">Condition Value </option>
                        {conditionValue.map((c) => (
                          <option value={c.id}>{c.conditionValue}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "flex", marginTop: "1rem" }}>
                    <div>
                      <label>Count</label>
                      <br />
                      <input
                        value={values.count}
                        onChange={handlechange}
                        name="count"
                        placeholder="Count"
                        type="number"
                        style={{ width: "28rem" }}
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div className="button" style={{ marginTop: "2rem" }}>
                {/* <button
                  type="button"
                  className="btn  btn-md btn-save"
                  style={{ float: "left", width: "10rem" }}
                    onClick={()=> navigate.push('/riskrulereviewpage')}
                >
                  Review Rules
                </button> */}
                 <button
                  type="button"
                  onClick={() => navigate.push('/riskrulecreatekeypage')}
                  className="btn btn-md  btn-save"
                  style={{ width: "7rem",marginRight: 10 , marginleft: 12  }}
                >
                  Exit Screen
                </button>
                <button
                  onClick={handlsave}
                  type="button"
                  className="btn  btn-md btn-save"
                  style={{ width: "7rem",marginRight: 10 , marginleft: 12  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => navigate.push('/updateRiskRuleKeysAfterCreate', { state: { id: state.id , check: "Created" } })}
                  className="btn btn-md  btn-back"
                >
                  Back
                </button>

                {/* <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-md  btn-back"
                >
                  Next
                </button> */}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default RiskRuleUpdateCountAfterCreate;
