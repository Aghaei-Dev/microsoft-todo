import * as React from 'react'
import { styled } from '@mui/material/styles'
import {
  Divider,
  Box,
  Drawer,
  List,
  IconButton,
  ListItem,
  ListItemButton,
  InputBase,
  Tooltip,
} from '@mui/material'

import { capitalMaker } from '../../func/functions'
//icons

import {
  MenuOutlinedIcon,
  LightModeOutlinedIcon,
  StarOutlineOutlinedIcon,
  CheckCircleOutlinedIcon,
  HomeOutlinedIcon,
  AddOutlinedIcon,
} from '../../assets/icons'

import { FiveIconSideBare } from '../../assets/lists'
import { MyDay, Important, Inbox, Completed } from '../left'

import { useGlobalContext } from '../../context/context'
import { RightSideBar } from '..'

const LeftSideBar = () => {
  const {
    sidebarTitle,
    setSidebarTitle,
    open,
    handleDrawerClose,
    important,
    notCompleted,
    width,
    height,
    rightSideBarOpen,
    allToDo,
  } = useGlobalContext()

  const sideMenu = [
    {
      icon: <LightModeOutlinedIcon fontSize='small' />,
      text: 'my day',
      length: notCompleted.length,
    },
    {
      icon: <StarOutlineOutlinedIcon fontSize='small' />,
      text: 'important',
      length: important.filter((item) => item.isCompleted === false).length,
    },
    {
      icon: <CheckCircleOutlinedIcon fontSize='small' />,
      text: 'completed',
      length: 0,
    },
    {
      icon: <HomeOutlinedIcon fontSize='small' />,
      text: 'tasks',
      length: allToDo.length,
    },
  ]
  React.useEffect(() => {
    document.title = `${capitalMaker(sidebarTitle)} - To Do`
  }, [sidebarTitle])
  return (
    <Wrapper height={height}>
      <Box sx={{ display: 'flex' }}>
        <Drawer
          sx={{
            width: width < 800 ? 205 : 270,
            flexShrink: 0,
            zIndex: width < 800 ? 1 : 0,
            '& .MuiDrawer-paper': {
              width: width < 800 ? 205 : 270,

              boxSizing: 'border-box',
              pt: '4rem',
              zIndex: 1,
            },
          }}
          variant={`${width < 800 ? 'temporary' : 'persistent'}`}
          anchor='left'
          open={open}>
          <DrawerHeader sx={{ pl: '.8rem' }}>
            <IconButton
              disableRipple
              sx={{ marginRight: 'auto' }}
              onClick={handleDrawerClose}>
              <MenuOutlinedIcon />
            </IconButton>
          </DrawerHeader>
          <List sx={{ maxHeight: height, overflow: 'auto' }}>
            {sideMenu.map((item, index) => {
              const { icon, text, length } = item
              return (
                <ListItem
                  sx={{
                    borderLeft: `2px solid ${
                      sidebarTitle === text
                        ? 'var(--bg-brand-hover)'
                        : 'var(--bg-border)'
                    }`,
                    background: ` ${
                      sidebarTitle === text
                        ? 'var(   --bg-border)'
                        : 'var(  --bg-brand-primary)'
                    }`,
                  }}
                  disablePadding
                  key={index}>
                  <ListItemButton
                    onClick={() => {
                      setSidebarTitle(text)
                    }}>
                    <SingleRow>
                      <div
                        className={`${
                          sidebarTitle === text
                            ? 'active icon-text'
                            : 'icon-text'
                        }`}>
                        {icon}
                        {text}
                      </div>
                      <div
                        className={`${sidebarTitle === text ? 'active' : ''}`}>
                        {length > 0 && length}
                      </div>
                    </SingleRow>
                  </ListItemButton>
                </ListItem>
              )
            })}
            <Divider variant='middle' sx={{ marginTop: '.6rem' }} />
            <ListItem sx={{ mt: 'auto' }} disablePadding>
              <div
                className='new-list'
                component='form'
                sx={{
                  padding: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <IconButton
                  disableRipple
                  color='primary'
                  sx={{ padding: '.8rem' }}
                  aria-label='menu'>
                  <AddOutlinedIcon fontSize='small' />
                </IconButton>
                <InputBase
                  sx={{
                    flex: 1,
                  }}
                  placeholder='New list'
                />
              </div>
            </ListItem>
          </List>
          <FiveBottomIcon>
            {FiveIconSideBare.map((item, index) => {
              const { icon, title } = item
              return (
                <Tooltip key={index} title={title} arrow>
                  <div>{icon}</div>
                </Tooltip>
              )
            })}
          </FiveBottomIcon>
        </Drawer>
        <Main
          width={width}
          open={open}
          rightsidebaropen={rightSideBarOpen ? `true` : undefined}
          sx={{
            flexGrow: 1,
            marginLeft: `${width < 800 ? '0rem' : ''}`,
            padding: '1.5rem 2rem',
          }}>
          {(sidebarTitle === 'my day' && <MyDay />) ||
            (sidebarTitle === 'important' && <Important />) ||
            (sidebarTitle === 'completed' && <Completed />) ||
            (sidebarTitle === 'tasks' && <Inbox />)}
        </Main>
        <RightSideBar />
      </Box>
    </Wrapper>
  )
}

export default LeftSideBar

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open, rightsidebaropen, width }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  marginLeft: `-${!open && 270}px`,

  marginRight: `-${!rightsidebaropen && 345}px`,
  margin: `0 ${width <= 800 && 0}  0 0`,

  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))
const SingleRow = styled('div')(() => ({
  padding: '.2rem .3rem',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '.icon-text': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '.9rem',
    color: 'var(--font-color-secondary)',
    fontSize: '.9rem',
  },
  '.active': {
    color: 'var(--font-color-primary)',
    fontWeight: '500',
  },
}))
const Wrapper = styled('div')(({ height }) => ({
  maxHeight: height - 55, // px for navbar
  overflow: 'auto',
  '.new-list': {
    marginTop: '.5em',
    paddingLeft: '.75rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ':hover': {
      background: 'var(--bg-hover)',
    },
  },
}))
const FiveBottomIcon = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginTop: 'auto',

  div: {
    padding: '.6rem',
    display: 'grid',
    placeItems: 'center',
    cursor: 'pointer',
    color: 'var(--font-color-primary)',

    ':hover': {
      background: 'var(--bg-hover)',
    },
  },
}))
