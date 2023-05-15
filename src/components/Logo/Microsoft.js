import React from 'react'
import styled from 'styled-components'
import { microsoftLogo } from '../../assets/images'

const Microsoft = () => {
  return (
    <MicrosoftWrapper>
      <img src={microsoftLogo} alt='microsoftLogo' />
      <h3>microsoft</h3>
    </MicrosoftWrapper>
  )
}

export default Microsoft

const MicrosoftWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h3 {
    padding-top: 0.8rem;
    line-height: 0;
    color: var(--font-color-tertiary);
    font-size: 1rem;
  }
  img {
    width: 20%;
  }
`
