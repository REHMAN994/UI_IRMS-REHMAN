import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const DisplayThresholdRevision = () => {
  const navigate = useHistory();
    const [documentType, setDocumenttype] = useState([]);
    const [thresholdId, setThresholdId] = useState("");
    const [description, setDescription] = useState("");
    const [revisionNo, setRevisionNo] = useState("");
    const [err, setErr] = useState("");
    const [RevisionDis, setRevisionDis] = useState(false);
  

    const [Id, setId] = useState("");
    const [validError , setvalidError] =  useState(true);
    const [validThreshold , setvalidThreshold] =  useState(false);
    const [validbtnNext , setvalidbtnNext] =  useState(true);

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
      if(id == ""){
        toast.error("Select Document Type");
        setDescription("");
        setRevisionNo("");
        setvalidbtnNext(true);
        return false;
      }
      console.log(id);
      setThresholdId(id);
      axios
        .get(
          process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/MasterThreshold/GetAllByDocumentTypeId?id=${id}`
        )
        .then((res) => {
          setId(res.data.id);
          console.log(res.data);
          if (res.data == "") {
            setRevisionNo(res.data.revisionNo +1);
            setvalidError(false);
            setvalidThreshold(true);
            setvalidbtnNext(true);
            setDescription("");
            setRevisionNo("");
          } else if (res.data != "") {
            setvalidError(true);
            setRevisionDis(true);
            setvalidThreshold(false);
            setvalidbtnNext(false);
            setDescription(res.data.description);
            setRevisionNo(res.data.revisionNo);
          }
        })
        .catch((err) => console.log(err));
    };
    const handleNext = (e) => {
      debugger;
      console.log(thresholdId);
      navigate.push(`/displaythresholdconditionpage`, {
        state:{
          id: Id
        },
      });
    }

    const Cancelbtn = async () => {
      window.location.reload(true);
    };

  return (
    <div>
         <ToastContainer />
      <div className="row">
        <div className="col-md-10 col-lg-10">
          <section hidden={validThreshold} id="card">
            <div className="well">
              <h1> Display Threshold Revision </h1>
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
                  Description{" "}
                </label>
                <br />
                <textarea disabled={true}
                  placeholder=" Description here.."
                  style={{ height: "5rem" }}
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                ></textarea>
              </div>
              <br />
              <form className="ml-auto">
                <div style={{ display: "flex" }}>
                <input disabled={true} value={revisionNo} onChange={(e) => setRevisionNo(e.target.value)} />
                  <br />
                 
                </div>
                  <p style={{color:"red"}}>{err}</p>
              </form>

              <div className="button" style={{ marginTop: "2rem" }}>
              
              <button disabled={validbtnNext} onClick={handleNext}  style={{marginRight:"14px"}} type="button" className="btn btn-md  btn-back">
                Next
              </button> 
              <button onClick={Cancelbtn} type="button" className="btn btn-md  btn-back">
                Cancel
              </button>
              </div>
            </div>
          </section>
        </div>
        <section hidden={validError} id="card">
          <div className="well">
            <div className="warring_card">
              <h2>NOTE</h2>
              <p>There is no Threshold Master Revision And Condition</p>
            </div>
            <br />
            <div className="button">
                <button
                onClick={Cancelbtn}
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
  );
};
export default DisplayThresholdRevision;
