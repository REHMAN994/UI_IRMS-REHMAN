import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

const DeployThresholdRevision = () =>{

  const navigate = useHistory();
    const [documentType, setDocumenttype] = useState([]);
    const [thresholdId, setThresholdId] = useState("");
    const [description, setDescription] = useState("");
    const [revisionNo, setRevisionNo] = useState("");
    const [err, setErr] = useState("");
    const [RevisionDis, setRevisionDis] = useState(false);
  
    const [Id, setId] = useState("");

    const [validReview , setvalidReview] =  useState(false);
    const [validError , setvalidError] =  useState(true);

    
    useEffect(async () => {
      await axios
        .get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +"/DocumentType/GetAllIDs")
        .then((res) => {
          setDocumenttype(res.data);
          console.log(res.data);
        });
    }, []);
  
    const handlechange = (e) => {
      const id = e.target.value;
      setThresholdId(id);
      axios
        .get(
          process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/MasterThreshold/GetAllByDocumentTypeId?id=${id}`
        )
        .then((res) => {
          setDescription(res.data.description);
          console.log(res.data);
          setRevisionNo(res.data.revisionNo);
          setId(res.data.id);
          setvalidError(res.data == "" ? false : true);
          setvalidReview(res.data == "" ? true : false);
        })
        .catch((err) => console.log(err));
    };

    const btnNext = () => {
      navigate.push(`/deploythresholdconditionpage`,{
        state:{
          id: Id
        },
      });
    }

    const btnBack = () => {
     window.location.reload(true);
    }

    return(
        <div>
        <div className="row">
          <div className="col-md-10 col-lg-10">
            <section hidden={validReview} id="card">
              <div className="well">
                <h1> Deploy Threshold Revision </h1>
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
                            <option value="">Select Document Type </option>
                          {documentType.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item.documentType1}
                            </option>
                          ))}
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
  
                  <label className="discription" style={{ marginTop: "2rem" }}>
                    Description
                  </label>
                  <br />
                  <textarea
                  disabled={true}
                    placeholder=" Description here.."
                    style={{ height: "5rem" }}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  ></textarea>
                </div>
                <br />
                <form className="ml-auto">
                  <div style={{ display: "flex" }}>
                  <input  disabled={true} value={revisionNo} onChange={(e) => setRevisionNo(e.target.value)} />
                    <br />
                   
                  </div>
                    <p style={{color:"red"}}>{err}</p>
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
                  <button onClick={btnBack} type="button" className="btn btn-md  btn-back">
                    Cancel
                  </button>
                </div>
              </div>
            </section>
            <section hidden={validError} id="card">
          <div className="well">
            <div className="warring_card">
              <h2>NOTE</h2>
              <p>There is no Threshold Master in an amended status that is ready to be deployed</p>
            </div>
            <br />
            <div className="button">
                <button
               onClick={btnBack}
                  type="button"
                  className="btn btn-md  btn-back"
                  style={{ width: "7rem" }}
                >
                  Back
                </button>
              </div>
          </div>
        </section>
          </div>
        </div>
      </div>
    )
}
export default DeployThresholdRevision