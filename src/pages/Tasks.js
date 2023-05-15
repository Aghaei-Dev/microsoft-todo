import React from 'react'
import { LeftSideBar, Loading, RightSideBar } from '../components'

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
      {/* <RightSideBar /> */}
    </>
  )
}

export default Dashboard
