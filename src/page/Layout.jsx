import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import Header from '../component/layout/Header'
import Footer from '../component/layout/Footer'
import { useDispatch } from 'react-redux'
import { onAuthStateChanged } from '@firebase/auth'
import { userLogIn } from '../redux/modules/login/loginSlice'
import { auth } from '../API/firebase/firebase.API'
function Layout() {
  const dispatch = useDispatch()
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

        console.log(user)
      }
    })

    // Clean-up 함수 등록
    return () => {
      unsubscribe()
    }
  }, [dispatch])
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
