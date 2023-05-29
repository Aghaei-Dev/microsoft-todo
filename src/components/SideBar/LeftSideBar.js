import React from 'react'
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
  LoupeOutlinedIcon,
  FormatListBulletedOutlinedIcon,
} from '../../assets/icons'

import { FiveIconSideBare } from '../../assets/lists'
import { Content } from '..'

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
    newListInp,
    setNewListInp,
    submitNewList,
    newListArray,
  } = useGlobalContext()

  const sideMenu = [
    {
      id: 1,
      icon: <LightModeOutlinedIcon fontSize='small' />,
      text: 'my day',
      length: notCompleted.length,
    },
    {
      id: 2,
      icon: <StarOutlineOutlinedIcon fontSize='small' />,
      text: 'important',
      length: important.filter((item) => item.isCompleted === false).length,
    },
    {
      id: 3,
      icon: <CheckCircleOutlinedIcon fontSize='small' />,
      text: 'completed',
      length: 0,
    },
    {
      id: 4,
      icon: <HomeOutlinedIcon fontSize='small' />,
      text: 'tasks',
      length: allToDo.filter((item) => item.isCompleted === false).length,
    },
    ...newListArray.flat(),
  ]
  React.useEffect(() => {
    document.title = `${capitalMaker(sidebarTitle)} - To Do`
  }, [sidebarTitle])

  return (
    <Wrapper height={height}>
      <Drawer
        sx={{
          width: width < 800 ? 205 : 270,
          flexShrink: 0,
          zIndex: width < 800 ? 10 : 0,
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
          {sideMenu.map((item) => {
            const { icon, text, length, id } = item
            return (
              <span key={id}>
                <ListItem
                  sx={{
                    borderLeft: `2px solid ${
                      sidebarTitle === text
                        ? 'var(--bg-brand-hover)'
                        : 'transparent'
                    }`,
                    background: ` ${
                      sidebarTitle === text
                        ? 'var(   --bg-border)'
                        : 'var(  --bg-brand-primary)'
                    }`,
                  }}
                  disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setSidebarTitle(text)
                      width < 800 && handleDrawerClose()
                    }}>
                    <SingleRow>
                      <div
                        className={`${
                          sidebarTitle === text
                            ? 'active icon-text'
                            : 'icon-text'
                        }`}>
                        {icon || (
                          <FormatListBulletedOutlinedIcon fontSize='small' />
                        )}
                        {text}
                      </div>
                      <div
                        className={`${sidebarTitle === text ? 'active' : ''}`}>
                        {length > 0 && length}
                      </div>
                    </SingleRow>
                  </ListItemButton>
                </ListItem>
                {id === 4 && (
                  <Divider variant='middle' sx={{ margin: '.6rem' }} />
                )}
              </span>
            )
          })}

          <NewListRow disablePadding>
            <div className='new-list-container'>
              <div className='new-list-inp'>
                <IconButton
                  disableRipple
                  color='primary'
                  sx={{ padding: '.8rem' }}>
                  <AddOutlinedIcon fontSize='small' />
                </IconButton>
                <form onSubmit={submitNewList}>
                  <InputBase
                    sx={{
                      flex: 1,
                    }}
                    value={newListInp}
                    onChange={(e) => {
                      setNewListInp(e.target.value)
                    }}
                    placeholder='New list'
                  />
                </form>
              </div>
              <div>
                <Tooltip arrow title='create groupe' placement='top'>
                  <IconButton
                    disableRipple
                    color='primary'
                    sx={{ p: '0rem 1.2rem' }}>
                    <LoupeOutlinedIcon fontSize='small' color='primary' />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </NewListRow>
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
          padding: '1.5rem 0',
        }}>
        <Content />
      </Main>
      <RightSideBar />
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

  //problem of scroll
  marginLeft: `-${!open && 270}px`,
  marginRight: `-${!rightsidebaropen && 350}px`,

  margin: `0 ${width <= 800 && 0}  0 0`,
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
const Wrapper = styled(Box)(({ height }) => ({
  maxHeight: height - 55, // px for navbar
  overflow: 'auto',
  display: 'flex',
}))
const FiveBottomIcon = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginTop: 'auto',

  div: {
    flexGrow: '2',
    padding: '1rem 0',
    display: 'grid',
    placeItems: 'center',
    cursor: 'pointer',
    color: 'var(--font-color-primary)',

    ':hover': {
      background: 'var(--bg-hover)',
    },
  },
}))

const NewListRow = styled(ListItem)(() => ({
  marginTop: '.5em',
  '.new-list-container': {
    display: 'flex',

    div: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      ':hover': {
        background: 'var(--bg-hover)',
      },
    },
    '.new-list-inp': {
      paddingLeft: '.75rem',
    },
  },
}))
