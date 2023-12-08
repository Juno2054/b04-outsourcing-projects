import React from 'react'
import { Outlet } from 'react-router'
import Footer from '../component/layout/Footer'
import Header from '../component/layout/Header'
function Layout() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Header />
      <div
        style={{
          flex: 1,
        }}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
