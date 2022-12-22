import * as React from 'react';
import { connect } from 'react-redux';
import { fetchGetAttempts, fetchGetNumberOfAllAttempts } from '../../redux/action';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import './DataTable.css';

function TablePaginationActions({ count, page, rowsPerPage, onPageChange}) {
  const theme = useTheme();

  const handleFirstPageButtonClick = () => {
    onPageChange(0);
  };

  const handleBackButtonClick = () => {
    onPageChange(page - 1);
  };

  const handleNextButtonClick = () => {
    onPageChange(page + 1);
  };

  const handleLastPageButtonClick = () => {
    onPageChange(Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}



const DataTable = ({attempts, number, getAttempt, getNumberOfAllAttempts}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    getAttempt(page, rowsPerPage);
    getNumberOfAllAttempts();
  }, []);

  const handleChangePage = (newPage) => {
    setPage(newPage);
    getAttempt(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    getAttempt(0, newRowsPerPage);
  };

  return (
    <Paper sx={{ width: '100%' }}>
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
            <TableRow>
             <TableCell align="right">X</TableCell>
             <TableCell align="right">Y</TableCell>
             <TableCell align="right">R</TableCell>
             <TableCell align="right">Hit</TableCell>
             <TableCell align="right">Date</TableCell>
           </TableRow>
        </TableHead>
        <TableBody>
          {attempts
          .map((row) => (
            <TableRow key={row.id}>
              <TableCell style={{ width: "10%" }} align="right">
                {row.x}
              </TableCell>
              <TableCell style={{ width: "10%" }} align="right">
                {row.y}
              </TableCell>
              <TableCell style={{ width: "10%" }} align="right">
                {row.r}
              </TableCell>
              <TableCell style={{ width: "10%" }} align="right">
                {row.hit ? "true" :"false"}
              </TableCell>
              <TableCell style={{ width: "50%" }} align="right">
                {row.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: number}]}
              colSpan={6}
              count={number}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              style={{ width: "100%" }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </Paper>
  );
}

const mapStateToProps = state => ({
  attempts: state.attempts,
  number: state.numberOfAllAttempts
});

function mapDispatchToButtonsProps(dispatch) {
  return {
      getAttempt: (page, size) =>  dispatch(fetchGetAttempts(page, size)),
      getNumberOfAllAttempts: () => dispatch(fetchGetNumberOfAllAttempts())
  }
}

export default connect(mapStateToProps, mapDispatchToButtonsProps)(DataTable);