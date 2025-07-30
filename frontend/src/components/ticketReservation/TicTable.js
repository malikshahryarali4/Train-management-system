import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@mui/material/TableCell';
import { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@material-ui/core/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Loading from 'src/components/subCommon/Loading';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import Container from '@mui/material/Container';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

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

export default function TicTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  // Separate state for each dialog
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  // Fetch Data from MongoDB
  async function getData() {
    setLoading(true);
    try {
      const response = await axios.get(
        'http://localhost:4000/api/reservations'
      );
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request data:', error.request);
      }
    } finally {
      setLoading(false);
    }
  }
  // Delete Data from MongoDB
  async function deleteData(id) {
    try {
      await axios.delete(`http://localhost:4000/api/reservations/delete${id}`);
      getData(); // Refresh data after deletion
      handleDeleteClose();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleDetailsOpen = (ticketData) => {
    setSelectedData(ticketData);
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };

  const handleDeleteOpen = (ticketData) => {
    setSelectedData(ticketData);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setSelectedData(null); // Clear selected data on close
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Reference No</StyledTableCell>
            <StyledTableCell align="center">Train</StyledTableCell>
            <StyledTableCell align="center">Class</StyledTableCell>
            <StyledTableCell align="center">Time</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">First Name</StyledTableCell>
            <StyledTableCell align="center">Last Name</StyledTableCell>
            <StyledTableCell align="center">Payment</StyledTableCell>
            <StyledTableCell align="center">More Details</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && (
            <StyledTableRow>
              <StyledTableCell colSpan={9} align="center">
                {' '}
                {/* Adjust the colSpan as needed */}
                <Loading />
              </StyledTableCell>
            </StyledTableRow>
          )}
          {data.map((ticket) => (
            <StyledTableRow key={ticket.id}>
              <StyledTableCell align="left">{ticket.reference}</StyledTableCell>
              <StyledTableCell align="left">{ticket.train}</StyledTableCell>
              <StyledTableCell align="left">{ticket.clz}</StyledTableCell>
              <StyledTableCell align="left">{ticket.time}</StyledTableCell>
              <StyledTableCell align="left">{ticket.date}</StyledTableCell>
              <StyledTableCell align="left">{ticket.firstName}</StyledTableCell>
              <StyledTableCell align="left">{ticket.lastName}</StyledTableCell>
              <StyledTableCell align="left">{ticket.payment}</StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  variant="text"
                  onClick={() => handleDetailsOpen(ticket)}
                >
                  Click Here
                </Button>
                <BootstrapDialog
                  onClose={handleDetailsClose}
                  aria-labelledby="customized-dialog-title"
                  open={detailsOpen}
                >
                  <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleDetailsClose}
                  >
                    <div>
                      <h2>More Details</h2>
                    </div>
                  </BootstrapDialogTitle>
                  <DialogContent dividers>
                    {selectedData && (
                      <Container>
                        <Table aria-label="customized table">
                          <TableBody>
                            <StyledTableRow>
                              <StyledTableCell sx={{ fontWeight: 'bold' }}>
                                Reference No
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {selectedData.reference}
                              </StyledTableCell>
                            </StyledTableRow>
                            {/* Add other rows for more details */}
                          </TableBody>
                        </Table>
                      </Container>
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button variant="outlined" onClick={handleDetailsClose}>
                      Close
                    </Button>
                  </DialogActions>
                </BootstrapDialog>
              </StyledTableCell>
              <StyledTableCell align="center">
                <IconButton
                  aria-label="delete"
                  color="error"
                  size="small"
                  onClick={() => handleDeleteOpen(ticket)}
                >
                  <DeleteIcon />
                </IconButton>
                <Dialog
                  open={deleteOpen}
                  onClose={handleDeleteClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    <div>
                      <h2>Delete Record</h2>
                    </div>
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      <div
                        style={{
                          marginTop: 5,
                          marginLeft: 10,
                          marginRight: 50,
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <WarningIcon
                          color="error"
                          fontSize="large"
                          sx={{ mr: 5 }}
                        />
                        <span>
                          Do you really want to delete this record? This process
                          cannot be undone.
                        </span>
                      </div>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteData(selectedData.id)}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                    <Button variant="outlined" onClick={handleDeleteClose}>
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
