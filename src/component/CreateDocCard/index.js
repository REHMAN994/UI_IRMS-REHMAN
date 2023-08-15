import React, { useState, useEffect } from "react";
import "./cardone.css";
import Swal from "sweetalert2";
import axios from 'axios'
import * as Yup from 'yup';
import { Formik, useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';

const CreatDoc = () => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic ');
    headers.append('Origin', 'http://localhost:3000');

    const [apidata, setApiData] = useState([]);
    const [agencyRef, setagencyRef] = useState("");
    const [agencyCode, setagencyCode] = useState("");
    const [agencyName, setagencyName] = useState([]);
    const [agencyId, setAgencyId] = useState("");
    useEffect(() => {
        const getdata = async () => {
            await axios.get(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + '/AgencyRef/GetAll')
                .then((res) => setApiData(res.data)).catch((err) => console.log(err))
        }

        getdata();

    }, [])

    const selecthandle = (e) => {

        const id = e.target.value;
        axios.get(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + `/AgencyRef/GetById?id=${id}`).then((res) => setagencyName(res.data)).then((err) => console.log(err));
        setagencyRef(id);



    }


    const validate = Yup.object({
        documentType: Yup.string().required("empty-select"),
       // processType: Yup.string().required("empty-select"),
        transportMode: Yup.string().required("empty-select"),
        movementType: Yup.string().required("empty-select"),
        description: Yup.string().required("empty-select"),
        // agencyCode : Yup.string().required("empty-select"),
    });
    const initialValues = {
        documentType: "",
        description: "",
        transportMode: "",
        movementType: "",
        //processType: "",
        agencyCode: "",

    }

    const handleEntailmentRequest = (e) => {
        e.preventDefault();
        window.location.reload(true);
    
    }
    return (
        <div>
              <ToastContainer />
            <Formik
                initialValues={initialValues}
                validationSchema={validate}
                onSubmit={(values, { resetForm }) => {
                    Swal.fire({
                        title: 'Are you sure you want to save?',
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonText: "OK",
                        cancelButtonText: "Cancel"
                    }
                    ).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            var myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/json");

                            var raw = JSON.stringify({
                                "documentType1": values.documentType,
                               // "processType": values.processType,
                                "description": values.description,
                                "agencyRef": agencyRef,
                                "agencyCode": agencyName.agencyName,
                                "movementType": values.movementType,
                                "transportMode": values.transportMode,
                            });

                            var requestOptions = {
                                method: 'POST',
                                headers: myHeaders,
                                body: raw,
                                redirect: 'follow'
                            };
                            fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + '/DocumentType/Add', requestOptions)
                        .then(response => response.text())
                        .then((result) =>{ 
                            debugger;
                            const data = JSON.parse(result);
                            console.log(data);
                            if (data.active =='Duplicate DocType') {
                                // Swal.fire({
                                //     icon: 'error',
                                //     title: 'Oops...',
                                //     text : "Document Type Already Exists"
                                // })
                                toast.error("Document Type Already Exists");
                                    
                    
                            }else if (data.active='Y' ){
                                toast.success("Added Successfully");
                                //Swal.fire('Added Successfully', '', 'success')
                                resetForm();
                                window.location.reload(true);
                            }
                            }    
                        )

                            // fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + '/DocumentType/Add', requestOptions)
                            //     .then(response => {
                            //         if(!response.ok){
                            //             Swal.fire({
                            //                 icon: 'error',
                            //                 title: 'Oops...',
                            //                 text : "Document Type Already Added, Please Try with Other Name"
                            //             })
                            //         }
                            //         else{
                            //             Swal.fire('Added Successfully', '', 'success')
                            //             .then((result) => {
                            //                 if (result.isConfirmed) {
                            //                     resetForm();
                            //                    window.location.reload(true);
                            
                            //                 }else{
                            //                     Swal.fire(' Cancelled', '', 'error')
                            //                 }
                            //             }
                            //                 )
                            //         }
                            //     })
                                
                        } 

                    })

                }}

            >
                {
                    (formik) => (

                        <div className="row" >
                            <div className="col-md-10 col-lg-10">
                                <section id="card">
                                    <div className="well" >
                                        <h1 style={{ marginTop: '0rem' }}>Create Document Type</h1>
                                        <div className="inner-card">
                                            <form className="ml-auto" method="post">
                                                <div style={{ display: 'flex' }}>
                                                    <div>
                                                    <label>Document Type <i style={{ color: "red"}}>*</i></label>
                                                    <br />
                                                    <input className={`select_condition ${formik.errors.documentType}`}  onChange={formik.handleChange('documentType')} onBlur={formik.handleBlur('documentType')} value={formik.values.documentType} style={{ width: '28rem' }} type="text" placeholder="Document Type" />
                                                    </div>
                                                   
                                                    {/* <p style={{ color: "red", fontSize: 13, margin: '0px', marginTop: '5px' }}>{formik.errors.documentType}</p> */}
                                                    <div style={{ marginLeft: '4rem' }} >
                                                        <label>Agency Code <i style={{ color: "red"}}>*</i></label>
                                                        <br />
                                                        <select className={`select_condition`} style={{ width: '100px', height: '31px', }} onChange={selecthandle}>
                                                            <option value="">Select</option>
                                                            {
                                                                apidata.map((e) => (
                                                                    <option value={e.id} >{e.agencyCode}</option>
                                                                ))
                                                            }
                                                        </select>
                                                        {/* <p style={{ color: "red",fontSize:13 , margin:'0px', marginTop:'5px' }}>{formik.errors.agencyCode}</p> */}
                                                    </div>
                                                    <div style={{ marginLeft: '2rem' }} >
                                                        <label>Agency Name <i style={{ color: "red"}}>*</i></label>
                                                        <br />
                                                        <input  disabled onChange={(e) => setagencyName(e.target.value)} value={agencyName.agencyName} type="text" placeholder="Agency Name" style={{ width: '19.5rem' }} />
                                                    </div>
                                                </div>
                                                <br />
                                                {/* <div style={{ display: 'flex' }}>
                                                    <div >
                                                        <label>Process Type<i style={{ color: "red"}}>*</i> </label>
                                                        <br />
                                                        <select className={`select_condition ${formik.errors.processType}`}  onChange={formik.handleChange('processType')} onBlur={formik.handleBlur('processType')} value={formik.values.processType}>
                                                            <option value={""}>Select Process Type</option>
                                                            <option value={"Normal"}>{"Normal"}</option>
                                                            <option value={"System"}>{"System"}</option>
                                                        </select>
                                                        <p style={{ color: "red", fontSize: 13, margin: '0px', marginTop: '5px' }}>{formik.errors.processType}</p>

                                                    </div>
                                                    

                                                </div> */}
                                                <br />
                                                <div style={{ display: 'flex' }}>
                                                    <div >
                                                        <label>Transport mode <i style={{ color: "red"}}>*</i></label>
                                                        <br />
                                                        <select className={`select_condition ${formik.errors.transportMode}`} onChange={formik.handleChange('transportMode')} onBlur={formik.handleBlur('transportMode')} value={formik.values.transportMode} >
                                                            <option value={""}>Select Transport Mode</option>
                                                            <option value={"Sea"}>{"Sea"}</option>
                                                            <option value={"Rail"}>{"Rail"}</option>
                                                            <option value={"Road"}>{"Road"}</option>
                                                            <option value={"Air"}>{"Air"}</option>
                                                            <option value={"Postal"}>{"Postal"}</option>
                                                            <option value={"Roll On Roll Off"}>{"Roll On Roll Off"}</option>
                                                        </select>
                                                        {/* <p style={{ color: "red", fontSize: 13, margin: '0px', marginTop: '5px' }}>{formik.errors.transportMode}</p> */}

                                                    </div>

                                                    <div style={{ marginLeft: '4rem' }} >
                                                        <label>Movement Type <i style={{ color: "red"}}>*</i></label>
                                                        <br />
                                                        <select className={`select_condition ${formik.errors.movementType}`} onChange={formik.handleChange('movementType')} onBlur={formik.handleBlur('movementType')} value={formik.values.movementType} >
                                                            <option value={""}>Select Movement Mode</option>
                                                            <option value={"Import"}>{"Import"}</option>
                                                            <option value={"Export"}>{"Export"}</option>
                                                            <option value={"Transit"}>{"Transit"}</option>
                                                            <option value={"Relay"}>{"Relay"}</option>
                                                            <option value={"Transhipment"}>{"Transhipment"}</option>
                                                        </select>
                                                        {/* <p style={{ color: "red", fontSize: 13, margin: '0px', marginTop: '5px' }}>{formik.errors.movementType}</p>                                   */}
                                                    </div>
                                                </div>


                                                <label className="discription" style={{ marginTop: '2rem' }}>Description <i style={{ color: "red"}}>*</i></label>
                                                <br />
                                                <textarea className={`select_condition ${formik.errors.description}`} onChange={formik.handleChange('description')} onBlur={formik.handleBlur('description')} value={formik.values.description} id="w3review" name="w3review" rows="4" type="text" placeholder=" Description here.." style={{ height: '5rem' }}></textarea>
                                                {/* <p style={{ color: "red", fontSize: 13, margin: '0px', marginTop: '5px' }}>{formik.errors.description}</p> */}

                                            </form>

                                        </div>
                                        <div className="button">
                                            <button onClick={formik.handleSubmit} type="button" className="btn  btn-md btn-save">Save</button>
                                            <button  onClick={handleEntailmentRequest} type="button" className="btn btn-md  btn-back">Cancel</button>

                                        </div>

                                    </div>
                                </section>
                            </div>
                        </div >

                    )}
            </Formik>
        </div >
    )
}
export default CreatDoc
