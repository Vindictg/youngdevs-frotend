import React, { useEffect, useState } from 'react';
import './UserPanel.scss';
import {
  Table,
  TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, TablePagination,
} from '@material-ui/core';
import UserPanelRow from './UserPanelRow/UserPanelRow';
import UserProvider from '../../../providers/UserProvider';

function UserPanel() {
  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [users, setUsers] = useState();

  useEffect(async () => {
    // eslint-disable-next-line max-len
    const { Users: u, TotalCount: t } = await UserProvider.getAllUsers(currentPage, rowsPerPage);
    setTotalCount(t);
    setUsers(u);
  }, [currentPage, rowsPerPage]);

  const handleChangePage = (e, page) => {
    setCurrentPage(page);
  };

  return (
    <Box>
      <Typography variant="h4" component="h4">User Panel</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { users?.map((u) => (
              <UserPanelRow user={u} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
      />
    </Box>
  );
}

export default UserPanel;
