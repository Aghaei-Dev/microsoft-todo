import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import { Button, IconButton, InputBase, Paper, Tooltip } from '@mui/material'

//icons
import {
  AppsOutlinedIcon,
  EastOutlinedIcon,
  ClearOutlinedIcon,
  SearchIcon,
} from '../../assets/icons'

import { useGlobalContext } from '../../context/context'

import { microsoftAppsLogo, appsExtended } from '../../assets/lists'
import { WestOutlinedIcon, MoreVertOutlinedIcon } from '../../assets/icons'
const AppsList = () => {
  const { toggleDrawer, leftList, height } = useGlobalContext()

  const [value, setValue] = useState('')
  const [searchResult, setSearchResult] = useState(appsExtended)

  const clearInput = () => {
    setValue('')
  }

  useEffect(() => {
    if (value) {
      setSearchResult(
        appsExtended.filter((item) => {
          return item.text.toLowerCase().includes(value.toLowerCase())
        })
      )
    } else {
      setSearchResult(appsExtended)
    }
  }, [value])

  return (
    <Wrapper height={height}>
      <div className='icon-container'>
        <div onClick={toggleDrawer('left', false, 'apps')}>
          <AppsOutlinedIcon
            fontSize='small'
            sx={{ color: 'var(--font-color-secondary)' }}
          />
        </div>
        <Button
          sx={{ textTransform: 'capitalize' }}
          endIcon={<EastOutlinedIcon fontSize='small' />}>
          Microsoft 365
        </Button>
      </div>

      {(leftList === 'apps' && (
        <div className='apps'>
          <h3>apps</h3>
          <div className='icons'>
            {microsoftAppsLogo.map((item, index) => {
              return (
                <div key={index}>
                  <img src={item.logo} alt={item.text} />
                  <p>{item.text}</p>
                </div>
              )
            })}
          </div>
          <Button
            onClick={toggleDrawer('left', true, 'apps-extended')}
            sx={{ textTransform: 'capitalize', mt: '2rem' }}
            endIcon={<EastOutlinedIcon fontSize='small' />}>
            All Apps
          </Button>
        </div>
      )) ||
        (leftList === 'apps-extended' && (
          <div className='apps-extended'>
            <Button
              fullWidth
              startIcon={<WestOutlinedIcon />}
              sx={{ padding: '.4rem', justifyContent: 'start' }}
              onClick={toggleDrawer('left', true, 'apps')}>
              back
            </Button>

            <Paper
              component='form'
              sx={{
                marginTop: '1rem',
                fontSize: '.85rem',
                borderRadius: 0,
                p: '2px 4px',
                marginRight: '.5rem',
                display: 'flex',
                alignItems: 'center',
                ':hover': {
                  boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.1)',
                },
                '::placeholder': {
                  color: ' var(--font-color-primary)',
                },
              }}>
              <IconButton onClick={clearInput} disabled={!value}>
                <Tooltip
                  placement='bottom-end'
                  arrow
                  title={value ? 'clear search query' : ''}>
                  {value ? <ClearOutlinedIcon /> : <SearchIcon />}
                </Tooltip>
              </IconButton>

              <InputBase
                value={value}
                onChange={(e) => {
                  setValue(e.target.value)
                }}
                sx={{ ml: 1, flex: 1 }}
                placeholder='Search all of your apps'
              />
            </Paper>

            <div className='apps-full-row'>
              <h4>apps</h4>
              {searchResult.length > 0
                ? searchResult.map((item, index) => {
                    return <SingleAppsExtended key={index} {...item} />
                  })
                : 'what you really want???'}
            </div>
            <div className='explore'>
              <Button
                sx={{
                  fontSize: '.8rem',
                  padding: '1rem',
                  justifyContent: 'start',
                  gap: '1rem',
                  ':hover': {
                    background: 'var(--bg-primary)',
                  },
                }}
                disableRipple
                fullWidth
                startIcon={<EastOutlinedIcon fontSize='small' />}>
                explore all your apps
              </Button>
            </div>
          </div>
        ))}
    </Wrapper>
  )
}

export default AppsList

const Wrapper = styled('div')(({ height }) => ({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '1rem',
  '.icon-container': {
    padding: '1rem 1.2rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '> div': {
      cursor: 'pointer',
      padding: ' 0.3rem',
      display: 'grid',
      placeItems: 'center',
      transition: ' var(--transition)',
      borderRadius: 'var(--radius)',
      ' &:hover': {
        background: 'var(--bg-border)',
      },
    },
  },
  '.apps ': {
    padding: '1rem 1.2rem',
    width: '100%',
    overflow: 'auto',
    height: height - 85, //nav bar + + icon
    maxHeight: height - 85, //nav bar + + icon
    ' h3': {
      fontSize: ' 1.1rem',
    },
    '.icons': {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: ' repeat(7, 1fr)',
      div: {
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        padding: ' 0.4rem',
        paddingRight: '1rem',
        img: {
          width: '27%',
          marginRight: ' 0.5rem',
        },
        p: {
          lineHeight: '0',
          color: 'var(--font-primary)',
          paddingTop: '1.4rem',
          textTransform: 'capitalize',
          fontSize: ' 0.8rem',
        },
        '&:hover': {
          background: 'var(--bg-border)',
        },
      },
    },
  },
  '.apps-extended': {
    position: 'relative',
    padding: '0rem 0rem 0rem 0.6rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  '.apps-full-row': {
    marginTop: '2rem',
    marginRight: '0.2rem',
    height: height - 270, //nav bar + search bar + icon
    maxHeight: height - 270, //nav bar + search bar + icon
    overflow: 'auto',
  },
  ' .explore': {
    borderTop: '1px solid var(--bg-border)',
    width: ' 100%',
  },
}))

const SingleAppsExtended = ({ text, logo }) => {
  return (
    <SingleAppsExtendedWrapper>
      <div>
        <img src={logo} alt={text} />
        <p>{text}</p>
        <span>
          <MoreVertOutlinedIcon fontSize='small' />
        </span>
      </div>
    </SingleAppsExtendedWrapper>
  )
}

const SingleAppsExtendedWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.4rem;
  margin-right: 0.3rem;
  div {
    display: flex;
    width: 50%;
    gap: 0.8rem;
    position: relative;
    img {
      width: 20%;
    }
    p {
      font-size: 0.8rem;
      color: var(--font-color-primary);
      line-height: 0;
      padding-top: 1.4rem;
    }
    span {
      display: none;
      position: absolute;
      top: 50%;
      right: -100%;
      transform: translate(0%, -40%);
    }
  }
  :hover {
    background-color: var(--bg-border);
  }
  &:hover span {
    display: block;
  }
`
