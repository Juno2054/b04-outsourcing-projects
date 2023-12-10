import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Detail from '../page/Detail'
import Home from '../page/Home'
import Layout from '../page/Layout'
import Login from '../page/Login'
import Profile from '../page/Profile'
import Register from '../page/Register'
import Survey from '../page/Survey'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/survey" element={<Survey />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
