import React from 'react'

import { CheckCircleOutlinedIcon } from '../../assets/icons'

import { PageTopRow } from './comp/TopRow'

import { Wrapper } from '../../assets/style/StyledComponent'
import CompletedRow from '../Todo/CompletedRow'
import { useGlobalContext } from '../../context/context'
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
