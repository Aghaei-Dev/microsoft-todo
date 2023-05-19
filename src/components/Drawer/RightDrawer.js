import React from 'react'
import { styled } from '@mui/material/styles'

import { Button, Box, CircularProgress } from '@mui/material'

import { ClearOutlinedIcon } from '../../assets/icons'
import { useGlobalContext } from '../../context/context'
import { AntSwitch } from '..'

import { newsBoxes, bottomOfNewsBoxes, setting } from '../../assets/lists'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const RightList = () => {
  const { rightList, toggleDrawer, height } = useGlobalContext()

  const [parent] = useAutoAnimate()

  return (
    <Wrapper height={height}>
      <div className='top-row' ref={parent}>
        <h3>{rightList}</h3>
        <div onClick={toggleDrawer('right', false, '')}>
          <ClearOutlinedIcon sx={{ color: 'var(--font-color-secondary)' }} />
        </div>
      </div>

      <div className='content' ref={parent}>
        {(rightList === 'Settings' && <Setting />) ||
          (rightList === 'help & feedback' && <Help />) ||
          (rightList === 'What’s news' && <News />)}
      </div>
    </Wrapper>
  )
}

export default RightList
const Wrapper = styled('div')(({ height }) => ({
  height: height,
  maxHeight: height - 57, //for navbar
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '2rem',
  paddingTop: '1rem',

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
    height: height,
    maxHeight: height, //for navbar
    overflowX: 'hidden',
    overflowY: 'auto',
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

const WrapperSetting = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  div: {
    h3: {
      lineHeight: '0',
      paddingTop: '0.5rem',
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '1.5rem',
    },
    div: {
      ' .switch-container': {
        marginBottom: '1rem',
        p: {
          lineHeight: '1rem',
          color: ' var(--font-color-primary)',
          marginBottom: '0.5rem',
        },
        div: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: ' space-between',
          width: '22%',
        },
      },
    },
  },
}))

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
const WrapperHelp = styled('div')(() => ({
  p: {
    color: ' var(--list-theme-blue-primary-0)',
    cursor: 'pointer',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  span: {
    paddingLeft: ' 0.4rem',
    fontSize: ' 0.9rem',
  },
}))

//News section
const News = () => {
  const { height } = useGlobalContext()

  return (
    <WrapperNews height={height}>
      <div>
        {newsBoxes.map((item, index) => {
          return (
            <article key={index}>
              <img src={item.img} alt={item.btnText} />
              <div className='text'>
                <p>{item.text}</p>
                <Button
                  color='secondary'
                  sx={{
                    fontSize: '.8rem',
                    borderColor: 'var(--bg-border)',
                    color: 'var(--font-color-primary)',
                    ':hover': {
                      borderColor: 'var(--bg-border)',
                    },
                  }}
                  variant='outlined'>
                  {item.btnText}
                </Button>
              </div>
            </article>
          )
        })}
      </div>
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

const WrapperNews = styled('div')(({ height }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'column',
  height: height - 150,
  article: {
    boxShadow: 'var(--light-shadow)',
    background: 'var(--bg-hover)',
    marginBottom: '2rem',
    img: {
      width: '100%',
    },
    '.text ': {
      padding: ' 1rem 1.5rem',
      paddingBottom: '1rem',
      p: {
        fontSize: '1rem',
      },
    },
  },
  '.download-app ': {
    width: '100%',
    padding: '0.5rem 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: ' 1px solid var(--bg-border)',
    fontSize: ' 0.8rem',
    '.img-container': {
      width: ' 50%',
      display: 'flex',
      justifyContent: 'end',
      gap: '0.5rem',
      alignItems: 'center',
      img: {
        cursor: 'pointer',
        width: '15%',
      },
    },
  },
}))
