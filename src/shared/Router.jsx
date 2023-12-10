import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Detail from '../page/Detail'
import Home from '../page/Home'
import Layout from '../page/Layout'
import Login from '../page/Login'
import Profile from '../page/Profile'
import Register from '../page/Register'
import SampleDetail from '../page/Sample/SampleDetail'
import SampleHome from '../page/Sample/SampleHome'
import SampleKakao from '../page/Sample/SampleKakao'
import SampleLogin from '../page/Sample/SampleLogin'
import SampleNavigate from '../page/Sample/SampleNavigate'
import SampleProfile from '../page/Sample/SampleProfile'
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

        {/* Sample 주소 */}
        <Route path="/sample" element={<SampleNavigate />}>
          <Route path="Home" element={<SampleHome />} />
          <Route path="login" element={<SampleLogin />} />
          <Route path="profile" element={<SampleProfile />} />
          <Route path="detail/:id" element={<SampleDetail />} />
          <Route path="kakaoMap" element={<SampleKakao />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router