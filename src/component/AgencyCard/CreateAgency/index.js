import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from 'yup';
import { Formik, useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';

const AgencyCreate = () =>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic ');
    headers.append('Origin', 'http://localhost:3000');

    const [agencyCode, setagencyCode] = useState("");
    const [unCefactID, setunCefactID] = useState("");
    const [agencyName, setagencyName] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const validate = Yup.object({
        agencyCode: Yup.string().required("empty-select"),
        agencyName: Yup.string().required("empty-select"),
        unCefactID: Yup.string().matches(/[0-99]/,"Required 0 to 99").max(2, "Only two numbers Required").required("empty-select")
    });

    const initialValues = {
        agencyCode: "",
        agencyName: "",
        unCefactID: "",
    }

    return(
        <div>
            <ToastContainer />
            <Formik initialValues={initialValues}
                validationSchema={validate}
                onSubmit={(values,{resetForm}) => {
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
                                "agencyCode": ("agencyCode", values.agencyCode),
                                "agencyName": ("agencyName", values.agencyName),
                                "unCefactId": ("unCefactID", values.unCefactID),
                            });

                            var requestOptions = {
                                method: 'POST',
                                headers: myHeaders,
                                body: raw,
                                redirect: 'follow'
                            };

                            // fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + '/AgencyRef/Add', requestOptions)
                            //     .then(response => response.text())
                            //     .then(result => console.log(result))
                            //     .catch(error => console.log('error', error));
                            // Swal.fire('Added Successfully', '', 'success');
                            // resetForm();

                        fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + '/AgencyRef/Add', requestOptions)
                        .then(response => response.text())
                        .then((result) =>{ 
                            debugger;
                            const data = JSON.parse(result);
                            if (data.active =='Duplicate AgencyRef') {
                                // Swal.fire({
                                //     icon: 'error',
                                //     title: 'Oops...',
                                //     text : "Agency Code Already Exists"
                                // })
                                toast.error("Agency Code Already Exists");
                                    
                    
                            }else if (data.active='Y' ){
                                toast.success("Added Successfully");
                                resetForm();
                            }
                            }    
                        )
                        .catch(error => console.log('error', error));  

                        }

                    })
                    


                }}>
            { (formik) => (
            <div className="row" >
                <div className="col-md-10 col-lg-10">
                    <section id="card">
                        <div className="well">
                            <h1>Create Agency Reference </h1>
                            <div>
                                <form className="ml-auto" method="post">
                                    <div style={{display: 'flex'}}>
                                        <div>
                                            <label>Agency Code<i style={{ color: "red"}}>*</i> </label>
                                            <br/>
                                            <input className={`select_condition ${formik.errors.agencyCode}`}  onChange={formik.handleChange('agencyCode')} onBlur={formik.handleBlur('agencyCode')} value={formik.values.agencyCode} type="text" placeholder="Agency Code" style={{width: '28rem'}} />
                                            {/* <p style={{ color: "red",fontSize:13 , margin:'0px', marginTop:'5px' }}>{formik.errors.agencyCode}</p> */}

                                        </div>
                                    
                                        <div style={{marginLeft:'4rem'}}>
                                            <label>UN/CEFACT <i style={{ color: "red"}}>*</i></label>
                                            <br/>
                                            <input className={`select_condition ${formik.errors.unCefactID}`} onChange={formik.handleChange('unCefactID')} onBlur={formik.handleBlur('unCefactID')} value={formik.values.unCefactID} type="text" placeholder="UN/CEFACT" style={{width: '28rem'}} />
                                            <p style={{ color: "red",fontSize:13 , margin:'0px', marginTop:'5px' }}>{formik.errors.unCefactID == "empty-select" ? "" : formik.errors.unCefactID}</p>
                                            

                                        </div>
                                    </div>
                                    
                                    <br/>
                                    <label>Agency Name <i style={{ color: "red"}}>*</i></label>
                                    <br/>
                                    <input className={`select_condition ${formik.errors.agencyName}`} onChange={formik.handleChange('agencyName')} onBlur={formik.handleBlur('agencyName')} value={formik.values.agencyName} placeholder="Agency Name" type="text" style={{width: '60rem'}} />
                                    {/* <p style={{ color: "red",fontSize:13 , margin:'0px', marginTop:'5px' }}>{formik.errors.agencyName}</p> */}

                                </form>
                            </div>
                            <div className="button">
                                <button onClick={formik.handleSubmit} type="button" className="btn  btn-md btn-save">Save</button>
                                <button onClick={() => formik.resetForm()} type="button" className="btn btn-md  btn-back">Cancel</button>

                            </div>
                        </div>
                        
                    </section>
                </div>
            </div>
            )}

            </Formik>
        </div>

    )
}
export default AgencyCreate