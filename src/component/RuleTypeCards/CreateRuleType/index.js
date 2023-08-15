import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from 'yup';
import { Formik, useFormik } from "formik"
import { ToastContainer, toast } from 'react-toastify';

const CreateRuleType = () => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic ');
    headers.append('Origin', 'http://localhost:3000');

    const [ruleType, setRuleType] = useState("");
    const [caseType, setCaseType] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
    }


    const validate = Yup.object({
        ruleType: Yup.string().required("empty-select"),
        caseType: Yup.string().required("empty-select"),
        description: Yup.string().required("empty-select")
    });
    const initialValues = {
        ruleType: "",
        caseType: "",
        description: "",
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
                            debugger;
                            var myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/json");

                            var raw = JSON.stringify({
                                "RuleType": ("RuleType", values.ruleType),
                                "CaseType": ("CaseType", values.caseType),
                                "Description": ("Description", values.description),
                            });

                            var requestOptions = {
                                method: 'POST',
                                headers: myHeaders,
                                body: raw,
                                redirect: 'follow'
                            };
                        fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + '/RuleTypeRef/Add', requestOptions)
                        .then(response => response.text())
                        .then((result) =>{ 
                            debugger;
                            const data = JSON.parse(result);
                            //console.log(data);
                            if (data.active =='Duplicate Rule Type') {
                                // Swal.fire({
                                //     icon: 'error',
                                //     title: 'Oops...',
                                //     text : "Rule Type Already Exists"
                                // })
                                toast.error("Rule Type Already Exists");
                                    
                    
                            }else if (data.active='Y' ){
                                //Swal.fire('Added Successfully', '', 'success')
                                toast.success("Added Successfully");
                                resetForm();
                                window.location.reload(true);
                            }
                            }    
                        )
                        .catch(error => console.log('error', error));   


                            // const res = fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + '/RuleTypeRef/Add', requestOptions)
                            //     .then(response => response.text())
                            //     .catch(error => console.log('error', error));
                            // console.log(res);
                            // Swal.fire('Added Successfully', '', 'success')
                            // .then((result) => {
                            //     debugger;
                            //     console.log(result);
                            //     if (result.isConfirmed) {
                            //         resetForm();
                            //        window.location.reload(true);
                
                            //     } else
                            //         Swal.fire(' Cancelled', '', 'error')
                
                            // })

                        } 

                    })


                }}>
                {
                    (formik) => (
                        <div className="row">
                            <div className="col-md-9 col-lg-9">
                                <section id="card">
                                    <div className="well">
                                        <h1>Create Rule Type </h1>
                                        <div className="inner-card">
                                            <form className="ml-auto" method="post">
                                                <div style={{ display: 'flex' }}>
                                                    <div>
                                                        <div style={{ display: 'flex' }}>
                                                            <label>Rule Type<i style={{ color: "red" }}>*</i></label>
                                                            {/* <p style={{ color: "black" , fontSize:12 , paddingTop:'5px' , marginLeft:'200px'}}>{"D = Deductive, I = Inductive"}</p>  */}
                                                        </div>
                                                        <select className={`select_condition ${formik.errors.ruleType}`} onChange={formik.handleChange('ruleType')} onBlur={formik.handleBlur('ruleType')} value={formik.values.ruleType}>
                                                            <option value={""}>Select Rule Type</option>
                                                            <option value={"Deductive"}>{"Deductive"}</option>
                                                            <option value={"Inductive"}>{"Inductive"}</option>
                                                        
                                                        </select>
                                                        {/* <p style={{ color: "red",fontSize:13 , margin:'0px', marginTop:'5px' }}>{formik.errors.ruleType}</p> */}
                                                    </div>
                                                    <div style={{ marginLeft: '4rem' }}>
                                                        <div style={{ display: 'flex' }}>
                                                            <label>Case Type<i style={{ color: "red" }}>*</i></label>
                                                            <p style={{ color: "black", fontSize: 12, marginLeft: '26px' }}>{"Y = Case Type is Required, N = Case Type is not Required"}</p>
                                                        </div>
                                                        <select className={`select_condition ${formik.errors.caseType}`} onChange={formik.handleChange('caseType')} onBlur={formik.handleBlur('caseType')} value={formik.values.caseType}>
                                                            <option value={""}>Select Case Type</option>
                                                            <option value={"Y"}>{"Y"}</option>
                                                            <option value={"N"}>{"N"}</option>
                                                        </select>
                                                        {/* <p style={{ color: "red",fontSize:13 , margin:'0px', marginTop:'5px' }}>{formik.errors.caseType}</p> */}
                                                    </div>
                                                </div>
                                                <label className="discription" style={{ marginTop: '2rem' }}>Description<i style={{ color: "red" }}>*</i> </label>
                                                <br />
                                                <textarea className={`select_condition ${formik.errors.description}`} onChange={formik.handleChange('description')} onBlur={formik.handleBlur('description')} value={formik.values.description} id="w3review" name="w3review" rows="4" type="text" placeholder=" Description here.." style={{ height: '5rem' }}></textarea>
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
                    )
                }
            </Formik>

        </div>
    )
}
export default CreateRuleType