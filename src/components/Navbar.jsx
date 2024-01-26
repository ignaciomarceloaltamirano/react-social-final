/* eslint-disable react/prop-types */
import {
  AppBar,
  Avatar,
  Button,
  Container,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { removeUser } from '../services/token.service';
import CreateOrUpdateCommunityModal from './CreateOrUpdateCommunityModal';
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
    <AppBar key={theme} position='sticky' sx={{ mb: 2, borderRadius: '0' }}>
      <Container maxWidth='xl'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'end' }} disableGutters>
          <RouterLink to='/'>
            <Typography sx={{ mr: 2 }} variant='h5'>
              Zeddit
            </Typography>
          </RouterLink>
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
            <Stack
              sx={(theme) => ({
                ml: 'auto',
                width: 250,
                [theme.breakpoints.down('sm')]: {
                  width: '150px',
                },
              })}
            >
              <SearchForm />
            </Stack>
          )}
          <Stack sx={{ ml: 'auto' }}>
            {theme.palette.mode === 'dark' ? (
              <IconButton onClick={handleChange}>
                <WbSunnyOutlinedIcon sx={{ width: 30, height: 30 }} />
              </IconButton>
            ) : (
              <IconButton onClick={handleChange}>
                <Brightness3Icon sx={{ width: 30, height: 30 }} />
              </IconButton>
            )}
          </Stack>
          {user ? (
            <Stack direction='row' spacing={1} sx={{ ml: 1 }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {user?.imageUrl !== null ? (
                    <Avatar
                      alt='Avatar'
                      src={user?.imageUrl}
                      sx={{ width: 35, height: 35 }}
                    />
                  ) : (
                    <AccountCircle sx={{ fontSize: '2.188rem' }} />
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
                  component={RouterLink}
                  sx={{
                    textDecoration: 'none',
                    color: theme.palette.text.primary,
                  }}
                  to='/'
                >
                  <MenuItem onClick={handleCloseUserMenu}>Feed</MenuItem>
                </Link>
                <Link
                  component={RouterLink}
                  sx={{
                    textDecoration: 'none',
                    color: theme.palette.text.primary,
                  }}
                  to={`/users/${user?.username}`}
                >
                  <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                </Link>

                <CreateOrUpdateCommunityModal />
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
                component={RouterLink}
                to='/login'
                variant='contained'
                sx={{ backgroundColor: theme.palette.secondary.main }}
              >
                Log In
              </Button>
              <Button
                component={RouterLink}
                to='/register'
                variant='contained'
                sx={{ backgroundColor: theme.palette.secondary.main }}
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
