import { signInWithEmailAndPassword } from '@firebase/auth'
import { collection, getDocs, query } from 'firebase/firestore'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { auth, db } from '../API/firebase/firebase.API'
import { userLogIn } from '../redux/modules/login/loginSlice'
import * as St from '../styled-component/login/loginStyle'
import SocialLogin from './SocialLogin'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const currentUser = useSelector((state) => state.loginSlice.currentUser)
  console.log(currentUser)
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const q = query(collection(db, 'users'), userCredential.user.uid)
      const querySnapshot = await getDocs(q)

      let data
      querySnapshot.forEach((doc) => {
        data = {
          id: doc.id,
          ...doc.data(),
        }
      })

      dispatch(userLogIn(data))

     
      navigate('/')
     
      alert('로그인 성공')
      console.log('로그인 성공', currentUser)
     
    } catch (error) {
      alert('로그인 실패', error.message)
      console.error('로그인 실패', error.message)
    }
  }

  const handleToRegister = () => {
    navigate('/register')
  }

  return (
    <St.LoginContainer>
      <St.LoginFormContainer>
        <St.LoginTitle>로그인</St.LoginTitle>
        <St.LoginForm>
          <St.InputBox
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <St.InputBox
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <St.ButtonBox>
            <St.LoginButton onClick={handleLogin}>로그인</St.LoginButton>
            <St.JoinButton onClick={handleToRegister}>회원가입</St.JoinButton>
          </St.ButtonBox>
          <SocialLogin/>
        </St.LoginForm>
      </St.LoginFormContainer>
    </St.LoginContainer>
  )
}

export default Login
