import * as React from 'react'

import { useAuth0 } from '@auth0/auth0-react'

import {
  Avatar,
  IconButton,
  Box,
  Stack,
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
  Tooltip,
  Button,
} from '@mui/material'

import {Microsoft} from '..'

import styled from 'styled-components'
import { useGlobalContext } from '../../context/context.js'
import { NavWrapper } from '../../assets/style/StyledComponent.js'

export default function AccountMenu() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()
  const { toggleDrawer, setOpenAnchor, setRightList } = useGlobalContext()

  const isUser = isAuthenticated && user

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

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <NavWrapper>
      {isUser ? (
        <Stack>
          <div>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              <Tooltip title={`Account manager for ${user.name}`}>
                <IconButton
                  className='icon-btn'
                  disableRipple
                  ref={anchorRef}
                  id='composition-button'
                  aria-controls={open ? 'composition-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup='true'
                  onClick={() => {
                    handleToggle()
                    setRightList('')
                    setOpenAnchor(false)
                    toggleDrawer('right', false)
                  }}
                  size='small'>
                  <Avatar sx={{ width: 40, height: 40 }}>
                    {isUser && user.picture && (
                      <img src={user.picture} alt={user.name} />
                    )}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Popper
              sx={{
                zIndex: '10',
              }}
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement='bottom'
              transition
              disablePortal>
              {({ TransitionProps }) => (
                <Grow {...TransitionProps}>
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <Modal>
                        <div className='logout'>
                          <Microsoft />
                          <Button
                            sx={{
                              color: 'red',
                              textTransform: 'capitalize',
                              padding: '.5rem 2rem',
                            }}
                            onClick={() => {
                              logout({ returnTo: window.location.origin })
                            }}>
                            sign out
                          </Button>
                        </div>
                        <div>
                          <div className='information'>
                            <Avatar sx={{ width: 90, height: 90 }}>
                              {isUser && user.picture && (
                                <img src={user.picture} alt={user.name} />
                              )}
                            </Avatar>

                            <div className='information-data'>
                              <h3>
                                {user.name.slice(0, 12) ||
                                  user.nickname.slice(0, 12)}
                              </h3>
                              <p>{user.email}</p>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </Stack>
      ) : (
        <button className='login-btn' onClick={loginWithRedirect}>
          login
        </button>
      )}
    </NavWrapper>
  )
}
const Modal = styled.div`
  width: 330px;
  height: 10rem;
  padding: 0.7rem;
  background: var(--bg-primary);

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  .logout {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .information {
    gap: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .information-data {
      padding-top: 1rem;
      p {
        line-height: 0;
        padding: 1rem 0;
        color: var(--font-color-primary);
        font-size: 0.9rem;
      }
    }
  }
`
