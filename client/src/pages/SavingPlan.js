import React from 'react';
import SavingPlanBar from '../SavingPlanBar';
import SavingPlanForm from '../SavingPlanForm'; 
import '../css/SavingPlan.css'; 

function SavingPlan() {
  return (
    <div className="App">
      <div className ="contentContainer">
        <div className="barsContainer">
          <SavingPlanBar />
        </div>
        <div className = "formContainer">
            <SavingPlanForm/>
        </div>
      </div>
    </div>
  );
}
  
export default SavingPlan;
