import React from 'react'

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Paper,
  InputBase,
  LinearProgress,
} from '@mui/material'

//icons
import {
  SearchIcon,
  AppsOutlinedIcon,
  ClearOutlinedIcon,
} from '../../assets/icons'

import UserInfo from './UserInfo'
import Drawers from '../Drawer/Drawers'
import { NavWrapper } from '../../assets/style/StyledComponent'
import { useGlobalContext } from '../../context/context'
import { navbarIcons } from '../../assets/lists'

const Navbar = () => {
  const {
    toggleDrawer,
    openAnchor,
    rightList,
    mainSearchValue,
    setMainSearchValue,
    clearInputHandler,
    toDoIsLoading,
  } = useGlobalContext()

  return (
    <NavWrapper>
      <Box
        sx={{
          flexGrow: 1,
          position: 'relative',
          zIndex: '11',
        }}>
        <AppBar position='static'>
          <Toolbar
            sx={{
              padding: '0 0 0 .7rem!important',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            variant='dense'>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}>
              <Tooltip title='App luncher' placement='bottom-start' arrow>
                <IconButton
                  className='icon-btn'
                  disableRipple
                  onClick={toggleDrawer('left', true)}
                  size='large'
                  edge='start'
                  color='trinary'>
                  <AppsOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Typography
                variant='h7'
                noWrap
                component='div'
                sx={{
                  padding: '0 1rem',
                  cursor: 'pointer',
                  ':hover': {
                    textDecoration: 'underline',
                  },
                }}>
                To Do
              </Typography>
            </Box>

            <Paper
              component='form'
              sx={{
                borderRadius: '3px',
                padding: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                maxWidth: '400px',
                background: 'var(--bg-primary)',
                width: { xs: '150px', sm: '100%' },
              }}>
              <Tooltip arrow title='search' placement='left'>
                <IconButton
                  disableRipple
                  color='primary'
                  sx={{ padding: '0rem .4rem' }}
                  aria-label='menu'>
                  <SearchIcon fontSize='small' />
                </IconButton>
              </Tooltip>
              <InputBase
                sx={{ width: '100%' }}
                onChange={(e) => {
                  setMainSearchValue(e.target.value.trimStart())
                }}
                value={mainSearchValue}
              />

              <Tooltip arrow title='exit search'>
                <span>
                  <IconButton
                    onClick={clearInputHandler}
                    disableRipple
                    sx={{
                      padding: '0rem',
                      display: `${mainSearchValue ? '' : 'none'}`,
                    }}>
                    <ClearOutlinedIcon fontSize='small' />
                  </IconButton>
                </span>
              </Tooltip>
            </Paper>

            {/* search end */}
            <Box sx={{ display: 'flex' }}>
              {navbarIcons.map((item, index) => {
                return (
                  <Tooltip
                    key={index}
                    title={item.title}
                    placement={item.placement}
                    arrow>
                    <IconButton
                      className={`${
                        rightList === item.title
                          ? 'icon-btn active'
                          : 'icon-btn'
                      }`}
                      onClick={
                        rightList === item.title
                          ? toggleDrawer('right', !openAnchor.right, '')
                          : toggleDrawer('right', true, item.title)
                      }
                      disableRipple
                      size='large'
                      color='inherit'>
                      {item.icon}
                    </IconButton>
                  </Tooltip>
                )
              })}

              <UserInfo />
            </Box>
          </Toolbar>
        </AppBar>
        <Drawers />
      </Box>
      {toDoIsLoading && (
        <div className='loader'>
          <LinearProgress color='primary' />
        </div>
      )}
    </NavWrapper>
  )
}

export default Navbar
