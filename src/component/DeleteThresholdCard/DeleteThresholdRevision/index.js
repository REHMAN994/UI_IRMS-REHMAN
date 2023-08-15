import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ReactPaginate from 'react-paginate';


const DeleteThresholdRevision = () => {

  const navigate = useHistory();
  const [documentType, setDocumenttype] = useState([]);
  const [description, setDescription] = useState("");
  const [revisionNo, setRevisionNo] = useState("");
 
  const [Id, setId] = useState("");

  const [data, setData] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(async () => {
    await axios
      .get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +"/ThresholdCondition/GetAllWithDocumentType")
      .then((res) => {
        setDocumenttype(res.data);
      });

      await axios
      .get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +"/MasterThreshold/GetAllByDocumentTypeIdformodify")
      .then((res) => {
        setData(res.data);
        
        console.log(res.data);
      });

  }, []);

  const handlechange = (e) => {
    const id = e.target.value;

    axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/MasterThreshold/GetAllByDocumentTypeId?id=${id}`
      )
      .then((res) => {
        setDescription(res.data.description);
        console.log(res.data);
        setRevisionNo(res.data.revisionNo)
        setId(res.data.id);
        
      })
      .catch((err) => console.log(err));
  };

  const btnNext = () => {
    navigate.push(`/deletethresholdconditionpage`,{
      state:{
        id: Id
      },
    });
  }
  const deleteMethod = (id) => {
      
    navigate.push(`/deletethresholdconditionpage`,{
      state:{
        id: id
      },
    });
  }
  

    //Pagination
    const [pageNumber, setPageNumber] = useState(0);
    const [serielNum, setSerielNum] = useState(1);
    const dataPerPage = 10;
    const dataVisited = pageNumber * dataPerPage;


    for(var i=0;i<data.length;i++){
        data[i]["sno"] = i+ 1;
    }
    

    const displayData = data.slice(dataVisited, dataVisited + dataPerPage).filter((item) => item.documentType.toLowerCase().includes(search.toLowerCase())).map((item, index) => (
      <tr key={item.id}>
      <th scope="row">{item.sno}</th>
      <td>{item.revisionNo}</td>
      <td>{item.documentType}</td>
      <td>{item.date}</td>
      <td>{item.statusCode}</td>
      <td><button type="button" onClick={() => deleteMethod(item.id)} className="btn  btn-md btn-save" style={{ border: 'none' }}>Delete</button></td>
  </tr>
    ))
    const PageCount = Math.ceil(data.length / dataPerPage);
    const chnagePage = ({ selected }) => {
        setPageNumber(selected);
    }
    //Pagination
  return (
    <div>
      <div className="row">
        <div className="col-md-10 col-lg-10">
          <section hidden id="card">
            <div className="well">
              <h1> Delete Threshold Revision </h1>
              <div>
                <div>
                  <form className="ml-auto" method="post">
                    <div style={{ display: "flex" }}>
                      <div>
                        <label>Document Type</label>
                        <br />
                        <select
                          className="dropdown_value"
                          style={{ width: "60rem", height: "31px" }}
                          onChange={handlechange}
                        >
                          <option value="">Document Type </option>
                          {documentType.map((item, index) => (
                            <option key={index} value={item.documentTypeId}>
                              {item.documentType}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <br />
              <form className="ml-auto">
                <div style={{ display: "flex" }}>
                  <label className="discription">Description: </label>

                  <p>{description}</p>
                </div>
                <br />
                <div style={{ display: "flex" }}>
                  <label>Revsion Number:</label>

                  <p>{revisionNo}</p>
                </div>
              </form>

              <div className="button" style={{ marginTop: "2rem" }}>
                <button
                 onClick={btnNext}
                  type="button"
                  className="btn  btn-md btn-save"
                  style={{ width: "7rem" }}
                >
                  Next  
                </button>
                <button type="button" className="btn btn-md  btn-back">
                  Back
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="row" >
                <div className="col-md-10 col-lg-10">
                    <section id="card">
                        <div className="well">
                            <h1> Delete Threshold Revision</h1>
                            <div className='searchdiv'>

                                <input placeholder='Search by Document Type' className='input' onChange={(e) => setSearch(e.target.value)} value={search} />
                            </div>
                            <table className="table table-striped" style={{ marginTop: "1rem" }}>
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Revision No</th>
                                        <th scope="col">Document Type</th>
                                        <th scope="col">Creation Date</th>
                                        <th scope="col">Status</th>
                                        <th scope="col" style={{width:'100px'}}>Action</th>
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
                                previousClassName={displayData.length < 9 && data.length > 10 ? "prevbtn" : "prevbtn2"}
                                nextClassName={displayData.length > 9 ? "nextbtn" : "nextbtn2"}
                                activeClassName={"activepage"}

                            />


                            <div className="button">
                                {/* <button type="button" className="btn  btn-md btn-save">Save</button> */}
                                {/* <button type="button" className="btn btn-md  btn-back">Back</button> */}

                            </div>
                        </div>
                    </section>

                </div>
            </div>
    </div>
  );
};
export default DeleteThresholdRevision;
