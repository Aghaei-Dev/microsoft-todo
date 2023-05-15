import React from 'react'
import styled from 'styled-components'
import {
  StarOutlinedIcon,
  StarOutlineOutlinedIcon,
  CheckCircleIcon,
  CircleOutlinedIcon,
  DeleteOutlinedIcon,
} from '../../assets/icons'
import { useGlobalContext } from '../../context/context'
import { Tooltip, Menu, MenuItem, Divider } from '@mui/material'
const SingleNote = ({ text, isCompleted, isImportant, id, note }) => {
  const {
    handleRightSideBarOpen,
    setAsCompleted,
    setAsNotCompleted,
    toggleImportant,
    findInformation,
    deleteHandler,
  } = useGlobalContext()
  const [contextMenu, setContextMenu] = React.useState(null)

  const handleContextMenu = (event) => {
    event.preventDefault()
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null
    )
  }

  const handleClose = () => {
    setContextMenu(null)
  }
  return (
    <Wrapper>
      <div className='icon'>
        <span
          onClick={() => {
            isCompleted ? setAsNotCompleted(id) : setAsCompleted(id)
          }}
          className='tick'
        >
          {isCompleted ? '' : '✓'}
        </span>

        {isCompleted ? (
          <CheckCircleIcon color='primary' fontSize='small' />
        ) : (
          <CircleOutlinedIcon color='primary' fontSize='small' />
        )}
      </div>
      <div
        onContextMenu={handleContextMenu}
        onClick={() => {
          handleRightSideBarOpen()
          findInformation(id)
        }}
        className='note'
      >
        <div className={`${isCompleted ? 'text completed' : 'text'}`}>
          {text}
        </div>
        <div className='desc'>tasks {note.length > 0 && '• 📝'}</div>
      </div>
      <Tooltip
        title={`${
          isImportant ? 'remove importance' : 'mark task as important'
        }`}
        arrow
        placement='top'
      >
        <div
          className='icon'
          onClick={() => {
            toggleImportant(id)
          }}
        >
          {isImportant ? (
            <StarOutlinedIcon color='primary' fontSize='small' />
          ) : (
            <StarOutlineOutlinedIcon color='primary' fontSize='small' />
          )}
        </div>
      </Tooltip>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference='anchorPosition'
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItemRow onClick={handleClose}>
          <span>
            <DeleteOutlinedIcon fontSize='small' />
          </span>
          Remove from my day
        </MenuItemRow>
        <MenuItemRow
          onClick={() => {
            toggleImportant(id)
            handleClose()
          }}
        >
          <span>
            {isImportant ? (
              <StarOutlinedIcon color='primary' fontSize='small' />
            ) : (
              <StarOutlineOutlinedIcon color='primary' fontSize='small' />
            )}
          </span>
          {isImportant ? ' Remove importance ' : ' Mark as important'}
        </MenuItemRow>
        <MenuItemRow
          onClick={() => {
            isCompleted ? setAsNotCompleted(id) : setAsCompleted(id)
            handleClose()
          }}
        >
          <span>
            {isCompleted ? (
              <CheckCircleIcon color='primary' fontSize='small' />
            ) : (
              <CircleOutlinedIcon color='primary' fontSize='small' />
            )}
          </span>
          Mark as not completed
        </MenuItemRow>
        <Divider />
        <MenuItemRow onClick={handleClose}>
          <span>
            <DeleteOutlinedIcon fontSize='small' />
          </span>
          Due today
        </MenuItemRow>
        <MenuItemRow onClick={handleClose}>
          <span>
            <DeleteOutlinedIcon fontSize='small' />
          </span>
          Due tomorrow
        </MenuItemRow>
        <Divider />
        <MenuItemRow onClick={handleClose}>
          <span>
            <DeleteOutlinedIcon fontSize='small' />
          </span>
          Create new list from this task
        </MenuItemRow>
        <MenuItemRow onClick={handleClose}>
          <span>
            <DeleteOutlinedIcon fontSize='small' />
          </span>
          Move task to...
        </MenuItemRow>
        <MenuItemRow onClick={handleClose}>
          <span>
            <DeleteOutlinedIcon fontSize='small' />
          </span>
          copy task to...
        </MenuItemRow>
        <Divider />
        <MenuItemRow
          style={{ color: 'red' }}
          onClick={() => {
            handleClose()
            deleteHandler(id)
          }}
        >
          <span>
            <DeleteOutlinedIcon fontSize='small' />
          </span>
          Delete
        </MenuItemRow>
      </Menu>
    </Wrapper>
  )
}

export default SingleNote

const Wrapper = styled.div`
  width: 100%;
  max-height: 8vh;
  min-height: 50px;
  background: var(--bg-primary);
  box-shadow: var(--light-shadow);
  border-radius: var(--radius);
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  .note {
    width: 100%;
    height: 100%;
    padding: 0 1rem;
  }
  .icon {
    display: grid;
    place-items: center;
    position: relative;
    .tick {
      display: none;
    }
    &:hover {
      .tick {
        color: var(--bg-brand);
        font-size: 0.75rem;
        position: absolute;
        border-radius: 50%;
        display: grid;
        place-items: center;
        width: 100%;
        height: 100%;
      }
    }
  }

  .text {
    text-transform: lowercase !important;
    font-size: 0.8rem;
    color: var(--font-color-secondary);
  }
  .completed {
    text-decoration: line-through;
  }
  .desc {
    font-size: 0.7rem;
    color: var(--font-color-disable);
  }
  &:hover {
    background: var(--bg-tertiary);
  }
`
const MenuItemRow = styled('li')(() => ({
  textTransform: 'none !important',
  padding: '.4rem 1rem',
  display: 'flex',
  justifyContent: 'start',
  // alignItems: 'center',
  fontSize: '.9rem',
  gap: '1rem',
  cursor: 'pointer',
  ':hover': {
    background: 'var( --bg-hover)',
  },
}))
