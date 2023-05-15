import React from 'react'
import styled1 from 'styled-components'

import { styled } from '@mui/material/styles'

import { Accordion, AccordionDetails, Divider } from '@mui/material'
import MuiAccordionSummary from '@mui/material/AccordionSummary'

import SingleNote from './SingleNote'

import { ChevronRightIcon } from '../../assets/icons'

import { useGlobalContext } from '../../context/context'

const CompletedRow = ({
  title,
  showNotCompleted,
  showCompleted,
  listInAccordion,
}) => {
  const { notCompleted, completed } = useGlobalContext()

  return (
    <Wrapper>
      {showNotCompleted && notCompleted.length > 0 && (
        <div className='not-completed'>
          {notCompleted.map((item) => {
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
      {showCompleted && completed.length > 0 && (
        <CompletedList
          title={title}
          showCompleted={showCompleted}
          listInAccordion={listInAccordion}
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
    gap: 1rem;
  }
`

export function CompletedList({ title, showCompleted, listInAccordion }) {
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ChevronRightIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
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

  const { completed } = useGlobalContext()
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
          <div>{completed.length}</div>
        </AccordionSummary>

        <AccordionDetails
          sx={{
            padding: '1rem 0',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}>
          {listInAccordion ||
            completed.map((item) => {
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
