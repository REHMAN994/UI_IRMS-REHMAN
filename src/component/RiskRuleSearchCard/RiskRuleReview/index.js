import React, { useEffect, useState } from "react";
import axios from 'axios';
import Swal from "sweetalert2";
import { computeHeadingLevel } from "@testing-library/react";
import ReactPaginate from 'react-paginate';
import { number, string } from 'yup';
import { useLocation, useHistory } from "react-router-dom";





const RiskRuleReview = () => {
    const navigate = useHistory();
    const location = useLocation();
    const [ischecked, setIschecked] = useState("");
    const [validselectRiskRule, setvalidselectRiskRule] = useState(false);
    const [masterRule, setmasterRule] = useState([]);

    useEffect(() => {
        const getRuleType = async () => {
            const { state } = location;
            const id = 6;
            console.log(id);
            // await axios.get(process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE + `/MasterRule/GetAllById?id=${id}`).then((res) => {
                axios.get(process.env.REACT_APP_IRMS_RISKRULE_MAINTENANCE + `/MasterRule/SearchMasterRuleByDocumentType?DocTypeID=${id}&ThreatRuleID=0&RuleID=0`).then((res) => {
                setmasterRule(res.data);
                console.log(res.data);
            }).catch((err) => console.log(err))
        }
        getRuleType();
    }, [])
    const handlecheck = (e) => {
        setIschecked(e.target.value)
        setvalidselectRiskRule(string().required().isValidSync(e.target.value));
    }
  //Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const [serielNum, setSerielNum] = useState(1);
  const dataPerPage = 10;
  const dataVisited = pageNumber * dataPerPage;

  for (var i = 0; i < masterRule.length; i++) {
      masterRule[i]["sno"] = i + 1;
  }

  const displayData = masterRule.slice(dataVisited, dataVisited + dataPerPage).map((item, index) => (
      <tr key={item.id}>
      <th scope="row">{item.sno}</th>
        <td>{item.ruleId}</td>
      <td>{item.ruleTypeRef == "D" ? "Deductive" : item.ruleTypeRef == "I" ? "Inductive":""}  </td>
      <td>{item.docSeq}</td>
      <td>{item.numberConditions}</td>
      <td>{item.ruleName}</td>
      <td>{item.documentType}</td>
      <td>{item.ruleMethod == "D" ? "Decision" : item.ruleMethod == "C" ? "Count" :""}</td>


      <td>
          <form>
              <input type="radio" value={item.ruleId} checked={ischecked == item.ruleId ? true : false} onChange={handlecheck} style={{ width: "1rem" }} />
          </form>
      </td>
      </tr>
  ));
  const PageCount = Math.ceil(masterRule.length / dataPerPage);
  const chnagePage = ({ selected }) => {
      setPageNumber(selected);
  }
  //Pagination
  
  const handleClick = () => {
    navigate.push('/displayriskrule', { state: { id: ischecked } })
   
}
    return (
        <div>
            <div>
            <section id="card">

                <div className="well" style={{ width: '64rem' }}>
                    <h1 >Review Risk Rule Sequence </h1>
                    <div>
                        <form className="ml-auto" >
                            <div style={{ display: 'flex' }}>
                                {/* <label>Option Method</label> */}
                                <p style={{ marginLeft: 'initial' }}>Option Method</p>
                                <br />
                                {/* <label className="ml-5">Option Name </label> */}
                                <p>Option Name </p>
                                <br />


                            </div>



                        </form>
                    </div>
                    <table className="table table-striped" style={{ marginTop: "1rem" }}>
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">S.No</th>
                                <th scope="col">Risk ID</th>
                                <th scope="col">Type</th>
                                <th scope="col">Seq</th>
                                <th scope="col">Conditions</th>
                                <th scope="col">Rule Name</th>
                                <th scope="col">Threat Group</th>
                                <th scope="col">Method</th>
                                <th scope="col">Status</th>

                            </tr>
                        </thead>
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
                                previousClassName={displayData.length < 9 && masterRule.length > 10 ? "prevbtn" : "prevbtn2"}
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

                                    <button disabled={validselectRiskRule ? false : true}  onClick={handleClick} type="button" className="btn  btn-md btn-save" style={{ width: '14rem', height: '40px' }}>Display Risk Rule</button>

                                </div>
                            </div>

                            <br />

                        </form>

                    </div>
                    <div className="button">
                        <button type="button" className="btn  btn-md btn-save">Next</button>
                        <button type="button" className="btn  btn-md btn-save" style={{ marginRight: '0.5rem', }}>Previous</button>
                        <button type="button" style={{ marginRight: '0.5rem', }} className="btn btn-md  btn-back">Cancel</button>

                    </div>
                </div>
            </section>
        </div>
        <div>
    
    </div>

        </div>
            
    )
}
export default RiskRuleReview 