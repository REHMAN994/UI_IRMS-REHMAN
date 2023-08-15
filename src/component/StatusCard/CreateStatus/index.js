import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from 'yup';
import { Formik, useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';


const CreateStatus = () => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic ');
    headers.append('Origin', 'http://localhost:3000');

    const [statusCode, setStatusCode] = useState("");
    const [processes, setProcess] = useState("");
    const [description, setDescription] = useState("");
    const [statusSeq, setStatusSeq] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const validate = Yup.object({
        statusCode: Yup.string().required("empty-select"),
        processes: Yup.string().required("empty-select"),
        statusSeq: Yup.string().matches(/[0-99]/,"Required 0 to 99").max(2, "Status Sequence Required Two Numbers Only").required("empty-select"),
        description: Yup.string().required("empty-select")
    });
    const initialValues = {
        statusCode: "",
        processes: "",
        statusSeq:"",
        description: "",
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
                                "StatusCode":("StatusCode", values.statusCode),
                                "StatusSeq" : ("StatusSeq", values.statusSeq),
                                "Process": ("Process", values.processes),
                                "Description": ("Description", values.description),
                              });
                            
                            var requestOptions = {
                                method: 'POST',
                                headers: myHeaders,
                                body: raw,
                                redirect: 'follow'
                              };
                              fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE+'/StatusRef/Add', requestOptions)
                        .then(response => response.text())
                        .then((result) =>{ 
                            debugger;
                            const data = JSON.parse(result);
                            if (data.active =='Duplicate StatusRef') {
                                // Swal.fire({
                                //     icon: 'error',
                                //     title: 'Oops...',
                                //     text : "Status Reference Already Exists"
                                // })
                                toast.error("Status Reference Already Exists");
                    
                            }else if (data.active='Y' ){
                                toast.success("Added Successfully");
                                resetForm();
                            }
                            }    
                        )
                        .catch(error => console.log('error', error));  
                            // const res = fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE+'/StatusRef/Add', requestOptions)
                            // .then(response => {
                            //     if(!response.ok){
                            //         Swal.fire({
                            //             icon: 'error',
                            //             title: 'Oops...',
                            //             text : "Status Reference is Already Created"
                            //         })
                            //     }
                            //     else{
                            //         Swal.fire('Added Successfully', '', 'success')
                            //         .then((result) => {
                            //             if (result.isConfirmed) {
                            //                 resetForm();
                            //                window.location.reload(true);
                        
                            //             }else{
                            //                 Swal.fire(' Cancelled', '', 'error')
                            //             }
                            //         }
                            //             )
                            //     }
                            //})

                        } 



                    })
                    

                }}>
                      {
                    (formik) => (
            <div class="row" >
                <div class="col-md-10 col-lg-10">
                <section id="card">
                        <div className="well">
                            <h1>Create Status </h1>
                            <div className="inner-card">
                                <form className="ml-auto" method="post">
                                    <div style={{display:'flex'}}>
                                        <div >
                                            <label>Status Code <i style={{ color: "red"}}>*</i></label>
                                            <br />
                                            <input className={`select_condition ${formik.errors.statusCode}`} onChange={formik.handleChange('statusCode')} onBlur={formik.handleBlur('statusCode')} value={formik.values.statusCode} type="text" placeholder="Status Code" style={{width: '28rem'}} />
                                            {/* <p style={{ color: "red",fontSize:13 , margin:'0px', marginTop:'5px' }}>{formik.errors.statusCode}</p> */}

                                        </div>
                                        <div style={{marginLeft:'4rem'}} >
                                            <label>Seq.No<i style={{ color: "red"}}>*</i> </label>
                                            <br />
                                            <input className={`select_condition ${formik.errors.statusSeq}`} onChange={formik.handleChange('statusSeq')} onBlur={formik.handleBlur('statusSeq')} value={formik.values.statusSeq} type="text" placeholder="Action" style={{width: '28rem'}} />
                                            <p style={{ color: "red",fontSize:13 , margin:'0px', marginTop:'5px' }}>{formik.errors.statusSeq == "empty-select" ? "" : formik.errors.statusSeq}</p>

                                        </div>
                                    </div>
                                    <br />
                                        <label>Process <i style={{ color: "red"}}>*</i></label>
                                            <br />
                                        <input className={`select_condition ${formik.errors.processes}`} onChange={formik.handleChange('processes')} onBlur={formik.handleBlur('processes')} value={formik.values.processes}  type="text" placeholder="Process"  />
                                        {/* <p style={{ color: "red",fontSize:13 , margin:'0px', marginTop:'5px' }}>{formik.errors.processes}</p> */}

                                    <br/>
                                    <label className="discription" style={{marginTop: '2rem'}}>Description <i style={{ color: "red"}}>*</i></label>
                                    <br />
                                    <textarea className={`select_condition ${formik.errors.description}`} onChange={formik.handleChange('description')} onBlur={formik.handleBlur('description')} value={formik.values.description}  id="w3review" name="w3review" rows="4" type="text" placeholder=" Description here.." style={{height: '5rem'}}></textarea>
                                    {/* <p style={{ color: "red",fontSize:13 , margin:'0px', marginTop:'5px' }}>{formik.errors.description}</p> */}

                                </form>

                            </div>
                            <div className="button">
                                <button onClick={formik.handleSubmit} type="button" className="btn  btn-md btn-save">Save</button>
                                <button onClick={() => formik.resetForm()} type="button" className="btn btn-md  btn-back">Cancel</button>

                            </div>

                        </div>
                    </section>
                </div>
            </div>)
}
            </Formik>
          
        </div >     
    )
}
export default CreateStatus