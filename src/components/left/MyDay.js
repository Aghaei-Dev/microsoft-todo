import React from 'react'

import { LightModeOutlinedIcon } from '../../assets/icons'

import { PageTopRow } from './comp/TopRow'

import { AddTask } from './comp'
import { Wrapper } from '../../assets/style/StyledComponent'
import { Input } from '../'
import { useGlobalContext } from '../../context/context'
import CompletedRow from '../Todo/CompletedRow'
const MyDay = () => {
  const { submitHandler, completed, notCompleted, showBottomRow } =
    useGlobalContext()
  return (
    <>
      <Wrapper>
        <PageTopRow
          title='my day'
          logo={<LightModeOutlinedIcon fontSize='small' />}
        />
        <Input
          submitHandler={(e) => {
            submitHandler(e, false)
          }}
        />
        {showBottomRow && <AddTask />}

        <CompletedRow
          listInTop={notCompleted}
          listInAccordion={completed}
          listInAccordionTitle='completed'
          listInTopTitle='notCompleted'
          title='completed'
          showNotCompleted
          showCompleted
        />
      </Wrapper>
    </>
  )
}

export default MyDay
