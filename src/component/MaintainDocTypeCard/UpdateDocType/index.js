import React, { useEffect, useState } from "react";
import axios from 'axios';
import Swal from "sweetalert2";
import { move } from "formik";
import { ToastContainer, toast } from 'react-toastify';

const UpdateDocType = () => {
    const [apidata, setApiData] = useState([]);
    const [documetType, setDocumentType] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [TransportMode, setTransportMode] = useState("");
    const [processType, setprocessType] = useState("");
    const [description, setdescription] = useState("");
    const [MovementType, setMovementType] = useState("");
    const [agencyCode, setagencyCode] = useState([]);
    const [agencyName, setagencyName] = useState("");
    const [selectedAgency, setselectedAgency] = useState("");
    const [id, setId] = useState("");
    const [toggle, setToggle] = useState(false);



    useEffect(() => {
        const getdocType = async () => {
            await axios.get(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE +'/DocumentType/GetAll').then((res) => setDocumentType(res.data)).catch((err) => console.log(err))
        }
        const getAgencyType = async () => {
            await axios.get(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE +'/AgencyRef/GetAll').then((res) => setagencyCode(res.data)).catch((err) => console.log(err))
        }
        getAgencyType();

        getdocType();

    }, [])

    const selecthandle = async (e) => {
        const id = e.target.value;
        await axios.get(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE +`/AgencyRef/GetById?id=${id}`).then((res) => setselectedAgency(res.data)).catch((err) => console.log(err));
        setToggle(true);

    }

    const [agencyNameref,setAgencyNameref] = useState({})

    const handleChange = async (e) => {
        const value = e.target.value;
        if (value == "") {
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Oops...',
            //     text: 'Please Select Doc Type!'
            //   }).then((result) => {
            //     if (result.isConfirmed) {
            //         window.location.reload(true);
            //     }
            // })
            toast.error("Please Select Doc Type");
            window.location.reload(true);
        } else {
            await axios.get(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE +`/DocumentType/GetById?id=${value}`).then((res) => {
                setSelectedData(res.data)
                console.log(res.data);
                setAgencyNameref(res.data.agencyRefNavigation)
                setMovementType(res.data.movementType)
                setTransportMode(res.data.transportMode)
            }).catch((err) => console.log(err))
            setId(value);
            

        }
    }

    console.log(agencyNameref);


    const submitHandle = (e) => {
        e.preventDefault();
        
        if(`${selectedData.id}` == 'undefined' || `${selectedData.id}` == ''){
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Oops...',
            //     text: 'Please Select Doc Type!'
            //   })
            toast.error("Please Select Doc Type");
        }
        else{
            Swal.fire({
            title: 'Are you sure you want to Update?',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel"
        }
        ).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
               
                
                var raw = JSON.stringify({
                    "Id": `${selectedData.id}`,
                    "DocumentType1": `${selectedData.documentType1}`,
                    "ProcessType": processType.length == 0 ? selectedData.processType : processType,
                    "Description": description == '' ? selectedData.description : description,
                    "AgencyRef": selectedAgency.id == undefined ? `${selectedData.agencyRef}` : selectedAgency.id,
                    "AgencyCode": selectedAgency.agencyName == undefined ? agencyNameref.agencyName : selectedAgency.agencyName,
                    "MovementType": MovementType,
                    "TransportMode": TransportMode,
                });
                
                var requestOptions = {
                  method: 'PUT',
                  headers: myHeaders,
                  body: raw,
                  redirect: 'follow'
                };
                
                fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE +'/DocumentType/Update', requestOptions)
                  .then(response => response.text())
                  .then(result => console.log(result))
                  .catch(error => console.log('error', error));
                //   Swal.fire('Updated Successfully', '', 'success').then((result) => {
                //     /* Read more about isConfirmed, isDenied below */
                //     if (result.isConfirmed) {
                //        window.location.reload(true);
    
                //     } else
                //         Swal.fire(' Cancelled', '', 'error')
    
                // })
                toast.success("Updated Successfully");
                window.location.reload(true);

            }

        })          
    }
    }
    const [selecteddataa,setSelecteddataa]= useState({});
    const newagencyCode = agencyCode.filter((e) => e.id == selectedData.agencyRef);
    const selectedcode = newagencyCode.map((e) => e.AgencyCode);
   
    console.log(selecteddataa);
    
    
    const handleEntailmentRequest = (e) => {
        e.preventDefault();
         window.location.reload(true); 
    
    }
    return (
        <div>
             <ToastContainer />
            <div className="row" >
                <div className="col-md-10 col-lg-10">
                    <section id="card">
                        <div className="well">
                            <h1>Update Document Type </h1>
                            <div>
                                <form className="ml-auto" method="post">
                                    <div style={{ display: 'flex' }}>
                                        <div>
                                            <label>Document Type</label>
                                            <br />
                                            <select onChange={handleChange} className="dropdown_value_larg" style={{ width: '28rem' }} >
                                                <option value="">Select Doc Type </option>
                                                {
                                                    documetType.map((doc) => (
                                                        <option value={doc.id}>{doc.documentType1}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div style={{ marginLeft: '2rem' }}>

                                            <label>Agency Code</label>
                                            <br />
                                            <select className="dropdown_value" onChange={selecthandle}>
                                                <option value={agencyNameref.id}>{agencyNameref.agencyCode}</option>
                                                {
                                                    agencyCode.filter(e => e.agencyCode !== agencyNameref.agencyCode).map((e) => (
                                                        <option value={e.id}>{e.agencyCode}</option>
                                                    ))
                                                }

                                            </select>
                                            
                                            <input disabled value={toggle ? selectedAgency.agencyName : agencyNameref.agencyName} type="text" style={{ width: '22rem',marginLeft:'1rem' }} />

                                        </div>
                                       
                                            
                                        
                                    </div> 
                                    <br />
                                    <div style={{ display: 'flex' }}>
                                        <div>
                                            <label >Transport Mode</label>
                                            <br />
                                            <select className="select_condition " value={TransportMode} style={{ width: '28rem' }} onChange={(e) => setTransportMode(e.target.value)}>

                                                {
                                                    <option value={TransportMode}>{TransportMode}</option>
                                                }

                                                <option value={'Rail'}>Rail</option>
                                                <option value={'Road'}>Road</option>
                                                <option value={'Air'}>Air</option>
                                                <option value={'Post'}>Post</option>
                                                <option value={'Roon'}>Roon</option>
                                                <option value={'Other'}>Other</option>

                                            </select>
                                        </div>
                                        <div style={{ marginLeft: '2rem' }}>
                                            <label>Movement Type</label>
                                            <br />
                                            <select className="select_condition " value={MovementType} style={{ width: '30rem' }} onChange={(e) => setMovementType(e.target.value)}>

                                                {<option value={MovementType}>{MovementType}</option>

                                                }

                                                <option value={'Export'}>Export</option>
                                                <option value={'Transit'}>Transit</option>
                                                <option value={'Relay'}>Relay</option>
                                                <option value={'Tranship'}>Tranship</option>
                                            </select>

                                        </div>
                                    </div>
                                        
                                       
                                    
                                   
                                        {/* <div>
                                            <label>Process Type</label>
                                            <br />
                                            <select value={processType} className="select_condition " style={{ width: '28rem' }} onChange={(e) => setprocessType(e.target.value)}>
                                                
                                                {
                                                    <option value={selectedData.processType}>{selectedData.processType}</option>
                                                }
                                                {
                                                    selectedData.processType == "Normal" ?  <option value={"System"}>{"System"}</option> :  <option value={"Normal"}>{"Normal"}</option>
                                                }
                                               
                                                

                                            </select>
                                        </div> */}
                                        
                                    

                                   
                                    <br />
                                    <label>Description</label>
                                    <textarea onChange={(e) => setdescription(e.target.value)} defaultValue={selectedData.description} id="w3review" name="w3review" rows="4" type="text" placeholder=" Description here.." style={{ height: '5rem' }}></textarea>
                                </form>
                            </div>
                            <div className="button">
                                <button onClick={submitHandle} type="button" className="btn  btn-md btn-save">Update</button>
                                <button  onClick={handleEntailmentRequest} type="button" className="btn btn-md  btn-back">Cancel</button>

                            </div>
                        </div>

                    </section>
                </div>
            </div>
        </div>
    )
}
export default UpdateDocType
