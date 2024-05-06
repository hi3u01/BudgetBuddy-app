import React, { useState } from 'react';

function DateFilter({ onDataFilterChange }) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleDateFilterChange = () => {
        onDataFilterChange(startDate, endDate);
    };

    return (
        <div>
            <label htmlFor="startDate">FROM:</label>
            <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} />

            <label htmlFor="endDate">TO:</label>
            <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} />

            <button onClick={handleDateFilterChange}>APPLY DATE</button>
        </div>
    );
}

export default DateFilter;
