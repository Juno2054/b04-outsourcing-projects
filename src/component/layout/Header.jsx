import React, { useState } from 'react'
import * as St from '../../styled-component/layout/Header/StHeader'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogOut } from '../../redux/modules/login/loginSlice'
import { auth } from '../../API/firebase/firebase.API'
import { signOut } from '@firebase/auth'

function Header() {
  const currentUser = useSelector((state) => state.loginSlice.currentUser)
  console.log(currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const LogOutHandler = async () => {
    try {
      // Firebase에서 로그아웃
      // 왜 signOut(auth)는 안되나요???
      await signOut(auth)
      // Redux 스토어에서 로그아웃 액션을 디스패치하여 사용자 상태 초기화
      dispatch(userLogOut())
      console.log('로그아웃 성공', currentUser)
      navigate('/')
    } catch (error) {
      console.log('로그아웃 실패', error)
    }
  }

  return (
    <St.Header>
      <St.Logo>
        <Link to="/">
          <St.LogoImg
            src={process.env.PUBLIC_URL + '/asset/img/layout/logo.png'}
            alt="로고"
          />
        </Link>
      </St.Logo>
      <St.ButtonContainer>
        {currentUser ? (
          <>
            <Link to="/profile">
              <St.Button>마이페이지</St.Button>
            </Link>
            <St.Button onClick={LogOutHandler}>로그아웃</St.Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <St.Button>로그인</St.Button>
            </Link>
            <Link to="/register">
              <St.Button>회원가입</St.Button>
            </Link>
          </>
        )}
      </St.ButtonContainer>
    </St.Header>
  )
}

export default Header
