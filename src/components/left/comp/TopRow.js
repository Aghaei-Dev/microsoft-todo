import React from 'react'
import styled from 'styled-components'

import { useGlobalContext } from '../../../context/context'

//mui
import {
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Divider,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuList,
  Stack,
} from '@mui/material'

import {
  MenuOutlinedIcon,
  MoreHorizOutlinedIcon,
  SwapVertOutlinedIcon,
  StarBorderOutlinedIcon,
  LightbulbOutlinedIcon,
  CalendarMonthOutlinedIcon,
  MoreTimeOutlinedIcon,
  PrintOutlinedIcon,
  ColorLensOutlinedIcon,
} from '../../../assets/icons'

import moment from 'moment/moment'

export const PageTopRow = ({ logo, title }) => {
  const { open, handleDrawerOpen, width } = useGlobalContext()

  return (
    <Wrapper>
      <div>
        <IconButton
          disableRipple
          color='inherit'
          onClick={handleDrawerOpen}
          edge='start'
          sx={{ padding: 0, mr: 2, ...(open && { display: 'none' }) }}>
          <MenuOutlinedIcon />
        </IconButton>
        {open && (
          <IconButton className='icon' disabled>
            {logo}
          </IconButton>
        )}
        {title === 'my day' ? (
          <div className='title-date'>
            <h3>{title}</h3>

            <div>{moment().format('dddd , MMMM D ')}</div>
          </div>
        ) : (
          <h3>{title}</h3>
        )}

        <MenuListComposition
          array={title === 'my day' ? optionsValue : optionsValueInOtherPage}
          headerTitle='list options'
          title=''
          icon={<MoreHorizOutlinedIcon />}
        />
      </div>
      <div className='last-items'>
        <MenuListComposition
          title={width < 600 ? '' : 'sort'}
          icon={<SwapVertOutlinedIcon />}
          array={
            (title === 'my day' && sortValue) ||
            (title === 'important' && sortValueInImportantPage) ||
            sortValueInCompletedPageAndTask
          }
          headerTitle='sort by'
        />

        {title === 'my day' && (
          <Tooltip placement='top' title='suggestions' arrow>
            <div className='icon'>
              <LightbulbOutlinedIcon />

              {width < 600 ? '' : 'suggestions'}
            </div>
          </Tooltip>
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-bottom: 2rem;
  width: 100%;
  height: 100%;
  color: var(--font-color-primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    h3 {
      padding-top: 0.8rem;
      font-size: 1.1rem;
      font-weight: 500;
    }
  }
  .title-date {
    position: relative;
    div {
      width: 200%;
      position: absolute;
      top: 85%;
      left: 70%;
      transform: translate(-35%, 0%);
      color: var(--font-color-disable);
      font-size: 0.8rem;
      font-weight: 300;
    }
  }

  div.last-items {
    > div {
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: 300;

      color: var(--font-color-secondary) !important;
      &:hover {
        background-color: var(--bg-active);
      }
    }
  }
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.3rem;

    color: var(--font-color-secondary) !important;
    position: relative;
    cursor: pointer;
  }
`

export const ListOptionsMenuValue = ({ headerTitle, array, onClick }) => {
  return (
    <List
      className={headerTitle}
      subheader={
        <ListSubheader
          sx={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '.9rem',
            fontWeight: '600',
            color: 'var(--font-color-primary)',
          }}
          component='div'>
          {headerTitle}
        </ListSubheader>
      }
      sx={{ boxShadow: 'var(--light-shadow)', borderRadius: 'var(--radius)' }}>
      <Divider />

      {array.map((item, index) => {
        return (
          <ListItem key={index} disablePadding>
            <ListItemButton disableRipple onClick={onClick}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                disableTypography
                sx={{
                  fontSize: '.9rem',
                  color: 'var(--font-color-secondary)',
                }}
                primary={item.title}
              />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}

// default values array
const optionsValue = [{ icon: <PrintOutlinedIcon />, title: 'print' }]
const optionsValueInOtherPage = [
  { icon: <ColorLensOutlinedIcon />, title: 'changeTheme' },

  { icon: <PrintOutlinedIcon />, title: 'print' },
]
const sortValue = [
  {
    icon: <StarBorderOutlinedIcon />,
    title: 'importance',
  },
  {
    icon: <CalendarMonthOutlinedIcon />,
    title: 'due date',
  },
  {
    icon: <SwapVertOutlinedIcon />,
    title: 'alphabetically',
  },
  {
    icon: <MoreTimeOutlinedIcon />,
    title: 'creation date',
  },
]
const sortValueInImportantPage = [
  { icon: <CalendarMonthOutlinedIcon />, title: 'due date' },
  { icon: <StarBorderOutlinedIcon />, title: 'adjust to my day' },
  { icon: <SwapVertOutlinedIcon />, title: 'alphabetically' },
  { icon: <MoreTimeOutlinedIcon />, title: 'creation date' },
]
const sortValueInCompletedPageAndTask = [
  { icon: <StarBorderOutlinedIcon />, title: 'importance' },
  { icon: <CalendarMonthOutlinedIcon />, title: 'due date' },
  { icon: <StarBorderOutlinedIcon />, title: 'adjust to my day' },
  { icon: <SwapVertOutlinedIcon />, title: 'alphabetically' },
  { icon: <MoreTimeOutlinedIcon />, title: 'creation date' },
]

export default function MenuListComposition({
  title,
  icon,
  headerTitle,
  array,
}) {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])
  return (
    <Stack direction='row' spacing={2}>
      <div>
        <span
          className='icon'
          ref={anchorRef}
          id='composition-button'
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup='true'
          onClick={handleToggle}>
          {icon}
          {title}
        </span>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement='bottom-start'
          transition>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList sx={{ padding: '0' }}>
                    <ListOptionsMenuValue
                      onClick={handleClose}
                      headerTitle={headerTitle}
                      array={array}
                    />
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  )
}
