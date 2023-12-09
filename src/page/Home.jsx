import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth } from '../API/firebase/firebase.API'
import { userLogOut } from '../redux/modules/login/loginSlice'
import { signOut } from '@firebase/auth'
function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      // Firebase에서 로그아웃
      // 왜 signOut(auth)는 안되나요??? -> import를 안해줬어요 ㅜㅜ
      await signOut(auth)

      // Redux 스토어에서 로그아웃 액션을 디스패치하여 사용자 상태 초기화
      dispatch(userLogOut())
      console.log('로그아웃 성공')
      navigate('/')
    } catch (error) {
      console.error('로그아웃 실패', error.message)
    }
  }

  return (
    <div>
      <div>Home</div>
      <button onClick={handleLogout}>logOut</button>
    </div>
  )
}

export default Home
