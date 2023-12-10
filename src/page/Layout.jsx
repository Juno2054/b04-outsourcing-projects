import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import Footer from '../component/layout/Footer'
import Header from '../component/layout/Header'
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Header />
      <div
        style={{
          flex: 1,
        }}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
