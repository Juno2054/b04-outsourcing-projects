import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from '@firebase/auth'
import { auth } from '../API/firebase/firebase.API'
import { useNavigate } from 'react-router-dom'
import * as St from '../styled-component/login/loginStyle'
import React from 'react'

const SocialLogin = () => {
  const navigate = useNavigate()

  const onClickSignInWithGoogle = async (e) => {
    e.preventDefault()
    try {
      const provider = new GoogleAuthProvider()
      console.log(provider)
      const data = await signInWithPopup(auth, provider)
      console.log(data)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const onClickSignInWithGithub = async (e) => {
    e.preventDefault()
    try {
      const provider = new GithubAuthProvider()
      const data = await signInWithPopup(auth, provider)
      console.log(data)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <St.SocialButtonDiv>
      <button onClick={onClickSignInWithGoogle}>
        <figure>
          <St.SocialImg src="/asset/img/login/google.svg" />
        </figure>
      </button>

      <button onClick={onClickSignInWithGithub}>
        <figure>
          <St.SocialImg src="/asset/img/login/github.svg" />
        </figure>
      </button>
    </St.SocialButtonDiv>
  )
}

export default SocialLogin
