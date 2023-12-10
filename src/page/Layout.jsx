import { onAuthStateChanged } from '@firebase/auth'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router'
import { auth } from '../API/firebase/firebase.API'
import Footer from '../component/layout/Footer'
import Header from '../component/layout/Header'
import { userLogIn } from '../redux/modules/login/loginSlice'
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
