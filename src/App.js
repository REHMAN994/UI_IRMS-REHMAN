import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from "./component/Login";
// import CreatChanel from "./component/pages/creatchanelpage";
import CreateDocument from "./component/pages/creatdocpage";
import CreateDocumentFieldpage from "./component/pages/cretedocfieldpage";
// import CreateValue from "./component/pages/creatvaluepage";

import CreateThreatRulePage from "./component/pages/createtheaterulepage";
import ThreatRuleUpdateDetails from "./component/pages/threadruledetailspage";
import ThreatRuleDeletepage from "./component/pages/threadruledeletepage";
import ThreatRuleSelectPage from "./component/pages/threadruleselectpage";
import CreateConditionPage from "./component/pages/createconditionpage";
import DeleteConditionPage from "./component/pages/deleteconditionpage";
import SelectConditionPage from "./component/pages/selectconditionpage";
import ConditionDetailsPage from "./component/pages/conditiondetailspage";
import RuleTypeDetailsPage from "./component/pages/ruletypedetailspage";
import RuleTypeCreatePage from "./component/pages/ruletypecreatepage";
import RuleTypeDeletePage from "./component/pages/ruletypedeletepage";
import RuleTypeSelectPage from "./component/pages/ruletypeselectpage";
import CreateCaseTypePage from "./component/pages/createcasetypepage";
import CaseTypeDeletePage from "./component/pages/casetypedeletepage";
import CaseTypeSelectPage from "./component/pages/casetypeselectpage";
import CaseTypeDetailsPage from "./component/pages/casetypedetailpage";
import StatusCreatePage from "./component/pages/statuscreatepage";
import StatusSelectPage from "./component/pages/statusselectpage";
import StatusDeletePage from "./component/pages/statusdeletepage";
import StatusDetailPage from "./component/pages/statusdetailpage";
import DocAddNewFieldPage from "./component/pages/docaddnewfieldpage";
import DocMaintainFieldPage from "./component/pages/docmaintainfieldpage";
import DocUpdateFieldPage from "./component/pages/docupdatefieldpage";
import DocUpdateTypePage from "./component/pages/docupdatetypepage";
import PrimaryDocTypePage from "./component/pages/Primarydoctype";
import RelationshipCreateDocPage from "./component/pages/relationshipcreatedoc";
import PrimaryUptadeDocTypePage from "./component/pages/primaryupdatedoctype";
import RelationshipUpdateDocPage from "./component/pages/relationshipupdatedoc";
import AgencyCreatePage from "./component/pages/agencycreatepage";
import AgencyDeletePage from "./component/pages/agencydeletepage";
import AgencySelectPage from "./component/pages/agencyselectpage";
import AgencyDetailsPage from "./component/pages/agencydetailspage";
import RiskRuleDeleteLivePage from "./component/pages/riskruledeletelive";
import RiskRuleDeleteUndeployedPage from "./component/pages/riskruledeleteundeployed";
import DeployRiskRulePage from "./component/pages/deployriskrulepage";
import AlreadyDeployRiskRulePage from "./component/pages/deployealreadyriskrule";
import RiskRuleCreatePage from "./component/pages/riskrulecarete";
import RiskRuleCreateCountPage from "./component/pages/riskrulcreatecountpage";
import RiskRuleCreateKeyPage from "./component/pages/riskrulecreatekey";
import RiskRuleCreateConditionPage from "./component/pages/riskruleconditionpage";
import RiskRuleCreateDecisionPage from "./component/pages/riskrulecreatedecisionpage";
import RiskRuleUpdatePage from "./component/pages/riskruleupdatepage";
import RiskRuleUpdateCountPage from "./component/pages/riskruleupdatecountpage";
import RiskRuleMaintainPage from "./component/pages/riskrulemaintainpage";
import RiskRulepUpdateConditionPage from "./component/pages/riskruleupdatecondition";
import RiskRuleMaintenanceDecisionPage from "./component/pages/riskrulemaintenancedecisionpage";
import RiskRuleUpdateDecisionPage from "./component/pages/riskruleupdatedecisonpage";
import RiskRuleDisplayPage from "./component/pages/riskruledisplaypage";
import RiskRuleDisplayDetailsPage from "./component/pages/riskruledisplaydetails";
import RiskRuleDisplayCountPage from "./component/pages/riskruledisplaycount";
import RiskRuleSearchPage from "./component/pages/riskrulesearchpage";
import RiskRuleSelectPage from "./component/pages/riskruleselectpage";
import RiskRuleReviewPage from "./component/pages/riskrulereviewpage";
import RiskRuleUndeleteDeployedPage from "./component/pages/riskruleundeletedeployedpage";
import RiskRuleUndeletePage from "./component/pages/riskruleundeletepage";
import ReviewRuleRevisionsPage from "./component/pages/reviewrulerevisionspage";
import ThresholdConditionsCreatePage from "./component/pages/thresholdconditionscreatepage";
import ThresholdRevisionCreatePage from "./component/pages/thresholdrevisioncreatepage";
import ModifyThresholdRevisionPage from "./component/pages/modifythresholdrevisionpage";
import ModifyThresholdConditionPage from "./component/pages/modifythresholdconditionpage";
import DisplayThresholdConditionPage from "./component/pages/displaytharesholdcondition";
import DisplayThresholdRevisionPage from "./component/pages/displaythresholdrevision";
import DeployThresholdConditionPage from "./component/pages/deploythresholdcondition";
import DeployThresholdRevisionPage from "./component/pages/deploytharesholdrevision";
import DeleteThresholdRevisionPage from "./component/pages/deletethresholdrevision";
import DeleteThresholdConditionPage from "./component/pages/deletethresholdcondition";
import ReviewThresholdRevisionPage from "./component/pages/reviewthresholdrevision";
import LandingPage from "./component/pages/landingpage";



import DisplayRiskRule from "./component/pages/displayriskrule";
import DisplayRiskRuleCondition from "./component/pages/displayriskrulecondition";
import DisplayRiskRuleDecision from "./component/pages/displayriskruledecision";
import DisplayRiskRuleCount from "./component/pages/displayriskrulecount";


import RiskRuleUpdateforCreate from "./component/pages/riskrulekeysupdateforcreate";
import RiskRuleConditionUpdateforCreate from "./component/pages/riskruleconditionupdateforcreate";
import RiskRuleCountUpdateforCreate from "./component/pages/riskruleupdateafterCreate";
import RiskRuleDecisionUpdateforCreate from "./component/pages/riskruledecisionupdateforcreate";


import ListRiskRuleDeleteCard from "./component/pages/liftofriskruledelete";

import ListofUndeleteRiskRule from "./component/pages/listofundeleteriskrule";

function App() {
  return (
    <Router>
      <Switch>
        {/* <Route path="/Home" component={Main_Home} exact/> */}
        <Route path='/login' component={Login} exact />
        <Route path='/landingpage' component={LandingPage} exact />

        {/* New Screens */}
        <Route path='/displayriskrule' component={DisplayRiskRule} exact />
        <Route path='/displayriskrulecondition' component={DisplayRiskRuleCondition} exact />
        <Route path='/displayriskruledecision' component={DisplayRiskRuleDecision} exact />
        <Route path='/displayriskrulecount' component={DisplayRiskRuleCount} exact />


        <Route path='/updateRiskRuleKeysAfterCreate' component={RiskRuleUpdateforCreate} exact />
        <Route path='/updateRiskRuleConditionAfterCreate' component={RiskRuleConditionUpdateforCreate} exact />
        <Route path='/updateRiskRuleCountAfterCreate' component={RiskRuleCountUpdateforCreate} exact />
        <Route path='/updateRiskRuleDecisionAfterCreate' component={RiskRuleDecisionUpdateforCreate} exact />


        <Route path='/listofRiskRuleDelete' component={ListRiskRuleDeleteCard} exact />

        <Route path='/listofRiskRuleUnDelete' component={ListofUndeleteRiskRule} exact />

        {/* <Route path='/createchanal' component={CreatChanel} exact /> */}
        {/* <Route path='/createvalue' component={CreateValue} exact /> */}
        <Route path='/threatruleupdatedetails' component={ThreatRuleUpdateDetails} exact />
        <Route path='/threatrulecreatepage' component={CreateThreatRulePage} exact />
        <Route path='/threatruledeletepage' component={ThreatRuleDeletepage} exact />
        <Route path='/threatruleselectpage' component={ThreatRuleSelectPage} exact />
        <Route path='/createconditionpage' component={CreateConditionPage} exact />
        <Route path='/deleteconditionpage' component={DeleteConditionPage} exact />
        <Route path='/selectconditionpage' component={SelectConditionPage} exact />
        <Route path='/conditiondetailspage' component={ConditionDetailsPage} exact />
        <Route path='/ruletypedetailspage' component={RuleTypeDetailsPage} exact />
        <Route path='/ruletypecreatepage' component={RuleTypeCreatePage} exact />
        <Route path='/ruletypedeletepage' component={RuleTypeDeletePage} exact />
        <Route path='/ruletypeselectpage' component={RuleTypeSelectPage} exact />
        <Route path='/createcasetypage' component={CreateCaseTypePage} exact />
        <Route path='/casetypedeletepage' component={CaseTypeDeletePage} exact />
        <Route path='/casetypeselectpage' component={CaseTypeSelectPage} exact />
        <Route path='/casetypedetailspage' component={CaseTypeDetailsPage} exact />
        <Route path='/statuscreatepage' component={StatusCreatePage} exact />
        <Route path='/statusselectpage' component={StatusSelectPage} exact />
        <Route path='/statusdeletepage' component={StatusDeletePage} exact />
        <Route path='/statusdetailspage' component={StatusDetailPage} exact />
        <Route path='/createdocument' component={CreateDocument} exact />
        <Route path='/createdocfieldpage' component={CreateDocumentFieldpage} exact />
        <Route path='/docaddnewfieldpage' component={DocAddNewFieldPage} exact />
        <Route path='/docmaintainfieldpage' component={DocMaintainFieldPage} exact />
        <Route path='/docupdatefieldpage' component={DocUpdateFieldPage} exact />
        <Route path='/docupdatetypepage' component={DocUpdateTypePage} exact />
        <Route path='/primarydoctypepage' component={PrimaryDocTypePage} exact />
        <Route path='/relationshipcreatedocpage' component={RelationshipCreateDocPage} exact />
        <Route path='/primaryupdatedoctypepage' component={PrimaryUptadeDocTypePage} exact />
        <Route path='/relationshipupdatedocpage' component={RelationshipUpdateDocPage} exact />
        <Route path='/agencycreatepage' component={AgencyCreatePage} exact />
        <Route path='/agencyselectpage' component={AgencySelectPage} exact />
        <Route path='/agencydeletepage' component={AgencyDeletePage} exact />
        <Route path='/agencydelaispage' component={AgencyDetailsPage} exact />
        <Route path='/riskruledeletelivepage' component={RiskRuleDeleteLivePage} exact />
        <Route path='/riskruledeleteundeployedpage' component={RiskRuleDeleteUndeployedPage} exact />
        <Route path='/deployriskrulepage' component={DeployRiskRulePage} exact />
        <Route path='/alreadydeployeriskrulepage' component={AlreadyDeployRiskRulePage} exact />
        <Route path='/riskrulecraetepage' component={RiskRuleCreatePage} exact />
        <Route path='/riskrulecreatecountpage' component={RiskRuleCreateCountPage} exact />
        <Route path='/riskrulecreatekeypage' component={RiskRuleCreateKeyPage} exact />
        <Route path='/riskrulecreateconditionpage' component={RiskRuleCreateConditionPage} exact />
        <Route path='/riskrulecreatedecisionpage' component={RiskRuleCreateDecisionPage} exact />
        <Route path='/riskruleupdatepage' component={RiskRuleUpdatePage} exact />
        <Route path='/riskruleupdatecountpage' component={RiskRuleUpdateCountPage} exact />
        <Route path='/riskrulemaintainpage' component={RiskRuleMaintainPage} exact />
        <Route path='/riskruleupdatecondiotionpage' component={RiskRulepUpdateConditionPage} exact />
        <Route path='/riskrulemaintenancedecisonpage' component={RiskRuleMaintenanceDecisionPage} exact />
        <Route path='/riskruleupdatedecisonpage' component={RiskRuleUpdateDecisionPage} exact />
        <Route path='/riskruledisplaypage' component={RiskRuleDisplayPage} exact />
        <Route path='/riskruledisplaydetailspage' component={RiskRuleDisplayDetailsPage} exact />
        <Route path='/riskruledisplayContpage' component={RiskRuleDisplayCountPage} exact />
        <Route path='/riskrulesearchpage' component={RiskRuleSearchPage} exact />
        <Route path='/riskruleselectpage' component={RiskRuleSelectPage} exact />
        <Route path='/riskrulereviewpage' component={RiskRuleReviewPage} exact />
        <Route path='/riskruleundeletedeployedpage' component={RiskRuleUndeleteDeployedPage} exact />
        <Route path='/riskruleundeletepage' component={RiskRuleUndeletePage} exact />
        <Route path='/reviewrulerevisionspage' component={ReviewRuleRevisionsPage} exact />
        <Route path='/thresholdconditioncreatepage' component={ThresholdConditionsCreatePage} exact />
        <Route path='/thresholdrevisioncreatepage' component={ThresholdRevisionCreatePage} exact />
        <Route path='/modifythresholdrevisionpage' component={ModifyThresholdRevisionPage} exact />
        <Route path='/modifythresholdconditionpage' component={ModifyThresholdConditionPage} exact />
        <Route path='/displaythresholdconditionpage' component={DisplayThresholdConditionPage} exact />
        <Route path='/displaythresholdrevisionpage' component={DisplayThresholdRevisionPage} exact />
        <Route path='/deploythresholdconditionpage' component={DeployThresholdConditionPage} exact />
        <Route path='/deploythresholdrevisionpage' component={DeployThresholdRevisionPage} exact />
        <Route path='/deletethresholdrevisionpage' component={DeleteThresholdRevisionPage} exact />
        <Route path='/deletethresholdconditionpage' component={DeleteThresholdConditionPage} exact />
        <Route path='/reviewthresholdrevisionpage' component={ReviewThresholdRevisionPage} exact />
      </Switch>
    </Router>
  );
}

export default App;
