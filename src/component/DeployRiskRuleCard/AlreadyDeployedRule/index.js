import axios from "axios";
import React,{useState,useEffect} from "react";


const AlreadyDeployRiskRule = () => {
    const [selectmasterRule,setSelectMasterRule] = useState([]);
    const [masterRule,setMasterRule] = useState([]);
    const [RunId,setRubId] = useState([]);
    useEffect(() => {
        const getmasterRule = async () => {
            await axios.get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/MasterRule/GetMasterRuleJust`).then((res)=> setSelectMasterRule(res.data)).then((err)=> console.log(err));
        }
        getmasterRule();

    },[]);

    const handlechange = (e) => {
        const id = e.target.value;
        //getAllBtId not working
        axios.get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/MasterRule/GetAllById?id=${id}`).then((res)=> setMasterRule(res.data)).then((err)=> console.log(err));
        axios.get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/RiskRule/GetAllById?id=${id}`).then((res)=> setRubId(res.data)).then((err)=> console.log(err));
        
    }

    console.log(RunId)
    return(
        <div>
        <div className="row">
            <div className="col-md-10 col-lg-10">
                <section id="card">
                    <div className="well">
                        <h1>Risk Rule Already Deploy Or Deleted</h1>
                        <div>
                            <form className="ml-auto" method="post">
                            <div style={{ display: 'flex' }}>
                                    <div>
                                        <div style={{ display: 'flex' }}>
                                            <label>Rule ID:</label>
                                            <select className="ml-2" onChange={handlechange}>
                                                <option>Select Rule ID</option>
                                                {
                                                    selectmasterRule.map((item, index) => (
                                                        <option key={index} value={item.ruleId}>{item.ruleName}</option>
                                                    ))
                                                }

                                            </select>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <label >Document Type:</label>
                                            <p>{masterRule.documentType}</p>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <label>Threat Group:</label>
                                            <p>{masterRule.threatGroup}</p>
                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '3rem' }}>
                                        <div style={{ display: "flex" }}>
                                            <label>Run Number:</label>
                                            <p>Run Number</p>
                                        </div>
                                        <div style={{ display: "flex" }}>
                                            <label>Rule Type:</label>
                                            <p>{masterRule.ruleTypeRef}</p>
                                        </div>
                                        <div style={{ display: "flex" }}>
                                            <label>Rule Method:</label>
                                            <p>{masterRule.ruleMethod}</p>
                                        </div>

                                    </div>
                                    <div style={{ marginLeft: '3rem' }}>
                                        <div style={{ display: "flex" }}>
                                            <label>Case Type:</label>
                                            <p>{masterRule.caseTypeRef}</p>
                                        </div>
                                        <div style={{ display: "flex" }}>
                                            <label>Document Seq:</label>
                                            <p>{masterRule.docSeq}</p>
                                        </div>
                                        <div style={{ display: "flex" }}>
                                            <label>Rule Name:</label>
                                            <p>{masterRule.ruleName}</p>
                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '3rem' }}>
                                        <div style={{ display: "flex" }}>
                                            <label>Weighting%:</label>
                                            <p>{masterRule.weighting}</p>
                                        </div>
                                        <div style={{ display: "flex" }}>
                                            <label>Number Conditions:</label>
                                            <p>{masterRule.numberConditions}</p>
                                        </div>
                                        <div style={{ display: "flex" }}>
                                            <label>Status:</label>
                                            <p>{masterRule.statusProcess}</p>
                                        </div>
                                    </div>


                                </div>
                                <div style={{ display: "flex" }}>
                                    <label>Description:</label>
                                    <p>{masterRule.description}</p>
                                </div>

                            </form>
                        </div>
                        <br />
                 
                    </div>

                </section>
                <section id="card">
                    <div className="well">
                        <h1> Risk Rule </h1>
                        <div>
                            <form className="ml-auto" method="post">
                                <label className="discription">Change Description</label>
                                <br /><p>{RunId.changeDescription}</p>
                                <div style={{display:'flex'}}>
                                <label >Rule Rev No:</label>
                                <p>{RunId.ruleRunNo}</p>
                                </div>
                                
                            </form>
                        </div>
                        <br />
                        <div className="button"> 
                            <button type="button" className="btn  btn-md btn-save" style={{width: '10rem'}}>Rule Detail</button>
                            
                            <button type="button" className="btn  btn-md btn-save" style={{ marginRight: '0.5rem', float:'left', width: '12.5rem' }}>Review Rule Revisions</button>
                            <button type="button" style={{ marginRight: '0.5rem', }} className="btn btn-md  btn-back">Cancel</button>

                        </div>
                    </div>
                </section>    
            </div>
        </div>
    </div>               
    )
}
export default AlreadyDeployRiskRule