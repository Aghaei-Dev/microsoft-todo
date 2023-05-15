import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { GridWrapper, Button } from '../assets/style/StyledComponent'

const Error = () => {
  return (
    <GridWrapper>
      <Wrapper>
        <h1>404</h1>
        <h3>sorry , the page you tried cannot be found</h3>

        <Link to='/'>
          <Button $primary>back home</Button>
        </Link>
      </Wrapper>
    </GridWrapper>
  )
}
const Wrapper = styled.div`
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    color: var(--clr-grey-3);
    margin-bottom: 3.5rem;
  }
`
export default Error
