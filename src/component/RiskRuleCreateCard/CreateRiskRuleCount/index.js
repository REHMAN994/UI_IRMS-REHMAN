import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { number, string } from "yup";
import ReactPaginate from 'react-paginate';

const RiskRuleCreateCount = () => {
  const [validMessage, setvalidMessage] =  useState("NotCreated");


    const [ValidFieldName, setValidFieldName] = useState(false);
    const [ValidConditionValue, setValidConditionValue] = useState(false);
    const [ValidCount, setValidCount] = useState(false);
    const [values , setValues] = useState({})

    const [ValFieldName, setValFieldName] = useState("");
    const [ValConditionValue, setValConditionValue] = useState("");
    const [ValCount, setValCount] = useState("");
    const [disbalednext, setDisbaled] = useState(true);


    const [validCreateRiskRule, setvalidCreateRiskRule] = useState(false);
    const [validRiskRuleSelection, setvalidRiskRuleSelection] = useState(true);
    const [validReviewRiskRuleCount, setvalidReviewRiskRuleCount] = useState(true);

    const navigate = useHistory();
    const location = useLocation();
    const { state } = location.state;
    console.log(state);
    const [fieldName, setFieldName] = useState([]);
    const [conditionValue, setConditionValue] = useState([]);
    const [selectedValues, setSelectedValues] = useState({
        fieldName: "",
        numberCondition: "",
        count: "",
    })
    const [masterRule2, setmasterRule2] = useState([]);
    const [masterRule, setmasterRule] = useState([]);
    const [ruleId2, setRuleId2] = useState("");
    const [isDisbaled, setIsDisbaled] = useState(true);
    const [savebtn, setsaveBtn] = useState(false)

    const [validCount, setvalidCount] = useState(false);

    
    const [ruleType, setRuleType] = useState([]);
    const [Id, setId] = useState("");
    useState(() => {
        // console.log(state);
        // const getRuleType = async () => {
        //   await axios
        //     .get(
        //       process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE + "/MasterRule/GetAll"
        //     )
        //     .then((res) => setRuleType(res.data))
        //     .catch((err) => console.log(err));
        // };

        // const getConditionValue = async () => {
        //   await axios
        //     .get(
        //       process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
        //         "/ConditionRef/GetAllIDs"
        //     )
        //     .then((res) => setConditionValue(res.data))
        //     .catch((err) => console.log(err));
        // };

        //  axios
        //   .get(
        //     process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
        //       `/MasterRule/GetAllById?id=${parseInt(state.MasterRuleId)}`
        //   )
        //   .then((res) => {
        //     setmasterRule(res.data);
        //     console.log(res.data);

        //     getfieldName(res.data.documentTypeId);
        //   })
        //   .catch((err) => console.log(err));

        //    axios
        //   .get(
        //     process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
        //       `/MasterRule/GetAllById?id=${parseInt(state.MasterRuleId)}`
        //   )
        //   .then((res) => {
        //     setmasterRule(res.data);
        //     console.log(res.data);

        //     getfieldName(res.data.documentTypeId);
        //   })
        //   .catch((err) => console.log(err));

        //    axios
        //   .get(
        //     process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
        //       `/MasterCondition/GetAllByMasterRuleId?id=${parseInt(state.MasterRuleId)}
        //     `
        //   )
        //   .then((res) => {
        //     setValues({
        //       ...values,
        //       count: res.data[0].riskCount,
        //       fieldName: res.data[0].fieldName,
        //       conditionValue: res.data[0].conditionValue,
        //     });
        //     setId(res.data[0].id);
        //     console.log(res.data);
        //   })
        //   .catch((err) => console.log(err));



        // getConditionValue();

        // getRuleType();
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

    useEffect(() => {
        const getFieldName = async () => {
            await axios.get(process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE + `/DocumentField/GetAllFields?documnetTypeId=${state.DocumentType}`).then((res) => setFieldName(res.data)).catch((err) => console.log(err));

        }
        const getConditionValue = async () => {
            await axios.get(process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE + '/ConditionRef/GetAllIDs').then((res) => setConditionValue(res.data)).catch((err) => console.log(err));
        }
        getFieldName();
        getConditionValue();
    }, [])

    console.log(fieldName);
    console.log(conditionValue);
    const handlechange = (e) => {
        const value = e.target.value;
        setSelectedValues({ ...selectedValues, [e.target.name]: value })
        setvalidCount(number().required().isValidSync(value));
    }

    const handlereview = () => {
        axios.get(process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE + `/MasterRule/SearchMasterRuleByDocumentTypeforCount?DocTypeID=${state.DocumentType}&ThreatRuleID=${0}&RuleID=${0}`).then((res) => {
            setruleSelection(res.data);
        }).catch((err) => console.log(err));
        
        setvalidCreateRiskRule(true);
        setvalidRiskRuleSelection(false);
        setvalidReviewRiskRuleCount(true);
    }

    const handlecheck = (e) => {
        setIschecked(e.target.value)
        setvalidselectRiskRule(string().required().isValidSync(e.target.value));
      }



    const handlesave = () => {
        if(selectedValues.count == 0){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
             text: "Risk Count Required only 1 to 99"
            });
            return false;
        }
        Swal.fire({
            title: 'Are you sure you want to save?',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            icon: 'warning'
        }
        ).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "ruleId": state.MasterRuleId,
                    "documentTypeId": state.DocumentType,
                    "seqNo": state.DocSeq,
                    "fieldName": ValFieldName.fieldName,
                    "conditionValue": ValConditionValue.id,
                    "riskCount": selectedValues.count,
                    "CheckforCount" : "Y"
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
                debugger;
                fetch(process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE + "/MasterCondition/Add", requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        const ruleId = JSON.parse(result);
                        setId(ruleId.ruleId);
                        setIsDisbaled(false);
                        console.log(ruleId);
                        setDisbaled(false);
                        setSelectedValues({
                            fieldName: "",
                            numberCondition: "",
                            count: "",
                        })
                        setValidConditionValue(false);
                        setValidFieldName(false);
                        setvalidMessage("Created");
                    })
                    .catch(error => console.log('error', error));


                Swal.fire('Added Successfully', '', 'success');
                //window.location.reload();
                // navigate.push("/riskrulecreatekeypage");
            } else
                Swal.fire(' Cancelled', '', 'error')

        })
    }



    const handlenext = () => {

        navigate.push('riskrulecreatedecisionpage', {
            state: {
                Id: state.MasterRuleId
            }
        });
    }

    const handleBack = () => {

      navigate.push('/updateRiskRuleKeysAfterCreate', { 
        state: 
          { 
            id: state.MasterRuleId ,
            check : validMessage
          } 
        });
  }

    const bckbutton = () => {
        setvalidCreateRiskRule(true);
        setvalidRiskRuleSelection(false);
        setvalidReviewRiskRuleCount(true);
    }


    const bckbuttonforgrid = () => {
        setvalidCreateRiskRule(false);
        setvalidRiskRuleSelection(true);
        setvalidReviewRiskRuleCount(true);
    }
    const SelectRiskRule = (e) => {
        const ruleId = ischecked;

        //  axios
        //   .get(
        //     process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +
        //       `/MasterRule/GetAllById?id=${ruleId}`
        //   )
        //   .then((res) => {
        //     setmasterRule2(res.data);
        //     setValues({
        //       ...values,
        //       docSeq: res.data.docSeq,
        //       ruleName: res.data.ruleName,
        //       description: res.data.description,
        //       weighting: res.data.weighting,
        //       numberConditions: res.data.numberConditions,
        //     });
        //   })
        //   .catch((err) => console.log(err));
        // setRuleId2(ruleId);
        console.log(state);
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
              `/MasterRule/GetAllById?id=${parseInt(ruleId)}`
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
              `/MasterRule/GetAllById?id=${parseInt(ruleId)}`
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
              `/MasterCondition/GetAllByMasterRuleId?id=${ruleId}
            `
          )
          .then((res) => {
            setValues({
              ...values,
              count: res.data[0].riskCount,
              fieldName: res.data[0].fieldName,
              conditionValue: res.data[0].conditionValue,
            });
            setId(res.data[0].id);
            console.log(res.data);
          })
          .catch((err) => console.log(err));



        getConditionValue();

        getRuleType();
        setvalidCreateRiskRule(true);
        setvalidRiskRuleSelection(true);
        setvalidReviewRiskRuleCount(false);
      }


    //Pagination
const [pageNumber, setPageNumber] = useState(0);
const [serielNum, setSerielNum] = useState(1);
const [ruleSelection, setruleSelection] = useState([]);
const [ischecked, setIschecked] = useState("");
const [validselectRiskRule, setvalidselectRiskRule] = useState(false);
const dataPerPage = 10;
const dataVisited = pageNumber * dataPerPage;

for (var i = 0; i < ruleSelection.length; i++) {
    ruleSelection[i]["sno"] = i + 1;
}

const displayData = ruleSelection.slice(dataVisited, dataVisited + dataPerPage).map((item, index) => (
    <tr key={item.id}>
    <th scope="row">{item.sno}</th>
    <td>{item.ruleTypeRef}  </td>
    <td>{item.ruleId}</td>
    <td>{item.documentType}</td>
    <td>{item.ruleName}</td>
    <td>{item.documentType}</td>
    <td>{item.threatGroup}</td>


    <td>
        <form>
            <input type="radio" value={item.ruleId} onChange={handlecheck} checked={ischecked == item.ruleId ? true : false} style={{ width: "1rem" }} />
        </form>
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
            <div hidden={validCreateRiskRule} className="row">
                <div className="col-md-10 col-lg-10">
                    <section id="card">
                        <div className="well">
                            <h1 style={{ marginTop: '0rem' }}>Create Risk Rule Key</h1>
                            <form className="ml-auto">
                <div style={{ display: "flex" }}>
                  <div>
                    <div style={{ display: "flex" }}>
                      <label>Rule ID:</label>
                     <p>{state.MasterRuleId}</p>
                    </div>

                    <div style={{ display: "flex" }}>
                      <label>Document Type: </label>
                      <p>{state.DocumentName} </p>
                    </div>

                    <div style={{ display: "flex" }}>
                      <label>Threat Group:</label>
                      <p>{state.ThreatGroupName}</p>
                      {/* <p>{masterRule.id}</p> */}
                    </div>
                  </div>
                  <div style={{ marginLeft: "4rem" }}>
                    <div style={{ display: "flex" }}>
                      <label>Rule Type:</label>
                      <p>{state.RuleTypeName}</p>
                    </div>

                    <div style={{ display: "flex" }}>
                      <label>Rule Method:</label>
                      <p>{state.RuleMethod}</p>
                    </div>

                    <div style={{ display: "flex" }}>
                      <label>Case Type:</label>
                      <p>{state.CaseTypeName}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", marginLeft: "4rem" }}>
                    <label>Status:</label>
                    <p>{state.statusCode}</p>
                  </div>
                </div>
              </form>

                        </div>
                    </section>
                    <section id="card">
                        <div className="well">
                            <h1>Create Risk Rule-Count Condition</h1>
                            <div>
                                <form className="ml-auto" method="post">
                                    <div style={{ display: 'flex' }}>
                                        <label>Document Seq</label>
                                        <p>{state.DocSeq}</p>

                                    </div>

                                    <div style={{ display: 'flex', marginTop: '1rem' }}>
                                        <div>
                                            <label>Field Name <i style={{ color: "red" }}>*</i></label>
                                            <br />
                                            <select value={ValFieldName.name}
                                                onChange={(e) => {
                                                    setValFieldName(JSON.parse(e.target.value));
                                                    setValidFieldName(string().required().isValidSync(e.target.value));
                                                }} name="fieldName" style={{ width: '28rem' }}
                                                className={`dropdown_value ${ValidFieldName ? "" : "empty-select"}`}>
                                                <option value="">Select Field Name </option>
                                                {
                                                    fieldName.map((doc) => (
                                                        <option value={JSON.stringify(doc)}>{doc.fieldName}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div style={{ marginLeft: '4rem' }}>
                                            <label>Condition value<i style={{ color: "red" }}>*</i> </label>
                                            <br />
                                            <select value={ValConditionValue.name} onChange={(e) => {
                                                setValConditionValue(JSON.parse(e.target.value));
                                                setValidConditionValue(string().required().isValidSync(e.target.value));
                                            }} name="numberCondition" style={{ width: '28rem' }} className={`dropdown_value ${ValidFieldName ? "" : "empty-select"}`}>
                                                <option value="">Select Condition value </option>
                                                {
                                                    conditionValue.map((doc) => (
                                                        <option value={JSON.stringify(doc)}>{doc.conditionValue}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '1rem' }}>
                                        <label>Count<i style={{ color: "red" }}>*</i></label>
                                        <br />
                                        <input className={validCount ? "" : "empty-select"}  name="count" maxLength="2" onChange={handlechange} placeholder="Count" type="number" style={{ width: '28rem' }} />
                                        <br /><p style={{ fontSize: '12px', color: 'red' }}>{validCount ? "" : "Required 1 to 99"}</p>

                                    </div>

                                </form>
                            </div>

                            <div className="button" style={{ marginTop: '2rem' }}>
                                <button onClick={handlereview} type="button" className="btn  btn-md btn-save" style={{ float: 'left', width: '10rem' }}>Review Rules</button>

                                <button disabled={disbalednext} onClick={() => navigate.push('/riskrulecreatekeypage')} type="button" style={{ marginRight: 10 }} className="btn btn-md  btn-save">Exit Screen</button>
                                <button disabled={ValidFieldName && ValidConditionValue ? false : true}
                                    type="button" onClick={handlesave} className="btn  btn-md btn-save" style={{ width: '7rem',marginRight: 10  }}>Save</button>
                                {/* <button disabled={disbalednext} onClick={handlenext} type="button" style={{ marginRight: 10 }} className="btn btn-md  btn-save">Next</button> */}
                                <button type="button"   onClick={handleBack} className="btn  btn-md btn-back" style={{ width: '7rem' }}>Back</button>
                            </div>

                        </div>
                    </section>
                </div>
            </div>
            <div>
            <section hidden={validRiskRuleSelection} id="card">

                <div className="well" style={{ width: '64rem' }}>
                    <h1 > Risk Rule Selection </h1>
                    <div>
                        <form className="ml-auto" >
                            {/* <div style={{ display: 'flex' }}>
                                <p style={{ marginLeft: 'initial' }}>{docopt.documentType1 == undefined ? '' : 'Document Type'}</p>
                                <p style={{ marginLeft: 'initial' }}>{thropt.threatGroup1 == undefined ? '' : 'Threat Rule Set'}</p>
                                <p style={{ marginLeft: 'initial' }}>{ruleopt.ruleName == undefined ? '' : 'Rule Name'}</p>
                                <br />
                                <p>{docopt.documentType1}{thropt.threatGroup1}{ruleopt.ruleName}</p>
                                <br />
                            </div> */}



                        </form>
                    </div>
                    <table className="table table-striped" style={{ marginTop: "1rem" }}>
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">S.No</th>
                                <th scope="col">Ref</th>
                                <th scope="col">Risk ID</th>
                                <th scope="col">Type</th>
                                <th scope="col">Rule Name</th>
                                <th scope="col">Document Type</th>
                                <th scope="col">Threat Group</th>
                                <th scope="col" className="mw-100">Action</th>
                            </tr>
                        </thead>
                        {/* <tbody>


                            {
                                ruleSelection.map((e) => (
                                    <tr>
                                        <td>{e.ruleTypeRef}  </td>
                                        <td>{e.ruleId}</td>
                                        <td>{e.documentType}</td>
                                        <td>{e.ruleName}</td>
                                        <td>{e.documentType}</td>

                                        <td>{e.threatGroup}</td>


                                        <td>
                                            <form>
                                                <input type="radio" value={e.ruleId} checked={ischecked == e.ruleId ? true : false} onChange={handlecheck} style={{ width: "1rem" }} />
                                            </form>
                                        </td>



                                    </tr>
                                ))
                            }

                        </tbody> */}
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
                    <hr style={{ border: '1px solid #2d3f61' }} />
                    <div className="inner-card">
                        <form className="ml-auto" method="post">
                            <h1 >Risk Rule Selection </h1>
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

                                    <button disabled={validselectRiskRule ? false : true}  onClick={SelectRiskRule}  type="button" className="btn  btn-md btn-save" style={{ width: '14rem', height: '40px', marginTop:'-6px' }}>Select Risk Rule</button>

                                </div>
                            </div>


                        </form>

                    </div>
                    <div className="button">
                        {/* <button type="button" className="btn  btn-md btn-save">Next</button> */}
                        <button onClick={bckbuttonforgrid}  type="button" className="btn  btn-md btn-back" style={{ marginRight: '0.5rem', }}>Back</button>
                        {/* <button type="button" style={{ marginRight: '0.5rem', }} className="btn btn-md  btn-back">Cancel</button> */}

                    </div>
                </div>
            </section>
        </div>

        <div>
      <div  hidden={validReviewRiskRuleCount} className="row">
        <div className="col-md-10 col-lg-10">
          <section id="card">
            <div className="well">
              <h1 style={{ marginTop: "0rem" }}>Review Risk Rule Count</h1>
              <form className="ml-auto">
                <div style={{ display: "flex" }}>
                  <div>
                    <div style={{ display: "flex" }}>
                      <label>Rule ID:</label>
                     <p>{state.MasterRuleId}</p>
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
              <h1> Review Risk Rule-Count Condition </h1>
              <div>
                <form className="ml-auto" method="post">
                  <div style={{ display: "flex" }}>
                    <div>
                      <label>Field Name</label>
                      <br />
                      <input
                        disabled={true}
                        value={values.fieldName}
                        onChange={handlechange}
                        name="fieldName"
                        className="dropdown_value"
                        style={{ width: "28rem", height: "31px" }}
                      />
                    </div>

                    <div style={{ marginLeft: "4rem" }}>
                      <label>Condition Value</label>
                      <br />

                      <input
                      disabled={true}
                        value={values.conditionValue}
                        onChange={handlechange}
                        name="conditionValue"
                        className="dropdown_value"
                        style={{ width: "28rem", height: "31px" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", marginTop: "1rem" }}>
                    <div>
                      <label>Count</label>
                      <br />
                      <input
                      disabled={true}
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
                  //onClick={handleNext}
                  className="btn btn-md  btn-back"
                >
                  Next
                </button> */}
              </div>
              <div className="button" style={{ marginTop: "2rem" }}>
                 <button
                  type="button"
                onClick={bckbutton}
                  className="btn btn-md  btn-back"
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
        </div>
    )
}
export default RiskRuleCreateCount