import axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import { useHistory, useLocation } from "react-router-dom";

const ModifyThresholdRevision = () => {
  const navigate = useHistory();
  const [documentType, setDocumenttype] = useState([]);
  const [thresholdId, setThresholdId] = useState("");
  const [doctypeId, setdoctypeId] = useState("");
  const [description, setDescription] = useState("");
  const [revisionNo, setRevisionNo] = useState("");
  const [err, setErr] = useState("");
  const [RevisionDis, setRevisionDis] = useState(false);
  const [DescriptionDis, setDescriptionDis] = useState(false);

  const [SaveDis, setSaveDis] = useState(true);
  const [newthresholdId, setnewThresholdId] = useState("");
  const [NextDis, setNextDis] = useState(true);

  useEffect(async () => {
    await axios
      .get(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +"/DocumentType/GetAllIDs")
      .then((res) => {
        setDocumenttype(res.data);
      });
  }, []);

  const handlechange = (e) => {
    const id = e.target.value;
    setdoctypeId(id);
    axios
      .get(
        process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION +`/MasterThreshold/GetAllByDocumentTypeId?id=${id}`
      )
      .then((res) => {
        let data = res.data;
        console.log(data);
        setDescription(data.description);
        setRevisionNo(data.revisionNo);
        setThresholdId(data.id);
        setErr("");
        setRevisionDis(true);
        setDescriptionDis(false);
        setSaveDis(false);
        // if (data == "") {
        //   setErr("The requested Threshold has been deleted, please use the Reactivate Threshold Revision");
        //   setDescription("");
        //   setRevisionNo("");
        //   setRevisionDis(true);
        //   setDescriptionDis(true);
        //   setSaveDis(true);
        // } else if (data.length > 1) {
        //   setErr("The requested DOCUMENT TYPE appears to have more than one revision that can be modified, please press CANCEL to exit");
        //   setRevisionDis(true);
        //   setDescription("");
        //   setRevisionNo("");
        //   setRevisionDis(true);
        //   setDescriptionDis(true);
        //   setSaveDis(true);
        // } else if (data.length == 1) {
        //   setDescription(data[0].description);
        //   setRevisionNo(data[0].revisionNo);
        //   setThresholdId(data[0].id);
        //   setErr("");
        //   setRevisionDis(true);
        //   setDescriptionDis(false);
        //   setSaveDis(false);
        // }
      })
      .catch((err) => console.log(err));
  };


  const handlesubmit = async () => {
    Swal.fire({
      title: 'Are you sure you want to Update?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel"
    }
    ).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(process.env.REACT_APP_IRMS_RISKRULE_ADMINISTRATION + `/MasterThreshold/Update`, {
            documentTypeId: doctypeId,
            description: description,
            revisionNo: revisionNo,
            Id : thresholdId
          })
          .then((res) => {
            setnewThresholdId(res.data.id);
            setNextDis(false);
            setSaveDis(true);
            toast.success("Updated Successfully");
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const Cancelbtn = async () => {
    window.location.reload(true);
  };

  const handleNext = (e) => {
    navigate.push(`/modifythresholdconditionpage`, {
      state:{
        id: thresholdId
      },
    });
  }
 


  return (
    <div>
      <ToastContainer />
      <div className="row">
        <div className="col-md-10 col-lg-10">
          <section id="card">
            <div className="well">
              <h1> Modify Threshold Revision </h1>
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
                  <input  placeholder=" Revision Number here.." value={revisionNo} onChange={(e) => setRevisionNo(e.target.value)} disabled={RevisionDis} />
                  <br />
                </div>
                  <p style={{color:"red"}}>{err}</p>
              </form>


              <div className="button" style={{ marginTop: "2rem" }}>
              
              <button
              disabled={SaveDis}
                type="button"
                className="btn  btn-md btn-save"
                style={{ width: "7rem" }}
                onClick={handlesubmit}
              >
                Update
              </button>
              <button onClick={handleNext}  style={{marginRight:"14px"}} type="button" className="btn btn-md  btn-back">
                Next
              </button> 
              <button onClick={Cancelbtn} type="button" className="btn btn-md  btn-back">
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
export default ModifyThresholdRevision;
