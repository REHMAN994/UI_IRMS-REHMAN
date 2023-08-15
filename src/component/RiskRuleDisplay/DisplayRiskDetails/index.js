import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import axios from 'axios'
const RiskRuleDisplayDetails = () => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic ');
    headers.append('Origin', 'http://localhost:3000');
    const [selectedData, setSelectedData] = useState([]);
    const [selectedDataLCount, setSelectedDataLCount] = useState([]);
    const [selectedDataCount, setSelectedDataCount] = useState([]);
    const [selectedDataDetail, setSelectedDataDetail] = useState([]);
    const [DocId, setDocId] = useState("");
    const [singleDoc, setSingleDoc] = useState("");
    const [MasterRule, setMasterRule] = useState([]);
    useEffect(() => {

        const getdocType = async () => {
            await axios.get(process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE + '/MasterRule/GetAll').then((res) => setMasterRule(res.data)).catch((err) => console.log(err))
        }
        getdocType();

    }, [])
    const getD = (value) => {
        setSelectedDataCount([]);
        setSelectedDataDetail([]);
        axios.get(process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE + `/MasterCondition/GetAllByMasterRuleId?id=${value}`).then((res) => setSelectedDataCount(res.data)).catch((err) => console.log(err))
        axios.get(process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE + `/MasterDecision/GetAllByMasterRuleId?id=${value}`).then((res) => setSelectedDataDetail(res.data)).catch((err) => console.log(err))
    }
    const getC = (value) => {
        setSelectedDataCount([]);
        setSelectedDataDetail([]);
        axios.get(process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE + `/MasterCondition/GetAllByMasterRuleIdForCount?id=${value}`).then((res) => setSelectedDataCount(res.data)).catch((err) => console.log(err))
    }


    const handleMasterRule = (e) => {
        const value = e.target.value;
        setSingleDoc(value);
        if (value == "") {
            alert("Please select Rule");
            setSelectedData([]);
            setSelectedDataCount([]);
            setSelectedDataDetail([]);
        } else {
            axios.get(process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE + `/MasterRule/GetAllById?id=${value}`).then((res) => {
                setSelectedData(res.data);
                if (res.data.ruleMethod === "D") {
                    getD(value)
                } else if (res.data.ruleMethod === "C") {
                    getC(value);
                }

            }).catch((err) => console.log(err))
            //for D                                                                                                                                       
        }


        setDocId(value);
    }
    console.log(selectedDataCount.length);
    return (
        <div>
            <div className="row" >
                <div className="col-md-10 col-lg-10">
                    <section id="card">
                        <div className="well">
                            <h1 style={{ marginTop: '0rem' }}>Display Risk Rule Details </h1>
                            <div style={{ display: 'flex' }}>
                                <div >
                                    <div style={{ display: 'flex' }}>
                                        <label>Rule ID:</label>
                                        <select style={{ width: '14rem', marginLeft: '1rem' }} className="dropdown_value" onChange={handleMasterRule}>
                                            <option value="">Select doc type </option>
                                            {
                                                MasterRule.map((doc) => (
                                                    <option key={doc.ruleId} value={doc.ruleId}>{doc.ruleName}</option>
                                                ))
                                            }
                                        </select>
                                    </div>


                                    <div style={{ display: 'flex' }}>
                                        <label>Document Type:</label>
                                        <p>{selectedData ? selectedData.documentType : "null"}</p>
                                    </div>

                                    <div style={{ display: 'flex' }}>
                                        <label>Threat Group:</label>
                                        <p>{selectedData ? selectedData.threatGroup : "null"}</p>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <label>Number Conditions:</label>
                                        <p>{selectedData ? selectedData.numberConditions : "null"}</p>
                                    </div>


                                </div>
                                <div style={{ marginLeft: '3rem' }}>
                                    <div style={{ display: 'flex' }}>
                                        <label>Rule Type:</label>
                                        <p>{selectedData ? selectedData.ruleTypeRef : "null"}</p>
                                        <p>{selectedData.ruleTypeRef == "D" ? "D" : "" }</p>
                                    </div>

                                    <div style={{ display: 'flex' }}>
                                        <label>Rule Method:</label>
                                        <p>{selectedData ? selectedData.ruleMethod : "null"}</p>
                                        {/* <p>{selectedData.ruleMethod == "C" ? "C":""}</p> */}
                                    </div>

                                    <div style={{ display: 'flex' }}>
                                        <label>Case Type:</label>
                                        <p>{selectedData ? selectedData.caseTypeRef : "null"}</p>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <label>Status:</label>
                                        <p>{selectedData ? selectedData.statusCode : "null"}</p>
                                    </div>


                                </div>
                                <div style={{ marginLeft: '3rem' }}>
                                    <div style={{ display: 'flex' }}>
                                        <label>Document Seq:</label>
                                        <p>{selectedData ? selectedData.docSeq : "null"}</p>
                                    </div>

                                    <div style={{ display: 'flex' }}>
                                        <label>Rule Name:</label>
                                        <p>{selectedData ? selectedData.ruleName : "null"}</p>
                                    </div>

                                    <div style={{ display: 'flex' }}>
                                        <label>Weighting %:</label>
                                        <p>{selectedData ? selectedData.weighting : "null"}</p>
                                    </div>


                                </div>
                                
                            </div>
                            

                        </div>
                    </section>
                    {
                        selectedData.ruleMethod == "C" ? (
                            <>
                                <section id="card">
                                    <div className="well">
                                        <h1 style={{ marginTop: '0rem' }}>Display Risk Rule-Count Condition </h1>
                                        <div className="card_main" style={{ display: 'flex' }}>
                                            <div className="card_one" >
                                                <div style={{ display: 'flex' }}>
                                                    <label>Document Seq:</label>
                                                    <p>{selectedData ? selectedData.docSeq : "null"}</p>
                                                </div>

                                            </div>
                                            <div className="card_two" style={{ marginLeft: '4rem' }} >
                                                <div style={{ display: 'flex' }}>
                                                    <label>Fields Name:</label>
                                                    <p>{selectedDataCount ? selectedDataCount.fieldName : "null"}</p>
                                                </div>

                                                <div style={{ display: 'flex' }}>
                                                    <label>Condition Value:</label>
                                                    <p>{selectedDataCount ? selectedDataCount.conditionValue : "null"}</p>
                                                </div>
                                                <div style={{ display: 'flex' }}>
                                                    <label>Count:</label>
                                                    <p>{selectedDataCount ? selectedDataCount.riskCount : "null"}</p>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="button">
                                            <button type="button" className="btn btn-md  btn-save">Exit</button>
                                        </div>
                                    </div>

                                </section>
                            </>
                        ) : (
                            <>
                            {
                                selectedDataCount.length > 0 ? (
                                    <>
                                    <section id="card">
                                    <div className="well">
                                        <h1 style={{ marginTop: '0rem' }}> Conditions </h1>
                                        <div style={{ display: 'flex' }}>
                                        
                                            {
                                                selectedDataCount.length > 0 ? (
                                                    <>
                                                        {
                                                            selectedDataCount.map((e,i) => (
                                                                <>

                                                                    <div key={i}>
                                                                    <label  className='ml-2'>{e.fieldName}:</label>
                                                                    <p>{e.conditionValue}</p>
                                                                    <br />
                                                                    </div>

                                                                </>
                                                            ))

                                                        }
                                                    </>
                                                ) : (
                                                    <></>
                                                )


                                            }

                                        </div>

                                    </div>
                                </section>
                                <section id="card">
                                    <div className="well" >
                                        <h1 style={{ marginTop: '0rem' }}> Display Risk Rule Details </h1>
                                        <table className="table table-striped" style={{ marginTop: "1rem" }}>
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th scope="col">Ref</th>
                                                    <th scope="col">Score </th>
                                                    <th scope="col">Value 1</th>
                                                    <th scope="col">Value 2</th>
                                                    <th scope="col">Value 3</th>
                                                    <th scope="col">Value 4</th>
                                                    <th scope="col">Value 5</th>
                                                    <th scope="col">Value 6</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    selectedDataDetail.map((e,i) => (
                                                        <>
                                                            <tr key={i}>
                                                                <td>{e.id}</td>
                                                                <td>{e.scoreValue}</td>
                                                                <td>{e.fieldName1}</td>
                                                                <td>{e.fieldName2}</td>
                                                                <td>{e.fieldName3}</td>
                                                                <td>{e.fieldName4}</td>
                                                                <td>{e.fieldName5}</td>
                                                                <td>{e.fieldName6}</td>
                                                            </tr>
                                                        </>
                                                    ))
                                                }

                                            </tbody>
                                        </table>

                                        <div className="button">
                                            <button type="button" className="btn  btn-md btn-save">Next</button>
                                            <button type="button" className="btn btn-md  btn-back">Cancel</button>

                                        </div>
                                    </div>
                                </section>
                                    </>
                                ):
                                (
                                    <>

                                    </>
                                )
                            }
                               
                            </>
                           

                        )
                    }


                </div>
            </div>
        </div>
    )
}
export default RiskRuleDisplayDetails