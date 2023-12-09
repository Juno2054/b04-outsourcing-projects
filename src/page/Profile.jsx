import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { updateProfile } from 'firebase/auth'
import { uuidv4 } from '@firebase/util'
import { db, storage, auth } from '../API/firebase/firebase.API'
import { updateDoc, doc, getDoc } from 'firebase/firestore'
import loginSlice, {
  userUpdateProfile,
} from '../redux/modules/login/loginSlice'
function Profile() {
  const [modal, setModal] = useState(false)
  return (
    <StContainer>
      {!modal ? (
        <UserProfile setModal={setModal} />
      ) : (
        <Modal setModal={setModal} />
      )}
    </StContainer>
  )
}

export default Profile

const UserProfile = ({ setModal }) => {
  const user = useSelector((state) => state.loginSlice)
  console.log(user)
  const photoURL = user ? user.photoURL : ''
  return (
    <StDiv>
      <div>
        <img
          src={
            photoURL ||
            process.env.PUBLIC_URL + '/asset/img//defaultProfileImg/avatar.jpg'
          }
          alt=""
        />
      </div>
      <p>닉네임 : {user.displayName}</p>
      <p>이메일 : {user.email}</p>
      <p>자기소개 : {user.profileIntro}</p>
      <button onClick={() => setModal(true)}>수정하기</button>
    </StDiv>
  )
}

const Modal = ({ setModal }) => {
  const inputRef = useRef({
    displayName: null,
    profileIntro: null,
    profilePhotoURLKey: null,
  })
  const user = useSelector((state) => state.loginSlice)
  const defaultImg =
    user.photoURL ||
    process.env.PUBLIC_URL + '/asset/img/login/profileDefaultImg.jpg'
  const [previewImg, setPreviewImg] = useState()
  const imgRef = useRef()
  const [uploadImage, setUploadImage] = useState()
  const [progress, setProgress] = useState()
  // const [profileIntro, setProfileIntro] = useState(user.profileIntro || '')
  const dispatch = useDispatch()
  const profilePhotoURLKey = uuidv4()
  // div를 누르면 input file이 클릭됩니다.
  const handleImageClick = () => {
    imgRef.current.click()
  }
  // 이미지 미리보기 입니다.
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    const preview = URL.createObjectURL(file)
    setPreviewImg(preview)
    setUploadImage(file)
  }
  // 이미지 미리보기 취소입니다.
  const handleRemovePreviewImage = () => {
    setPreviewImg(defaultImg)
    setUploadImage(null)
  }

  // firebase 기존이미지 삭제 하기
  const deletePreProfileImageOnStorage = async () => {
    // user에게 photoURLKey가 없다면 함수 종료 하자 - 처음 프로필 등록하는 거니까
    if (!user.profilePhotoURLKey) return
    try {
      const desertRef = ref(
        storage,
        `profileImage/${user.email}/${user.profilePhotoURLKey}`
      )
      await deleteObject(desertRef)
      console.log('삭제완료')
    } catch (error) {
      throw new Error('이전 이미지 삭제하다가 나버린', error)
    }
  }

  // 프로필 사진 Storage에 올리기
  const uploadProfileImageonStorage = async () => {
    if (!uploadImage) return
    try {
      // 나중에 삭제 할 때 사용 하려고 입니다.

      // 그냥 메타데이터 입니다.
      const getPhotoURL = await new Promise((resolve, reject) => {
        const metaData = {
          contentType: uploadImage.type,
        }
        //Storage에 할 경로를 잡아주는 것입니다.
        const storageRef = ref(
          storage,
          `profileImage/${user.email}/${profilePhotoURLKey}`
        )
        const UploadTask = uploadBytesResumable(
          storageRef,
          uploadImage,
          metaData
        )
        UploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setProgress(progress)
          },
          (error) => {
            throw new Error(error)
          },
          async () => {
            const downLoadUrl = await getDownloadURL(UploadTask.snapshot.ref)
            resolve(downLoadUrl)
          }
        )
      })
      return getPhotoURL
    } catch (error) {
      throw new Error('프로필이미지 업로드 하다가', error)
    }
  }

  // profile수정 함수입니다.
  const updateProfileOnFireBase = async (photoURL) => {
    try {
      const updatedProfileIntro = inputRef.current.profileIntro.value
      const updatedDisplayName = inputRef.current.displayName.value
      await updateProfile(auth.currentUser, {
        displayName: updatedDisplayName,
        photoURL,
        profileIntro: updatedProfileIntro,
      })

      // 닉네임 업데이트
      inputRef.current.displayName.value = updatedDisplayName
      // 자기소개 업데이트
      inputRef.current.profileIntro.value = updatedProfileIntro
    } catch (error) {
      throw new Error('profileUpdate하다가 뜬', error)
    }
  }

  // 이미지 삭제, 이미지 업로드 후 다운받기, profile 수정하기를 통합하고, dispatch로 user Redux에 dispatch 해줍니다.

  const allInOneWithFirebaseAndUserRedux = async () => {
    try {
      await deletePreProfileImageOnStorage()
      const downLoadUrl = await uploadProfileImageonStorage()
      await updateProfileOnFireBase(downLoadUrl)
      console.log(inputRef.current.profileIntro.value)
      console.log(profilePhotoURLKey)
      // 길훈님 여기서 하는 겁니다.

      /*
      upDateDoc( uid )
      downLoadUrl -  profile사진 url 입니다.
      profilePhotoURLKey
      inputRef.current.profileIntro.value
      firebase에 올리고 
      그것을 다시 받아서 dispatch해주시면 좋겠습니다. 
      
      */

      // const userDoc = await getDoc(doc(db, 'users', user.id))
      // const updatedProfileIntro = userDoc.data().profileIntro || ''
      // setProfileIntro(updatedProfileIntro)

      console.log(user.id)

      const userRef = doc(db, 'users', user.id)
      await updateDoc(userRef, {
        photoURL: downLoadUrl,
        profilePhotoURLKey: inputRef.current.profilePhotoURLKey.value,
        profileIntro: inputRef.current.profileIntro.value,
        displayName: inputRef.current.displayName.value,
      })

      dispatch(
        userUpdateProfile({
          photoURL: downLoadUrl,
          profilePhotoURLKey: inputRef.current.profilePhotoURLKey.value,
          profileIntro: inputRef.current.profileIntro.value,
          displayName: inputRef.current.displayName.value,
        })
      )
      setModal(false)
    } catch (error) {
      console.log(error)
    }
  }
  // modal창 띄우면 자동 포커스 입니다.
  useEffect(() => {
    inputRef.current.displayName.focus()
  }, [])

  return (
    <StModal>
      <div>
        {/* 이미지 */}
        <div onClick={handleImageClick}>
          <img src={previewImg || user.photoURL} alt="" />

          <input
            type="file"
            ref={imgRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>
        {/* 이미지 ENd */}
        <p>이메일 : {user.email}</p>
        <p>
          닉네임 :{' '}
          <input
            type="text"
            ref={(props) => (inputRef.current.displayName = props)}
          />
        </p>
        <p>
          자기소개 :{' '}
          <input
            type="text"
            ref={(props) => (inputRef.current.profileIntro = props)}
          />
        </p>
        <p>UPload is {progress}% 입니당</p>
        <button onClick={allInOneWithFirebaseAndUserRedux}>저장하기</button>
        <button onClick={handleRemovePreviewImage}>이미지 취소하기</button>
        <button onClick={() => setModal(false)}>모달 지우기</button>
      </div>
    </StModal>
  )
}

const StContainer = styled.div`
  display: grid;
  place-content: center center;
  min-height: 100vh;
  position: relative;
  gap: 10px;
`
const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  border: 1px solid ${({ theme: { Color } }) => Color.primary};
  padding: 20px;
  border-radius: 12px;
  > div {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  p {
    padding: 10px 0;
    border: 1px solid orange;
    border-radius: 12px;
  }

  button {
    padding: 10px;
    border: 1px solid pink;

    &:hover {
      transition: all 0.3s;
      background-color: pink;
      color: #fff;
    }
  }
`
const StModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.651);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  text-align: center;
  border: 1px solid ${({ theme: { Color } }) => Color.primary};
  padding: 20px;
  border-radius: 12px;
  > div {
    display: flex;
    flex-direction: column;
    gap: 20px;

    div {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid black;

      img {
        width: 100%;
        object-fit: cover;
      }
    }

    p {
      padding: 10px 0;
      border: 1px solid orange;
      border-radius: 12px;
    }

    button {
      padding: 10px;
      border: 1px solid pink;

      &:hover {
        transition: all 0.3s;
        background-color: pink;
        color: #fff;
      }
    }
  }
  input {
    padding: 10px;
    z-index: 99;
  }
`
