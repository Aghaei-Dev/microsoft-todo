import React from 'react'
import styled from 'styled-components'
import { Button, Box, CircularProgress } from '@mui/material'

import { ClearOutlinedIcon } from '../../assets/icons'
import { useGlobalContext } from '../../context/context'
import AntSwitch from '../AntSwitch/AntSwitch'

import { newsBoxes, bottomOfNewsBoxes, setting } from '../../assets/lists'

const RightList = () => {
  const { rightList, toggleDrawer, width, height } = useGlobalContext()

  return (
    <Wrapper height={height}>
      <div className='top-row'>
        <h3>{rightList}</h3>
        <div onClick={toggleDrawer('right', false, '')}>
          <ClearOutlinedIcon sx={{ color: 'var(--font-color-secondary)' }} />
        </div>
      </div>

      <div className='content'>
        {(rightList === 'Settings' && <Setting />) ||
          (rightList === 'help & feedback' && <Help />) ||
          (rightList === 'What’s news' && <News />)}
      </div>
    </Wrapper>
  )
}

export default RightList
const Wrapper = styled('div')(({ height }) => ({
  maxHeight: height - 57, //for navbar
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '2rem',
  paddingTop: '1rem',
  overflow: 'auto',
  '.top-row': {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    h3: {
      lineHeight: 0,
      paddingTop: ' 0.5rem',
      fontSize: ' 1.4rem',
      fontWeight: '300',
    },
    div: {
      cursor: 'pointer',
      padding: '0.3rem',
      display: 'grid',
      placeItems: 'center',
      transition: 'var(--transition)',
      borderRadius: 'var(--radius)',
      ' &:hover': {
        background: ' var(--bg-border)',
      },
    },
  },
  '.content': {
    width: ' 100%',
  },
}))

//Setting section
const Setting = () => {
  const { toggleDarkMode } = useGlobalContext()
  return (
    <WrapperSetting>
      <AntSwitch onChange={toggleDarkMode} />
      {setting.map((item, index) => {
        return (
          <div key={index}>
            <h3>{item.title}</h3>
            <div>
              {item.data.map((item, index) => {
                return (
                  <div key={index} className='switch-container'>
                    <p>{item.label}</p>
                    <div>
                      <AntSwitch value={item.checked} />
                      <span>{item.checked ? 'on' : 'off'}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </WrapperSetting>
  )
}
const WrapperSetting = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  div {
    h3 {
      line-height: 0;
      padding-top: 0.5rem;
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
    }
    div {
      .switch-container {
        margin-bottom: 1rem;
        p {
          line-height: 1rem;
          color: var(--font-color-primary);
          margin-bottom: 0.5rem;
        }
        div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 22%;
        }
      }
    }
  }
`

//Help and Feedback section
const Help = () => {
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(true)
  const timer = React.useRef()

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false)
      setLoading(true)
      timer.current = window.setTimeout(() => {
        setSuccess(true)
        setLoading(false)
      }, 2000)
    }
  }
  return (
    <WrapperHelp>
      <p>get support</p>
      <Box
        sx={{
          position: 'relative',
        }}>
        <Button
          variant='contained'
          disabled={loading}
          onClick={handleButtonClick}>
          sync
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Button>
        <span>{success ? 'Up to date' : 'synchronization in progress'}</span>
      </Box>
    </WrapperHelp>
  )
}
const WrapperHelp = styled.div`
  p {
    color: var(--list-theme-blue-primary-0);
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  span {
    padding-left: 0.4rem;
    font-size: 0.9rem;
  }
`

//News section
const News = () => {
  return (
    <WrapperNews>
      {newsBoxes.map((item, index) => {
        return (
          <article key={index}>
            <img src={item.img} alt={item.btnText} />
            <div className='text'>
              <p>{item.text}</p>
              <Button
                color='secondary'
                sx={{ fontSize: '.8rem' }}
                variant='outlined'>
                {item.btnText}
              </Button>
            </div>
          </article>
        )
      })}
      <div className='download-app'>
        <div>download the app .</div>
        <div className='img-container'>
          {bottomOfNewsBoxes.map((item, index) => {
            return <img key={index} src={item} alt={item} />
          })}
        </div>
      </div>
    </WrapperNews>
  )
}
const WrapperNews = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 84vh;
  gap: 1rem;
  article {
    box-shadow: var(--light-shadow);
    background: var(--bg-secondary);
    img {
      width: 100%;
    }
    .text {
      padding: 1rem 1.5rem;
      padding-bottom: 1rem;
      p {
        font-size: 1rem;
      }
    }
  }
  .download-app {
    width: 100%;
    /* margin-top: 5rem; */
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid var(--bg-border);
    font-size: 0.8rem;
    .img-container {
      width: 50%;
      display: flex;
      justify-content: end;
      gap: 0.5rem;
      align-items: center;
      img {
        cursor: pointer;
        width: 15%;
      }
    }
  }
`
