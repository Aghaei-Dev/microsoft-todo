import React, { useRef } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Drawer, List, IconButton, Tooltip } from '@mui/material'

import moment from 'moment/moment'

//icons

import {
  StarOutlineOutlinedIcon,
  CheckCircleIcon,
  StarOutlinedIcon,
  ExitToAppOutlinedIcon,
  DeleteOutlinedIcon,
  LightModeOutlinedIcon,
  NotificationsNoneOutlinedIcon,
  AttachFileOutlinedIcon,
  LocalOfferOutlinedIcon,
  CalendarMonthOutlinedIcon,
  RepeatOutlinedIcon,
  CircleOutlinedIcon,
} from '../../assets/icons'

import { useGlobalContext } from '../../context/context'

const RightSideBar = () => {
  const {
    rightSideBarOpen,
    information,
    handleRightSideBarClose,
    width,
    height,
    setAsCompleted,
    setAsNotCompleted,
    setAsImportant,
    setAsNotImportant,
    deleteHandler,
  } = useGlobalContext()
  const textAreaRef = useRef()
  const autosize = () => {
    setTimeout(function () {
      textAreaRef.current.style.cssText = ` 
        height: ${textAreaRef.current.scrollHeight}px;
      `
    }, 0)
  }

  return (
    <Wrapper height={height}>
      <Box sx={{ display: 'flex' }}>
        <Drawer
          sx={{
            width: width < 800 ? 350 : 350,
            flexShrink: 0,
            zIndex: width < 800 ? 1 : 0,
            '& .MuiDrawer-paper': {
              width: width < 800 ? 350 : 350,

              boxSizing: 'border-box',
              pt: '3.1rem',
              zIndex: 1,
            },
          }}
          variant={`${width < 800 ? 'temporary' : 'persistent'}`}
          anchor='right'
          open={rightSideBarOpen}>
          <List
            sx={{
              maxHeight: height,
              background: 'var(--bg-secondary)',
              overflow: 'auto',
            }}>
            <InformationWrapper height={height}>
              <div className='top-col'>
                <div className='note-step'>
                  <div className='icon'>
                    <span
                      onClick={() => {
                        information?.isCompleted
                          ? setAsNotCompleted(information?.id)
                          : setAsCompleted(information?.id)
                      }}
                      className='tick'>
                      {information?.isCompleted ? '' : '✓'}
                    </span>

                    {information?.isCompleted ? (
                      <CheckCircleIcon color='primary' fontSize='small' />
                    ) : (
                      <CircleOutlinedIcon color='primary' fontSize='small' />
                    )}
                  </div>
                  <div className='note'>
                    <div
                      className={`${
                        information?.isCompleted ? 'text completed' : 'text'
                      }`}>
                      {information?.text}
                    </div>
                  </div>
                  <Tooltip
                    title={`${
                      information?.isImportant
                        ? 'remove importance'
                        : 'mark task as important'
                    }`}
                    arrow
                    placement='top'>
                    <div
                      className='icon'
                      onClick={() => {
                        information?.isImportant
                          ? setAsNotImportant(information?.id)
                          : setAsImportant(information?.id)
                      }}>
                      {information?.isImportant ? (
                        <StarOutlinedIcon color='primary' fontSize='small' />
                      ) : (
                        <StarOutlineOutlinedIcon
                          color='primary'
                          fontSize='small'
                        />
                      )}
                    </div>
                  </Tooltip>
                </div>
                <div className='desc'>
                  <Row
                    title='added to my day'
                    icon={<LightModeOutlinedIcon fontSize='small' />}
                    gapTopAndBottom
                    primary
                  />
                  <Row
                    title='remind me'
                    icon={<NotificationsNoneOutlinedIcon fontSize='small' />}
                  />
                  <Row
                    title='add due date'
                    icon={<CalendarMonthOutlinedIcon fontSize='small' />}
                  />
                  <Row
                    title='repeat'
                    icon={<RepeatOutlinedIcon fontSize='small' />}
                    gapTopAndBottom
                    lastItem
                  />
                  <Row
                    title='pick a category'
                    icon={<LocalOfferOutlinedIcon fontSize='small' />}
                    gapTopAndBottom
                  />
                  <Row
                    title='add file'
                    icon={<AttachFileOutlinedIcon fontSize='small' />}
                    gapTopAndBottom
                    addFile
                  />
                  <textarea
                    className='textarea'
                    placeholder='Add note'
                    ref={textAreaRef}
                    // value={information?.note}
                    // onSubmit={(e) => {
                    // noteHandler(information?.id, e.target.value)
                    // }}
                    onKeyDown={autosize}></textarea>
                </div>
              </div>
              <div className='bottom-row'>
                <Tooltip arrow title='hide detail view' placement='top'>
                  <IconButton onClick={handleRightSideBarClose} disableRipple>
                    <ExitToAppOutlinedIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
                <span>
                  {information?.isCompleted
                    ? ` Completed ${moment(
                        Number(information?.doneAt)
                      ).fromNow()}`
                    : `Created ${moment(
                        Number(information?.createdAt)
                      ).fromNow()}`}
                </span>
                <Tooltip arrow title='delete task' placement='top'>
                  <IconButton
                    onClick={() => {
                      deleteHandler(information?.id)
                      handleRightSideBarClose()
                    }}
                    disableRipple>
                    <DeleteOutlinedIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              </div>
            </InformationWrapper>
          </List>
        </Drawer>
      </Box>
    </Wrapper>
  )
}

export default RightSideBar

const InformationWrapper = styled('div')(({ height }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  height: height - 70,

  '.top-col': {
    paddingTop: '.5rem',
    display: 'flex',
    flexDirection: 'column',
    '.note-step': {
      margin: '0rem 1.5rem',
      padding: '.8rem',
      background: ' var(--bg-primary)',
      boxShadow: ' var(--light-shadow)',
      borderRadius: ' var(--radius)',

      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      ':hover': {
        background: 'var(--bg-tertiary)',
      },
      '.note': {
        width: ' 100%',
        height: ' 100%',
        padding: '0 1rem',
      },
      '.icon': {
        display: 'grid',
        placeItems: 'center',
        position: 'relative',
        '.tick': {
          display: 'none',
        },
      },
      ' :hover': {
        '.tick ': {
          color: ' var(--bg-brand)',
          fontSize: ' 0.75rem',
          position: 'absolute',
          borderRadius: ' 50%',
          display: 'grid',
          placeItems: 'center',
          width: ' 100%',
          height: '100%',
        },
      },
    },
    ' .text': {
      textTransform: ' lowercase !important',
      fontSize: '0.8rem',
      color: ' var(--font-color-secondary)',
    },
    ' .completed ': {
      textDecoration: 'line-through',
    },
  },
  '.desc': {
    maxHeight: height - 180,
    overflow: 'auto',
    padding: '0rem 1.5rem',
    '.desc-item': {
      background: 'var(--bg-primary)',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '.8rem',
      fontSize: '.88rem',
      fontWeight: '400',
    },

    '.textarea': {
      background: 'var(--bg-primary)',
      display: 'block',
      width: '100%',
      overflow: 'hidden',
      height: 'auto',
      minHeight: '8rem',
      resize: 'none',
      padding: '1.5rem',
      color: 'var(--font-color-primary)',
      border: '1px solid var(--bg-secondary)',

      outline: 'none',
      ':hover': {
        border: '1px solid var(--bg-border)',
      },
      ':empty::before': {
        color: 'gray',
        content: '"add note"',
        fontSize: '.8rem',
      },
    },
  },

  '.bottom-row': {
    margin: '0rem 1.5rem',
    borderTop: '1px solid var(--bg-border)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '.5rem ',
    color: 'var(--font-color-primary)',
    fontSize: '.8rem',
    span: {
      color: 'var(--font-color-secondary)',
    },
  },
}))
const Wrapper = styled('div')(({ height }) => ({
  maxHeight: height - 50, //50 px for navbar
  overflow: 'auto',
}))

const Row = ({ icon, title, gapTopAndBottom, primary, lastItem, addFile }) => {
  const getFile = () => {
    document.getElementById('fileElem').click()
  }
  return (
    <div
      onClick={() => {
        addFile && getFile()
      }}
      className='desc-item'
      style={{
        margin: `${(gapTopAndBottom && 0.5) || 0}rem 0rem`,
        marginTop: `${lastItem && '0'}`,
        color: `${primary ? 'var(--bg-brand)' : 'var(--font-color-secondary)'}`,
        borderBottom: `${
          !gapTopAndBottom && !lastItem && '1px solid var(--bg-border)'
        }`,
      }}>
      {icon}
      {title}
      {addFile && (
        <input
          type='file'
          id='fileElem'
          multiple
          accept='image/*'
          style={{ display: 'none' }}
        />
      )}
    </div>
  )
}
