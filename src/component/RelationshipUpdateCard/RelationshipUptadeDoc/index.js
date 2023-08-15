import React, { useEffect, useState } from "react";
import axios from 'axios';
import Swal from "sweetalert2";
import { computeHeadingLevel } from "@testing-library/react";
import { number, string } from 'yup';
import { ToastContainer, toast } from 'react-toastify';


const RelationshipUpdateeDoc = () => {
    const [doctype, setDocType] = useState([]);
    const [docField, setDocField] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [editeddata, setEditedData] = useState(null);
    const [edittoggle, setEditToggle] = useState(false);
    const [todo, setTodo] = useState([]);
    const [disable, setDisbale] = useState(true);
    const [selectedData, setSelectedData] = useState([]);
    const [validDetailSeq, setvalidDetailSeq] = useState(false);
    const [validRelType, setvalidRelType] = useState(false);
    const [validDetailDocument, setvalidDetailDocument] = useState(false);
    const [DocId, setDocId] = useState("");
    const [tempTodo,setTempTodo] = useState([]);
    const [detailname,setdetailName] = useState("");
    const [afteredit,setAfterEdit]= useState(true);
    

    const [isSaved, setIsSaved] = useState(false);


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
            //   }).then((result) => {
            //     if (result.isConfirmed) {
            //         window.location.reload(true);
            //     }
            // })
            toast.error("Please Select Doc Type!");
            window.location.reload(true);
        } else {
            await axios.get(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + `/DocumentType/GetByIdWithDocumentRelation?id=${id}`).then((res) => {
                setDocField(res.data);
                setTodo(res.data.documentRelationshipResultDtos);
                setTempTodo(res.data.documentRelationshipResultDtos)
            }

            ).catch((err) => console.log(err));


            setIsDataLoaded(true);

        }
        setDocId(id);
    }


    const [input, setInput] = useState(
        {
            DetailSeq: "",
            RelType: "",
            DetailDocument: ""
        }
    )




    const handleCange = (e) => {
        const value = e.target.value;
        console.log(value);

        setInput({ ...input, [e.target.name]: value });
        setDisbale(false);
        setvalidDetailDocument(string().required().isValidSync(input.DetailDocument));
        setvalidDetailSeq(number().required().isValidSync(input.DetailSeq));
        setvalidRelType(string().required().isValidSync(input.RelType));
        setAfterEdit(true);
        
    }
    



    const addTodo = async (e) => {
        debugger;
        e.preventDefault();
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
                                    detailDocument: input.DetailDocument,
                                    relType: input.RelType
                                }
        
                            }
                            return e;
                        })
                    )
                    toast.success("Updated Successfully");
                    setEditToggle(false);
        
                    setInput({
                        DetailSeq: "",
                        DetailDocument: "",
                        RelType: ""
                    });
                    setDisbale(true);
                    setAfterEdit(false);
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
                    setTodo([...todo, {
                        documentTypeId: parseInt(DocId),
                        primaryDocument: DocId,
                        detailDocument: input.DetailDocument,
                        relType: input.RelType,
                        detailSeq: parseInt(input.DetailSeq),
                    
                    }]);
                   
                    toast.success("Saved Successfully");
                    setInput({
                        DetailSeq: "",
                        DetailDocument: "",
                        RelType: ""
                    });
                    setDisbale(true);
                    setvalidDetailDocument(false);
                    setvalidDetailSeq(false);
                    setvalidRelType(false);
                    setIsSaved(true);
                } else
                    Swal.fire(' Cancelled', '', 'error')

            })       
            

        }


    }

    const handleDelete = () => {

    }

    const handleEdit = (id) => {
        debugger;
        setDisbale(false);
        setEditToggle(true);
        const newEditedTodo = todo.find((e) => { return e.detailDocument === id });
        
        setInput({
            DetailSeq: newEditedTodo.detailSeq,
            DetailDocument: newEditedTodo.detailDocument,
            RelType: newEditedTodo.relType
        });
        
        setEditedData(id);
        setvalidDetailDocument(true);
        setvalidDetailSeq(true);
        setvalidRelType(true);

    }
    const updatehandle = (data) => {
        console.log(data);
        const ids = data.map((id) => { return id.id });
        if(data == ''){
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Oops...',
            //     text: 'Please Select Doc Type!'
            //   })
            toast.error("Please Select Doc Type!");
        }
        else{
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

                var raw = JSON.stringify(data);

                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + '/DocumentRelationship/UpdateRange', requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
                    toast.success("Updated Successfully!");
                    window.location.reload(true)

            } 

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
                    console.log(id);
                    axios.delete(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + `/DocumentRelationShip/Remove?id=${id}`)
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
                toast.success("Deleted Successfully!");
            }
        })



    }

    const refreshBckBtn = (e) => {
        setInput({
            DetailSeq: "",
            RelType: "",
            DetailDocument: ""
        })
    }

    const handleEntailmentRequest = (e) => {
        if (isSaved) {
            Swal.fire({
                title: 'Oops...',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "OK",
                cancelButtonText: "Cancel",
                icon: 'warning',
                text: 'Please First CLick on Update, Otherwise data may have been lost! If you still want to continue Please Click Ok'
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    
                   window.location.reload(true);

                } else
                    Swal.fire(' Cancelled', '', 'error')

            })

        } else {
           window.location.reload(true);
        }
    
    }
    return (
        <div>
               <ToastContainer />
            <div className="row" >
                <div className="col-md-10 col-lg-10">
                    <section id="card">


                        <div className="well" style={{ width: '64rem' }}>
                            <h1 > Update Document Relationships </h1>
                            <div>
                                <form className="ml-auto" >
                                    <div style={{ display: 'flex' }}>
                                        <label>Primary Document Type:</label>
                                        <select style={{ width: '14rem', marginLeft: '1rem' }} className="dropdown_value" onChange={handleDocType}>
                                            <option value="">Select Doc Type</option>
                                            {
                                                doctype.map((doc) => (
                                                    <option value={doc.id}>{doc.documentType1}</option>
                                                ))
                                            }
                                        </select>
                                        <br />
                                        {/* <label className="ml-5">Process Type:</label>
                                        <p style={{ marginLeft: '1rem' }}>{docField.processType}</p> */}
                                        <br />


                                    </div>

                                    <div style={{ display: 'flex' }}>
                                        <label>Description:</label>
                                        <p style={{ marginLeft: '1rem' }}>{docField.description}.</p>
                                    </div>


                                </form>
                            </div>
                        </div>

                        <div className="well" style={{ width: '64rem' }}>
                            <h1 > Update Document Relationships  </h1>
                            <table className="table table-striped" style={{ marginTop: "1rem" }}>
                                <thead className="thead-dark">
                                    <tr>
                                        {/* <th scope="col">DocId</th> */}
                                        <th scope="col">Detail Document Type</th>
                                        <th scope="col">Relation Type</th>
                                        <th scope="col">Seq No.</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        isDataLoaded ? todo.map((field, index) => (
                                            <tr>
                                                {/* <th scope="row">{DocId}</th> */}
                                                <td>{field.detailDocument}</td>
                                                <td>{field.relType}</td>
                                                <td>{field.detailSeq}</td>

                                                

                                                <td><button onClick={() => handleEdit(field.detailDocument)} data-toggle="modal" data-target="#myModal" style={{ border: 'none' }}><i className="fas fa-edit"></i></button>
                                                    <i onClick={() => deletehandle(field.id, index)} class="fa fa-trash ml-4" aria-hidden="true"></i></td>
                                            </tr>

                                        )) : <tr></tr>
                                    }
                                </tbody>
                            </table>
                            <hr style={{ border: '1px solid #2d3f61' }} />
                            <div className="inner-card">
                                <form className="ml-auto" method="post">
                                    <h1>Update Entry </h1>
                                    <div style={{ display: 'flex' }}>

                                        <div>
                                            <label className="">Detail Document Type</label>
                                            <br />
                                            {/* <input value={input.DetailDocument} name="DetailDocument" onChange={handleCange} type="text" placeholder="Detail Document Type" style={{ width: '14rem', height:'40px' }} /> */}
                                            <select className={`select_condition ${validDetailDocument ? "" : "empty-select"}`}  value={input.DetailDocument} name="DetailDocument" onChange={handleCange} style={{ width: '14rem', height: '40px' }}>
                                                <option >Select Doc Type</option>
                                                {
                                                    doctype.filter((e) => e.id !== docField.id).map((e) => {

                                                        return (
                                                            <option value={e.documentType1}>{e.documentType1}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            {/* <br /><p style={{ fontSize: '15px', color: 'red' }}>{validDetailDocument ? "" : "Required"}</p> */}
                                        </div>

                                        <div style={{ marginLeft: '4rem' }}>
                                            <label className="">Relation Type </label>
                                            <br />
                                            {/* <input value={input.RelType} name="RelType" onChange={handleCange} type="text" placeholder="Relation Type" style={{ width: '14rem', height: '40px' }} /> */}
                                            <select className={`select_condition ${validRelType ? "" : "empty-select"}`}  value={input.RelType} name="RelType" onChange={handleCange} type="text" style={{ width: '14rem', height: '40px' }}>
                                                <option value={""}>Select Relation Type</option>
                                                <option value={"Many to Many"}>{"Many to Many"}</option>
                                                <option value={"One to One"}>{"One to One"}</option>
                                                <option value={"One to Many"}>{"One to Many"}</option>
                                                <option value={"System"}>{"System"}</option>
                                            </select>
                                            {/* <br /><p style={{ fontSize: '15px', color: 'red' }}>{validRelType ? "" : "Required"}</p> */}
                                        </div>

                                        <div style={{ marginLeft: '4rem' }}>
                                            <label className="">Seq No.</label>
                                            <br />
                                            <input className={`select_condition ${validDetailSeq ? "" : "empty-select"}`} value={input.DetailSeq} name="DetailSeq" onChange={handleCange} type="text" placeholder="Seq No." style={{ width: '14rem', height: '40px' }} />
                                            {/* <br /><p style={{ fontSize: '15px', color: 'red' }}>{validDetailSeq ? "" : "Required"}</p> */}
                                        </div>

                                        <div style={{ marginLeft: '0.5rem', marginTop: '0.5rem' }}>
                                            <label className=""></label>
                                            <br />
                                            <button disabled={validDetailDocument && validDetailSeq && validRelType && afteredit && DocId != '' ? false : true} onClick={(e) => addTodo(e)} type="button" className="btn btn-md" style={{
                                                backgroundColor: '#ECF7F2',
                                                color: '#03995D',
                                                borderColor: '#03995D',
                                                fontWeight: '600',
                                                marginLeft: '2rem',
                                                width: '8rem'
                                            }}> <i class="fa fa-plus mr-1" aria-hidden="true"></i> Add Field </button>
                                        </div>
                                    </div>

                                    <br />

                                </form>

                            </div>
                            <div className="button">
                                <button onClick={() => updatehandle(todo)} type="button" className="btn  btn-md btn-save">Submit</button>
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
                                        <h1> Update Document Relationships Edit </h1>
                                        <div className="inner-card">
                                            <form className="ml-auto" method="post">
                                                <div style={{ display: 'flex' }}>
                                                    <div >
                                                        <label>Seq No. </label>
                                                        <br />
                                                        <input value={input.DetailSeq} name="DetailSeq" onChange={handleCange} type="text" style={{ width: '15rem' }} />
                                                        <br /><p>{validDetailSeq ? "" : "Required"}</p>
                                                    </div>
                                                    <div style={{ marginLeft: '4rem' }} >
                                                        <label>Relation Type </label>
                                                        <br />
                                                        {/* <input value={input.RelType} name="RelType" onChange={handleCange} type="text" style={{ width: '15rem' }} /> */}
                                                        <select className="select_condition" value={input.RelType} name="RelType" onChange={handleCange} type="text" style={{ width: '14rem', height: '40px' }}>
                                                            <option value="">Select Relation Type</option>
                                                            <option value={"Many to Many"}>{"Many to Many"}</option>
                                                            <option value={"One to One"}>{"One to One"}</option>
                                                            <option value={"One to Many"}>{"One to Many"}</option>
                                                            <option value={"System"}>{"System"}</option>
                                                        </select>
                                                        <br /><p>{validRelType ? "" : "Required"}</p>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', marginTop: '1rem' }}>

                                                    <div >
                                                        <label>Detail Document Type</label>
                                                        <br />
                                                        {/* <input value={input.DetailDocument} name="DetailDocument" onChange={handleCange} type="text" style={{ width: '34rem' }} /> */}
                                                        <select className="select_condition" value={input.DetailDocument} name="DetailDocument" onChange={handleCange}>

                                                            {
                                                                doctype.filter((e) => e.id !== docField.id || e.id == input.DetailDocument).map((e) => (
                                                                    <option value={e.documentType1} >{e.documentType1}</option>
                                                                ))
                                                            }
                                                        </select>
                                                        <br /><p>{validDetailDocument ? "" : "Required"}</p>
                                                    </div>

                                                </div>

                                            </form>

                                        </div>
                                        <div className="button">
                                            <button data-dismiss="modal" disabled={validDetailDocument && validDetailSeq && validRelType ? false : true} type="button" onClick={(e) => addTodo(e)} className="btn  btn-md btn-save">Save</button>
                                            <button onClick={refreshBckBtn}data-dismiss="modal" type="button" className="btn btn-md  btn-back">Back</button>

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
export default RelationshipUpdateeDoc