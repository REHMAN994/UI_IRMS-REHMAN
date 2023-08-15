import { computeHeadingLevel } from '@testing-library/react';
import { Modal } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { Switch } from "antd";
import Swal from "sweetalert2";
import 'antd/dist/antd.css';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';

const AgencyDetails = () => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic ');
    headers.append('Origin', 'http://localhost:3000');

    const [EditState, setEditState] = useState(
        {
            agencyCode: "",
            agencyName: "",
            uncefactID: "",
        }
    );

    const GetEditMethod = (para) => {
        setagencyCode(para.agencyCode)
        setagencyName(para.agencyName)
        setuncefactID(para.unCefactId)
        setId(para.id)
    }

    const [agencyCode, setagencyCode] = useState("");
    const [uncefactID, setuncefactID] = useState("");
    const [agencyName, setagencyName] = useState("");
    const [Id, setId] = useState("");

    const [count, setCount] = useState(0);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const [data, setData] = useState([]);

    // GET request function to your Mock API
    const fetchData = () => {
        fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + '/AgencyRef/GetAll', requestOptions)
            .then(res => res.json())
            .then(json => setData(json));
    }

    const [search, setSearch] = useState("");
    const [swicth, setSwitch] = useState(true);

    // Calling the function on component mount
    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

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
                    "agencyCode": agencyCode,
                    "agencyName": agencyName,
                    "unCefactId": uncefactID,
                });

                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + '/AgencyRef/Update', requestOptions)
                .then(response => response.text())
                .then((result) =>{ 
                    if(result!= ''){
                        //const data = JSON.parse(result);
                        toast.success("Updated Successfully");
                        window.location.reload(true);
                    }
                    else{
                        // Swal.fire({
                        //     icon: 'error',
                        //     title: 'Oops...',
                        //     text : "Agency Code Already Exists"
                        // })
                        toast.error("Agency Code Already Exists");
                            
            
                    } 
    
                })    
                // .then(response => response.text())
                    // .then((result) => {
                    //     debugger;
                    //     const data = JSON.parse(result);
                    //     console.log(data);
                    //     if (data.active == 'DuplicateUpdate AgencyRef') {
                    //         Swal.fire({
                    //             icon: 'error',
                    //             title: 'Oops...',
                    //             text: "Agency Code Already Exists"
                    //         })


                    //     } else if (data.active = 'Y') {
                    //         Swal.fire('Updated Successfully', '', 'success')
                    //         window.location.reload(true);
                    //     } else
                    //         Swal.fire(' Cancelled', '', 'error')
                    // });



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

                fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + '/AgencyRef/Remove?id=' + id, requestOptions)
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
                        // Swal.fire('Your file has been deleted', '', 'success')
                        // .then((result) => {
                        //     if (result.isConfirmed) {
                        //        window.location.reload(true);
            
                        //     }else{
                        //         Swal.fire(' Cancelled', '', 'error')
                        //     }
                        // }
                        //     )
                        toast.success("Your file has been deleted");
                        window.location.reload(true);
                    }
                })
            }
        })
    }

    const handleswitch = (e) => {

    }

    //Pagination
    const [pageNumber, setPageNumber] = useState(0);
    const [serielNum, setSerielNum] = useState(1);
    const dataPerPage = 10;
    const dataVisited = pageNumber * dataPerPage;

    for (var i = 0; i < data.length; i++) {
        data[i]["sno"] = i + 1;
    }


    const displayData = data.slice(dataVisited, dataVisited + dataPerPage).filter((item) => item.agencyCode.toLowerCase().includes(search.toLowerCase()) || item.agencyName.toLowerCase().includes(search.toLowerCase())).map((item, index) => (
        <tr key={item.id}>
            <th scope="row">{item.sno}</th>
            <td>{item.agencyCode}</td>
            <td>{item.unCefactId}</td>
            <td>{item.agencyName}</td>
            {/* <td><Switch defaultChecked={swicth} onChange={() => handleswitch(item.id)} /> </td> */}
            <td><button onClick={() => GetEditMethod(item)} data-toggle="modal" data-target="#myModal" style={{ border: 'none' }}><i className="fas fa-edit"></i></button> <i onClick={(e) => DeleteMethod(item.id)} class="fa fa-trash ml-2" aria-hidden="true"></i></td>

        </tr>
    ));
    const PageCount = Math.ceil(data.length / dataPerPage);
    const chnagePage = ({ selected }) => {
        setPageNumber(selected);
    }
    //Pagination 
    return (
        <div>
               <ToastContainer />
            <div className="row" >
                <div className="col-md-10 col-lg-10">
                    <section id="card">
                        <div className="well">
                            <h1> Agency Details </h1>
                            <div className='searchdiv'>

                                <input placeholder='Search' className='input' onChange={(e) => setSearch(e.target.value)} value={search} />
                            </div>
                            <table className="table table-striped" style={{ marginTop: "1rem" }}>
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Agency Code</th>
                                        <th scope="col">UN/CEFACT</th>
                                        <th scope="col">Agency Name</th>
                                        {/* <th scope="col">Status</th> */}
                                        <th scope="col" style={{ width: '100px' }}>Action</th>

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
                                {/* <button type="button" className="btn  btn-md btn-save">Update</button>
                                <button type="button" className="btn btn-md  btn-back">Back</button> */}

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
                                        <h1> Agency Details Edit </h1>
                                        <div className="inner-card">
                                            <form className="ml-auto" method="post">
                                                <div style={{ display: 'flex' }}>
                                                    <div>
                                                        <label>Agency Code <i style={{ color: "red"}}>*</i></label>
                                                        <br />
                                                        <input onChange={(e) => setagencyCode(e.target.value)} value={agencyCode} type="text" style={{ width: '15rem' }} />
                                                    </div>

                                                    <div style={{ marginLeft: '4rem' }}>
                                                        <label>UN/CEFACT<i style={{ color: "red"}}>*</i> </label>
                                                        <br />
                                                        <input onChange={(e) => setuncefactID(e.target.value)} value={uncefactID} type="text" style={{ width: '15rem' }} />
                                                    </div>
                                                </div>
                                                <br />
                                                <label>Agency Name  <i style={{ color: "red"}}>*</i></label>
                                                <br />
                                                <input onChange={(e) => setagencyName(e.target.value)} value={agencyName} type="text" style={{ width: '28rem' }} />

                                            </form>

                                        </div>
                                        <div className="button">
                                            <button onClick={handleSubmit} type="button" className="btn  btn-md btn-save">Update</button>
                                            <button data-dismiss="modal" type="button" className="btn btn-md  btn-back">Cancel</button>

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
export default AgencyDetails