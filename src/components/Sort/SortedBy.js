import React from 'react'
import { styled } from '@mui/material/styles'

import {
  CloseOutlinedIcon,
  ExpandLessOutlinedIcon,
  //   ExpandMoreOutlinedIcon,
} from '../../assets/icons'

import { useGlobalContext } from '../../context/context'
import { Tooltip, IconButton } from '@mui/material'

const SortedBy = () => {
  const { sortTitle, closeSort } = useGlobalContext()

  return (
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
  )
}

export default SortedBy

const SortRow = styled('div')(() => ({
  justifySelf: 'end',
  fontSize: '0.7rem',
  gridColumn: '2 span',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  button: {
    borderRadius: 0,
    padding: '0',
  },
}))
