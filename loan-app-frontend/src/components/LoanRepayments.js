import React, { useEffect } from 'react'
import Drawer from './Drawer'
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const LoanRepayments = () => {
  const userId = localStorage.getItem('userId');
  const [repayments, setRepayments] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (userId) {
      fetchRepayments();
    }
  }, [userId, enqueueSnackbar]);

  const fetchRepayments = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/repayments?userId=${userId}`);
      setRepayments(response.data);
      console.log(response.data)
    } catch (error) {
      enqueueSnackbar('Error fetching repayment data', { variant: 'error' });
    }
  };
  return (
    <>
      <Drawer/>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell>Amount</TableCell>
            <TableCell align="right">Term</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {repayments.length >=1 ? (
            <>
            {repayments.map((val, key) => (
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell></TableCell>
            <TableCell></TableCell>
              <TableCell component="th" scope="row">{val.amount}</TableCell>
              <TableCell align="right">{val.term}</TableCell>
              <TableCell align="right">{val.status}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
            </>
          ) : (
            <p>No data found</p>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default LoanRepayments