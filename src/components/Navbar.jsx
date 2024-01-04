/* eslint-disable react/prop-types */
import {
  AppBar,
  Avatar,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { removeUser } from '../services/token.service';
import CommunityModal from './CommunityModal';
import { useTheme } from '@emotion/react';
import SearchForm from './SearchForm';
import UpdatePasswordModal from './UpdatePasswordModal';

const Navbar = ({ user, handleChange }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    removeUser();
    navigate('/login');
  };

  return (
    <AppBar key={theme} position='sticky' sx={{ mb: 2 }}>
      <Container maxWidth='xl'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'end' }} disableGutters>
          <Link to='/'>
            <Typography sx={{ mr: 2 }} variant='h5'>
              Home
            </Typography>
          </Link>
          {/* {user && (
            <>
              {' '}
              <Stack
                direction='row'
                spacing={2}
                sx={{ display: { xs: 'none', md: 'flex' } }}
              >
                {filterLinks?.map((link, index) => {
                  link?.roles.length === 0 ||
                    link?.roles.some((role) => user?.roles?.includes(role));
                  return (
                    <Link key={index} to={link?.href}>
                      {link?.text}
                    </Link>
                  );
                })}
              </Stack>
              <Stack sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size='large'
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleOpenNavMenu}
                  color='inherit'
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  <Stack direction='column'>
                    {filterLinks.map((link, index) => (
                      <Link
                        key={index}
                        to={link.href}
                        className={
                          theme.palette.mode === 'light'
                            ? 'light-mode-link'
                            : ''
                        }
                        onClick={handleCloseNavMenu}
                      >
                        <MenuItem>{link.text}</MenuItem>
                      </Link>
                    ))}
                  </Stack>
                </Menu>
              </Stack>
            </>
          )} */}
          {user && (
            <Stack sx={{ mx: 'auto', width: 250 }}>
              <SearchForm />
            </Stack>
          )}
          <Stack sx={{ ml: 'auto' }}>
            {theme.palette.mode === 'dark' ? (
              <IconButton onClick={handleChange}>
                <WbSunnyOutlinedIcon />
              </IconButton>
            ) : (
              <IconButton onClick={handleChange}>
                <Brightness3Icon />
              </IconButton>
            )}
          </Stack>
          {user ? (
            <Stack direction='row' spacing={1} sx={{ ml: 1 }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {user?.imageUrl !== null ? (
                    <Avatar alt='Avatar' src={user?.imageUrl} />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Typography variant='subtitle1' sx={{ px: 2, mt: 1 }}>
                  <b> {user?.username}</b>
                </Typography>
                <Typography variant='subtitle2' sx={{ px: 2, mb: 1 }}>
                  {user?.email}
                </Typography>
                <Divider />
                <Link
                  className={
                    theme.palette.mode === 'light' ? 'light-mode-link' : ''
                  }
                  to='/'
                >
                  <MenuItem onClick={handleCloseUserMenu}>Feed</MenuItem>
                </Link>
                <Link
                  className={
                    theme.palette.mode === 'light' ? 'light-mode-link' : ''
                  }
                  to={`/users/${user?.username}`}
                >
                  <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                </Link>

                <CommunityModal />
                <UpdatePasswordModal />
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    handleLogout();
                  }}
                >
                  Log out
                </MenuItem>
              </Menu>
            </Stack>
          ) : (
            <Stack direction='row' spacing={2} sx={{ ml: 1 }}>
              <Button
                component={Link}
                to='/login'
                variant='contained'
                color={theme.palette.mode === 'dark' ? 'primary' : 'secondary'}
              >
                Log In
              </Button>
              <Button
                component={Link}
                to='/register'
                variant='contained'
                color={theme.palette.mode === 'dark' ? 'primary' : 'secondary'}
              >
                Register
              </Button>
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
