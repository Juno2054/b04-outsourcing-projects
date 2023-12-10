import { onAuthStateChanged, signInWithEmailAndPassword } from '@firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { auth } from '../API/firebase/firebase.API'
import { userLogIn } from '../redux/modules/login/loginSlice'
import * as St from '../styled-component/login/loginStyle'
import SocialLogin from './SocialLogin'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('as1@test.com')
  const [password, setPassword] = useState('asdf12')
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
      console.log('로그용', userCredential)
      const user = userCredential.user
      dispatch(
        userLogIn({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      )

      // 로그인 할떄 로컬스토리지에 저장 해줌
      localStorage.setItem('user', JSON.stringify(user.uid))
      localStorage.setItem('email', JSON.stringify(user.email))
      localStorage.setItem('displayName', JSON.stringify(user.displayName))
      localStorage.setItem('photoURL', JSON.stringify(user.photoURL))

      alert('로그인 성공')
      console.log('로그인 성공', user)
      navigate('/') // 수정 해야함
    } catch (error) {
      alert('로그인 실패', error.message)
      console.error('로그인 실패', error.message)
    }
  }

  const handleToRegister = () => {
    navigate('/register')
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
        console.log('확인')
        // navigate('/') // 로그인한 상태라면 홈 페이지로 이동
        console.log(user)
      }
    })
    // 클린업 함수 주석처리 해놧습니다 확인해주세요
    // Clean-up 함수 등록
    // return () => {
    //   unsubscribe()
    // }
  }, [dispatch, navigate])

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
          <SocialLogin></SocialLogin>
          {/* <St.SocialButtonDiv>
            <button>
              <figure>
                <St.SocialImg src="/asset/img/login/google.svg" />
              </figure>
            </button>
            <button>
              <figure>
                <St.SocialImg src="/asset/img/login/github.svg" />
              </figure>
            </button>
          </St.SocialButtonDiv> */}
        </St.LoginForm>
      </St.LoginFormContainer>
    </St.LoginContainer>
  )
}

export default Login
