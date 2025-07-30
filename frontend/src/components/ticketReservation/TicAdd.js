// src/components/TicAdd.js

import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { v4 as uuidv4 } from 'uuid';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Table from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import MuiGrid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2)
  }
}));

export default function TicAdd() {
  const [reference, setReference] = useState('');
  const [startStation, setStartStation] = useState('');
  const [endStation, setEndStation] = useState('');
  const [train, setTrain] = useState('');
  const [clz, setClz] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [noOfSeats, setNoOfSeats] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [payment, setPayment] = useState('');
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Optional: to show loading state

  let price = 0;

  const handleClickOpen = () => {
    setReference(uuidv4()); // Generate a unique reference when opening the dialog
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };
  const resetForm = () => {
    setReference('');
    setStartStation('');
    setEndStation('');
    setTrain('');
    setClz('');
    setTime('');
    setDate('');
    setNoOfSeats('');
    setFirstName('');
    setLastName('');
    setId('');
    setEmail('');
    setTel('');
    setPayment('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!startStation) newErrors.startStation = 'Start Station is required';
    if (!endStation) newErrors.endStation = 'End Station is required';
    if (!train) newErrors.train = 'Train is required';
    if (!clz) newErrors.clz = 'Class is required';
    if (!date) newErrors.date = 'Date is required';
    if (!time) newErrors.time = 'Time is required';
    if (!noOfSeats || noOfSeats < 1 || noOfSeats > 25)
      newErrors.noOfSeats = 'Number of seats should be between 1 and 25';
    if (!firstName) newErrors.firstName = 'First Name is required';
    if (!lastName) newErrors.lastName = 'Last Name is required';
    if (!id) newErrors.id = 'ID is required';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Valid email is required';
    if (!tel || tel.length !== 10) newErrors.tel = 'Valid Tel no is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addData = (reservationData) => {
    setLoading(true);
    axios
      .post('http://localhost:4000/api/reservations/add', reservationData)
      .then((response) => {
        console.log('Reservation created successfully...:', response.data);
        setLoading(false);
        handleClose();
      })
      .catch((error) => {
        console.error('Error creating reservation:', error);
        setLoading(false);
        // Optionally, show an error message
      });
  };

  switch (clz) {
    case '1st class Reserved':
      price = 440;
      break;
    case '1st class Sleeper':
      price = 460;
      break;
    case '1st class Air-Conditioned':
      price = 500;
      break;
    case '1st class Observation Saloon':
      price = 600;
      break;
    case '2nd class Reserved':
      price = 250;
      break;
    case '2nd class Sleeper':
      price = 270;
      break;
    case '3rd class Reserved':
      price = 140;
      break;
    case '3rd class Sleeper':
      price = 160;
      break;
    default:
      break;
  }

  const handleSubmit = () => {
    if (validateForm()) {
      addData({
        reference: reference || uuidv4(),
        startStation,
        endStation,
        train,
        clz,
        time,
        date,
        noOfSeats,
        price,
        firstName,
        lastName,
        id,
        email,
        tel,
        payment,
        createdAt: new Date()
      });
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Add New Reservation
      </Button>
      <BootstrapDialog
        maxWidth="xl"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <div>
            <h2>Add New RESERVATION</h2>
          </div>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container>
            <Grid item xs>
              <TextField
                sx={{ m: 2, width: 300 }}
                disabled
                id="outlined-disabled"
                label="Reference Number Auto Generated"
                variant="outlined"
                value={reference}
              />
              <br />
              <FormControl sx={{ m: 2, width: 300 }}>
                <InputLabel id="start-station-label">Start Station</InputLabel>
                <Select
                  labelId="start-station-label"
                  id="start-station-select"
                  value={startStation}
                  label="Start Station"
                  onChange={(e) => setStartStation(e.target.value)}
                >
                  {[
                    'Lahore',
                    'Islamabad',
                    'Rawalpindi',
                    'Multan',
                    'Bhawalpur',
                    'Faisalabad',
                    'Sheikhpura',
                    'Gujranwala',
                    'Sialkot',
                    'Gujrat',
                    'Jhang',
                    'Sahiwal',
                    'Karachi',
                    'Hyderabad',
                    'Quetta',
                    'Peshawar',
                    'Sukkur',
                    'Larkana',
                    'Dera Gazi Khan',
                    'Kasur',
                    'Mardan',
                    'Okara',
                    'Mirpur',
                    'Mandi Bahauddin',
                    'Jehlum',
                    'Daska'
                  ].map((place) => (
                    <MenuItem key={place} value={place}>
                      {place}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 2, width: 300 }}>
                <InputLabel id="end-station-label">End Station</InputLabel>
                <Select
                  labelId="end-station-label"
                  id="end-station-select"
                  value={endStation}
                  label="End Station"
                  onChange={(e) => setEndStation(e.target.value)}
                >
                  {[
                    'Lahore',
                    'Islamabad',
                    'Rawalpindi',
                    'Multan',
                    'Bhawalpur',
                    'Faisalabad',
                    'Sheikhpura',
                    'Gujranwala',
                    'Sialkot',
                    'Gujrat',
                    'Jhang',
                    'Sahiwal',
                    'Karachi',
                    'Hyderabad',
                    'Quetta',
                    'Peshawar',
                    'Sukkur',
                    'Larkana',
                    'Dera Gazi Khan',
                    'Kasur',
                    'Mardan',
                    'Okara',
                    'Mirpur',
                    'Mandi Bahauddin',
                    'Jehlum',
                    'Daska'
                  ].map((place) => (
                    <MenuItem key={place} value={place}>
                      {place}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <FormControl sx={{ m: 2, width: 300 }}>
                <InputLabel id="train-label">Train</InputLabel>
                <Select
                  labelId="train-label"
                  id="train-select"
                  value={train}
                  label="Train"
                  onChange={(e) => setTrain(e.target.value)}
                >
                  <MenuItem value="-">-</MenuItem>
                  <MenuItem value="Lahore Express">Lahore Express</MenuItem>
                  <MenuItem value="Jinnah Express">Jinnah Express</MenuItem>
                  <MenuItem value="Allama Iqbal Express">
                    Allama Iqbal Express
                  </MenuItem>
                  <MenuItem value="Karachi Express">Karachi Express</MenuItem>
                  <MenuItem value="Attock Safari">Attock Safari</MenuItem>
                  <MenuItem value="Multan Express">Multan Express</MenuItem>
                  <MenuItem value="Awam Express">Awam Express</MenuItem>
                  <MenuItem value="Babu Express">Babu Express</MenuItem>
                  <MenuItem value="TezGam Express">TezGam Express</MenuItem>
                  <MenuItem value="Airport Express">Airport Express</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 2, width: 300 }}>
                <InputLabel id="class-label">Class</InputLabel>
                <Select
                  labelId="class-label"
                  id="class-select"
                  value={clz}
                  label="Class"
                  onChange={(e) => setClz(e.target.value)}
                >
                  <MenuItem value="1st class Reserved">
                    1st class Reserved
                  </MenuItem>
                  <MenuItem value="1st class Sleeper">
                    1st class Sleeper
                  </MenuItem>
                  <MenuItem value="1st class Air-Conditioned">
                    1st class Air-Conditioned
                  </MenuItem>
                  <MenuItem value="1st class Observation Saloon">
                    1st class Observation Saloon
                  </MenuItem>
                  <MenuItem value="2nd class Reserved">
                    2nd class Reserved
                  </MenuItem>
                  <MenuItem value="2nd class Sleeper">
                    2nd class Sleeper
                  </MenuItem>
                  <MenuItem value="3rd class Reserved">
                    3rd class Reserved
                  </MenuItem>
                  <MenuItem value="3rd class Sleeper">
                    3rd class Sleeper
                  </MenuItem>
                </Select>
              </FormControl>
              <br />
              <TextField
                sx={{ m: 2, width: 200 }}
                id="departure-time"
                label="Time"
                type="time"
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  step: 300 // 5 min
                }}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <TextField
                id="departure-date"
                label="Date"
                type="date"
                sx={{ m: 2, width: 200 }}
                InputLabelProps={{
                  shrink: true
                }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <TextField
                type="number"
                label="No of Seats"
                sx={{ m: 2, width: 168 }}
                InputProps={{
                  inputProps: {
                    min: 1,
                    max: 25
                  }
                }}
                value={noOfSeats}
                onChange={(e) => setNoOfSeats(e.target.value)}
              />
              <br />
              <Container sx={{ my: 2 }}>
                <Table aria-label="customized table">
                  <tbody>
                    <StyledTableRow>
                      <StyledTableCell align="left">
                        Price per ticket
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {price}
                        <span>&nbsp;</span>
                        PKR
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell align="left">
                        No of Seats
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {noOfSeats}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell
                        align="left"
                        sx={{ fontWeight: 'bold', fontSize: 18 }}
                      >
                        Total
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        sx={{ fontWeight: 'bold', fontSize: 18 }}
                      >
                        {price * noOfSeats}
                        <span>&nbsp;</span>
                        PKR
                      </StyledTableCell>
                    </StyledTableRow>
                  </tbody>
                </Table>
              </Container>
            </Grid>
            <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
            <Grid item xs>
              <TextField
                sx={{ m: 2, width: 300 }}
                id="first-name"
                label="First Name"
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                sx={{ m: 2, width: 300 }}
                id="last-name"
                label="Last Name"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <br />
              <TextField
                sx={{ m: 2, width: 632 }}
                id="id-number"
                label="NIC no / Passport no / Driving License no"
                variant="outlined"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <br />
              <TextField
                sx={{ m: 2, width: 450 }}
                id="email"
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <TextField
                sx={{ m: 2, width: 300 }}
                id="tel-no"
                label="Tel no"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+92</InputAdornment>
                  )
                }}
                value={tel}
                onChange={(e) => setTel(e.target.value)}
              />
              <br />
              <FormControl sx={{ m: 2, width: 200 }}>
                <InputLabel id="payment-label">Payment</InputLabel>
                <Select
                  labelId="payment-label"
                  id="payment-select"
                  value={payment}
                  label="Payment"
                  onChange={(e) => setPayment(e.target.value)}
                >
                  <MenuItem value="Done">Done</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ m: 1 }}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={() =>
              addData({
                reference: reference || uuidv4(),
                startStation,
                endStation,
                train,
                clz,
                time,
                date,
                noOfSeats,
                price,
                firstName,
                lastName,
                id,
                email,
                tel,
                payment,
                createdAt: new Date()
              })
            }
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Saving...' : 'Make Reservation'}
          </Button>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
