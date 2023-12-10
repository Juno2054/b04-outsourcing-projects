import { signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../API/firebase/firebase.API'
import PostFormModal from '../../component/home/post/PostFormModal'
import { userLogOut } from '../../redux/modules/login/loginSlice'
import * as St from '../../styled-component/layout/Header/StHeader'

function Header() {
  const [modal, setModal] = useState(false)
  const currentUser = useSelector((state) => state.loginSlice.currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const openModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    const confirmClose = window.confirm(
      '정말로 닫으시겠습니까? 지금까지 작성하신 내용이 사라집니다!'
    )

    if (confirmClose) {
      setModal(false)
    }
  }

  const LogOutHandler = async () => {
    try {
      await signOut(auth)
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
            <St.Button onClick={openModal}>글 작성하기</St.Button>
            {modal && <PostFormModal closeModal={closeModal} />}
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