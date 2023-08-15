import React, { useState, useEffect } from "react";
import axios from 'axios'
import Swal from "sweetalert2";
import { number, string } from 'yup';
import { ToastContainer, toast } from 'react-toastify';

const RelationshipCreateDoc = () => {
    const [afteredit,setafteredit] = useState(true)

    const [todo, setTodo] = useState([]);
    const [editeddata, setEditedData] = useState(null);
    const [edittoggle, setEditToggle] = useState(false);
    const [agencyName, setagencyName] = useState("");
    const [apidata, setApiData] = useState([]);
    const [documetType, setDocumentType] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [DocId, setDocId] = useState("");
    const [validDetailSeq, setvalidDetailSeq] = useState(false);
    const [validRelType, setvalidRelType] = useState(false);
    const [validDetailDocument, setvalidDetailDocument] = useState(false);
    
    

    const [input, setInput] = useState(
        {
            DetailSeq: "",
            RelType: "",
            DetailDocument: ""
        }
    )

    useEffect(() => {
        const getdata = async () => {
            await axios.get(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE +'/AgencyRef/GetAll')
                .then((res) => setApiData(res.data)).catch((err) => console.log(err))
        }
        getdata();
        const getdocType = async () => {
            await axios.get(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE +'/DocumentType/GetAll').then((res) => setDocumentType(res.data)).catch((err) => console.log(err))
        }
        getdocType();
    }, [])
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
                    setTodo(
                        todo.map((e) => {
                            if (e.detailDocument === editeddata) {
                                return {
                                    ...e,
                                    detailSeq: input.DetailSeq,
                                    relType: input.RelType,
                                    detailDocument: input.DetailDocument
                                }
        
                            }
                            return e;
                        })
                    )
                    toast.success("Updated Successfully");
                    setEditToggle(false);
                    setInput({
                        DetailSeq: "",
                        RelType: "",
                        DetailDocument: "",
                    });
                    setafteredit(false);
                   
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
                    setTodo([...todo, {
                        documentTypeId: parseInt(DocId),
                        primaryDocument: DocId,
                        detailDocument: input.DetailDocument,
                        relType: input.RelType,
                        detailSeq: parseInt(input.DetailSeq)
                    }]);
                    console.log(todo);
        
                    console.log(todo);
                    setInput({
                        DetailSeq: "",
                        RelType: "",
                        DetailDocument: "",
                    });
                    setvalidDetailDocument(false);
                    setvalidDetailSeq(false);
                    setvalidRelType(false);
                } 

            })
            
           
        }
    }
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                    
        const newTodo = todo.filter((todo) => todo.fieldName !== id);
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
    const [singleDoc, setSingleDoc] = useState("");
    const handleDocType = (e) => {
        const value = e.target.value;
        setSingleDoc(value);
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
            toast.error("Please Select Doc Type!");
            window.location.reload(true);
        } else {
            axios.get(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE +`/DocumentType/GetById?id=${value}`).then((res) => setSelectedData(res.data)).catch((err) => console.log(err))
            setTodo([]);
        }
        setDocId(value);
    }


    const handleEdit = (id) => {
        setEditToggle(true);
        const newEditedTodo = todo.find((e) => { return e.detailDocument === id });
        console.log(newEditedTodo);
        setInput({
            DetailSeq: newEditedTodo.detailSeq,
            RelType: newEditedTodo.relType,
            DetailDocument: newEditedTodo.detailDocument
        });
        
        setEditedData(id);
        setvalidDetailDocument(true);
        setvalidDetailSeq(true);
        setvalidRelType(true);
        

    }

    const selecthandle = (e) => {
        setagencyName(e.target.value);
    }

    const handleCange = (e) => {
        const value = e.target.value;
        setInput({ ...input, [e.target.name]: value });
        setvalidDetailDocument(string().required().isValidSync(input.DetailDocument));
        setvalidDetailSeq(number().required().isValidSync(input.DetailSeq));
        setvalidRelType(string().required().isValidSync(input.RelType));
        setafteredit(true)

    }
    const Savehandle = (data) => {
        console.log(data);
        if(data== ''){
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Oops...',
            //     text: 'Please Fill all the Fields!'
            //   })
              toast.error("Please Fill all the Fields!");
        }
        else{
        const ids = data.map((id) => { return id.id });
        Swal.fire({
            title: 'Are you sure you want to save?',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "OK",
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
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE +'/DocumentRelationship/AddRange', requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
                // Swal.fire('Added Successfully', '', 'success');
                toast.success("Added Successfully");
                window.location.reload(true);

            } 

        })
    }
    }

    const handleEntailmentRequest = (e) => {
        if (todo != '') {
            Swal.fire({
                title: 'Oops...',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "OK",
                cancelButtonText: "Cancel",
                text: 'Please First CLick on Save, Otherwise data may have been lost! If you still want to continue Please Click Ok'
            }).then((result) => {
                if (result.isConfirmed) {
                    e.preventDefault();
                    window.location.reload(true);
                }
            })
        }
        else {
            e.preventDefault();
            window.location.reload(true);
        }
    
    }

    const refreshBckBtn = (e) => {
        setInput({
            DetailSeq: "",
            RelType: "",
            DetailDocument: ""
        });
    }
    return (
        <div>
              <ToastContainer />
            <div className="row">
                <div className="col-md-10 col-lg-10">
                    <section id="card">
                        <div className="well" style={{ width: '64rem' }}>
                            <h1 > Create Document Relationships </h1>
                            <div>
                                <form className="ml-auto" >
                                    <div style={{ display: 'flex' }}>
                                        <label>Primary Document Type:</label>
                                        <select style={{ width: '14rem', marginLeft: '1rem' }} className="dropdown_value" onChange={handleDocType}>
                                            <option value="">Select Doc Type </option>
                                            {
                                                documetType.map((doc) => (
                                                    <option value={doc.id}>{doc.documentType1}</option>
                                                ))
                                            }
                                        </select>
                                        <br />
                                        {/* <label className="ml-5">Process Type:</label>
                                        <p>{selectedData.processType}</p> */}
                                        
                                        <br />


                                    </div>

                                    <div style={{ display: 'flex' }}>
                                        <label>Description:</label>
                                        <p>{selectedData.description}</p>
                                    </div>


                                </form>
                            </div>
                        </div>

                        <div className="well" style={{ width: '64rem' }}>
                            <h1 > Create Document Relationships Table </h1>
                            <table className="table table-striped" style={{ marginTop: "1rem" }}>
                                <thead className="thead-dark">
                                    <tr>
                                        <th hidden scope="col">DocId</th>
                                        <th scope="col">Detail Document Type</th>
                                        <th scope="col">Relation Type</th>
                                        <th scope="col">Seq No.</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        todo.map((e, i) => (
                                            <tr key={i} >
                                                <td hidden>{DocId}</td>
                                                <td>{e.detailDocument}</td>
                                                <td>{e.relType}</td>
                                                <td>{e.detailSeq}</td>
                                                <td><button onClick={() => handleEdit(e.detailDocument)} data-toggle="modal" data-target="#myModal" style={{ border: 'none' }}><i className="fas fa-edit">
                                                    </i></button> <i onClick={() => handleDelete(e.fieldName)} class="fa fa-trash ml-2" aria-hidden="true"></i></td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                            <hr style={{ border: '1px solid #2d3f61' }} />
                            <div className="inner-card">
                                <form className="ml-auto" method="post">
                                    <h1 >Add Detail Document Type </h1>
                                    <div style={{ display: 'flex' }}>

                                        <div>
                                            <label className="">Detail Document Type</label>
                                            <br />
                                            {/* <input value={input.DetailDocument} name="DetailDocument" onChange={handleCange} type="text"  style={{ width: '14rem', height: '40px' }} /> */}
                                            <select className={`select_condition ${validDetailDocument ? "" : "empty-select"}`} style={{height:'2.5rem', width: '14rem', marginLeft: '1rem' }} value={input.DetailDocument} name="DetailDocument" onChange={handleCange}>
                                                <option value="">Select Doc</option>
                                                {
                                                    documetType.filter((e) => e.id !== selectedData.id).map((e) => (
                                                        <option value={e.documentType1}>{e.documentType1}</option>
                                                    ))
                                                }
                                            </select>
                                            {/* <br /><p style={{fontSize:'15px',color:'red'}}>{validDetailDocument ? "" : "Required"}</p> */}
                                        </div>

                                        <div style={{ marginLeft: '4rem' }}>
                                            <label className="">Relation Type </label>
                                            <br />
                                            <select className={`select_condition ${validRelType ? "" : "empty-select"}`} value={input.RelType} name="RelType" onChange={handleCange} type="text" style={{ width: '14rem', height: '40px' }}>
                                                <option value={""}>Select Relation Type</option>
                                                <option value={"Many to Many"}>{"Many to Many"}</option>
                                                <option value={"One to One"}>{"One to One"}</option>
                                                <option value={"One to Many"}>{"One to Many"}</option>
                                                <option value={"System"}>{"System"}</option>
                                            </select>
                                            {/* <br /><p style={{fontSize:'15px',color:'red'}}>{validRelType ? "" : "Required"}</p> */}
                                        </div>

                                        <div style={{ marginLeft: '4rem' }}>
                                            <label className="">Seq.No</label>
                                            <br />
                                            <input className={`${validRelType ? "" : "empty-select"}`} value={input.DetailSeq} name="DetailSeq" pattern="[0-99]" maxLength={2} onChange={handleCange} placeholder={"Seq.No"} type="text" style={{ width: '14rem', height: '40px' }} />
                                            <br /><p style={{fontSize:'15px',color:'red'}}>{validDetailSeq ? "" : validDetailSeq}</p>
                                        </div>

                                        <div style={{ marginLeft: '3rem', marginTop: '0.6rem' }}>
                                            <label className=""></label>
                                            <br />

                                            <button disabled={validDetailDocument  && validRelType && afteredit ? false : true} onClick={(e) => addTodo(e)} type="button" className="btn btn-md" style={{
                                                backgroundColor: '#ECF7F2',
                                                color: '#03995D',
                                                borderColor: '#03995D',
                                                fontWeight: '600',
                                                marginLeft: '-2rem',
                                                width: '9rem'
                                            }}> <i class="fa fa-plus mr-1" aria-hidden="true"></i> Add Doc Type </button>

                                        </div>
                                    </div>

                                    <br />

                                </form>

                            </div>
                            <div className="button">
                                <button onClick={() => Savehandle(todo)} type="button" className="btn  btn-md btn-save">Save</button>
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
                                <section id="card" >
                                    <div className="well" style={{ width: '43rem' }}>
                                        <h1>  Document Relationships Edit </h1>
                                        <div className="inner-card">
                                            <form className="ml-auto" method="post">
                                                <div style={{ display: 'flex' }}>
                                                    <div >
                                                        <label>Seq No. </label>
                                                        <br />
                                                        <input value={input.DetailSeq} name="DetailSeq" onChange={handleCange} type="text" style={{ width: '15rem' }} />
                                                        <br /><p style={{ color: 'red' }}>{validDetailSeq ? "" : "Required 0 to 99"}</p>
                                                    </div>
                                                    <div style={{ marginLeft: '4rem' }} >
                                                        <label>Relation Type </label>
                                                        <br />
                                                        {/* <input value={input.RelType} name="RelType" onChange={handleCange} type="text" style={{ width: '15rem' }} /> */}
                                                        <select className="select_condition" value={input.RelType} name="RelType" onChange={handleCange} type="text" style={{ width: '14rem', height: '40px' }}>
                                                            <option value="">Select Condition</option>
                                                            <option value={"Many to Many"}>{"Many to Many"}</option>
                                                            <option value={"One to One"}>{"One to One"}</option>
                                                            <option value={"One to Many"}>{"One to Many"}</option>
                                                            <option value={"System"}>{"System"}</option>
                                                        </select>
                                                        <br /><p>{validRelType ? "" : "This field is required"}</p>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', marginTop: '1rem' }}>

                                                    <div >
                                                        <label>Detail Document Type</label>
                                                        <br />
                                                        {/* <input value={input.DetailDocument} name="DetailDocument" onChange={handleCange} type="text" placeholder="Action Details" style={{ width: '34rem' }} /> */}
                                                        <select className="select_condition" style={{ width: '14rem', height: '40px' }} value={input.DetailDocument} name="DetailDocument" onChange={handleCange}>
                                                            <option value="">Select Detail Document Type</option>
                                                            {
                                                                documetType.filter((e) => e.id !== selectedData.id).map((e) => (
                                                                    <option value={e.documentType1}>{e.documentType1}</option>
                                                                ))
                                                            }
                                                        </select>
                                                        <br /><p>{validDetailDocument ? "" : "This field is required"}</p>
                                                    </div>

                                                </div>

                                            </form>

                                        </div>
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
export default RelationshipCreateDoc