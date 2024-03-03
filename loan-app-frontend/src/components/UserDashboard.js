import React, { useEffect, useState } from 'react'
import Drawer from './Drawer'
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSnackbar } from 'notistack';

const UserDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [userId, setUserId] = localStorage.getItem('userId')
  const { enqueueSnackbar } = useSnackbar();

  // const createLoan = async (amount, term, userId) => {
  //   try {
  //     const response = await axios.post('http://localhost:3001/loans', {
  //       userId,
  //       amount,
  //       term,
  //       scheduledRepayments: [
  //         { date: '2023-02-14', amount: 3333.33, status: 'PENDING' },
  //         { date: '2023-02-21', amount: 3333.33, status: 'PENDING' },
  //         { date: '2023-02-28', amount: 3333.34, status: 'PENDING' },
  //       ],
  //       status: 'PENDING',
  //     });
  
  //     console.log('Loan created:', response.data);
  //   } catch (error) {
  //     console.error('Error creating loan:', error);
  //   }
  // };
  
  // // Example usage:
  // createLoan(10000, 3, 3);

  useEffect(()=>{
    fetchUserLoanRequests();
  },[])

  const fetchUserLoanRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:3001/loans");
      const userData = response.data;
      const loans = userData.filter(loan => loan.userId === parseInt(userId));
      setData(loans);
    } catch (error) {
      enqueueSnackbar('Error fetching user data', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }
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
          {data.length >=1 ? (
            <>
            {data.map((val, key) => (
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell></TableCell>
            <TableCell></TableCell>
              <TableCell component="th" scope="row">{val.amount}</TableCell>
              <TableCell align="right">{val.term}</TableCell>
              <TableCell align="right">{val.status === "PENDING" ? "Loan Requested, Admin Aproval Pending" : "Loan Approved"}</TableCell>
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

export default UserDashboard