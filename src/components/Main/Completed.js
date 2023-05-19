import React from 'react'

import { CheckCircleOutlinedIcon } from '../../assets/icons'
import { Wrapper } from '../../assets/style/StyledComponent'
import { useGlobalContext } from '../../context/context'

import { PageTopRow, CompletedRow } from '..'

const Completed = () => {
  const { completed } = useGlobalContext()
  return (
    <Wrapper>
      <PageTopRow title='Completed' logo={<CheckCircleOutlinedIcon />} />

      <CompletedRow
        listInAccordion={completed}
        listInAccordionTitle='completed'
        title='tasks'
        showCompleted
      />
    </Wrapper>
  )
}

export default Completed
