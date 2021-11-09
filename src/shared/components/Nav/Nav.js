import React from 'react';
import './Nav.scss';
import { Link, useHistory } from 'react-router-dom';
import {
  Menu, MenuItem, Button, Avatar,
} from '@material-ui/core';
import useAuth from '../../../hooks/useAuth';

const Nav = () => {
  const { logOut, user } = useAuth();
  const history = useHistory();

  const handleLogOut = () => {
    logOut();
    history.push('/');
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAdmin = () => {
    setAnchorEl(null);
    history.push('/admin');
  };

  return (
    <div className="App">
      <div className="Nav-header">
        <div className="Nav-content">
          <Link className="Nav-link" to="/">YoungDevs</Link>
          { user.isAuthenticated
            ? (
              <div className="Nav-content">
                <Button
                  className="avatar"
                  id="basic-button"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <Avatar alt="Remy Sharp" sx={{ width: 105, height: 105 }} src={user.avatar} />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  { user.isAdmin ? <MenuItem onClick={handleAdmin}>Admin</MenuItem> : null }
                  <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </Menu>
              </div>
            )
            : <></> }
        </div>
      </div>
    </div>
  );
};

export default Nav;
