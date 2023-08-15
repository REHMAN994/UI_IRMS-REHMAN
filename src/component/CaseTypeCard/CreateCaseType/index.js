import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from 'yup';
import { Formik, useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';

const CreateCaseType = () => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic ');
    headers.append('Origin', 'http://localhost:3000');

    const [caseType, setCaseType] = useState("");
    const [actionCategory, setactionCategory] = useState("");
    const [actionDetail, setactionDetail] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const validate = Yup.object({
        caseType: Yup.string().required("empty-select"),
        actionCategory: Yup.string().required("empty-select"),
        actionDetail: Yup.string().required("empty-select"),
        description: Yup.string().required("empty-select")
    });
    const initialValues = {
        actionCategory: "",
        caseType: "",
        description: "",
        actionDetail :"",
    }
    return(
        <div>
                 <ToastContainer />
            <Formik  initialValues={initialValues}
                validationSchema={validate}
                onSubmit={(values,{resetForm}) => {
                    Swal.fire({
                        title: 'Are you sure you want to save?',
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonText: "OK",
                        cancelButtonText: "Cancel",
                    }
                    ).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            var myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/json");
                            
                            var raw = JSON.stringify({
                              "CaseType": ("CaseType", values.caseType),
                              "ActionCategory": ("ActionCategory", values.actionCategory),
                              "ActionDetail": ("ActionDetail", values.actionDetail),
                              "Description":  ("Description", values.description),
                            });
                            
                            var requestOptions = {
                              method: 'POST',
                              headers: myHeaders,
                              body: raw,
                              redirect: 'follow'
                            };
                            fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE +'/CaseTypeRef/Add', requestOptions)
                        .then(response => response.text())
                        .then((result) =>{ 
                            debugger;
                            const data = JSON.parse(result);
                            console.log(data);
                            if (data.active =='Duplicate CaseTypeRef') {
                                // Swal.fire({
                                //     icon: 'error',
                                //     title: 'Oops...',
                                //     text : "Case Type Already Exists"
                                // })
                                toast.error("Case Type Already Exists");
                                    
                    
                            }else if (data.active='Y' ){
                                toast.success("Added Successfully");
                                //Swal.fire('Added Successfully', '', 'success')
                                resetForm();
                            }
                            // else
                            //     Swal.fire(' Cancelled', '', 'error')
                            }    
                        )
                        .catch(error => console.log('error', error));  
                            // fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE +'/CaseTypeRef/Add', requestOptions)
                            //   .then(response => response.text())
                            //   .then(result => console.log(result))
                            //   .catch(error => console.log('error', error));
                                
                            // Swal.fire('Added Successfully', '', 'success').then((result) => {
                            //     /* Read more about isConfirmed, isDenied below */
                            //     if (result.isConfirmed) {
                            //         resetForm();
                
                            //     } else
                            //         Swal.fire(' Cancelled', '', 'error')
                
                            // })

                        }

                    })
                    


                }}>

     
           { (formik) => (
            <div className="row" >
                <div className="col-md-10 col-lg-10">
                <section id="card">
                        <div className="well">
                            <h1>Create Case Type </h1>
                            <div className="inner-card">
                                <form className="ml-auto" method="post">
                                    <div style={{display:'flex'}}>
                                        <div >
                                            <label>Case Type <i style={{ color: "red"}}>*</i></label>
                                            <br />
                                            <input className={`${formik.errors.caseType}`} onChange={formik.handleChange('caseType')} onBlur={formik.handleBlur('caseType')} value={formik.values.caseType} type="text" placeholder="Case Type" style={{width: '28rem'}} />
                                            {/* <p style={{ color: "red",fontSize:13 , margin:'0px', marginTop:'5px' }}>{formik.errors.caseType}</p> */}

                                        </div>
                                        <div style={{marginLeft:'4rem'}} >
                                            <div style={{display:'flex'}}>
                                            <label>Action Category<i style={{ color: "red"}}>*</i></label>  
                                            {/* <p style={{ color: "black" , fontSize:12 , paddingTop:'5px' , marginLeft:'4rem'}}>{"N = None, I = Inspection, T = Technical Review"}</p>  */}
                                            </div>
                                            
                                        {/* <p style={{ color: "red",fontSize:13 , margin:'0px', marginTop:'5px' }}>{formik.errors.actionCategory}</p> */}
                                        </div>
                                    </div>
                                   <br/>
                                    <label>Action Details <i style={{ color: "red"}}>*</i></label>
                                    <br />
                                    <input className={`select_condition ${formik.errors.actionDetail}`} onChange={formik.handleChange('actionDetail')} onBlur={formik.handleBlur('actionDetail')} value={formik.values.actionDetail} type="text" placeholder="Action Details" style={{width: '60rem'}} />
                                    {/* <p style={{ color: "red",fontSize:13 , margin:'0px', marginTop:'5px' }}>{formik.errors.actionDetail}</p> */}

                                    <br/>
                                    <label className="discription" style={{marginTop: '2rem'}}>Description<i style={{ color: "red"}}>*</i> </label>
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
            </div>        
           )}
                  </Formik>
        </div>        
    )
}
export default CreateCaseType