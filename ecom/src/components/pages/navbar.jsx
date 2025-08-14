import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/productlist' },
  { name: 'Cart', path: '/cart' },
  
];


function ResponsiveAppBar() {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/current-user", {
        withCredentials: true, 
      })
      .then((res) => {
        setUser(res.data.user); 
      })
      .catch((err) => {
        console.error("Not logged in or invalid token");
        setUser(null);
      });
  }, []);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleCloseNavMenu();
  };

  return (
    <AppBar position="sticky" sx={{marginBottom: 2,backgroundColor:"#2a3734"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
         {pages.map((page) => (
                <Button
                    key={page.name} // ✅ Use string as key
                    onClick={() => handleNavigate(page.path)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {page.name}  {/* ✅ Correct way to show name */}
                </Button>
                ))}
          </Box>


     
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 50,
              display: { xs: 'none', md: 'flex'},
              fontFamily: "Playwrite AU QLD",
              fontWeight: 600,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            VougeVilla 
          </Typography>

        
{/* ----------------------------------------------------------------------------------------------------------------------------- */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
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
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={() => handleNavigate(page.path)}>
                  <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          GYMBOYZ
          </Typography>

          <Box sx={{ flexGrow: 1 }} /> */}
  
  <Box>
    
    <Button variant="inherit" onClick={() => navigate('/productsearch')}>
      Search
    </Button>
  </Box>
 <Box sx={{ display: 'flex', gap: 2 }}>
  {user ? (
    <Button color="inherit" onClick={() => navigate('/logout')}>
      Logout
    </Button>
  ) : (
    <>
      <Button color="inherit" onClick={() => navigate('/login')}>
        Login
      </Button>
      <Button color="inherit" onClick={() => navigate('/signup')}>
        Signup
      </Button>
    </>
  )}
</Box>
<Box sx={{ display: 'flex', gap: 2, alignItems: 'center'}}>
<Button sx={{color:"white"}}><FontAwesomeIcon icon={faUser} onClick={() => navigate("/profile")} /></Button>
</Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

