import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory, useLocation } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { number, string } from 'yup';


const ListRiskRuleDeleteCard = () => {
    const [ruleSelection, setruleSelection] = useState([]);
    const navigate = useHistory();

    const [search, setSearch] = useState("");



useEffect(() => {
        axios.get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION + `/MasterRule/GetMasterRuleforDeploy`).then((res) => {
          setruleSelection(res.data);
        }).catch((err) => console.log(err))  
}, []);


const SelectRiskRuleforDelete = (e) => {
  console.log(e);
    navigate.push(`/riskruledeletelivepage`, {
      state:{
        Id: e.ruleId,
        Status : 'Deployed',
        docType : e.documentTypeId,
        doctypeName : e.documentType
      },
    });
}
const SelectRiskRuleforDeleteUndeployed = (e) => {
  navigate.push(`/riskruledeletelivepage`, {
    state:{
      Id: e.ruleId,
      Status : 'Undeployed',
      docType : e.documentTypeId,
      doctypeName : e.documentType
    },
  });
}



//Pagination
const [pageNumber, setPageNumber] = useState(0);
const [serielNum, setSerielNum] = useState(1);
const dataPerPage = 10;
const dataVisited = pageNumber * dataPerPage;

for (var i = 0; i < ruleSelection.length; i++) {
  ruleSelection[i]["sno"] = i + 1;
}

const displayData = ruleSelection.slice(dataVisited, dataVisited + dataPerPage).filter((item) => item.ruleName.toLowerCase().includes(search.toLowerCase())).map((item, index) => (
  <tr key={item.id}>
    <th scope="row">{item.sno}</th>
    <td>{item.ruleId}</td>
    <td>{item.ruleTypeRef == "D" ? "Deductive" : item.ruleTypeRef == "I" ? "Inductive" : ""}  </td>
    <td>{item.docSeq}</td>
    <td>{item.ruleName}</td>
    <td>{item.documentType}</td>
    <td>{item.ruleMethod == "D" ? "Decision" : item.ruleMethod == "C" ? "Count" : ""}</td>
    <td>{item.statusCode}</td>


    <td>
      <div>
        <input hidden={item.statusCode == "Deployed" ? false : true} className="btn  btn-md btn-back" value={"Delete Live"} type="button" onClick={(e) => SelectRiskRuleforDelete(item)} style={{ width: '7rem', marginRight: '1.7rem' }} />
        <input hidden={item.statusCode == "Created" || item.statusCode == "Updated" ? false : true}  className="btn  btn-md btn-save" value={"Delete Undeployed"} type="button" onClick={(e) => SelectRiskRuleforDeleteUndeployed(item)} style={{ width: '10rem', marginTop: '5px' }} />
      </div>

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
        <section id="card">

          <div className="well" style={{ width: '64rem' }}>
            <h1 >Select Risk Rule </h1>
            <div className='searchdiv'>
                  <input placeholder='Search by Rule Name' className='input' onChange={(e) => setSearch(e.target.value)} value={search} />
             </div>
            <table className="table table-striped" style={{ marginTop: "1rem" }}>
              <thead className="thead-dark">
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Risk ID</th>
                  <th scope="col">Type</th>
                  <th scope="col">Seq</th>
                  <th scope="col">Rule Name</th>
                  <th scope="col">Threat Group</th>
                  <th scope="col">Method</th>
                  <th scope="col">Status</th>
                  <th style={{ width: "10rem" }} scope="col">Action</th>

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
              previousClassName={displayData.length < 9 && ruleSelection.length > 10 ? "prevbtn" : "prevbtn2"}
              nextClassName={displayData.length > 9 ? "nextbtn" : "nextbtn2"}
              activeClassName={"activepage"}

            />
          </div>
        </section>
      </div>
  )
}
export default ListRiskRuleDeleteCard
