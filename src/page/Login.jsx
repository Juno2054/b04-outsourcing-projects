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
      // userCredential.user.uid를 추가한 이유는 users안에 있는 모든 데이터중 경로가 userCredential.user.uid인 사람의 데이터만 가져와 주세요 라는 의미이기 때문입니다.
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

      // navigate를 /로 해준것은 최상위 부모 컴포넌트가 Layout이기 때문입니다. 왜냐면은 Layout이 다 감싸고 있기 때문입니다.
      navigate('/')
      // 여기 주석
      // const user = userCredential.user
      // dispatch(
      //   userLogIn({
      //     uid: user.uid,
      //     email: user.email,
      //     displayName: user.displayName,
      //     photoURL: user.photoURL,
      //   })
      // )
      //파이어 베이스에서 데이터 읽기
      alert('로그인 성공')
      console.log('로그인 성공', currentUser)
      // navigate('/home')
    } catch (error) {
      alert('로그인 실패', error.message)
      console.error('로그인 실패', error.message)
    }
  }

  const handleToRegister = () => {
    navigate('/register')
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const q = query(collection(db, 'users'))
  //     const querySnapshot = await getDocs(q)

  //     const initialUsers = []

  //     querySnapshot.forEach((doc) => {
  //       const data = {
  //         id: doc.id,
  //         ...doc.data(),
  //       }
  //       initialUsers.push(data)
  //       console.log(doc.id)
  //       console.log(doc.data())
  //     })
  //     dispatch(userLogIn(initialUsers))
  //   }

  //   fetchData()
  // }, [])
  // 여기 주석
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // 로그인한 사용자 정보를 Redux 스토어에 저장
  //       dispatch(
  //         userLogIn({
  //           uid: user.uid,
  //           email: user.email,
  //           displayName: user.displayName,
  //           photoURL: user.photoURL,
  //         })
  //       )
  //       navigate('/') // 로그인한 상태라면 홈 페이지로 이동
  //       console.log(user)
  //     }
  //   })

  //   // Clean-up 함수 등록
  //   return () => {
  //     unsubscribe()
  //   }
  // }, [dispatch, navigate])

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
