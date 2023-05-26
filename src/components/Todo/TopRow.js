import React from 'react'
import { styled } from '@mui/material/styles'

import { useGlobalContext } from '../../context/context'

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
  CloseOutlinedIcon,
  ExpandLessOutlinedIcon,
  ExpandMoreOutlinedIcon,
} from '../../assets/icons'

import {
  optionsValue,
  optionsValueInOtherPage,
  sortValue,
  sortValueInCompletedPageAndTask,
  sortValueInImportantPage,
} from '../../assets/lists'
import moment from 'moment/moment'

export const PageTopRow = ({ logo, title }) => {
  const { open, handleDrawerOpen, width, sortTitle, closeSort, showSort } =
    useGlobalContext()

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

      {showSort && (
        <SortRow>
          <div>
            <Tooltip title='reverse sort order' placement='top' arrow>
              <IconButton disableRipple onClick={closeSort}>
                <ExpandLessOutlinedIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          </div>
          <div>sorted by {sortTitle}</div>
          <div>
            <Tooltip title='remove sort order option' placement='top-end' arrow>
              <IconButton disableRipple onClick={closeSort}>
                <CloseOutlinedIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          </div>
        </SortRow>
      )}
    </Wrapper>
  )
}

const Wrapper = styled('div')(() => ({
  position: 'relative',
  marginBottom: ' 2rem',
  width: '100%',
  height: '100%',
  color: 'var(--font-color-primary)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
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

const SortRow = styled('div')(() => ({
  fontSize: '0.7rem',
  position: 'absolute',
  top: '100%',
  right: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  button: {
    borderRadius: 0,
    padding: '0',
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
                          <ListItem key={index} disablePadding>
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
