import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles'

import {
  ClearOutlinedIcon,
  CircleOutlinedIcon,
  AddOutlinedIcon,
} from '../assets/icons'
import { Tooltip, IconButton, InputBase, Divider, Paper } from '@mui/material'
import { useGlobalContext } from '../context/context.js'

export default function CustomizedInputBase({ submitHandler }) {
  const {
    inputText,
    setInputText,
    clearInputHandler,
    showBottomRow,
    setShowBottomRow,
  } = useGlobalContext()

  const closer = () => {
    setShowBottomRow(false)
  }
  useEffect(() => {
    console.log('ali')
    const timeout = setTimeout(() => closer(), 5000)

    return () => clearTimeout(timeout)
  })
  return (
    <Paper
      component='form'
      onSubmit={submitHandler}
      sx={{
        borderRadius: showBottomRow ? '.4rem  .4rem 0 0' : '.4rem',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        boxShadow: showBottomRow ? '' : 'var(--light-shadow)',
      }}>
      <IconButton
        disableRipple
        color='primary'
        sx={{ padding: '.8rem' }}
        onClick={() => {
          setShowBottomRow(true)
        }}>
        {showBottomRow ? (
          <CircleOutlinedIcon fontSize='small' />
        ) : (
          <AddOutlinedIcon fontSize='small' />
        )}
      </IconButton>
      <Input
        onFocus={() => {
          setShowBottomRow(true)
        }}
        onChange={(e) => {
          setInputText(e.target.value.trimStart())
          setShowBottomRow(true)
        }}
        value={inputText}
        placeholder='Add a task'
      />
      {showBottomRow && (
        <Divider sx={{ height: 28, margin: '.1rem' }} orientation='vertical' />
      )}
      {showBottomRow && (
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
      )}
    </Paper>
  )
}

const Input = styled(InputBase)(() => ({
  flex: 1,
  textTransform: 'capitalize!Important',
  color: 'var(--font-color-primary)',
  input: {
    textTransform: 'none!important',
    '::placeholder': {
      color: 'var(--bg-brand)',
    },
  },
}))
