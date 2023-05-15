import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import { GridWrapper } from '../assets/style/StyledComponent'

import { Loading } from '../components'

function AuthWrapper({ children }) {
  const { isLoading, error } = useAuth0()

  if (isLoading) {
    return (
      <GridWrapper>
        <Loading />
      </GridWrapper>
    )
  }
  if (error) {
    return (
      <GridWrapper>
        <h1>{error.message}</h1>
      </GridWrapper>
    )
  }
  return <>{children}</>
}

export default AuthWrapper
