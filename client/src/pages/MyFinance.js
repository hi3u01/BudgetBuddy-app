import React from 'react';
import '../css/MyFinance.css'; 
import FinanceForm from '../FinanceForm';
import FinanceGrid from '../FinanceGrid';

function SavingPlan() {
  return (
    <div className="App">
      <div className ="contentContainer">
        <div className="financeRecord">
            <FinanceGrid/>
        </div>
        <div className = "formContainer">
            <FinanceForm/>
        </div>
      </div>
    </div>
  );
}
  
export default SavingPlan;
