import { computeHeadingLevel } from '@testing-library/react';
import { Modal } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { Switch } from "antd";
import Swal from "sweetalert2";
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';

const RuleTypeDetails = () => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic ');
    headers.append('Origin', 'http://localhost:3000');

    const [EditState, setEditState] = useState(
        {
            ruleType: "",
            caseType: "",
            description: "",
        }
    );
    const [search, setSearch] = useState("");
    const [swicth,setSwitch] = useState(true);

    

    const [ruleType, setRuleType] = useState("");
    const [caseType, setCaseType] = useState("");
    const [description, setDescription] = useState("");
    const [Id, setId] = useState("");

    const [count, setCount] = useState(0);
    const GetEditMethod = (para) => {
        setRuleType(para.ruleType)
        setCaseType(para.caseType)
        setDescription(para.description)
        setId(para.id)

    }

    

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const [data, setData] = useState([]);

    // GET request function to your Mock API
    const fetchData = () => {
        fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + '/RuleTypeRef/GetAll', requestOptions)
            .then(res => res.json())
            .then(json => setData(json));
    }

    // Calling the function on component mount
    useEffect(() => {
        fetchData();
    }, []);



    const handleSubmit = (e) => {
        e.preventDefault();

        if(caseType == "" || ruleType == "")
        {
            toast.error("Please Select Type");   
            return false;
        }

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
                    "Id": Id,
                    "RuleType": ruleType,
                    "CaseType": caseType,
                    "Description": description
                });

                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + '/RuleTypeRef/Update', requestOptions)
                .then(response => response.text())
                .then((result) =>{ 
                    debugger;
                    if(result!= ''){
                        //const data = JSON.parse(result);
                        //Swal.fire('Updated Successfully', '', 'success')
                        toast.success("Updated Successfully");
                        window.location.reload(true);
                    }
                    else{
                        // Swal.fire({
                        //     icon: 'error',
                        //     title: 'Oops...',
                        //     text : "Rule Type Already Exists"
                        // })
                        toast.error("Rule Type Already Exists");   
            
                    } 
    
                })

            }

        })
    }

    const DeleteMethod = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                var requestOptions = {
                    method: 'DELETE',
                    redirect: 'follow'
                };
                fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + '/RuleTypeRef/Remove?id=' + id, requestOptions)
                .then(response => {
                    if(!response.ok){
                        // Swal.fire({
                        //     icon: 'error',
                        //     title: 'Oops...',
                        //     text : "Could not be deleted because it is referenced by other records"
                        // })
                        toast.error("Could not be deleted because it is referenced by other records");   
                    }
                    else{
                        toast.error("Your file has been deleted");  
                    //     Swal.fire('Your file has been deleted', '', 'success')
                    //     .then((result) => {
                    //         if (result.isConfirmed) {
                    //            window.location.reload(true);
            
                    //         }else{
                    //             Swal.fire(' Cancelled', '', 'error')
                    //         }
                    //     }
                    // )
                    }
                })

         
              
            }
        })
    }

    const handleswitch = (e) =>{
     
    }



    //Pagination
    const [pageNumber, setPageNumber] = useState(0);
    const [serielNum, setSerielNum] = useState(1);
    const dataPerPage = 10;
    const dataVisited = pageNumber * dataPerPage;


    for(var i=0;i<data.length;i++){
        data[i]["sno"] = i+ 1;
    }
    

    const displayData = data.slice(dataVisited, dataVisited + dataPerPage).filter((item) => item.ruleType.toLowerCase().includes(search.toLowerCase()) || item.caseType.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase())).map((item, index) => (
        <tr key={item.id}>
            <th scope="row">{item.sno}</th>
            <td>{item.ruleType}</td>
            <td>{item.caseType}</td>
            <td>{item.description}</td>
            {/* <td><Switch defaultChecked={swicth} onChange={() => handleswitch(item.id)} /> </td> */}
            <td><button onClick={() => GetEditMethod(item)} data-toggle="modal" data-target="#myModal" style={{ border: 'none' }}><i className="fas fa-edit"></i></button> <i onClick={(e) => DeleteMethod(item.id)} class="fa fa-trash ml-2" aria-hidden="true"></i></td>

        </tr>
    ))
    const PageCount = Math.ceil(data.length / dataPerPage);
    const chnagePage = ({ selected }) => {
        setPageNumber(selected);
    }
    //Pagination
    const handleBack = () =>{
       
    }
    console.log(displayData.length);

    return (
        <div >
                 <ToastContainer />
            <div className="row" >
                <div className="col-md-10 col-lg-10">
                    <section id="card">
                        <div className="well">
                            <h1> Rule Type Details</h1>
                            <div className='searchdiv'>

                                <input placeholder='Search' className='input' onChange={(e) => setSearch(e.target.value)} value={search} />
                            </div>
                            <table className="table table-striped" style={{ marginTop: "1rem" }}>
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Rule Type</th>
                                        <th scope="col">Case Type</th>
                                        <th scope="col">Description</th>
                                        {/* <th scope="col">Status</th> */}
                                        <th scope="col" style={{width:'100px'}}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayData}
                                </tbody>
                            </table>
                            <ReactPaginate
                                previousLabel="Previous"
                                nextLabel="Next"
                                pageCount={PageCount}
                                onPageChange={chnagePage}
                                containerClassName={"conatinerpage"}
                                previousClassName={displayData.length < 9 && data.length > 10 ? "prevbtn" : "prevbtn2"}
                                nextClassName={displayData.length > 9 ? "nextbtn" : "nextbtn2"}
                                activeClassName={"activepage"}

                            />


                            <div className="button">
                                {/* <button type="button" className="btn  btn-md btn-save">Save</button> */}
                                {/* <button type="button" className="btn btn-md  btn-back">Back</button> */}

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
                                    <div className="well" style={{ width: '46rem' }}>
                                        <h1> Rule Type Edit </h1>
                                        <div className="inner-card">
                                            <form className="ml-auto" method="post">
                                                <div style={{ display: 'flex' }}>
                                                    <div >
                                                        <label>Rule Type<i style={{ color: "red"}}>*</i> </label>
                                                        <br />
                                                        <select onChange={(e) => setRuleType(e.target.value)} value={ruleType} className="select_condition" style={{ width: '19rem' }}>
                                                        <option value={""}>Select Rule Type</option>
                                                        <option value={"Deductive"}>{"Deductive"}</option>
                                                        <option value={"Inductive"}>{"Inductive"}</option>
                                                        </select>
                                                    </div>
                                                    <div style={{ marginLeft: '4rem' }} >
                                                        <label>Case Type<i style={{ color: "red"}}>*</i> </label>
                                                        <br />
                                                        <select className="select_condition" onChange={(e) => setCaseType(e.target.value)} value={caseType} style={{ width: '20rem' }}>
                                                        <option value={""}>Select Case Type</option>
                                                        <option value={"Y"}>{"Y"}</option>
                                                        <option value={"N"}>{"N"}</option>
                                        </select>
                                                    </div>
                                                </div>

                                                <label className="discription" style={{ marginTop: '1rem' }}>Description<i style={{ color: "red"}}>*</i> </label>
                                                <br />
                                                <textarea onChange={(e) => setDescription(e.target.value)} value={description} id="w3review" name="w3review" rows="4" type="text" placeholder=" Description here.." style={{ height: '5rem', width: '43rem' }}></textarea>

                                            </form>

                                        </div>
                                        <div className="button">
                                            <button onClick={handleSubmit} type="button" className="btn  btn-md btn-save">Update</button>
                                            <button data-dismiss="modal" onClick={() =>handleBack()} type="button" className="btn btn-md  btn-back">Back</button>

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
export default RuleTypeDetails