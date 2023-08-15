import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useHistory, useLocation } from "react-router-dom";

const ThresholdRevisionCreate = () => {
  const navigate = useHistory();
  const [documentType, setDocumenttype] = useState([]);
  const [thresholdId, setThresholdId] = useState("");
  const [description, setDescription] = useState("");
  const [revisionNo, setRevisionNo] = useState("");
  const [err, setErr] = useState("");

  const [RevisionDis,setRevisionDis] = useState(false);
  const [DescriptionDis,setDescriptionDis] = useState(false);

  const [nxtbtn,setnxtbtn] = useState(true);

  const [savebtn,setsavebtn] = useState(false);

  const [Id, setId] = useState("");

  const [ThresholdMaster, setThresholdMaster] = useState([]);

  useEffect(async () => {
    await axios
      .get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +"/DocumentType/GetAllIDs")
      .then((res) => {
        setDocumenttype(res.data);
        console.log(res.data);
      });
  }, []);

  const handlechange = (e) => {
    setDescription("");
    setRevisionNo("");
    const id = e.target.value;
    console.log(id);
    setThresholdId(id);
    axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/MasterThreshold/GetAllByDocumentTypeId?id=${id}`
      )
      .then((res) => {
        setDescription(res.data.description);
        setId(res.data.id);
        console.log(res.data);
        if (res.data.statusSeq == 0) {
          setRevisionNo(res.data.revisionNo +1);
        } else if (res.data.statusSeq > 0) {
          setErr("Cannot create a new Revision for this Threshold as the current Revision has not been deployed");
          setRevisionNo(res.data.revisionNo);
          setRevisionDis(true);
          setDescriptionDis(true);
          setnxtbtn(false);
          setsavebtn(true);
        } else {
          setDescription("");
          setRevisionNo(1);
          setErr("");
          setRevisionDis(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const reload = (e) => {
    window.location.reload(true);
  }

  const handleNext = (e) => {
    navigate.push(`/thresholdconditioncreatepage`, {
      state:{
        id: Id == undefined ? ThresholdMaster.id : Id
      },
    });
  }
  

  const handlesubmit = async () => {
    if(thresholdId==""){
      toast.error("Document Type is not Selected");
      return false;
    }else if(description==""){
      toast.error("Description is not Filled");
      return false;
    }else if(revisionNo==""){
      toast.error("Revision No. is not Filled");
      return false;
    }
    await axios
      .post(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/MasterThreshold/Add`, {
        documentTypeId: thresholdId,
        description: description,
        revisionNo: revisionNo
      })
      .then((res) => {
        console.log(res.data);
        setThresholdMaster(res.data);
      })
      .catch((err) => console.log(err));
      toast.success("Added Successfully");
      setnxtbtn(false);
      setsavebtn(true);
  };

  return (
    <div>
      <ToastContainer />
      <div className="row">
        <div className="col-md-10 col-lg-10">
          <section id="card">
            <div className="well">
              <h1> Create Threshold Revision </h1>
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
                <textarea
                disabled={DescriptionDis}
                  placeholder=" Description here.."
                  style={{ height: "5rem" }}
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                ></textarea>
              </div>
              <br />
              <form className="ml-auto">
                <div style={{ display: "flex" }}>
                  <label>Revision Number:</label>
                  <input placeholder="Revision Number here.." value={revisionNo} onChange={(e) => setRevisionNo(e.target.value)} disabled={RevisionDis} />
                    <br/>

                  <br />
                </div>
                  <p style={{color:"red"}}>{err}</p>
              </form>

              <div className="button" style={{ marginTop: "2rem" }}>
              
                <button
                disabled={savebtn}
                  type="button"
                  className="btn  btn-md btn-save"
                  style={{ width: "7rem" }}
                  onClick={handlesubmit}
                >
                  Save
                </button>
                <button disabled={nxtbtn} onClick={handleNext}  style={{marginRight:"14px"}} type="button" className="btn btn-md  btn-back">
                  Next
                </button> 
                <button onClick={reload} type="button" className="btn btn-md  btn-back">
                  Cancel
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default ThresholdRevisionCreate;
