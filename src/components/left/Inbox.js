import React from 'react'

//icons
import { HomeOutlinedIcon } from '../../assets/icons'

import { PageTopRow } from './comp/TopRow'
import { AddTask } from './comp'
import { Wrapper } from '../../assets/style/StyledComponent'

import CompletedRow from '../Todo/CompletedRow'

const Inbox = () => {
  return (
    <Wrapper>
      <PageTopRow title='Tasks' logo={<HomeOutlinedIcon />} />
      <AddTask />
      <CompletedRow title='completed' showNotCompleted />
    </Wrapper>
  )
}

export default Inbox
