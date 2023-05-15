import * as React from 'react'

import { ClearOutlinedIcon, CircleOutlinedIcon } from '../assets/icons'
// import { styled } from '@mui/material/styles'
import styled from 'styled-components'
import { Tooltip, IconButton, InputBase, Divider, Paper } from '@mui/material'
import { useGlobalContext } from '../context/context.js'
// const TodoInput = styled(InputBase)(({ theme }) => ({
//   // // background: 'red',
//   // // display: 'flex',
//   // // '&:hover': {
//   // //   color: 'red',
//   // // },
//   // '&:active': {
//   //   color: 'red!important',
//   // },
//   // '&:focus': {
//   //   color: 'red',
//   // },
//   // '&::focus-visible': {
//   //   color: 'red',
//   // },
//   // '& .MuiSwitch-switchBase': {
//   //   padding: 3.5,
//   //   '&.Mui-checked': {
//   //     transform: 'translateX(20px)',
//   //     color: '#fff',
//   //     '& + .MuiSwitch-track': {
//   //       opacity: 1,
//   //       backgroundColor: theme.palette.primary.main,
//   //     },
//   //   },
//   // },
//   // '& .MuiSwitch-thumb': {
//   //   boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
//   //   width: 15,
//   //   height: 15,
//   //   borderRadius: 40,
//   //   transition: theme.transitions.create(['width'], {
//   //     duration: 200,
//   //   }),
//   // },
//   // '& .MuiSwitch-track': {
//   //   borderRadius: 40 / 2,
//   //   opacity: 1,
//   //   backgroundColor:
//   //     theme.palette.mode === 'dark'
//   //       ? 'rgba(255,255,255,.35)'
//   //       : 'rgba(0,0,0,.25)',
//   //   boxSizing: 'border-box',
//   // },
// }))

export default function CustomizedInputBase({ submitHandler }) {
  const { inputText, setInputText, clearInputHandler, ordinarySubmit } =
    useGlobalContext()
  return (
    <Wrapper>
      <Paper
        component='form'
        onSubmit={submitHandler || ordinarySubmit}
        sx={{
          borderRadius: '0px',
          borderTopLeftRadius: '.4rem',
          borderTopRightRadius: '.4rem',
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
          <CircleOutlinedIcon fontSize='small' />
        </IconButton>
        <InputBase
          onChange={(e) => {
            setInputText(e.target.value.trimStart())
          }}
          value={inputText}
          sx={{
            flex: 1,
            color: 'var(--bg-brand)',
            ':focus': {
              background: 'red',
            },
          }}
          placeholder='Add a task'
          inputProps={{ 'aria-label': 'Add a task' }}
        />

        <Divider sx={{ height: 28, margin: '.1rem' }} orientation='vertical' />
        <Tooltip arrow title='delete'>
          <span>
            <IconButton
              disabled={!inputText}
              onClick={clearInputHandler}
              color='danger'
              sx={{ padding: '10px' }}>
              <ClearOutlinedIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Paper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  input {
    color: var(--bg-brand);
    :focus {
      color: var(--font-color-primary);
    }
  }
`
