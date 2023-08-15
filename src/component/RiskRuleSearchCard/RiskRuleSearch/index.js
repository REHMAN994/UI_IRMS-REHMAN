import React, { useEffect, useState } from "react";
import axios from 'axios';
import Swal from "sweetalert2";
import { computeHeadingLevel } from "@testing-library/react";
import { number, string } from 'yup';
import { useLocation, useHistory } from "react-router-dom";


const RiskRuleSearch = () => {
    const navigate = useHistory();
    const [doctype, setDocType] = useState([]);
    const [threatGroup, setthreatGroup] = useState([]);
    const [ruleName, setruleName] = useState([]);

    const [validDocType, setvalidDocType] = useState(false);
    const [validThreatGroup, setvalidThreatGroup] = useState(false);
    const [validRuleType, setvalidRuleType] = useState(false);

    useEffect(() => {
        const getDocType = async () => {
            await axios.get(process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE + '/DocumentType/GetAllIDs').then((res) => {
                setDocType(res.data);

            }
            ).catch((err) => console.log(err))
        }
        const getthreatGroup = async () => {
            await axios.get(process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE + '/ThreatGroup/GetAllIDs').then((res) => {
                setthreatGroup(res.data);

            }
            ).catch((err) => console.log(err))
        }
        const getRuleName = async () => {
            await axios.get(process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE + '/MasterRule/GetAll').then((res) => {
                setruleName(res.data);

            }
            ).catch((err) => console.log(err))
        }
        getRuleName();
        getDocType();
        getthreatGroup();
    }, [])
    const handleEntailmentRequest = (e) => {
        e.preventDefault();
        window.location.reload(true);

    }

    //1
    const [Doc, setDoc] = useState();
    const handleDocType = (e) => {
        
        const value = e.target.value;
        if(value == '' || value == undefined){
            setvalidDocType(false);
        }
        const doc = JSON.parse(value);
       
        setDoc(doc);
        setvalidDocType(string().required().isValidSync(doc.id));
  
    }
    const handleOption1 = () => {
        navigate.push('/riskruleselectpage',{state:{doc: Doc}})
    }
    
    //2
    const [thGroup, setthGroup] = useState();
    const handlethGroup = (e) => {
        const value1 = e.target.value;
        if(value1 == '' || value1 == undefined){
            setvalidThreatGroup(false);
        }
        const thgr = JSON.parse(value1);
       
        setthGroup(thgr);
        setvalidThreatGroup(string().required().isValidSync(thgr.id));
    }
    const handleOption2 = () => {
        navigate.push('/riskruleselectpage',{state:{thgr: thGroup}})
    }

    // 3
    const [ruleid, setruleid] = useState();
    const handlerule = (e) =>{
        const value2 = e.target.value;
        if(value2 == '' || value2 == undefined){
            setvalidRuleType(false);
        }
        const rules = JSON.parse(value2);

        setruleid(rules);

        setvalidRuleType(string().required().isValidSync(rules.ruleId));
   
    }
    const handleOption3 = () => {
        navigate.push('/riskruleselectpage', {state:{rules:ruleid}})
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-10 col-lg-10">
                    <section id="card">
                        <div className="well" style={{ width: '54rem' }} >
                            <h1>Search Risk Rule </h1>
                            <form className="ml-auto" >
                                <div style={{ display: 'flex', height: '5rem' }}>
                                    <div>
                                        <label>Document Type </label>
                                        <br />
                                        <select className={`select_condition ${validDocType ? "" : "empty-select"}`} onChange={handleDocType}>
                                            <option value="">Select Doc Type</option>
                                            {
                                                doctype.map((doc) => (
                                                    <option value={JSON.stringify(doc)}>{doc.documentType1}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className="button" style={{ marginLeft: '1rem' , marginTop: '28px'}}>
                                        <button disabled={validDocType ? false : true} onClick={handleOption1} type="button" className="btn btn-md  btn-back">Option 1</button>
                                    </div>
                                </div>
                                <div style={{ marginLeft: '12rem', display: 'flex' }}>
                                    <p className="orr">OR</p>
                                </div>

                                <div style={{ display: 'flex', height: '5rem' }}>
                                    <div>
                                        <label>Threat Rule Set </label>
                                        <br />
                                        <select className={`select_condition ${validThreatGroup ? "" : "empty-select"}`}  onChange={handlethGroup}>
                                            <option value="">Select Threat Group</option>
                                            {
                                                threatGroup.map((thr) => (
                                                    <option value={JSON.stringify(thr)}>{thr.threatGroup1}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className="button" style={{ marginLeft: '1rem',marginTop: '28px' }}>
                                        <button disabled={validThreatGroup ? false : true} onClick={handleOption2} type="button" className="btn btn-md  btn-back">Option 2</button>
                                    </div>
                                </div>
                                <div style={{ marginLeft: '12rem', display: 'flex' }}>
                                    <p className="orr">OR</p>
                                </div>

                                <div style={{ display: 'flex', height: '5rem' }}>
                                    <div>
                                        <label>Rule Name </label>
                                        <br />
                                        <select className={`select_condition ${validRuleType ? "" : "empty-select"}`} onChange={handlerule}>
                                            <option value="">Select Rule Name</option>
                                            {
                                                ruleName.map((rul) => (
                                                    <option value={JSON.stringify(rul)}>{rul.ruleName}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className="button" style={{ marginLeft: '1rem' ,marginTop: '28px'}}>
                                        <button disabled={validRuleType ? false : true} onClick={handleOption3} type="button" className="btn btn-md  btn-back">Option 3</button>
                                    </div>
                                </div>
                                <div className="button">
                                    <button onClick={handleEntailmentRequest} type="button" className="btn btn-md  btn-back">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
export default RiskRuleSearch