import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from '@firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../API/firebase/firebase.API'
import { userLogIn } from '../redux/modules/login/loginSlice'
import * as St from '../styled-component/login/loginStyle'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [profileIntro, setProfileIntro] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Firebase Authentication에서 회원가입 처리
      const credentialUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      // Firestore에 유저 정보 저장
      const newUser = {
        uid: credentialUser.user.uid,
        email: credentialUser.user.email,
        displayName,
        profileIntro,
      }

      // 'users' 콜렉션에 다큐먼트 추가
      const usersCollectionRef = collection(db, 'users')
      await addDoc(usersCollectionRef, newUser)

      // Redux 스토어 업데이트
      dispatch(userLogIn(newUser))

      alert(`${credentialUser.user.email}님 안녕하세요.`)

      navigate('/')
      console.log('로그인 성공')
    } catch (error) {
      alert('회원가입 실패')
      console.log('회원가입 실패', error.message)
    }
  }

  const handleToLogin = () => {
    navigate('/login')
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 로그인한 사용자 정보를 Redux 스토어에 저장
        dispatch(
          userLogIn({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        )
        navigate('/') // 로그인한 상태라면 홈 페이지로 이동
        console.log(user)
      }
    })

    // Clean-up 함수 등록
    return () => {
      unsubscribe()
    }
  }, [dispatch, navigate])
  return (
    <St.LoginContainer>
      <St.LoginFormContainer>
        <St.LoginTitle>회원가입</St.LoginTitle>
        <St.LoginForm>
          <St.InputBox
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <St.InputBox
            type="text"
            placeholder="닉네임"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <St.InputBox
            type="text"
            placeholder="자기소개"
            value={profileIntro}
            onChange={(e) => setProfileIntro(e.target.value)}
          />
          <St.InputBox
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <St.ButtonBox>
            <St.LoginButton onClick={handleSubmit}>회원가입</St.LoginButton>
            <St.JoinButton onClick={handleToLogin}>로그인</St.JoinButton>
          </St.ButtonBox>
        </St.LoginForm>
      </St.LoginFormContainer>
    </St.LoginContainer>
  )
}

export default Register

// firebase Authentication에서 만든 user의 uid로 firebase, firestore에 users라는 콜렉션에 다큐먼트를 만든다.
//
