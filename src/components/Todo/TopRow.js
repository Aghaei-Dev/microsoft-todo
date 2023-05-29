import React from 'react'
import { styled } from '@mui/material/styles'

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
  LightbulbOutlinedIcon,
} from '../../assets/icons'

import {
  optionsValue,
  optionsValueInOtherPage,
  sortValue,
  sortValueInCompletedPageAndTask,
  sortValueInImportantPage,
} from '../../assets/lists'
import moment from 'moment/moment'

import SortedBy from '../Sort/SortedBy'
import { useGlobalContext } from '../../context/context'

export const PageTopRow = ({ logo, title }) => {
  const { open, handleDrawerOpen, width, showSort } = useGlobalContext()

  return (
    <Wrapper showSort={showSort}>
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
      {showSort && <SortedBy />}
    </Wrapper>
  )
}

const Wrapper = styled('div')(({ showSort }) => ({
  marginBottom: showSort ? '.5rem' : ' 2rem',
  width: '100%',
  height: '100%',
  color: 'var(--font-color-primary)',
  display: 'grid',
  gridTemplateColumns: '3fr 1fr ',
  gridTemplateRows: showSort ? '1fr 1fr' : '1fr',

  div: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    h3: {
      paddingTop: ' 0.8rem',
      fontSize: '1.1rem',
      fontWeight: 500,
    },
  },
  '.title-date': {
    position: 'relative',
    div: {
      width: ' 200%',
      position: 'absolute',
      top: '85%',
      left: '70%',
      transform: 'translate(-35%, 0%)',
      color: 'var(--font-color-disable)',
      fontSize: '0.8rem',
      fontWeight: '300',
    },
  },
  'div.last-items': {
    justifySelf: 'end',
    ' > div': {
      cursor: 'pointer',
      fontSize: ' 0.8rem',
      fontWeight: '300',

      color: 'var(--font-color-secondary) !important',
      ':hover': {
        backgroundColor: 'var(--bg-active)',
      },
    },
  },
  ' .icon ': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.3rem',

    color: 'var(--font-color-secondary) !important',
    position: 'relative',
    cursor: 'pointer',
  },
}))

export default function MenuListComposition({
  title,
  icon,
  headerTitle,
  array,
}) {
  const { setSortTitle } = useGlobalContext()

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
    <Stack sx={{ zIndex: 2 }} direction='row' spacing={2}>
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
                      sx={{
                        boxShadow: 'var(--light-shadow)',
                        borderRadius: 'var(--radius)',
                      }}>
                      <Divider />

                      {array.map((item, index) => {
                        return (
                          <span key={index}>
                            <ListItem disablePadding>
                              <ListItemButton
                                disableRipple
                                onClick={(e) => {
                                  handleClose(e)
                                  setSortTitle(item.sortTitle)
                                }}>
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

                            {item.divider && (
                              <Divider sx={{ margin: '.5rem 0' }} />
                            )}
                          </span>
                        )
                      })}
                    </List>
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
