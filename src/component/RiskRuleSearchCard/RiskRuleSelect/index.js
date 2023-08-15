import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import 'antd/dist/antd.css';
import ReactPaginate from 'react-paginate';
import { number, string } from 'yup';



const RiskRuleSelect = () => {
    const navigate = useHistory();
    const location = useLocation();
    const [docopt, setDocopt] = useState({});
    const [thropt, setThropt] = useState({});
    const [ruleopt, setRuleopt] = useState({});
    const [ruleSelection, setruleSelection] = useState([]);
    const [ischecked, setIschecked] = useState("");
    const [validselectRiskRule, setvalidselectRiskRule] = useState(false);


    const [StatusValue, setStatusValue] = useState("");

    useEffect(() => {
        const { state } = location;
        const doc = state.state.doc;
        const thr = state.state.thgr;
        const rul = state.state.rules;
        let doctypeid = 0;
        let threatgroupid = 0;
        let ruleid = 0;
        
        if (doc != undefined){
            setDocopt(doc);
            doctypeid = doc.id;
        }
        else if (thr != undefined){
            setThropt(thr);
            threatgroupid = thr.id;
        }
        else if (rul != undefined){
            setRuleopt(rul);
            ruleid = rul.ruleId;
        }
        axios.get(process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE + `/MasterRule/SearchMasterRuleByDocumentType?DocTypeID=${doctypeid}&ThreatRuleID=${threatgroupid}&RuleID=${ruleid}`).then((res) => {
            setruleSelection(res.data);
            console.log(res.data);
        }).catch((err) => console.log(err))
    }, [])

    const handlecheck = (e) => {
        setIschecked(e.target.value)
        setvalidselectRiskRule(string().required().isValidSync(e.target.value));
    }
    const handleClick = () => {
        if(StatusValue == "Deployed"){
            Swal.fire({
                title: 'Already Deployed, You Can Only Review',
                showConfirmButton: true,
                confirmButtonText: "Review",
                icon: 'primary'
            }
            ).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    navigate.push('/displayriskrule', { state: { id: ischecked } })
    
                }
    
            })
        }
        else{
            Swal.fire({
                title: 'Do you want to update or review?',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Update",
                cancelButtonText: "Review",
                icon: 'primary'
            }
            ).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    navigate.push('/riskruleupdatepage', { state: { id: ischecked } })
    
                } else
                navigate.push('/displayriskrule', { state: { id: ischecked } })
    
            })
        }
        
       
    }

    const GetValue = (para) => {
       // alert(para.statusCode);
        setStatusValue(para.statusCode);

    }


    //Pagination
    const [pageNumber, setPageNumber] = useState(0);
    const [serielNum, setSerielNum] = useState(1);
    const dataPerPage = 10;
    const dataVisited = pageNumber * dataPerPage;

    for (var i = 0; i < ruleSelection.length; i++) {
        ruleSelection[i]["sno"] = i + 1;
    }

    const displayData = ruleSelection.slice(dataVisited, dataVisited + dataPerPage).map((item, index) => (
        <tr key={item.id}>
        <th scope="row">{item.sno}</th>
        <td>{item.ruleTypeRef == "D" ? "Deductive" : item.ruleTypeRef == "I" ? "Inductive":""}  </td>
        <td>{item.ruleId}</td>
        <td>{item.documentType}</td>
        <td>{item.ruleName}</td>
        <td>{item.documentType}</td>
        <td>{item.threatGroup}</td>
        <td>{item.statusCode}</td>
        <td>
            <form>
                <input type="radio" onClick={() => GetValue(item)} value={item.ruleId} checked={ischecked == item.ruleId ? true : false} onChange={handlecheck} style={{ width: "1rem" }} />
            </form>
        </td>
        </tr>
    ));
    const PageCount = Math.ceil(ruleSelection.length / dataPerPage);
    const chnagePage = ({ selected }) => {
        setPageNumber(selected);
    }
    //Pagination 


    const handleBack = () =>{
        navigate.push("/riskrulesearchpage")
        }
    return (
        <div>
            <section id="card">

                <div className="well" style={{ width: '64rem' }}>
                    <h1 > Risk Rule Selection </h1>
                    <div>
                        <form className="ml-auto" >
                            <div style={{ display: 'flex' }}>
                                {/* <label>Option Method</label> */}
                                <p style={{ marginLeft: 'initial' }}>{docopt.documentType1 == undefined ? '' : 'Document Type'}</p>
                                <p style={{ marginLeft: 'initial' }}>{thropt.threatGroup1 == undefined ? '' : 'Threat Rule Set'}</p>
                                <p style={{ marginLeft: 'initial' }}>{ruleopt.ruleName == undefined ? '' : 'Rule Name'}</p>
                                <br />
                                {/* <label className="ml-5">Option Name </label> */}
                                <p>{docopt.documentType1}{thropt.threatGroup1}{ruleopt.ruleName}</p>
                                <br />
                            </div>



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
                                <th scope="col">Status</th>
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

                                    <button disabled={validselectRiskRule ? false : true}  onClick={handleClick} type="button" className="btn  btn-md btn-save" style={{ width: '14rem', height: '40px', marginTop:'-6px' }}>Select Risk Rule</button>

                                </div>
                            </div>


                        </form>

                    </div>
                    <div className="button">
                        {/* <button type="button" className="btn  btn-md btn-save">Next</button> */}
                        <button onClick={handleBack} type="button" className="btn  btn-md btn-back" style={{ marginRight: '0.5rem', }}>Back</button>
                        {/* <button type="button" style={{ marginRight: '0.5rem', }} className="btn btn-md  btn-back">Cancel</button> */}

                    </div>
                </div>
            </section>
        </div>
    )
}
export default RiskRuleSelect        