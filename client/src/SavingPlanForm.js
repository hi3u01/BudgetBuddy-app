import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './css/SavingPlan.css';

function SavingPlanForm() {
  const [Name, setName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/savingPlan/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Name, goalAmount: parseFloat(goalAmount) }), // Převedení na číslo
      });
      if (response.ok) {
        alert('Saving plan created successfully!');
        setName('');
        setGoalAmount('');
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred, please try again later.');
    }
  };

  return (
    <Row className="justify-content-end">
      <Col md={6}>
        <Form onSubmit={handleSubmit} className="form">
          <h2>New Saving Plan</h2>
          <Form.Group controlId="formName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formGoalAmount">
            <Form.Label>Goal Amount:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter goal amount"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default SavingPlanForm;
