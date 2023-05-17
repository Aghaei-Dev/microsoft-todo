import React from 'react'
import styled1 from 'styled-components'

import { styled } from '@mui/material/styles'

import { Accordion, AccordionDetails, Divider } from '@mui/material'
import MuiAccordionSummary from '@mui/material/AccordionSummary'

import SingleNote from './SingleNote'

import { ChevronRightIcon } from '../../assets/icons'

const CompletedRow = ({
  title,
  showNotCompleted,
  showCompleted,
  listInAccordion,
  listInAccordionTitle,
  listInTopTitle,

  listInTop,
}) => {
  const list =
    listInTopTitle === 'important'
      ? listInTop.filter((item) => item.isCompleted !== true)
      : listInTop
  return (
    <Wrapper>
      {showNotCompleted && list.length > 0 && (
        <div className='not-completed'>
          {list.map((item) => {
            const { id, text, isCompleted, isImportant, note } = item

            return (
              <SingleNote
                id={id}
                isImportant={isImportant}
                isCompleted={isCompleted}
                key={id}
                text={text}
                note={note}
              />
            )
          })}
        </div>
      )}
      {showCompleted && listInAccordion.length > 0 && (
        <CompletedList
          title={title}
          showCompleted={showCompleted}
          listInAccordion={listInAccordion}
          listInAccordionTitle={listInAccordionTitle}
        />
      )}
      <Divider />
    </Wrapper>
  )
}

export default CompletedRow

const Wrapper = styled1.div`
  .not-completed{
    padding:1rem 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
  }
`

export function CompletedList({
  title,
  listInAccordionTitle,
  showCompleted,
  listInAccordion,
}) {
  const list =
    listInAccordionTitle === 'important'
      ? listInAccordion.filter((item) => item.isCompleted === true)
      : listInAccordion
  return (
    <div>
      <Accordion
        sx={{
          marginTop: '1.5rem',
          background: 'inherit',
          border: 'none',
          boxShadow: 'none',
        }}>
        <AccordionSummary expandIcon={<ChevronRightIcon />}>
          <div>{title} </div>
          <div>{list.length}</div>
        </AccordionSummary>

        <AccordionDetails
          sx={{
            padding: '1rem 0',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '.5rem',
          }}>
          {list.map((item) => {
            const { id, text, isCompleted, isImportant, note } = item

            return (
              <SingleNote
                id={id}
                isImportant={isImportant}
                isCompleted={isCompleted}
                key={id}
                text={text}
                note={note}
              />
            )
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ChevronRightIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(() => ({
  flexDirection: 'row-reverse',
  paddingLeft: '.5rem',
  '& .MuiAccordionSummary-content': {
    gap: '1.5rem',
    fontWeight: '500',
    fontSize: '.9rem',
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    marginRight: '1rem',
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
}))
