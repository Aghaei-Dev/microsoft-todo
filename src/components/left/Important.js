import React from 'react'

import { StarOutlineOutlinedIcon } from '../../assets/icons'

import { PageTopRow } from './comp/TopRow'
import { AddTask } from './comp'
import { Wrapper } from '../../assets/style/StyledComponent'
import CompletedRow from '../Todo/CompletedRow'
import { useGlobalContext } from '../../context/context'
import { Input } from '..'
const Important = () => {
  const { important, submitHandler } = useGlobalContext()
  return (
    <Wrapper>
      <PageTopRow title='important' logo={<StarOutlineOutlinedIcon />} />
      <Input
        submitHandler={(e) => {
          submitHandler(e, true)
        }}
      />
      <AddTask />
      <CompletedRow
        listInTop={important}
        listInTopTitle='important'
        listInAccordion={important}
        listInAccordionTitle='important'
        title='completed'
        showNotCompleted
        showCompleted
      />
    </Wrapper>
  )
}

export default Important
