import React from 'react'
import styled from 'styled-components'

import {
  CalendarMonthOutlinedIcon,
  NotificationsNoneOutlinedIcon,
  RepeatOutlinedIcon,
} from '../../../assets/icons'

import MenuListComposition from './TopRow'
import { Button } from '@mui/material'
import { useGlobalContext } from '../../../context/context'
const AddTask = () => {
  const { inputText, submitHandler } = useGlobalContext()

  return (
    <Wrapper>
      <div className='action-row'>
        <div>
          <div className='icon-container'>
            <MenuListComposition
              array={dueValue}
              headerTitle='due'
              title=''
              icon={<CalendarMonthOutlinedIcon />}
            />

            <MenuListComposition
              array={reminderValue}
              headerTitle='due'
              title=''
              icon={<NotificationsNoneOutlinedIcon />}
            />

            <MenuListComposition
              array={repeatValue}
              headerTitle='due'
              title=''
              icon={<RepeatOutlinedIcon />}
            />
          </div>
          <div>
            <Button
              className='add-btn'
              onClick={submitHandler}
              disabled={!inputText}>
              add
            </Button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default AddTask

const Wrapper = styled.div`
  width: 100%;
  .action-row {
    border-top: 1px solid var(--bg-border);
    width: 100%;
    height: 50px;
    background: var(--bg-primary);
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.08);
    border-bottom-left-radius: 0.4rem;
    border-bottom-right-radius: 0.4rem;
    padding: 0.4rem 0.5rem;
    > div {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon-container {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .icon {
    margin: 0 0.4rem;
    padding: 0.3rem;
    cursor: pointer;
    display: grid;
    place-items: center;
    color: var(--font-color-secondary);
    &:hover {
      background-color: var(--bg-secondary);
      border-radius: var(--radius);
    }
  }
  .add-btn {
    background: none;
    border: 1px solid var(--bg-border);
    color: var(--bg-brand);
    cursor: pointer;
    padding: 0.2rem !important;
    &:disabled {
      color: #a80000;
    }
  }
`

const dueValue = [
  { icon: <CalendarMonthOutlinedIcon />, title: 'today' },
  { icon: <CalendarMonthOutlinedIcon />, title: 'tomorrow' },
  { icon: <CalendarMonthOutlinedIcon />, title: 'next week' },
  { icon: <CalendarMonthOutlinedIcon />, title: 'pick a date' },
]
const reminderValue = [
  { icon: <CalendarMonthOutlinedIcon />, title: 'later today' },
  { icon: <CalendarMonthOutlinedIcon />, title: 'tomorrow' },
  { icon: <CalendarMonthOutlinedIcon />, title: 'next week' },
  { icon: <CalendarMonthOutlinedIcon />, title: 'pick a date & time' },
]
const repeatValue = [
  { icon: <CalendarMonthOutlinedIcon />, title: 'daily' },
  { icon: <CalendarMonthOutlinedIcon />, title: 'weekdays' },
  { icon: <CalendarMonthOutlinedIcon />, title: 'weekly' },
  { icon: <CalendarMonthOutlinedIcon />, title: 'monthly' },
  { icon: <CalendarMonthOutlinedIcon />, title: 'yearly' },
]
