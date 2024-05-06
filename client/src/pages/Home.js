import React, { useState } from 'react';
import Diagram from '../Diagram';
import SavingPlanBar from '../SavingPlanBar';
import DateFilter from '../DateFilter'; 
import '../css/Home.css'; 

function Home() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDataFilterChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="home">
      <div className="contentContainer">
        <div className="dateFilterContainer">
          <DateFilter onDataFilterChange={handleDataFilterChange} />
          <div className="diagramContainer">
            <Diagram startDate={startDate} endDate={endDate} />
          </div>
        </div>
        <div className="barsContainer">
          <SavingPlanBar />
        </div>
      </div>
    </div>
  );
}
  
export default Home;
