import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components'
import Microsoft from '../components/Logo/Microsoft'

import { Button } from '../assets/style/StyledComponent.js'

const Login = () => {
  const { loginWithRedirect } = useAuth0()
  useEffect(() => {
    document.title = 'Sign in to your account  '
  }, [])
  return (
    <Wrapper>
      <div className='container'>
        <Microsoft />
        <p>
          clicking login / sign in means that you agree to the Microsoft
          Services Agreement and privacy and cookies statement.
        </p>
        <div className='btn-container'>
          <Button>back</Button>
          <Button $primary onClick={loginWithRedirect}>
            login
          </Button>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: linear-gradient(
    137deg,
    rgba(233, 255, 215, 1) 0%,
    rgba(255, 228, 228, 1) 29%,
    rgba(255, 229, 254, 1) 73%,
    rgba(220, 250, 255, 1) 100%
  );
  .container {
    max-width: 440px;
    width: calc(100% - 40px);
    height: 40vh;
    background: var(--bg-primary);
    box-shadow: 0 0 20px var(--bg-shadow);
    padding: 2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;

    .btn-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    p {
      font-size: 1rem;
      color: var(--font-color-secondary);
    }
    > div {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
`
export default Login
