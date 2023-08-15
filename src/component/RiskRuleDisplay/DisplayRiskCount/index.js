import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom'


const RiskRuleDisplayCount = () => {
    const location = useLocation();
    const { state } = location.state;
    console.log(state);
    let headers = new Headers();    
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic ');
    headers.append('Origin','http://localhost:3000');
    const [selectedData, setSelectedData] = useState([]);
    const [selectedDataCount, setSelectedDataCount] = useState([]);
    const [DocId, setDocId] = useState("");
    const [singleDoc, setSingleDoc] = useState("");
    const [MasterRule, setMasterRule] = useState([]);
    useEffect(() => {
        
        const getdocType = async () => {
            await axios.get(process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +'/MasterRule/GetAll').then((res) => setMasterRule(res.data)).catch((err) => console.log(err))
            // axios.get(process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +`/MasterCondition/GetAllByMasterRuleIdForCount?id=${state.Id}`).then((res) => setSelectedDataCount(res.data)).catch((err) => console.log(err))
            axios.get(process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +`/MasterRule/GetAllById?id=${state.Id}`).then((res) => setSelectedData(res.data)).catch((err) => console.log(err))
        }
        getdocType();

    }, [])
    const handleMasterRule = (e) => {
        const value = e.target.value;
        setSingleDoc(value);
        if (value == "") {
            alert("Please select Rule");
            setSelectedData([""]);
            setSelectedDataCount([""]);
        } else {
            axios.get(process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +`/MasterRule/GetAllById?id=${value}`).then((res) => setSelectedData(res.data)).catch((err) => console.log(err))
            axios.get(process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE +`/MasterCondition/GetAllByMasterRuleIdForCount?id=${value}`).then((res) => setSelectedDataCount(res.data)).catch((err) => console.log(err))
        }
        setDocId(value);
    }
    console.log(selectedDataCount);
    return(
        <div>
            <div className="row" >
                <div className="col-md-10 col-lg-10">
                <section id="card">
                        <div className="well">
                            <h1 style={{ marginTop: '0rem' }}>Display Risk Rule Count </h1>
                            <div style={{ display: 'flex' }}>
                                <label>Rule ID:</label>
                                <select  style={{ width: '14rem', marginLeft: '1rem' }} className="dropdown_value" onChange={handleMasterRule}>
                                           <option value={state.Id}>dummyselect</option>
                                            {
                                                MasterRule.map((doc) => (
                                                    <option key={doc.ruleId} value={doc.ruleId}>{doc.ruleName}</option>
                                                ))
                                            }
                                        </select>
                                <br />
                                <label className="ml-5">Document Type:</label>
                                <p>{selectedData?selectedData.documentType:"null"}</p>
                                <br />
                                <label className="ml-5">Threat Group:</label>
                                <p>{selectedData?selectedData.threatGroup:"null"}</p>

                            </div>
                            <div style={{ display: 'flex' }}>
                                <label>Rule Type:</label>
                                <p>{selectedData?selectedData.ruleTypeRef:"null"}</p>
                                <br />
                                <label className="ml-5">Rule Method:</label>
                                <p>{selectedData?selectedData.ruleMethod:"null"}</p>
                                <br />
                                <label className="ml-5">Case Type:</label>
                                <p>{selectedData?selectedData.caseTypeRef:"null"}</p>
                                <br/>
                                <label className="ml-5">Status:</label>
                                <p>{selectedData?selectedData.statusCode:"null"}</p>
                            </div>
                            
                        </div>
                    </section>
                    <section id="card">
                        <div className="well">
                        <h1 style={{ marginTop: '0rem' }}>Display Risk Rule-Count Condition </h1>
                            <div className="card_main" style={{ display: 'flex' }}>
                                <div className="card_one" >
                                    <div style={{ display: 'flex' }}>
                                        <label>Document Seq:</label>
                                        <p>{selectedData?selectedData.docSeq:"null"}</p>
                                    </div>
                                    
                                </div>
                                <div className="card_two" style={{marginLeft: '4rem' }} >
                                    <div style={{ display: 'flex'}}>
                                        <label>Fields Name:</label>
                                        <p>{selectedDataCount?selectedDataCount.fieldName:"null"}</p>
                                    </div>
                                    
                                    <div style={{ display: 'flex'}}>
                                        <label>Condition Value:</label>
                                        <p>{selectedDataCount?selectedDataCount.conditionValue:"null"}</p>
                                    </div>
                                    <div style={{ display: 'flex'}}>
                                        <label>Count:</label>
                                        <p>{selectedDataCount?selectedDataCount.riskCount:"null"}</p>
                                    </div>

                                </div>
                            </div>
                            <div className="button">
                            <Link className="link" to="/riskrulecreatekeypage"><button  type="button" className="btn btn-md  btn-save">Exit</button>
                                                </Link>   
                            </div>
                        </div>

                    </section>
                </div>
            </div>
        </div>
    )
}
export default RiskRuleDisplayCount   