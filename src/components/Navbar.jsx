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
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import api from '../services/api';
import { useMutation } from '@tanstack/react-query';
import { removeUser } from '../services/token.service';
import CommunityModal from './CommunityModal';
import { useTheme } from '@emotion/react';
import SearchForm from './SearchForm';

const Navbar = ({ user, handleChange }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  const links = [
    { href: '/register-admin', text: 'Register Admin', roles: ['ROLE_ADMIN'] },
    {
      href: '/register-mod',
      text: 'Register Mod',
      roles: ['ROLE_ADMIN', 'ROLE_MOD'],
    },
    { href: '/register', text: 'Register', roles: [], public: true },
    { href: '/login', text: 'Log In', roles: [], public: true },
  ];

  const filterLinks = links
    .filter((link) => !link.public)
    .filter((link) => {
      if (link.roles.length === 0) return true;
      return link.roles.some((role) => user?.roles?.includes(role));
    });

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      const { data } = await api.post('/auth/logout');
      return data;
    },
    onSuccess: () => {
      removeUser();
      navigate('/login');
    },
  });

  return (
    <AppBar key={theme} position='sticky' sx={{ mb: 2 }}>
      <Container maxWidth='xl'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'end' }} disableGutters>
          <Link to='/'>
            <Typography sx={{ mr: 2 }} variant='h5'>
              Home
            </Typography>
          </Link>
          {user && (
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
                        className={
                          theme.palette.mode === 'dark'
                            ? 'dark-mode-link'
                            : 'light-mode-link'
                        }
                        key={index}
                        to={link.href}
                        onClick={handleCloseNavMenu}
                      >
                        <MenuItem>{link.text}</MenuItem>
                      </Link>
                    ))}
                  </Stack>
                </Menu>
              </Stack>
            </>
          )}
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
                    theme.palette.mode === 'dark' ? '' : 'light-mode-link'
                  }
                  to='/'
                >
                  <MenuItem onClick={handleCloseUserMenu}>Feed</MenuItem>
                </Link>
                <Link
                  className={
                    theme.palette.mode === 'dark' ? '' : 'light-mode-link'
                  }
                  to={`/users/${user?.username}`}
                >
                  <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                </Link>

                <CommunityModal />
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    logout();
                  }}
                >
                  Log out
                </MenuItem>
              </Menu>
            </Stack>
          ) : (
            <Stack direction='row' spacing={2} sx={{ ml: 2 }}>
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
