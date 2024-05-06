import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function FinanceForm() {
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [categoryIdOptions, setCategoryIdOptions] = useState([]);
  const [savingPlanIdOptions, setSavingPlanIdOptions] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedSavingPlanId, setSelectedSavingPlanId] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/category/list')
      .then(response => response.json())
      .then(categories => setCategoryIdOptions(categories.map(category => ({ id: category.id, name: category.Name }))));

    fetch('http://localhost:8000/savingPlan/list')
      .then(response => response.json())
      .then(savingPlans => setSavingPlanIdOptions(savingPlans.map(savingPlan => ({ id: savingPlan.id, name: savingPlan.Name }))));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/finance/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, amount: parseFloat(amount), date, place, categoryId: selectedCategoryId, savingPlanId: selectedSavingPlanId }),
      });
      if (response.ok) {
        alert('Finance record created successfully!');
        setType('');
        setAmount('');
        setDate('');
        setPlace('');
        setSelectedCategoryId('');
        setSelectedSavingPlanId('');
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
          <h2>New Finance Record</h2>
          <Form.Group controlId="formType">
            <Form.Label>Type:</Form.Label>
            <Form.Control
              as="select"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Select type</option>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formAmount">
            <Form.Label>Amount:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDate">
            <Form.Label>Date:</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPlace">
            <Form.Label>Place:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formCategoryId">
            <Form.Label>Category:</Form.Label>
            <Form.Control
              as="select"
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
            >
              <option value="">Select category</option>
              {categoryIdOptions.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formSavingPlanId">
            <Form.Label>Saving Plan:</Form.Label>
            <Form.Control
              as="select"
              value={selectedSavingPlanId}
              onChange={(e) => setSelectedSavingPlanId(e.target.value)}
            >
              <option value="">Select saving plan</option>
              {savingPlanIdOptions.map(savingPlan => (
                <option key={savingPlan.id} value={savingPlan.id}>{savingPlan.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
} 

export default FinanceForm;
