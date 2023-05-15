import React, { useEffect } from 'react'

import { StarOutlineOutlinedIcon } from '../../assets/icons'

import { PageTopRow } from './comp/TopRow'
import { AddTask } from './comp'
import { Wrapper } from '../../assets/style/StyledComponent'
import CompletedRow from '../Todo/CompletedRow'
import { useGlobalContext } from '../../context/context'
import { Input } from '..'
const Important = () => {
  const { important, specialSubmit } = useGlobalContext()
  return (
    <Wrapper>
      <PageTopRow title='important' logo={<StarOutlineOutlinedIcon />} />
      <Input submitHandler={specialSubmit} />
      <AddTask />
      <CompletedRow showNotCompleted listInAccordion={important} />
    </Wrapper>
  )
}

export default Important
