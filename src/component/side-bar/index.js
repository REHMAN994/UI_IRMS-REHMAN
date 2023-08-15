import React from "react";
import { useState } from "react";
import "../side-bar/sidebar.css";
import Accordion from 'react-bootstrap/Accordion';

const Sidebar = () =>{


  const [isActiveMain, setIsActiveMain] = useState (false);
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [isActive4, setIsActive4] = useState(false);
  const [isActive5, setIsActive5] = useState(false);
  const [isActive6, setIsActive6] = useState(false);
  const [isActive7, setIsActive7] = useState(false);
  const [isActive8, setIsActive8] = useState(false);
  const [isActive9, setIsActive9] = useState(false);
  const [isActive10, setIsActive10] = useState(false);
  const [isActive11, setIsActive11] = useState(false);
  const [isActive12, setIsActive12] = useState(false);
  const [isActive13, setIsActive13] = useState(false);
  const [isActive14, setIsActive14] = useState(false);
  const [isActive15, setIsActive15] = useState(false);
  const [isActive16, setIsActive16] = useState(false);
  const [isActive17, setIsActive17] = useState(false);
  const [isActive18, setIsActive18] = useState(false);
  const [isActive21, setIsActive21] = useState(false);
  const [isActive22, setIsActive22] = useState(false);
  const [isActive23, setIsActive23] = useState(false);
  const [isActive24, setIsActive24] = useState(false);
  const [isActive25, setIsActive25] = useState(false);
  const [isActive26, setIsActive26] = useState(false);
  const [isActive27, setIsActive27] = useState(false);
  const [isActive28, setIsActive28] = useState(false);
  const [isActive29, setIsActive29] = useState(false);
  const [isActive30, setIsActive30] = useState(false);


  return (
    // <div className="contaner">
    //   <div style={{ width: '14rem' }}>
    //     <div className="col-md-2 col-lg-2  pl-0 pr-0">
    //       <section id="side-bar">
    //         <nav className="nav  navbar-toggleable-sm navBg">
    //           <div className=" flex-column mt-md-0  pt-md-0  p-0 w-100 container-fluid" id="navbarWEX">

    //             <div className="dropdown">
    //               <button onClick={(e) => setIsActiveMain(!isActiveMain)} className="dropbtn" >Maintenance Table</button>
    //               {isActiveMain && (
    //                 <div id="myDropdown" className="dropdown-content">
    //                   <div className="dropdown">
    //                     <button onClick={(e) => setIsActive(!isActive)} className="dropbtn" >Rule Type Ref</button>
    //                     {isActive && (
    //                       <div id="myDropdown" className="dropdown-content">
    //                         <a href="http://localhost:3000/ruletypecreatepage">Create Rule</a>
    //                         <a href="http://localhost:3000/ruletypedetailspage">Details Rule</a>
    //                         <a href="http://localhost:3000/ruletypedeletepage">Delete Details</a>
    //                       </div>
    //                     )}

    //                   </div>




    //                 {/* ---3red SRS USE Case---
    //             

    //             

    //             <div className="dropdown">
    //               <button onClick={(e) => setIsActive23(!isActive23)} className="dropbtn">  Undelete Risk Rule  <i className="fa fa-caret-down ml-2"></i></button>
    //               {isActive23 && (
    //                 <div className="dropdown-content">
    //                   <a href="http://localhost:3000/">Undelete Deploy Rule </a>
    //                   <a href="http://localhost:3000/">Undelete Risk Rule</a>

    //                 </div>
    //               )}
    //             </div> */}

    //             {/* <a className="nav-link"><i className="fa fa-plus" aria-hidden="true"></i><span>Creating Channels</span></a>
    //             <a className="nav-link"><i className="fa fa-plus" aria-hidden="true"></i><span>Creating List </span></a>
    //             <a className="nav-link"><i className="fa fa-wrench" aria-hidden="true"></i><span>Tools</span></a> */}

    //           </div>
    //         </nav>
    //       </section>
    //     </div>

    //   </div>

    // </div>
    <div>
      <div className="row">
        <div className="col-md-2 col-lg-2  pl-0 pr-0" style={{ width: '14rem'}}>
          <section id="side-bar" className="scroll">
            <nav className="nav  navbar-toggleable-sm">
              <div className="navbar  flex-column " id="navbarWEX" style={{ marginLeft: '1rem' }}>

                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0" style={{backgroundColor: '#5a5e8b', border: 'none',marginRight: '5rem'}}>
                    <Accordion.Header className="acc_css"
                      >Ref Maintenance</Accordion.Header>
                    <Accordion.Body defaultActiveKey="1"className="acc_css" >
                      <div className="dropdown">
                        <button onClick={(e) => setIsActive(!isActive)} className="dropbtn"><i className="fa fa-plus mr-2" aria-hidden="true"></i>Rule Type Ref </button>
                        {isActive && (
                          <div id="myDropdown" className="dropdown-content">
                            <a href={process.env.REACT_APP_API + '/ruletypecreatepage'}> Create Rule</a>
                            <a href={process.env.REACT_APP_API + '/ruletypedetailspage'} > Details Rule</a>
                            {/* <a href="http://localhost:3000/ruletypedeletepage">Delete Rule</a> */}
                            {/* <i className="fa-solid fa-arrow-ture-down-right mr-2" aria-hidden="true"></i>  */}
                          </div>
                        )}
                      </div>
                      <div className="dropdown">
                        <button onClick={(e) => setIsActive2(!isActive2)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i>Threat Rule Ref </button>
                        {isActive2 && (
                          <div className="dropdown-content">
                            <a href={process.env.REACT_APP_API + '/threatrulecreatepage'}>Create Threat Rule</a>
                            <a href={process.env.REACT_APP_API + '/threatruleupdatedetails'}>Details Threat Rule</a>
                            {/* <a href="http://localhost:3000/threatruledeletepage">Delete Threat Rule</a> */}
                          </div>
                        )}
                      </div>

                      <div className="dropdown">
                        <button onClick={(e) => setIsActive3(!isActive3)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i>Condition Ref </button>
                        {isActive3 && (
                          <div class="dropdown-content">
                            <a href={process.env.REACT_APP_API + '/createconditionpage'}>Create Condition </a>
                            <a href={process.env.REACT_APP_API + '/conditiondetailspage'}>Details Condition </a>
                            {/* <a href="http://localhost:3000/deleteconditionpage">Delete Condition</a> */}
                          </div>
                        )}
                      </div>

                      <div className="dropdown">
                        <button onClick={(e) => setIsActive4(!isActive4)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i>Case Type Ref  </button>
                        {isActive4 && (
                          <div className="dropdown-content">
                            <a href={process.env.REACT_APP_API + '/createcasetypage'}>Create Case Type </a>
                            <a href={process.env.REACT_APP_API + '/casetypedetailspage'}>Details Case Type </a>
                            {/* <a href="http://localhost:3000/casetypedeletepage">Delete Case-Type</a> */}
                          </div>
                        )}
                      </div>

                      <div className="dropdown">
                        <button onClick={(e) => setIsActive5(!isActive5)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i>Status Ref </button>
                        {isActive5 && (
                          <div className="dropdown-content">
                            <a href={process.env.REACT_APP_API + '/statuscreatepage'}>Create Status </a>
                            <a href={process.env.REACT_APP_API + '/statusdetailspage'}>Details Status </a>
                            {/* <a href="http://localhost:3000/statusdeletepage">Delete Status</a> */}
                          </div>
                        )}
                      </div>

                      <div className="dropdown">
                        <button onClick={(e) => setIsActive6(!isActive6)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i>Create Doc Type</button>
                        {isActive6 && (
                          <div className="dropdown-content">
                            <a href={process.env.REACT_APP_API + '/createdocument'}>Create Doc Type</a>
                            <a href={process.env.REACT_APP_API + '/createdocfieldpage'}>Create Doc Field </a>
                          </div>
                        )}
                      </div>

                      <div className="dropdown">
                        <button onClick={(e) => setIsActive7(!isActive7)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i> Maintain Doc  </button>
                        {isActive7 && (
                          <div className="dropdown-content">
                            <a href={process.env.REACT_APP_API + '/docupdatetypepage'}>Update Doc Type </a>
                            <a href={process.env.REACT_APP_API + '/docmaintainfieldpage'}>Maintain Doc Field </a>
                            {/* <a href="http://localhost:3000/docaddnewfieldpage">Add New Doc Field</a>
                      <a href="http://localhost:3000/docupdatefieldpage">Update Doc Field</a> */}
                          </div>
                        )}
                      </div>

                      <div className="dropdown">
                        <button onClick={(e) => setIsActive8(!isActive8)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i> Relationships Doc </button>
                        {isActive8 && (
                          <div className="dropdown-content">
                            {/* <a href={process.env.REACT_APP_API+'/primarydoctypepage'}>Primary Doc Type </a> */}
                            <a href={process.env.REACT_APP_API_2 + '/relationshipcreatedocpage'}> Create Doc Relationships </a>
                          </div>
                        )}
                      </div>

                      <div className="dropdown">
                        <button onClick={(e) => setIsActive9(!isActive9)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i> Relationships Up  </button>
                        {isActive9 && (
                          <div className="dropdown-content">
                            {/* <a href={process.env.REACT_APP_API+'/primaryupdatedoctypepage'}>Primary Doc Type </a> */}
                            <a href={process.env.REACT_APP_API_2 + '/relationshipupdatedocpage'}> Update Doc Relationships </a>
                          </div>
                        )}
                      </div>

                      <div className="dropdown">
                        <button onClick={(e) => setIsActive10(!isActive10)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i> Agency Ref </button>
                        {/* <button onClick={()=> window.open('http://localhost:3000/agencydelaispage', "_self")} className="dropbtn"> Agency Ref </button> */}
                        {isActive10 && (
                          <div className="dropdown-content">
                            <a href={process.env.REACT_APP_API_2 + '/agencycreatepage'}>Create Agency </a>
                            <a href={process.env.REACT_APP_API_2 + '/agencydelaispage'}> Details Agency </a>
                            {/* <a href="http://localhost:3000/agencydeletepage"> Delete Details</a> */}
                          </div>
                        )}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                {/* <div className="dropdownn">
                  <button onClick={(e) => setIsActiveMain(!isActiveMain)} className="dropbtn"><i className="fa fa-plus mr-2" aria-hidden="true"></i> </button>
                  {isActiveMain && (
                    <div id="myDropdown" className="dropdown-content">

                      
                    </div>
                  )}
                </div> */}
                <div style={{marginTop:'1rem'}}>
                  <Accordion defaultActiveKey="0" >
                    <Accordion.Item eventKey="0" style={{ backgroundColor: '#5a5e8b', border: 'none', marginRight: '5rem' }}>
                      <Accordion.Header className="acc_css"
                      >Rule Maintenance</Accordion.Header>
                      <Accordion.Body  defaultActiveKey="1"  >
                        <div className="dropdown">
                          <button onClick={(e) => setIsActive11(!isActive11)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i> Create Risk Rule</button>
                          {isActive11 && (
                            <div className="dropdown-content">
                              <a href={process.env.REACT_APP_API_2 + "/riskrulecreatekeypage"}>Create Risk Keys </a>
                              {/* <a href={process.env.REACT_APP_API_2+"/riskrulecraetepage"}>Create Risk Rule </a>
                      <a href={process.env.REACT_APP_API_2+"/riskrulecreatecountpage"}>Create Risk Count</a> */}

                            </div>
                          )}
                        </div>
                        <div className="dropdown">
                          <button onClick={(e) => setIsActive18(!isActive18)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i> Search Risk Rule </button>
                          {isActive18 && (
                            <div className="dropdown-content">
                              <a href={process.env.REACT_APP_API_2 + "/riskrulesearchpage"}>  Search Risk Rule </a>
                              {/* <a href={process.env.REACT_APP_API_2+"/riskruleselectpage"}>  Select Risk Rule </a> */}
                              {/* <a href={process.env.REACT_APP_API_2+"/riskrulereviewpage"}>  Review Risk Rule </a> */}

                            </div>
                          )}
                        </div>

                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
                   
                
                

                {/* <div className="dropdown">
                  <button onClick={(e) => setIsActive12(!isActive12)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i> Create Condition </button>
                  {isActive12 && (
                    <div className="dropdown-content">
                      <a href={process.env.REACT_APP_API_2+"/riskrulecreateconditionpage"}>Create Risk  Condition </a>
                    </div>
                  )}
                </div>

                <div className="dropdown">
                  <button onClick={(e) => setIsActive13(!isActive13)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i>Risk Rule Decision</button>
                  {isActive13 && (
                    <div className="dropdown-content">
                      <a href={process.env.REACT_APP_API_2+"/riskrulecreatedecisionpage"}>Create Risk Decision </a>
                    </div>
                  )}
                </div> */}

                {/* <div className="dropdown">
                  <button onClick={(e) => setIsActive14(!isActive14)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i>Update Risk Rule </button>
                  {isActive14 && (
                    <div className="dropdown-content">
                      <a href={process.env.REACT_APP_API_2+"/riskruleupdatepage"}> Risk Update </a>
                      <a href={process.env.REACT_APP_API_2+"/riskruleupdatecountpage"}> Risk Update Count </a>
                    </div>
                  )}
                </div> */}

                {/* <div className="dropdown">
                  <button onClick={(e) => setIsActive15(!isActive15)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i>Maintain Risk Rule </button>
                  {isActive15 && (
                    <div className="dropdown-content">
                      <a href={process.env.REACT_APP_API_2+"/riskrulemaintainpage"}> Maintain Risk  </a>
                      <a href="http://localhost:3000/riskruleupdatecondiotionpage"> Risk Update Condition </a>
                    </div>
                  )}
                </div> */}
                {/* <div className="dropdown">
                  <button onClick={(e) => setIsActive16(!isActive16)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i>Maintain Risk Decision </button>
                  {isActive16 && (
                    <div className="dropdown-content">
                      <a href={process.env.REACT_APP_API_2+"/riskrulemaintenancedecisonpage"}> Risk Decision </a>
                      <a href={process.env.REACT_APP_API_2+"/riskruleupdatedecisonpage"}> Risk Update Decision </a>
                    </div>
                  )}
                </div> */}
                {/* <div className="dropdown">
                  <button onClick={(e) => setIsActive17(!isActive17)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i>Display Risk Rule </button>
                  {isActive17 && (
                    <div className="dropdown-content">
                      <a href={process.env.REACT_APP_API_2+"/riskruledisplaypage"}>  Display Risk </a>
                      <a href={process.env.REACT_APP_API_2+"/riskruledisplaydetailspage"}>  Display Risk Details </a>
                      <a href={process.env.REACT_APP_API_2+"/riskruledisplayContpage"}>  Display Risk Count </a>
                      
                    </div>
                  )}
                </div> */}

                <div style={{ marginTop: '1rem' }}>
                  <Accordion defaultActiveKey="0" >
                    <Accordion.Item eventKey="0" style={{ backgroundColor: '#5a5e8b', border: 'none', marginRight: '5rem' }}>
                      <Accordion.Header className="acc_css"
                      >Rule Administrator</Accordion.Header>
                      <Accordion.Body defaultActiveKey="1"  >
                       
                        <div className="dropdown">
                          <button onClick={(e) => setIsActive22(!isActive22)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i> Deploy Risk Rule </button>
                          {isActive22 && (
                            <div className="dropdown-content">
                              <a href={process.env.REACT_APP_API_3 + "/deployriskrulepage"}>Deploy Risk Rule </a>
                              {/* <a href={process.env.REACT_APP_API_3 + "/alreadydeployeriskrulepage"}>Already Deployed Rule</a> */}

                            </div>
                          )}
                        </div>
                        <div className="dropdown">
                          <button onClick={(e) => setIsActive21(!isActive21)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i> Delete Risk Rule </button>
                          {isActive21 && (
                            <div className="dropdown-content">
                              <a href={process.env.REACT_APP_API_3 + "/listofriskruledelete"}>Delete Risk Rule </a>
                              {/* <a href={process.env.REACT_APP_API_3 + "/riskruledeleteundeployedpage"}> Delete Undeployed </a> */}

                            </div>
                          )}
                        </div>
                        <div className="dropdown">
                          <button onClick={(e) => setIsActive23(!isActive23)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i>  Undelete Risk Rule  </button>
                          {isActive23 && (
                            <div className="dropdown-content">
                              <a href={process.env.REACT_APP_API_3 + "/listofRiskRuleUnDelete"}>Undelete Deploy Rule </a>
                              {/* <a href={process.env.REACT_APP_API_3 + "/riskruleundeletepage"}>Undelete Risk Rule</a> */}

                            </div>
                          )}
                        </div>
                        {/* <div className="dropdown">
                          <button onClick={(e) => setIsActive24(!isActive24)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i> Review Risk Revisions </button>
                          {isActive24 && (
                            <div className="dropdown-content">
                              <a href={process.env.REACT_APP_API_3 + "/reviewrulerevisionspage"}>Review Risk Revisions </a>

                            </div>
                          )}
                        </div> */}
                        <div className="dropdown">
                          <button onClick={(e) => setIsActive25(!isActive25)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i> Threshold Revisions </button>
                          {isActive25 && (
                            <div className="dropdown-content">
                              <a href={process.env.REACT_APP_API_3 + "/thresholdrevisioncreatepage"}>Create Revision </a>
                              {/* <a href={process.env.REACT_APP_API_3 + "/thresholdconditioncreatepage"}>Create Condition </a> */}

                            </div>
                          )}
                        </div>
                        <div className="dropdown">
                          <button onClick={(e) => setIsActive26(!isActive26)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i> Modify Threshold </button>
                          {isActive26 && (
                            <div className="dropdown-content">
                              <a href={process.env.REACT_APP_API_3 + "/modifythresholdrevisionpage"}>Modify Revision </a>
                              {/* <a href={process.env.REACT_APP_API_3 + "/modifythresholdconditionpage"}>Modify Condition </a> */}

                            </div>
                          )}
                        </div>

                        <div className="dropdown">
                          <button onClick={(e) => setIsActive27(!isActive27)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i> Display Threshold </button>
                          {isActive27 && (
                            <div className="dropdown-content">
                              <a href={process.env.REACT_APP_API_3 + "/displaythresholdrevisionpage"}>Display Revision </a>
                              {/* <a href={process.env.REACT_APP_API_3 + "/displaythresholdconditionpage"}>Display Condition </a> */}

                            </div>
                          )}
                        </div>
                        <div className="dropdown">
                          <button onClick={(e) => setIsActive28(!isActive28)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i> Deploy Threshold </button>
                          {isActive28 && (
                            <div className="dropdown-content">
                              <a href={process.env.REACT_APP_API_3 + "/deploythresholdrevisionpage"}>Deploy Revision </a>
                              {/* <a href={process.env.REACT_APP_API_3 + "/deploythresholdconditionpage"}>Deploy Condition </a> */}

                            </div>
                          )}
                        </div>
                        <div className="dropdown">
                          <button onClick={(e) => setIsActive29(!isActive29)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i> Delete Threshold </button>
                          {isActive29 && (
                            <div className="dropdown-content">
                              <a href={process.env.REACT_APP_API_3 + "/deletethresholdrevisionpage"}>Delete Revision </a>
                              {/* <a href={process.env.REACT_APP_API_3 + "/deletethresholdconditionpage"}>Delete Condition </a> */}

                            </div>
                          )}
                        </div>
                        {/* <div className="dropdown">
                          <button onClick={(e) => setIsActive30(!isActive30)} className="dropbtn"><i class="fa fa-plus mr-2" aria-hidden="true"></i> Review Threshold </button>
                          {isActive30 && (
                            <div className="dropdown-content">
                              <a href={process.env.REACT_APP_API_3 + "/reviewthresholdrevisionpage"}> Review Revision </a>

                            </div>
                          )}
                        </div> */}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
                
                

              </div>
            </nav>
          </section>
        </div>
      </div>
    </div>
  )
}
export default Sidebar