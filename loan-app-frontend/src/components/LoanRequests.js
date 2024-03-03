import React, { useState } from 'react';
import Drawer from './Drawer';
import { useSnackbar } from 'notistack';
import axios from "axios";

const LoanRequests = () => {
  const [formData, setFormData] = useState({
    amount: '',
    term: '',
  });
  const [loans, setLoans] = useState([])

  const userId = localStorage.getItem('userId');
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateRepayments = (amount, term) => {
    const weeklyRepayment = amount / term;
    const currentDate = new Date();
    const scheduledRepayments = [];

    for (let i = 1; i <= term; i++) {
      const repaymentDate = new Date(currentDate);
      repaymentDate.setDate(repaymentDate.getDate() + i * 7); // Assuming weekly repayments
      const formattedDate = repaymentDate.toISOString().split('T')[0];

      scheduledRepayments.push({
        id: i,
        date: formattedDate,
        amount: weeklyRepayment.toFixed(2),
        status: 'PENDING',
      });
    }

    return scheduledRepayments;
  };

  const handleLoanRequest = async (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.term) {
      enqueueSnackbar('Amount and term are required', { variant: 'error' });
      return;
    }

    const newLoan = {
      userId: parseInt(userId),
      amount: parseInt(formData.amount),
      term: parseInt(formData.term),
      scheduledRepayments: calculateRepayments(
        parseInt(formData.amount),
        parseInt(formData.term)
      ),
      status: 'PENDING',
    };

    try {
      // Send a POST request to add the new loan
      const response = await axios.post('http://localhost:3001/loans', newLoan);

      if (response.status === 201) {
        enqueueSnackbar('Loan request submitted successfully', { variant: 'success' });
        console.log(response)
        setFormData({
          amount: '',
          term: '',
        });

        setLoans([...loans, newLoan]);
      } else {
        enqueueSnackbar('Failed to submit loan request', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Error submitting loan request', { variant: 'error' });
    }
  };

  return (
    <>
      <Drawer />
      <div style={{border: "1px solid black",}}>
      <div style={{display: "flex", textAlign: "center", "justifyContent": "center"}}>
        <h3 >Request For Loan</h3>
      </div>
      <div style={{display: "flex", textAlign: "center", "justifyContent": "center"}}>
      
      <form onSubmit={handleLoanRequest}>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Term:
          <input
            type="number"
            name="term"
            value={formData.term}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit Loan Request</button>
      </form>
      </div>
      </div>
    </>
  );
};

export default LoanRequests;
