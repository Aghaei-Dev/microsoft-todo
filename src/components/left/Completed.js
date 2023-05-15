import React from 'react'

import { CheckCircleOutlinedIcon } from '../../assets/icons'

import { PageTopRow } from './comp/TopRow'

import { Wrapper } from '../../assets/style/StyledComponent'
import CompletedRow from '../Todo/CompletedRow'

const Completed = () => {
  return (
    <Wrapper>
      <PageTopRow title='Completed' logo={<CheckCircleOutlinedIcon />} />
      <CompletedRow title='tasks' showCompleted />
    </Wrapper>
  )
}

export default Completed
