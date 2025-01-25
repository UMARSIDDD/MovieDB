'use client';

import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, InputBase, IconButton, Menu, MenuItem } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from '../hooks/useDebounce';
import { setCurrentPage, setSearchQuery } from '../store/moviesSlice';
import { AppDispatch, RootState } from '../store/store';

export default function Navbar() {
  const nav = [
    { path: '/', label: 'Popular' },
    { path: '/top-rated', label: 'Top Rated' },
    { path: '/upcoming', label: 'Upcoming' }
  ];
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { searchQuery } = useSelector((state: RootState) => state.movies);

  const debouncedSearch = useDebounce(searchQuery, 1000);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));

  };

  const handleNavigation = (path: string) => {
    dispatch(setSearchQuery(''));
    dispatch(setCurrentPage(1));
    router.push(path);
  };
  useEffect(() => {
    if (debouncedSearch.trim()) {
      dispatch(setCurrentPage(1));
      if (pathname !== '/') {
        router.push('/'); 
      }
      dispatch(setSearchQuery(debouncedSearch));
    }
  }, [debouncedSearch]);
  // Mobile menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#343a3f' }} elevation={1}>
      <Toolbar className="flex justify-between">
        {/* MovieDB Logo: Reset to Home */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => handleNavigation('/')}
        >
          <MovieIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontSize: 'clamp(1.2rem, 3vw, 2rem)', 
            }}
          >
            MovieDB
          </Typography>
        </Box>

        {/* Navigation Links for Desktop */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          {nav.map(({ path, label }) => {
            const isActive = pathname === path;
            return (
              <Button
                key={path}
                color={isActive ? 'primary' : 'inherit'}
                onClick={() => handleNavigation(path)}
                sx={{ padding: 'clamp(8px, 2vw, 16px)' }}
              >
                {label}
              </Button>
            );
          })}
        </Box>

        {/* Search Box */}
        <Box
          sx={{
            flexGrow: 1,
            position: 'relative',
            borderRadius: 1,
            backgroundColor: 'white',
            '&:hover': {
              backgroundColor: 'white',
            },
            marginLeft: 2,
            marginRight: 2,
            width: 'auto',
            maxWidth: 400,
            display:pathname.startsWith('/movie/') ? 'none' : 'block',
          }}
        >
          <Box
            sx={{
              padding: '0 16px',
              height: '100%',
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'black'
            }}
          >
            <SearchIcon />
          </Box>
          <InputBase
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              color: 'black',
              padding: '8px 8px 8px 48px',
              width: '100%',
            }}
          />
        </Box>

        {/* Mobile Menu Icon */}
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' } }}
          onClick={handleMenuOpen}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleMenuClose}
        >
          {nav.map(({ path, label }) => {
            const isActive = pathname === path;
            return (
              <MenuItem
                key={path}
                selected={isActive}
                onClick={() => {
                  handleNavigation(path);
                  handleMenuClose();
                }}
              >
                {label}
              </MenuItem>
            );
          })}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
