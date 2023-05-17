import * as React from 'react'

import { ClearOutlinedIcon, CircleOutlinedIcon } from '../assets/icons'
import styled from 'styled-components'
import { Tooltip, IconButton, InputBase, Divider, Paper } from '@mui/material'
import { useGlobalContext } from '../context/context.js'

export default function CustomizedInputBase({ submitHandler }) {
  const { inputText, setInputText, clearInputHandler } = useGlobalContext()
  return (
    <Wrapper>
      <Paper
        component='form'
        onSubmit={submitHandler}
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
