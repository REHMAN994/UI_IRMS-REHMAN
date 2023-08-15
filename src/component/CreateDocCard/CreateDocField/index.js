import React, { useState, useEffect } from "react";
import axios from 'axios'
import Swal from "sweetalert2";
import { number, string } from 'yup';
import { data } from "jquery";
import { ToastContainer, toast } from 'react-toastify';



const CreatDocField = () => {
    const [fSeqNo, setfSeqNo] = useState([]);


    const [count, setcount] = useState(10);
    const [nocount, setnocount] = useState(1);
    const [afteredit, setafteredit] = useState(true)
    const [agencyName, setagencyName] = useState("");
    const [apidata, setApiData] = useState([]);

    useEffect(() => {
        const getdata = async () => {
            await axios.get(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + '/AgencyRef/GetAll')
                .then((res) => setApiData(res.data)).catch((err) => console.log(err))
        }
        getdata();
        const getdocType = async () => {
            await axios.get(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + '/DocumentType/GetAll').then((res) => setDocumentType(res.data)).catch((err) => console.log(err))
        }
        getdocType();
    }, [])

    const [input, setInput] = useState(
        {
            FieldName: "",
            SizeOfField: "",
            TypeField: "",
            ProcessType: "",
            SystemRef: "",
            SeqNo:""
        }
    )
    const [documetType, setDocumentType] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [todo, setTodo] = useState([]);
    const [editeddata, setEditedData] = useState(null);
    const [edittoggle, setEditToggle] = useState(false);
    const [movementType, setmovementType] = useState("");
    const [transportMode, settransportMode] = useState("");
    const [DocId, setDocId] = useState("");
    const [validFieldName, setvalidFieldName] = useState(false);
    const [validSizeOfField, setvalidSizeOfField] = useState(false);
    const [validTypeField, setvalidTypeField] = useState(false);
    const [validSystemRef, setvalidSystemRef] = useState(false);
    const [validProcessType, setvalidProcessType] = useState(false);



    const handleCange = (e) => {
        debugger;
        const value = e.target.value;
        setInput({ ...input, [e.target.name]: value });
        setvalidFieldName(string().required().isValidSync(input.FieldName));
        setvalidSizeOfField(number().required().isValidSync(input.SizeOfField));
        setvalidTypeField(string().required().isValidSync(input.TypeField));
        setvalidProcessType(string().required().isValidSync(input.ProcessType));
        // selectedData.processType == "N" ? ("") : setvalidSystemRef(string().required().isValidSync(input.SystemRef));
        if (value == "Normal") {
            setvalidSystemRef(true);
            setafteredit(true);
            setvalidProcessType(true);
        }else if(e.target.name == "seqNo"){
            setvalidSystemRef(true);
            setafteredit(true);
            setvalidProcessType(true);
        } 
        else {
            setvalidSystemRef(string().required().isValidSync(input.SystemRef));
            setafteredit(true);
            setvalidProcessType(false);
        }


    }
    const addTodo = (e) => {
        e.preventDefault()

        if (!input) {
            console.log("addtodo")
        } else if (edittoggle) {
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
                      "id": input.id,
                      "documentTypeId": DocId,
                      "fieldName":  input.FieldName,
                      "typeField":  input.TypeField,
                      "sizeOfField":input.SizeOfField,
                      "processType":  input.ProcessType,
                      "systemRef": input.SystemRef,
                      "seqNo": input.SeqNo
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
                        todo.map((e, i) => {
                            if (i === editeddata) {
                                return {
                                    ...e,
                                    FieldName: input.FieldName,
                                    SizeOfField: input.SizeOfField,
                                    TypeField: input.TypeField,
                                    ProcessType: input.ProcessType,
                                    SystemRef: input.SystemRef,
                                    SeqNo : input.SeqNo
                                }
                                
                            }
                            return e;
                          
                        })
                    )
                    setafteredit(false);
                    setEditToggle(false);
                    toast.success("Updated Successfully");
                    setInput({
                        FieldName: "",
                        SizeOfField: "",
                        TypeField: "",
                        ProcessType: "",
                        SystemRef: "",
                        SeqNo:fSeqNo
                    });
                } else
                toast.error("Cancelled");

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
                console.log(input);

                if (result.isConfirmed) {
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    var raw = JSON.stringify({
                        "documentTypeId": DocId,
                        "fieldName": input.FieldName,
                        "typeField": input.TypeField,
                        "sizeOfField": input.SizeOfField,
                        "systemRef": input.SystemRef,
                        "processType": input.ProcessType,
                        "seqNo": input.SeqNo
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
                                setvalidFieldName(true);
                                setvalidSizeOfField(true);
                                setvalidTypeField(true);
                                setvalidSystemRef(true);
                                setvalidProcessType(true);
                            }else{
                            setTodo([...todo, 
                                {
                                    id : data.id,
                                    FieldName: data.fieldName,
                                    SizeOfField: data.sizeOfField,
                                    TypeField: data.typeField,
                                    ProcessType: data.processType,
                                    SystemRef: data.systemRef,
                                    SeqNo : data.seqNo
                                }
                            ]);
                            setInput({
                                FieldName: "",
                                SizeOfField: "",
                                TypeField: "",
                                ProcessType: "",
                                SystemRef: "",
                                SeqNo:data.seqNo + 10
                            });
                            setfSeqNo(data.seqNo + 10);
                            setvalidFieldName(false);
                            setvalidSizeOfField(false);
                            setvalidTypeField(false);
                            setvalidSystemRef(false);
                            setvalidProcessType(false);
                            toast.success("Added Successfully");
                            }
                            
                        })
                        .catch(error => console.log('error', error));                    
                   
                    
                } else
                    toast.error("Cancelled");

            })



        }


    }
    const handleDelete = (id, deleteId) => {
        debugger;
        console.log(deleteId);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const newTodo = todo.filter((todo, i) => i !== id);
                setTodo(newTodo);
                axios
                .delete(
                  process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE +
                  `/DocumentField/Remove?id=${deleteId}`
                )
                .then((res) => {
                  console.log(res.data);
                })
                .catch((err) => console.log(err));
                
                // Swal.fire(
                //     'Deleted!',
                //     'Your file has been deleted.',
                //     'success'
                // )
                toast.success("Your file has been deleted");
            }
        })

    }
    const handleDocType = async (e) => {
        const value = e.target.value;
        if (value == "") {
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Oops...',
            //     text: 'Please Select Doc Type!'
            // }).then((result) => {
            //     if (result.isConfirmed) {
            //         window.location.reload(true);
            //     }
            // })
            toast.error("Please Select Doc Type!");
            window.location.reload(true);

        } else {
            debugger;
            await axios.get(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + `/DocumentType/GetByIdWithAgencyRef?id=${value}`).then((res) => {
                setSelectedData(res.data);
                console.log(res.data.fSeqNo);
                setInput({ ...input, ["SeqNo"]: res.data.fSeqNo });
                setfSeqNo(res.data.fSeqNo);
            }).catch((err) => console.log(err))
            setTodo([]);
        }
        setDocId(value);
        
      
    }
    const handleEdit = (id) => {
        setEditToggle(true);
        const newEditedTodo = todo.find((e, i) => { return i === id });
        setInput({
            id: newEditedTodo.id,
            FieldName: newEditedTodo.FieldName,
            SizeOfField: newEditedTodo.SizeOfField,
            TypeField: newEditedTodo.TypeField,
            ProcessType: newEditedTodo.ProcessType,
            SystemRef: newEditedTodo.SystemRef,
            SeqNo : newEditedTodo.SeqNo
        });
        setEditedData(id);

    }

    const selecthandle = (e) => {
        setagencyName(e.target.value);
    }

    const Savehandle = (data) => {
        debugger;
        if (data == '') {
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Oops...',
            //     text: 'Please Select Fields First!'
            // })
            toast.error("Please Select Fields First!");
        }
        else {
            data.forEach((e, i) => {
                e.DocumentTypeId = DocId;
            });
            const ids = data.map((id) => { return id.id });
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

                    var raw = JSON.stringify(data);

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + '/DocumentField/AddRangeWithDoucmentType', requestOptions)
                        .then(response => response.text())
                        .then(result => console.log(result))
                        .catch(error => console.log('error', error));
                        toast.success("Added Successfully");
                        window.location.reload(true);
                    // Swal.fire('Added Successfully', '', 'success').then((result) => {
                    //     /* Read more about isConfirmed, isDenied below */
                    //     if (result.isConfirmed) {
                    //         window.location.reload(true);

                    //     } else
                    //     toast.error("Cancelled");

                    // })

                }

            })
        }
    }
    const handleEntailmentRequest = (e) => {
        // if (todo != '') {
        //     Swal.fire({
        //         title: 'Oops...',
        //         showConfirmButton: true,
        //         showCancelButton: true,
        //         confirmButtonText: "OK",
        //         cancelButtonText: "Cancel",
        //         icon: 'warning',
        //         text: 'Please First CLick on Save, Otherwise data may have been lost! If you still want to continue Please Click Ok'
        //     }).then((result) => {
        //         if (result.isConfirmed) {
        //             e.preventDefault();
        //             window.location.reload(true);
        //         }
        //     })
        // }
        // else {
        //     e.preventDefault();
        //     window.location.reload(true);
        // }
        e.preventDefault();
        window.location.reload(true);

    }

    const refreshBckBtn = (e) => {
        setInput({
            FieldName: "",
            SizeOfField: "",
            TypeField: "",
            ProcessType: "",
            SystemRef: "",
            SeqNo: fSeqNo,
        });
    }
    // window.addEventListener("beforeunload", (ev) => {
    //     if (todo != '') {
    //         ev.preventDefault();
    //         return ev.returnValue = 'Are you sure you want to close?';
    //     }
    // });
    return (
        <div>
             <ToastContainer />
            <div className="row" >
                <div className="col-md-10 col-lg-10">
                    <section id="card">


                        <div className="well" >
                            <h1 > Create Document Details </h1>
                            <form className="ml-auto" >
                                <div style={{ display: 'flex' }}>
                                    <div >
                                        <div style={{ display: 'flex' }}>
                                            <label>Document Type</label>
                                            <select style={{ width: '8rem', marginLeft: '1rem' }} className="dropdown_value" onChange={handleDocType}>
                                                <option value="">Select Doc Type </option>
                                                {
                                                    documetType.map((doc) => (
                                                        <option value={doc.id}>{doc.documentType1}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>


                                        <div style={{ display: 'flex' }}>
                                            <label>Agency Code </label>
                                            <p>{selectedData.agencyName}</p>
                                        </div>



                                    </div>

                                    <div style={{ marginLeft: '3rem' }}>
                                        {/* <div style={{ display: 'flex' }}>
                                            <label>Process Type</label>
                                            <p >{selectedData.processType}</p>
                                        </div> */}


                                        <div style={{ display: 'flex' }}>
                                            <label>Transport Mode</label>
                                            <p >{selectedData.transportMode}</p>
                                        </div>


                                        <div style={{ display: 'flex' }}>
                                            <label>Movement Type</label>
                                            <p >{selectedData.movementType}</p>
                                        </div>

                                    </div>
                                    <div style={{ marginLeft: '3rem' }}>
                                        <div style={{ display: 'flex' }}>
                                            <label>Agency Name </label>
                                            <p >{selectedData.agencyCode}</p>
                                        </div>
                                        
                                        <div style={{ display: 'flex' }}>
                                            <label>Description</label>
                                            <p >{selectedData.description}</p>
                                        </div>

                                    </div>
                                </div>


                            </form>
                        </div>

                        <div className="well">
                            <h1 > Create Document Fields Table </h1>
                            <table className="table table-striped" style={{ marginTop: "1rem" }}>
                                <thead className="thead-dark">
                                    <tr>
                                        <th hidden="true" scope="col">doc id</th>
                                        <th scope="col">Seq No</th>
                                        <th scope="col">Field Name</th>
                                        <th scope="col">Field Type</th>
                                        <th scope="col">Field Size</th>
                                        <th scope="col">Process Type</th>
                                        {/* <th hidden={input.ProcessType == "Normal" ? true : false} scope="col">System Reference</th> */}
                                        <th scope="col">System Reference</th>
                                        <th scope="col">Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        todo.map((e, i) => (
                                            <tr key={i} >

                                                <td hidden="true">{DocId}</td>
                                                <td>{e.SeqNo}</td>
                                                <td>{e.FieldName}</td>
                                                <td>{e.TypeField}</td>
                                                <td>{e.SizeOfField}</td>
                                                <td>{e.ProcessType}</td>
                                                {/* <td hidden={input.ProcessType == "Normal" ? true : false}>{e.SystemRef}</td> */}
                                                <td >{e.SystemRef}</td>
                                                <td><button onClick={() => handleEdit(i)} data-toggle="modal" data-target="#myModal" style={{ border: 'none' }}><i className="fas fa-edit"></i></button>
                                                    <i onClick={() => handleDelete(i,e.id)} class="fa fa-trash ml-4" aria-hidden="true"></i></td>


                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                            <hr style={{ border: '1px solid #2d3f61' }} />
                            <h1>Add New Field</h1>
                            <div style={{ display: 'flex', flexWrap: 'initial' }}>
                            <div style={{ width: '7rem' }} >
                                    <input value={input.SeqNo} name="SeqNo" onChange={handleCange} type="text" placeholder="Seq No" style={{ width: '7rem' }} />
                                    {/*<p style={{ fontSize: '15px', color: 'red', marginLeft: '0rem' }}>{validFieldName ? "" : "Required"}</p> */}
                                </div >
                                <div style={{ width: '7rem', marginLeft: 'auto'}} >
                                    <input className={validFieldName ? "" : "empty-select"} value={input.FieldName} name="FieldName" onChange={handleCange} type="text" placeholder="Field Name" style={{ width: '7rem' }} />
                                    {/*<p style={{ fontSize: '15px', color: 'red', marginLeft: '0rem' }}>{validFieldName ? "" : "Required"}</p> */}
                                </div >
                                <div style={{ width: '6rem', marginLeft: 'auto' }}>
                                    {/* <br /><p style={{ fontSize: '15px', color: 'red', marginLeft: '4rem' }}>{validTypeField ? "" : "Required"}</p> */}
                                    <select className={`select_condition ${validTypeField ? "" : "empty-select"}`} value={input.TypeField} name="TypeField" onChange={handleCange} style={{ width: '7rem' }} >
                                        <option value={""}>Select Field Type</option>
                                        <option value={"Numeric"}>{"Numeric"}</option>
                                        <option value={"Alpha Numeric"}>{"Alpha Numeric"}</option>
                                        <option value={"Date/Time"}>{"Date/Time"}</option>
                                        <option value={"Amount"}>{"Amount"}</option>
                                        <option value={"Boolean"}>{"Boolean"}</option>
                                    </select>
                                </div >



                                <div style={{ width: '6rem', marginLeft: 'auto' }}>
                                    <input className={validSizeOfField ? "" : "empty-select"} value={input.SizeOfField} maxLength="2" name="SizeOfField" onChange={handleCange} type="text" placeholder="Field Size" style={{ width: '7rem' }} />
                                    <br /><p style={{ fontSize: '12px', color: 'red', margin: '0px' }}>{validSizeOfField ? "" : "Required 0 to 99"}</p>
                                </div >

                                <div style={{ width: '6rem ', marginLeft: 'auto' }}>
                                    {/* <br /><p style={{ fontSize: '15px', color: 'red', marginLeft: '4rem' }}>{validTypeField ? "" : "Required"}</p> */}
                                    <select className={`select_condition ${validProcessType ? "" : "empty-select"}`} value={input.ProcessType} name="ProcessType" onChange={handleCange} style={{ width: '7rem' }} >
                                        <option value={""}>Select Process Type</option>
                                        <option value={"Normal"}>{"Normal"}</option>
                                        <option value={"System"}>{"System"}</option>
                                    </select>
                                </div >
                                {/* {
                                    input.ProcessType == "Normal" ? (<></>) : (
                                        <div style={{ width: '6rem', marginLeft: 'auto' }}>
                                            <input className={validSystemRef ? "" : "empty-select"} value={input.SystemRef} name="SystemRef" onChange={handleCange} type="text" placeholder="System Ref" style={{ width: '6rem' }} />
                                        </div>
                                    )
                                } */}
                                  <div style={{ width: '6rem', marginLeft: 'auto' }}>
                                            <input className={validSystemRef ? "" : "empty-select"} value={input.SystemRef} name="SystemRef" onChange={handleCange} type="text" placeholder="System Ref" style={{ width: '6rem' }} />
                                            {/* <br /><p style={{ fontSize: '15px', color: 'red', marginLeft: '4rem' }}>{validSystemRef ? "" : "Required"}</p> */}
                                        </div>


                                <button disabled={validFieldName && validSizeOfField && validTypeField && afteredit && DocId ? false : true} onClick={(e) => addTodo(e)} type="button" className="btn btn-md" style={{
                                    backgroundColor: '#ECF7F2',
                                    color: '#03995D',
                                    borderColor: '#03995D',
                                    fontWeight: '600',
                                    marginLeft: '3rem',
                                    float: 'right',
                                    width: '8rem',
                                    height: '2.8rem'
                                }}> <i class="fa fa-plus mr-1" aria-hidden="true"></i> Add Field </button>
                            </div>
                            <div className="button">
                                {/* <button onClick={() => Savehandle(todo)} type="button" className="btn  btn-md btn-save" style={{ width: '8rem' }}>Save</button> */}
                                <button onClick={handleEntailmentRequest} type="button" className="btn btn-md  btn-back">Cancel</button>

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
                                    <div className="well" style={{ width: '47rem' }} >
                                        <h1> Update Document Fields</h1>
                                        <table className="table table-striped" style={{ marginTop: "1rem" }}>
                                            <thead className="thead-dark">
                                                <tr>
                                                <th scope="col">Seq No</th>
                                                    <th scope="col">Field Name</th>
                                                    <th scope="col">Field Type </th>
                                                    <th scope="col">Field Size</th>
                                                    <th scope="col">process Type</th>
                                                    <th hidden={input.ProcessType == "Normal" ? true : false} scope="col">System Ref </th>
                                                  

                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr>
                                                <td>
                                                        <input value={input.SeqNo} name="SeqNo" onChange={handleCange} type="text" placeholder="Seq No" style={{ width: '5rem' }} />

                                                    </td>
                                                    <td>
                                                        <input value={input.FieldName} name="FieldName" onChange={handleCange} type="text" placeholder="Field Name" style={{ width: '5rem' }} />

                                                    </td>

                                                    <td>
                                                        {/* <input value={input.TypeField} name="TypeField" onChange={handleCange} type="text" placeholder="Field Type" style={{ width: '7rem', marginLeft: '3rem' }} /> */}
                                                        <select className={`select_condition`} value={input.TypeField} name="TypeField" onChange={handleCange} style={{ width: '5rem', marginLeft: 'auto' }} >
                                                            <option value={""}>Select Field Type</option>
                                                            <option value={"Numeric"}>{"Numeric"}</option>
                                                            <option value={"Alpha Numeric"}>{"Alpha Numeric"}</option>
                                                            <option value={"Date/Time"}>{"Date/Time"}</option>
                                                            <option value={"Amount"}>{"Amount"}</option>
                                                            <option value={"Boolean"}>{"Boolean"}</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <input value={input.SizeOfField} name="SizeOfField" onChange={handleCange} type="text" placeholder="Field Size" style={{ width: '5rem', marginLeft: 'auto' }} />

                                                    </td>
                                                    <td>
                                                        {/* <input value={input.TypeField} name="TypeField" onChange={handleCange} type="text" placeholder="Field Type" style={{ width: '7rem', marginLeft: '3rem' }} /> */}
                                                        <select className={`select_condition`} value={input.ProcessType} name="ProcessType" onChange={handleCange} style={{ width: '5rem', marginLeft: 'auto' }} >
                                                            <option value={""}>Select Process Type</option>
                                                            <option value={"Normal"}>{"Normal"}</option>
                                                            <option value={"System"}>{"System"}</option>
                                                        </select>
                                                    </td>
                                                    {input.ProcessType == "Normal" ? false : true ?
                                                        <td>
                                                            <input value={input.SystemRef} name="SystemRef" onChange={handleCange} type="text" placeholder="System Ref" style={{ width: '5rem', marginLeft: 'auto' }} />
                                                        </td>
                                                        : <></>}
                                                </tr>

                                            </tbody>
                                        </table>
                                        <hr style={{ border: '1px solid #2d3f61' }} />


                                        <div className="button">
                                            <button data-dismiss="modal" onClick={(e) => addTodo(e)} type="button" className="btn  btn-md btn-save">Update</button>
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
export default CreatDocField