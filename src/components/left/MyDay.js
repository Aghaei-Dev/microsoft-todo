import React from 'react'

import { LightModeOutlinedIcon } from '../../assets/icons'

import { PageTopRow } from './comp/TopRow'

import { AddTask } from './comp'
import { Wrapper } from '../../assets/style/StyledComponent'
import CompletedRow from '../Todo/CompletedRow'
import { Input } from '../'
import Sort from '../../Sort'
const MyDay = () => {
  return (
    <>
      <Wrapper>
        <PageTopRow
          title='my day'
          logo={<LightModeOutlinedIcon fontSize='small' />}
        />
        <Input />

        <AddTask />
        <CompletedRow title='completed' showNotCompleted showCompleted />
        {/* <Sort /> */}
      </Wrapper>
    </>
  )
}

export default MyDay
