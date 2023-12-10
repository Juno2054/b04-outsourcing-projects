import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from '@firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'
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
  const [intro, setIntro] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const credentialUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      
      const newUser = {
        uid: credentialUser.user.uid,
        email: credentialUser.user.email,
        displayName,
        intro,
      }


      const usersCollectionRef = collection(db, 'users')
      const userDocRef = doc(usersCollectionRef, newUser.uid)
      await setDoc(userDocRef, newUser)

      dispatch(userLogIn(newUser))

      alert(`${credentialUser.user.email}님 안녕하세요.`)

      navigate('/')
      console.log('로그인 성공')
    } catch (error) {
      alert('회원가입 형식에 따라 작성해주세요.')
      console.log('회원가입 실패', error.message)
    }
  }

  const handleToLogin = () => {
    navigate('/login')
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          userLogIn({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        )
        navigate('/')
        console.log(user)
      }
    })

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
            placeholder="이메일 (이메일 형식)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <St.InputBox
            type="text"
            maxLength={10}
            placeholder="닉네임 (10자 이하)"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <St.InputBox
            type="text"
            maxLength={20}
            placeholder="자기소개 (20자 이하)"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
          />
          <St.InputBox
            type="password"
            placeholder="비밀번호 (6자 이상)"
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