import React from 'react'
import { LeftSideBar, Loading } from '../components'

import { useGlobalContext } from '../context/context'
import Navbar from '../components/NavBar/Navbar'



const Dashboard = () => {
  const { isLoading } = useGlobalContext()
  if (isLoading) {
    return <Loading />
  }
  return (
    <>
      <Navbar />
      <LeftSideBar />
    </>
  )
}

export default Dashboard
