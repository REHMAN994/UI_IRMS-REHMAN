import React, {useEffect, useState} from 'react';
import { Switch } from "antd";
import 'antd/dist/antd.css';
import { Modal } from 'bootstrap';
import Swal from "sweetalert2";
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';


const ThreatRuleDetails = () => {
    let headers = new Headers();    
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic ');
    headers.append('Origin','http://localhost:3000');

    const [EditState, setEditState] = useState(
        {
            threatGroup:"",
            description:"",
        }
    );

    const [search, setSearch] = useState("");
    const [swicth,setSwitch] = useState(true);


    const [threatGroup1, setThreatGroup] = useState("");
    const [description, setDescription] = useState("");
    const [Id, setId] = useState("");

    const GetEditMethod = (para) => {
            setThreatGroup(para.threatGroup1)
            setDescription(para.description)
            setId(para.id)
    
    }

    // const [threatGroup, setThreatGroup] = useState(EditState.threatGroup);
    // const [description, setDescription] = useState(EditState.description);
    // const [Id, setId] = useState("");

    const [count, setCount] = useState(0);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
    const [data, setData] = useState([]);

    // GET request function to your Mock API
    const fetchData = () => {
        fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE+'/ThreatGroup/GetAll', requestOptions)
            .then(res => res.json())
            .then(json => setData(json));
    }
    
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
                    "ThreatGroup1": threatGroup1,
                    "Description": description
                });

                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE + '/ThreatGroup/Update', requestOptions)
                .then(response => response.text())
                .then((result) =>{ 
                    debugger;
                    if(result!= ''){
                        //const data = JSON.parse(result);
                        toast.success("Updated Successfully");
                        window.location.reload(true);
                    }
                    else{
                        // Swal.fire({
                        //     icon: 'error',
                        //     title: 'Oops...',
                        //     text : "Threat Group Already Exists"
                        // })
                        toast.error("Threat Group Already Exists");
                            
            
                    } 
    
                })
                //     .then(response => response.text())
                //     .then(result => console.log(result))
                //     .catch(error => console.log('error', error));

                // Swal.fire('Updated Successfully', '', 'success').then((result) => {
                //     /* Read more about isConfirmed, isDenied below */
                //     if (result.isConfirmed) {
                //         window.location.reload(true);

                //     } else
                //         Swal.fire(' Cancelled', '', 'error')

                // })

            }

        })
    }

   const DeleteMethod=(id)=>{
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
              
              fetch(process.env.REACT_APP_IRMS_REFERENCE_TABLE_MAINTENANCE+'/ThreatGroup/Remove?id='+id, requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .then(window.location.reload(true))
                .catch(error => console.log('error', error));
            
        //   Swal.fire(
        //     'Deleted!',
        //     'Your file has been deleted.',
        //     'success'
        //   )
        }
      })
}

const handleswitch = (e) =>{
     
}
 //Pagination
 const [pageNumber,setPageNumber]= useState(0);
 const [serielNum,setSerielNum] = useState(1);
 const dataPerPage = 10;
 const dataVisited = pageNumber * dataPerPage;
 
 for(var i=0;i<data.length;i++){
    data[i]["sno"] = i+ 1;
}


 const displayData =  data.slice(dataVisited,dataVisited+dataPerPage).filter((item) => item.threatGroup1.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase())).map((item , index)=>(
     <tr key={item.id}>
    <th scope="row">{item.sno}</th>
     <td>{item.threatGroup1}</td>
     <td>{item.description}</td>
     {/* <td><Switch defaultChecked={swicth} onChange={() => handleswitch(item.id)} /> </td> */}
     <td><button onClick={()=>GetEditMethod(item)} data-toggle="modal" data-target="#myModal" style={{border:'none'}}><i className="fas fa-edit"></i></button> <i onClick={(e)=>DeleteMethod(item.id)} class="fa fa-trash ml-2" aria-hidden="true"></i></td>

 </tr> 
 ));
 const PageCount = Math.ceil(data.length / dataPerPage);
 const chnagePage = ({ selected }) => {
     setPageNumber(selected);
 }

 const handleBack = () =>{
       
}
 //Pagination
    return(
        <div >
                  <ToastContainer />
            <div className="row" >
                <div className="col-md-10 col-lg-10">
                <section id="card">
                        <div className="well" >
                            <h1> Threat Group Details </h1>
                            <div className='searchdiv'>

                                <input placeholder='Search' className='input' onChange={(e) => setSearch(e.target.value)} value={search} />
                            </div>
                            <table className="table table-striped" style={{marginTop:"1rem"}}>
                                 <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Threat Group</th>
                                        <th scope="col">Description</th>
                                        {/* <th scope="col">Status</th> */}
                                        <th scope="col" style={{width:'100px'}}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {displayData }
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
                                        <h1> Threat Group Edit </h1>
                                        <div className="inner-card">
                                            <form className="ml-auto" method="post">
                                                <div style={{ display: 'flex' }}>
                                                    <div >
                                                        <label>Threat Group <i style={{ color: "red"}}>*</i></label>
                                                        <br />
                                                        <input onChange={(e) => setThreatGroup(e.target.value)} value={threatGroup1} type="text" placeholder="Threat Group" style={{ width: '15rem' }} />
                                                    
                                                    </div>
                                                    
                                                </div>
                                                
                                                <label className="discription" style={{ marginTop: '1rem' }}>Description<i style={{ color: "red"}}>*</i> </label>
                                                <br />
                                                <textarea onChange={(e) => setDescription(e.target.value)} value={description} id="w3review" name="w3review" rows="4" type="text" placeholder=" Description here.." style={{height: '5rem', width:'40rem'}}></textarea>

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
export default ThreatRuleDetails