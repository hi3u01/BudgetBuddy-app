import React, { useState, useEffect } from 'react';
import './css/Home.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';

function SavingPlanBar() {
  const [savingPlans, setSavingPlans] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/savingPlan/list')
      .then(response => response.json())
      .then(data => setSavingPlans(data))
      .catch(error => console.error('Error fetching saving plans:', error));
  }, []); 

  const handleDeletePlan = (id) => {
    const isConfirmed = window.confirm("Are you sure to delete this saving plan?");
    if (!isConfirmed) return; 
  
    fetch('http://localhost:8000/savingPlan/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    })
    .then(response => {
      if(response.ok) {
        setSavingPlans(savingPlans.filter(plan => plan.id !== id));
      }
    })
    .catch(error => console.error('Error deleting saving plan:', error));
  };
  
  
  return (
    <div className="SavingPlanBar">
      {savingPlans.map((item, index) => (
        <div key={item.id} style={{ marginBottom: '20px' }}>
          <h4 style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span><strong>{item.Name}</strong></span>
            <small style={{ fontSize: '0.6em', display: 'flex', alignItems: 'center' }}>
              <span>
                goal amount: <strong>{item.goalAmount}</strong> / saved amount: <strong>{item.savedAmount}</strong>
              </span>
              <Icon path={mdiDelete} size={1} onClick={() => handleDeletePlan(item.id)} style={{ marginLeft: '5px', cursor: 'pointer' }} />
            </small>
          </h4>
          <div style={{ marginBottom: '40px' }}>
            <ProgressBar
              now={item.savedAmount / item.goalAmount * 100} 
              label={`${(item.savedAmount/item.goalAmount)*100}`+'%'}
              style={{ height: '40px'}} 
            />
          </div>
        </div>
      ))}
    </div>
  );

}
export default SavingPlanBar;
