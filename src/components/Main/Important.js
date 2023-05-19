import React from 'react'

import { StarOutlineOutlinedIcon } from '../../assets/icons'

import { Wrapper } from '../../assets/style/StyledComponent'

import { useGlobalContext } from '../../context/context'
import { PageTopRow, AddTask, CompletedRow, Input } from '..'
const Important = () => {
  const { important, submitHandler, showBottomRow } = useGlobalContext()
  return (
    <Wrapper>
      <PageTopRow title='important' logo={<StarOutlineOutlinedIcon />} />
      <Input
        submitHandler={(e) => {
          submitHandler(e, true)
        }}
      />
      {showBottomRow && <AddTask />}

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
