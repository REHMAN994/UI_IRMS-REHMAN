import React, { useEffect, useState } from "react";
import axios from 'axios';
import Swal from "sweetalert2";
import { computeHeadingLevel } from "@testing-library/react";
import { number, string } from 'yup';
import { useField } from "formik";
import { ToastContainer, toast } from 'react-toastify';


const MaintainDocFiled = () => {
    const [fSeqNo, setfSeqNo] = useState([]);


    const [doctype, setDocType] = useState([]);
    const [docField, setDocField] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [editeddata, setEditedData] = useState(null);
    const [edittoggle, setEditToggle] = useState(false);
    const [todo, setTodo] = useState([]);
    const [disable, setDisbale] = useState(true);
    const [validfieldName, setvalidfieldName] = useState(false);
    const [validsizeOfField, setvalidsizeOfField] = useState(false);
    const [validtypeField, setvalidtypeField] = useState(false);
    const [validsystemRef, setvalidsystemRef] = useState(false);
    const [DocId, setDocId] = useState("");
    const [systemToggle, setsystemToggle] = useState(true);

    const [input, setInput] = useState(
        {
            id:"",
            fieldName: "",
            typeField: "",
            sizeOfField: "",
            processType:"",
            systemRef: "",
            seqNo:""
        }
    )

    useEffect(() => {
        const getDocType = async () => {
            await axios.get(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + '/DocumentType/GetAll').then((res) => {
                setDocType(res.data);

            }
            ).catch((err) => console.log(err))
        }
        getDocType();
    }, [])

    const handleDocType = async (e) => {
        const id = e.target.value;
        if (id == "") {
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Oops...',
            //     text: 'Please Select Doc Type!'
            // }).then((result) => {
            //     if (result.isConfirmed) {
            //         window.location.reload(true);
            //     }
            // })
            toast.error("Please Select Doc Type");
            window.location.reload(true);
        } else {
            await axios.get(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + `/DocumentType/GetByIdWithDocumentField?id=${id}`).then((res) => {

                setDocField(res.data);
                setTodo(res.data.documentFields);
                setDocId(id);
                setInput({ ...input, ["seqNo"]: res.data.fSeqNo });
                setfSeqNo(res.data.fSeqNo);
                setsystemToggle(res.data.processType == "Normal" ? false : true)
            }

            ).catch((err) => console.log(err));
            

            setIsDataLoaded(true);

        }
    }
    const [afteredit, setafteredit] = useState(true)

    


    const handleCange = (e) => {
        const value = e.target.value;
        setInput({ ...input, [e.target.name]: value });
        setDisbale(false);
        setvalidfieldName(string().required().isValidSync(input.fieldName));
        setvalidsizeOfField(number().required().isValidSync(input.sizeOfField));
        setvalidtypeField(string().required().isValidSync(input.typeField));
        if (value == "Normal") {
            setvalidsystemRef(true);
            setafteredit(true);
        }else if(e.target.name == "seqNo"){
            setvalidsystemRef(true);
            setafteredit(true);
        }
         else {
            setvalidsystemRef(string().required().isValidSync(input.systemRef));
            setafteredit(true);
        } 
    }


    const addTodo = async (e) => {
        e.preventDefault()


        if (!input) {
        } else if (edittoggle) {
            Swal.fire({
                title: 'Are you sure you want to Update?',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "Cancel",
            }
            ).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    
                    var raw = JSON.stringify({
                      "id": input.id,
                      "documentTypeId": DocId,
                      "fieldName":  input.fieldName,
                      "typeField":  input.typeField,
                      "sizeOfField":input.sizeOfField,
                      "processType":  input.processType,
                      "systemRef": input.systemRef,
                      "seqNo": input.seqNo
                    });
                    
                    var requestOptions = {
                      method: 'PUT',
                      headers: myHeaders,
                      body: raw,
                      redirect: 'follow'
                    };
                    
                    fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE+"/DocumentField/Update", requestOptions)
                      .then(response => response.text())
                      .then(result => console.log(result))
                      .catch(error => console.log('error', error));
                      
                    setTodo(
                        todo.map((e) => {
                            
                      debugger;
                            if (e.fieldName === editeddata) {

                                return {
                                    ...e,
                                    fieldName: input.fieldName,
                                    typeField: input.typeField,
                                    sizeOfField: input.sizeOfField,
                                    processType : input.processType,
                                    systemRef: input.systemRef,
                                    seqNo : input.seqNo
                                }

                            }
                            return e;
                        })
                    )
                    setEditToggle(false);
                    toast.success("Updated Successfully");
                    setInput({
                        id:"",
                        fieldName: "",
                        typeField: "",
                        sizeOfField: "",
                        processType:"",
                        systemRef: "",
                        seqNo:fSeqNo,
                    });
                    setafteredit(false);
                    setDisbale(true);
                    setIsSaved(true);

                } 

            })





        } else {
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
                        "documentTypeId": DocId,
                        "fieldName": input.fieldName,
                        "typeField": input.typeField,
                        "sizeOfField": input.sizeOfField,
                        "systemRef": input.systemRef,
                        "processType": input.processType,
                        "seqNo": input.seqNo
                    });

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };
                    fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE +"/DocumentField/Add", requestOptions)
                        .then(response => response.text())
                        .then((result) =>{ 
                            const data = JSON.parse(result);
                            if(data.id==undefined){
                                // Swal.fire({
                                //     icon: 'error',
                                //     title: 'Oops...',
                                //     text : "Field Name Already Exists"
                                // })
                                toast.error("Field Name Already Exists");
                                setDisbale(false);
                                setvalidfieldName(true);
                                setvalidsizeOfField(true);
                                setvalidtypeField(true);
                                setvalidsystemRef(true);
                                setIsSaved(false);
                            }else{
                            setTodo([...todo, 
                                {
                                    id : data.id,
                                    fieldName: data.fieldName,
                                    sizeOfField: data.sizeOfField,
                                    typeField: data.typeField,
                                    processType: data.processType,
                                    systemRef: data.systemRef,
                                    seqNo : data.seqNo
                                }
                            ]);
                            toast.success("Added Successfully");
                            setInput({
                                id:"",
                                fieldName: "",
                                typeField: "",
                                sizeOfField: "",
                                processType: "",
                                systemRef: "",
                                seqNo:data.seqNo +10    
                            });
                            setDisbale(true);
                            setvalidfieldName(false);
                            setvalidsizeOfField(false);
                            setvalidtypeField(false);
                            setvalidsystemRef(false);
                            setIsSaved(true);
                            }
                            
                        })
                        .catch(error => console.log('error', error));                    
                   
                    

                } 

            })


        }


    }

    const handleDelete = () => {

    }


    const [isSaved, setIsSaved] = useState(false);

    const handleEdit = (id) => {
        console.log(id);
        setDisbale(false);
        setEditToggle(true);
        const newEditedTodo = todo.find((e) => { return e.fieldName === id });
        setInput({
            id: newEditedTodo.id,
            fieldName: newEditedTodo.fieldName,
            typeField: newEditedTodo.typeField,
            sizeOfField: newEditedTodo.sizeOfField,
            processType : newEditedTodo.processType,
            systemRef: newEditedTodo.systemRef,
            seqNo : newEditedTodo.seqNo
        });
        setEditedData(id);
        setvalidfieldName(true);
        setvalidsizeOfField(true);
        setvalidtypeField(true);
        setvalidsystemRef(true);


    }
    const updatehandle = (data) => {
        if (data == '') {
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Oops...',
            //     text: 'Please Fill all the Fields!'
            // })
            toast.error("Please Fill all the Fields!");
        }
        else {
            Swal.fire({
                title: 'Are you sure you want to Update?',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "Cancel",
                icon: 'warning'
            }
            ).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    var raw = JSON.stringify(data);

                    var requestOptions = {
                        method: 'PUT',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + '/DocumentField/UpdateRangeWithDoucmentType', requestOptions)
                        .then(response => response.text())
                        .then(result => console.log(result))
                        .catch(error => console.log('error', error));
                    Swal.fire('Updated Successfully', '', 'success');

                 window.location.reload(true);
                  

                  



                } else
                    Swal.fire(' Cancelled', '', 'error')

            })
        }
    }

    const deletehandle = async (id, i) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                if (id != null) {
                    axios.delete(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + `/DocumentField/Remove?id=${id}`)
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err))
                }

                const newTodo = todo.filter((e) => e.id !== id);
                setTodo(newTodo);

                // Swal.fire(
                //     'Deleted!',
                //     'Your file has been deleted.',
                //     'success'
                // )
                toast.success("Deleted Successfully");
                
            }
        })



    }

    const handleEntailmentRequest = () => {
        // if (isSaved) {
        //     Swal.fire({
        //         title: 'Oops...',
        //         showConfirmButton: true,
        //         showCancelButton: true,
        //         confirmButtonText: "OK",
        //         cancelButtonText: "Cancel",
        //         icon: 'warning',
        //         text: 'Please First CLick on Update, Otherwise data may have been lost! If you still want to continue Please Click Ok'
        //     }).then((result) => {
        //         /* Read more about isConfirmed, isDenied below */
        //         if (result.isConfirmed) {
                    
        //            window.location.reload(true);

        //         } else
        //             Swal.fire(' Cancelled', '', 'error')

        //     })

        // } else {
        //    window.location.reload(true);
        // }
        window.location.reload(true);
       


    }

    // if(isSaved){
    //     window.addEventListener("beforeunload", (ev) => {
    //         ev.preventDefault();
    //         return ev.returnValue = 'Are you sure you want to close?';
    //     });
    // }

    const refreshBckBtn = (e) => {
        setInput({
            id:"",
            fieldName: "",
            typeField: "",
            sizeOfField: "",
            systemRef: "",
            seqNo: fSeqNo
        });
        setEditToggle(false);
    }

    // function EventHandle() {
    //     window.addEventListener("beforeunload"),(ev) =>{
    //         ev.preventDefault();
    //         return ev.returnValue = 'Are you sure you want to close?';
    //     }
    // }

    // window.addEventListener("beforeunload", (ev) => {
    //     ev.preventDefault();
    //     return ev.returnValue = 'Are you sure you want to close?';
    // });
    return (
        <div>
              <ToastContainer />
            <div className="row" >
                <div className="col-md-10 col-lg-10 col-xl-10">
                    <section id="card">
                        <div className="well">
                            <h1 style={{ marginTop: '0rem' }}>Documents Fields</h1>
                            <form className="ml-auto" >
                                <div style={{ display: 'flex' }}>
                                    <div>
                                        <div style={{ display: 'flex' }}>
                                            <label>Document Type</label>
                                            <select style={{ width: '8rem', marginLeft: '1rem' }} className="dropdown_value" onChange={handleDocType}>
                                                <option value="">Select Doc Type</option>
                                                {
                                                    doctype.map((doc) => (
                                                        <option value={doc.id}>{doc.documentType1}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        
                                        <div style={{ display: 'flex' }}>
                                            <label >Agency Code</label>
                                            <p>{docField.agencyName}</p>
                                        </div>


                                    </div>
                                    <div style={{ marginLeft: '4rem' }}>
                                        
                                        <div style={{ display: 'flex' }}>
                                            <label >Transport Mode</label>
                                            <p>{docField.transportMode}</p>
                                        </div>
                                        
                                        <div style={{ display: 'flex' }}>
                                            <label >Movement Type</label>
                                            <p>{docField.movementType}</p>
                                        </div>

                                    </div>
                                    <div style={{  marginLeft: '4rem' }}>
                                        <div style={{ display: 'flex' }}>
                                            <label>Description</label>
                                            <p>{docField.description}</p>
                                        </div>
                                        
                                        <div style={{ display: 'flex' }}>
                                            <label >Agency Name</label>
                                            <p>{docField.agencyCode}</p>
                                        </div>
                                    </div>

                                </div>


                            </form>

                        </div>
                    </section>
                    <section id="card">
                        <div className="well">
                            <h1 style={{ marginTop: '0rem' }}>Maintain Document Fields </h1>

                            <table className="table table-striped" style={{ marginTop: '20px' }}>

                                <thead className="thead-dark">
                                    <tr>
                                    <th scope="col">Seq No</th>
                                        <th scope="col">Field Name</th>
                                        <th scope="col">Field Type </th>
                                        <th scope="col">Field Size</th>
                                        <th scope="col">Process Type</th>
                                        {systemToggle ? <th scope="col">System Ref </th> : <></>}
                                        <th scope="col" style={{ width: '197px' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        isDataLoaded ? todo.map((field, index) => (
                                            <tr>
                                                {/* <th scope="row">{index + 1}</th> */}
                                                <td>{field.seqNo}</td>
                                                <td>{field.fieldName}</td>
                                                <td>{field.typeField}</td>
                                                <td>{field.sizeOfField}</td>
                                                <td>{field.processType}</td>
                                                {systemToggle ? <td>{field.systemRef}</td> : <></>}
                                                <td><button onClick={() => handleEdit(field.fieldName)} data-toggle="modal" data-target="#myModal" style={{ border: 'none' }}><i className="fas fa-edit"></i></button>
                                                    <i onClick={() => deletehandle(field.id, index)} class="fa fa-trash ml-4" aria-hidden="true"></i>
                                                </td>
                                            </tr>

                                        )) : <tr></tr>
                                    }

                                </tbody>
                            </table>
                            <hr style={{ border: '1px solid #2d3f61' }} />
                            <h1>Add New Field</h1>
                            <div style={{ display: 'flex', flexwrap: 'initial' }}>
                            <div style={{ width: '10rem' }} >
                                    <input  value={input.seqNo} name="seqNo" onChange={handleCange} type="text" placeholder="Seq No" style={{ width: '100%' }} />
                                    {/* <p style={{ fontSize: '15px', color: 'red' }}>{validfieldName ? "" : "Required"}</p> */}
                                </div >
                                <div style={{ width: '10rem', marginLeft: '2.5rem' }} >
                                    <input className={validfieldName ? "" : "empty-select"} value={input.fieldName} name="fieldName" onChange={handleCange} type="text" placeholder="Field Name" style={{ width: '100%' }} />
                                    {/* <p style={{ fontSize: '15px', color: 'red' }}>{validfieldName ? "" : "Required"}</p> */}
                                </div >
                                <div style={{ width: '10rem', marginLeft: '2.5rem' }}>
                                    {/* <input className={validtypeField ? "" : "empty-select"} value={input.typeField} name="typeField" onChange={handleCange} type="text" placeholder="Field Type" style={{ width: '100%' }} /> */}
                                    {/* <p style={{ fontSize: '15px', color: 'red' }}>{validtypeField ? "" : "Required"}</p> */}
                                    <select className={`select_condition ${validtypeField ? "" : "empty-select"}`} value={input.typeField} name="typeField" onChange={handleCange} style={{ width: '100%' }} >
                                                        <option value={""}>Select Field Type</option>
                                                            <option value={"Numeric"}>{"Numeric"}</option>
                                                            <option value={"Alpha Numeric"}>{"Alpha Numeric"}</option>
                                                            <option value={"Date/Time"}>{"Date/Time"}</option>
                                                            <option value={"Amount"}>{"Amount"}</option>
                                                            <option value={"Boolean"}>{"Boolean"}</option>
                                    </select>
                                </div>
                                <div style={{ width: '10rem', marginLeft: '2.5rem' }}>
                                    <input className={validsizeOfField ? "" : "empty-select"} value={input.sizeOfField} name="sizeOfField" onChange={handleCange} type="text" placeholder="Field Size" style={{ width: '100%' }} />
                                    <p style={{ marginLeft: '5px', fontSize: '12px', color: 'red' }}>{validsizeOfField ? "" : "Required 0 to 99"}</p>
                                </div>
                                <div style={{ width: '10rem', marginLeft: '2.5rem' }}>
                                    {/* <input className={validtypeField ? "" : "empty-select"} value={input.typeField} name="typeField" onChange={handleCange} type="text" placeholder="Field Type" style={{ width: '100%' }} /> */}
                                    {/* <p style={{ fontSize: '15px', color: 'red' }}>{validtypeField ? "" : "Required"}</p> */}
                                    <select className={`select_condition ${validtypeField ? "" : "empty-select"}`} value={input.processType} name="processType" onChange={handleCange} style={{ width: '100%' }} >
                                                        <option value={""}>Select Process</option>
                                                        <option value={"Normal"}>{"Normal"}</option>
                                                        <option value={"System"}>{"System"}</option>
                                    </select>
                                </div>
                                {
                                    systemToggle ? (<>
                                        <div style={{ width: '10rem', marginLeft: '2.5rem' }}>
                                            <input className={validsystemRef ? "" : "empty-select"} value={input.systemRef} name="systemRef" onChange={handleCange} type="text" placeholder="System Ref" style={{ width: '100%' }} />
                                            {/* <p style={{ fontSize: '15px', color: 'red' }}>{validsystemRef ? "" : "Required"}</p> */}
                                        </div>
                                    </>) : (<></>)
                                }
                                <button disabled={validfieldName && validsizeOfField  && validtypeField && afteredit ? false : true} onClick={(e) => addTodo(e)} type="button" className="btn btn-md" style={{
                                    backgroundColor: '#ECF7F2',
                                    color: '#03995D',
                                    borderColor: '#03995D',
                                    fontWeight: '600',
                                    marginLeft: '3rem',
                                    width: '8rem',
                                    height: '2.8rem'

                                }}>
                                    <i class="fa fa-plus mr-1" aria-hidden="true"></i> Add Field </button>
                            </div>
                            <div className="button">
                            <button onClick={handleEntailmentRequest} type="button" className="btn btn-md  btn-back">Cancel</button>
                                {/* <button onClick={() => updatehandle(todo)} type="button" className="btn  btn-md btn-save" style={{ marginRight: '14px' }}>Save</button> */}
                                

                            </div>

                        </div>


                    </section>
                </div>
            </div>
            <div className="modal fade" id="myModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="row" >
                            <div className="col-md-10 col-lg-10">
                                <section id="card">
                                    <div className="well" style={{ width: '44rem' }} >
                                        <h1> Update Document Fields</h1>
                                        <table className="table table-striped" style={{ marginTop: "1rem" }}>
                                            <thead className="thead-dark">
                                                <tr>
                                                <th scope="col">Seq No</th>
                                                    <th scope="col">Field Name</th>
                                                    <th scope="col">Field Type </th>
                                                    <th scope="col">Field Size</th>
                                                    <th scope="col">Proc.Type</th>
                                                    {systemToggle ? <th scope="col">System Ref </th> : <></>}

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <input value={input.seqNo} name="seqNo" onChange={handleCange} type="text" placeholder="Seq No" style={{ width: '5rem', marginBottom: '13px' }} />
              
                                                    </td>
                                                    <td>
                                                        <input value={input.fieldName} name="fieldName" onChange={handleCange} type="text" placeholder="Field Name" style={{ width: '5rem' }} />
                                                        <br /><p>{validfieldName ? "" : "Required"}</p>
                                                    </td>


                                                    <td>
                                                        {/* <input value={input.typeField} name="typeField" onChange={handleCange} type="text" placeholder="Field Type" style={{ width: '7rem', marginLeft: '3rem' }} /> */}
                                                        <select className={`select_condition ${validtypeField ? "" : "empty-select"}`} value={input.typeField} name="typeField" onChange={handleCange} style={{ width: '5rem', marginLeft: 'auto' }} >
                                                            <option value={""}>Select Field Type</option>
                                                            <option value={"Numeric"}>{"Numeric"}</option>
                                                            <option value={"Alpha Numeric"}>{"Alpha Numeric"}</option>
                                                            <option value={"Date/Time"}>{"Date/Time"}</option>
                                                            <option value={"Amount"}>{"Amount"}</option>
                                                            <option value={"Boolean"}>{"Boolean"}</option>
                                                        </select>
                                                        <br /><p>{validtypeField ? "" : "Required"}</p>
                                                    </td>


                                                    <td>
                                                        <input value={input.sizeOfField} name="sizeOfField" onChange={handleCange} type="text" placeholder="Field Size" style={{ width: '7rem' ,marginLeft: 'auto',    marginBottom: '12px'}} />
                                                        {/* <br /><p>{validsizeOfField ? "" : "Required"}</p> */}
                                                    </td>

                                                    <td>
                                                        {/* <input value={input.typeField} name="typeField" onChange={handleCange} type="text" placeholder="Field Type" style={{ width: '7rem', marginLeft: '3rem' }} /> */}
                                                        <select className={`select_condition ${validtypeField ? "" : "empty-select"}`} value={input.processType} name="processType" onChange={handleCange} style={{ width: '5rem', marginLeft: 'auto' }} >
                                                            <option value={""}>Process Type</option>
                                                            <option value={"Normal"}>{"Normal"}</option>
                                                            <option value={"System"}>{"System"}</option>
                                                        </select>
                                                        <br /><p>{validtypeField ? "" : "Required"}</p>
                                                    </td>
                                                    {
                                                        systemToggle ? (<>
                                                            <td>
                                                                <input value={input.systemRef} name="systemRef" onChange={handleCange} type="text" placeholder="System Ref" style={{ width: '5rem', marginLeft: 'auto',    marginBottom: '12px' }} />
                                                                {/* <br /><p>{validsystemRef ? "" : "Required"}</p> */}
                                                            </td>
                                                        </>) : (<></>)
                                                    }
                                                </tr>

                                            </tbody>
                                        </table>
                                        {/* <hr style={{ border: '1px solid #2d3f61' }} />

                                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>

                                            <input value={input.fieldName} name="fieldName" onChange={handleCange} type="text" placeholder="Field Name" style={{ width: '7rem' }} />
                                            <br /><p>{validfieldName ? "" : "Required"}</p>
                                            <input value={input.typeField} name="typeField" onChange={handleCange} type="text" placeholder="Field Type" style={{ width: '7rem', marginLeft: '3rem' }} />
                                            <br /><p>{validtypeField ? "" : "Required"}</p>
                                            <input value={input.sizeOfField} name="sizeOfField" onChange={handleCange} type="text" placeholder="Field Size" style={{ width: '7rem', marginLeft: '3rem' }} />
                                            <br /><p>{validsizeOfField ? "" : "Required"}</p>
                                            {
                                                systemToggle ? (<>
                                                    <input value={input.systemRef} name="systemRef" onChange={handleCange} type="text" placeholder="System Ref" style={{ width: '7rem', marginLeft: '3rem' }} />
                                                    <br /><p>{validsystemRef ? "" : "Required"}</p>
                                                </>) : (<></>)
                                            }

                                        </div> */}
                                        <div className="button">
                                            <button disabled={validfieldName && validsizeOfField && validtypeField ? false : true} data-dismiss="modal" onClick={(e) => addTodo(e)} type="button" className="btn  btn-md btn-save">Update</button>
                                            <button onClick={refreshBckBtn} data-dismiss="modal" type="button" className="btn btn-md  btn-back">Cancel</button>

                                        </div>
                                    </div>
                                </section>

                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </div>

    )
}
export default MaintainDocFiled