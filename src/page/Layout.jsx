import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router'
import { auth, db } from '../API/firebase/firebase.API'
import Footer from '../component/layout/Footer'
import Header from '../component/layout/Header'
import { userLogIn } from '../redux/modules/login/loginSlice'

import { collection, getDocs, query } from 'firebase/firestore'
function Layout() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.loginSlice)

  const getUserInfoOnFireStore = async (user) => {
    try {
      const q = query(collection(db, 'users'), user.uid)
      const querySnapshot = await getDocs(q)

      let data
      querySnapshot.forEach((doc) => {
        data = {
          id: doc.id,
          ...doc.data(),
          photoURL: user.photoURL,
        }
      })

      dispatch(userLogIn(data))
    } catch (error) {
      console.log(error)
    }

    console.log(user)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        getUserInfoOnFireStore(user)
      }
    })

   
    return () => {
      unsubscribe()
    }
  }, [user])
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