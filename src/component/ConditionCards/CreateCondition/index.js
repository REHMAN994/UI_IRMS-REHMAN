import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from 'yup';
import { Formik, useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';


const CreateCondition = () => {
    let headers = new Headers();    
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic ');
    headers.append('Origin','http://localhost:3000');

   

    const validate = Yup.object({
        condition: Yup.string().required("empty-select"),
        // symbol: Yup.string().required("Please Select Symbol"),
        description: Yup.string().required("empty-select")
    });
    const initialValues = {
        condition: "",
        description: "",
    }

    
 const [symbol,setSymbol] = useState("");

    return(
        <div>
            <ToastContainer />
            <Formik initialValues={initialValues}
                validationSchema={validate}
                onSubmit={(values, { resetForm }) => {
                    console.log(values)
                    Swal.fire({
                        title: 'Are you sure you want to save?',
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonText: "OK",
                        cancelButtonText: "Cancel",
                        heightAuto: true
                    }
                    ).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            var myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/json");

                            var raw = JSON.stringify({
                                "ConditionValue": ("ConditionValue", values.condition),
                                "ConditionType": ("ConditionType", symbol),
                                "Description": ("Description", values.description)
                            });

                            var requestOptions = {
                                method: 'POST',
                                headers: myHeaders,
                                body: raw,
                                redirect: 'follow'
                            };
                            fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + '/ConditionRef/Add', requestOptions)
                                .then(response => response.text())
                                .then((result) => {
                                    debugger;
                                    const data = JSON.parse(result);
                                    console.log(data);
                                    if (data.active == 'Duplicate Condition Ref') {
                                        // Swal.fire({
                                        //     icon: 'error',
                                        //     title: 'Oops...',
                                        //     text : "Condition Reference Already Exists"
                                        // })
                                        toast.error("Condition Reference Already Exists");


                                    } else if (data.active = 'Y') {
                                        toast.success("Added Successfully");
                                        resetForm();
                                    }
                                }
                                )
                                .catch(error => console.log('error', error));

                            // fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + '/ConditionRef/Add', requestOptions)
                            //     .then(response => response.text())
                            //     .then(result => console.log(result))
                            //     .catch(error => console.log('error', error));

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
                {
                    (formik) => (
                        <div className="row" >
                            <div className="col-md-10 col-lg-10">
                                <section id="card">
                                    <div className="well">
                                        <h1>Create Condition </h1>
                                        <div className="inner-card">
                                            <form className="ml-auto" method="post">
                                                <div style={{ display: 'flex' }}>
                                                    <div >
                                                        <label>Condition <i style={{ color: "red" }}>*</i></label>
                                                        <br />
                                                        <select className={`select_condition ${formik.errors.condition}`} onChange={formik.handleChange('condition')} onBlur={formik.handleBlur('condition')} value={formik.values.condition} style={{ width: '28rem' }}>
                                                            <option value={""}>Select Condition</option>
                                                            <option value={"Equal To"}>{"Equal To"}</option>
                                                            <option value={"Not Equal To"}>{"Not Equal To"}</option>
                                                            <option value={"Greater Than"}>{"Greater Than"}</option>
                                                            <option value={"Less Than"}>{"Less Than"}</option>
                                                            <option value={"Greater Than Equal To"}>{"Greater Than Equal To"}</option>
                                                            <option value={"Less Than Equal To"}>{"Less Than Equal To"}</option>
                                                        </select>
                                                        {/* <p style={{ color: "red",fontSize:13 , margin:'0px', marginTop:'5px' }}>{formik.errors.condition}</p> */}
                                                    </div>
                                                    <div style={{ marginLeft: '4rem' }} >
                                                        <label>Symbol <i style={{ color: "red" }}>*</i></label>
                                                        <br />
                                                        {/* <input onChange={formik.handleChange('symbol')} onBlur={formik.handleBlur('symbol')} value={formik.values.symbol} type="text" placeholder="Symbol" style={{width: '28rem'}} /> */}
                                                        {/* <input disabled style={{width: '28rem'}}  value={ formik.values.condition == "Equal To" ? "=" : "" 
                                                   ||  formik.values.condition == "Not Equal To" ? setSymbol("=") || "=": ""
                                                   || formik.values.condition == "Greater Than" ? ">" : "" 
                                                   || formik.values.condition == "Less Than" ? "<" : "" 
                                                   || formik.values.condition == "Greater Than Equal To" ? ">=" : ""
                                                   || formik.values.condition == "Less Than Equal To" ? "<=" : "" }
                                                  
                                                   /> */}
                                                        <p>
                                                            {formik.values.condition == "Equal To" ? setSymbol("=") || "=" : ""
                                                            || formik.values.condition == "Not Equal To" ? setSymbol("!=") || "!=" : ""
                                                            || formik.values.condition == "Greater Than" ? setSymbol(">") || ">" : ""
                                                            || formik.values.condition == "Less Than" ? setSymbol("<") || "<" : ""
                                                            || formik.values.condition == "Greater Than Equal To" ? setSymbol(">=") || ">=" : ""
                                                            || formik.values.condition == "Less Than Equal To" ? setSymbol("<=") || "<=" : ""}
                                                        </p>
                                                    </div>
                                                </div>
                                                <br />
                                                <label className="discription" style={{ marginTop: '2rem' }}>Description <i style={{ color: "red" }}>*</i></label>
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
                    )}
            </Formik>

        </div>        
    )
}
export default CreateCondition