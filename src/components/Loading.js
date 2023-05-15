import React from 'react'

import styled from 'styled-components'
import { CircularProgress } from '@mui/material'
import { loadingTodo, microsoftLogo } from '../assets/images'

const Loading = () => {
  return (
    <Wrapper>
      <div>
        <img src={loadingTodo} alt='loadingTodo' />
        <div className='loader'>
          <CircularProgress size={`4rem`} thickness={2} />
          <div className='microsoft'>
            <img src={microsoftLogo} alt='microsoftLogo' />
            <h2>microsoft</h2>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Loading

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  > div {
    height: 100vh;
    display: grid;
    place-items: center;
    position: relative;
    img {
      width: 100%;
    }
    .loader {
      position: absolute;
      top: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 2rem;
    }
  }

  .microsoft {
    display: flex;
    justify-content: center;
    align-items: center;

    h2 {
      padding-top: 1rem;
      line-height: 0;
      color: var(--font-color-tertiary);
    }
    img {
      width: 50%;
    }
  }
  .MuiCircularProgress-colorPrimary {
    color: var(--font-color-brand) !important;
  }
`
