import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from 'yup';
import { Formik, useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';

const CreateThreatRule = () => {
    let headers = new Headers();    
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic ');
    headers.append('Origin','http://localhost:3000');

    const [threatGroup, setThreatGroup] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    

    const handleSubmit =(e) => {
        e.preventDefault();
        
    }
    const validate = Yup.object({
        threatGroup: Yup.string().required("empty-select"),
        description: Yup.string().required("empty-select")
    });
    const initialValues = {
        threatGroup: "",
        description: "",
    }
    return (
       <div>
          <ToastContainer />
           <Formik 
                initialValues={initialValues}
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
                              "ThreatGroup1":("ThreatGroup1", values.threatGroup),
                              "Description": ("Description", values.description)
                            });
                            
                            var requestOptions = {
                              method: 'POST',
                              headers: myHeaders,
                              body: raw,
                              redirect: 'follow'
                            };
                            
                            fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE+'/ThreatGroup/Add', requestOptions)
                        .then(response => response.text())
                        .then((result) =>{ 
                            debugger;
                            const data = JSON.parse(result);
                            console.log(data);
                            if (data.active =='Duplicate Threat Group') {
                                toast.error("Threat Group Already Exists");
                                // Swal.fire({
                                //     icon: 'error',
                                //     title: 'Oops...',
                                //     text : "Threat Group Already Exists"
                                // })
                                    
                    
                            }else if (data.active='Y' ){
                                toast.success("Added Successfully");
                                resetForm();
                            }else
                                toast.error("Cancelled");
                            }    
                        )
                        .catch(error => console.log('error', error));  

                            // const res=  fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE+'/ThreatGroup/Add', requestOptions)
                            //         .then(response => response.text())
                            //         .catch(error => console.log('error', error));  
                            //               Swal.fire('Added Successfully', '', 'success').then((result) => {
                            //                 /* Read more about isConfirmed, isDenied below */
                            //                 if (result.isConfirmed) {
                            //                     resetForm();
                            
                            //                 } else
                            //                     Swal.fire(' Cancelled', '', 'error')
                            
                            //             })
                                      } 
              
                    })
                      
                }}
            >
            {
            (formik) => (
            <div className="row">
            <div className="col-md-10 col-lg-10">
                <section id="card">
                    <div className="well">
                        <h1>Create Threat Group  </h1>
                        <div className="inner-card">
                                <form className="ml-auto" method="post">
                                    <label>Threat Group <i style={{ color: "red"}}>*</i></label>
                                    <br />
                                    <input className={`select_condition ${formik.errors.threatGroup}`} onChange={formik.handleChange('threatGroup')} onBlur={formik.handleBlur('threatGroup')} value={formik.values.threatGroup} type="text" placeholder="Threat Group" style={{width: '60rem'}} />
                                    {/* <p style={{ color: "red",fontSize:13 , margin:'0px', marginTop:'5px' }}>{formik.errors.threatGroup}</p> */}
                                    <br />
                                    <label className="discription" style={{marginTop: '2rem'}}>Description<i style={{ color: "red"}}>*</i> </label>
                                    <br />
                                    <textarea className={`select_condition ${formik.errors.description}`} onChange={formik.handleChange('description')} onBlur={formik.handleBlur('description')} value={formik.values.description} id="w3review" name="w3review" rows="4" type="text" placeholder=" Description here.." style={{height: '5rem'}}></textarea>
                                    {/* <p style={{ color: "red",fontSize:13 , margin:'0px', marginTop:'5px' }}>{formik.errors.description}</p> */}

                                </form>

                            </div>
                            <div className="button">
                                <button onClick={formik.handleSubmit} type="button" className="btn  btn-md btn-save">Save</button>
                                <button onClick={() => formik.resetForm()} type="button" className="btn btn-md  btn-back">Cancel</button>

                            </div>
                    </div>
                    
                </section >
            </div>
        </div>
)}

        </Formik>
       </div>
    )
}
export default CreateThreatRule
