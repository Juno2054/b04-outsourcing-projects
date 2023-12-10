import { uuidv4 } from '@firebase/util'
import { updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth, db, storage } from '../../API/firebase/firebase.API'
import { userUpdateProfile } from '../../redux/modules/login/loginSlice'
import * as St from '../../styled-component/profile/Stprofile'



function SampleProfile() {
  const [modal, setModal] = useState(false)
  return (
    <St.MyPageContainer>
      {!modal ? (
        <SampleUserProfile setModal={setModal} />
      ) : (
        <SampleModal setModal={setModal} />
      )}
    </St.MyPageContainer>
  )
}
export default SampleProfile

const SampleUserProfile = ({ setModal }) => {
  const user = useSelector((state) => state.loginSlice)

 

  return (
    <St.UserInfo>
      <St.ProfileImageWrap>
       

        <St.ProfileImage src={user.photoURL} />
        <St.Edit
          src={process.env.PUBLIC_URL + '/asset/img/profile/edit.png'}
          alt="Edit Icon"
          onClick={() => setModal(true)}
        ></St.Edit>
      </St.ProfileImageWrap>
      <St.UserWrap>
       
        <p>{user.displayName || '닉네임'}</p>
        <p>{user.email || '이메일'}</p>
        <p>{user.intro || '자기소개'}</p>
      </St.UserWrap>
    </St.UserInfo>
  )
}

const SampleModal = ({ setModal }) => {
  const inputRef = useRef({})
  const user = useSelector((state) => state.loginSlice)
  const defaultImg =
    user.photoURL ||
    process.env.PUBLIC_URL + '/asset/img/login/profileDefaultImg.jpg'
  const [previewImg, setPreviewImg] = useState()
  const imgRef = useRef()
  const [uploadImage, setUploadImage] = useState()
  const [progress, setProgress] = useState()
  const dispatch = useDispatch()
  
  const handleImageClick = () => {
    imgRef.current.click()
  }
  
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    const preview = URL.createObjectURL(file)
    setPreviewImg(preview)
    setUploadImage(file)
  }
  
  const handleRemovePreviewImage = () => {
    setPreviewImg(defaultImg)
    setUploadImage(null)
  }

  
  const deletePreProfileImageOnStorage = async () => {
    
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
  console.log(user)

  
  
  const uploadProfileImageonStorage = async () => {
    try {
      const profilePhotoURLKey = uuidv4()
      const metaData = {
        contentType: uploadImage.type,
      }
      const storageRef = ref(
        storage,
        `profileImage/${user.email}/${profilePhotoURLKey}`
      )
      const UploadTask = uploadBytesResumable(storageRef, uploadImage, metaData)

      
      return new Promise((resolve, reject) => {
        UploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setProgress(progress)
          },
          (error) => {
            reject(new Error(error))
          },
          async () => {
            try {
              const downLoadUrl = await getDownloadURL(UploadTask.snapshot.ref)
              resolve({ downLoadUrl, profilePhotoURLKey })
            } catch (error) {
              reject(new Error(error))
            }
          }
        )
      })
    } catch (error) {
      throw new Error('프로필이미지 업로드 하다가', error)
    }
  }

  
  const updateProfileOnFireBase = async (photoURL) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: inputRef.current.displayName.value,
        photoURL,
      })
      localStorage.setItem('user', JSON.stringify(auth.currentUser))
      localStorage.setItem(
        'displayName',
        JSON.stringify(inputRef.current.displayName.value)
      )
      localStorage.setItem('photoURL', JSON.stringify(photoURL))
    } catch (error) {
      throw new Error('profileUpdate하다가 뜬', error)
    }
  }

 

  const allInOneWithFirebaseAndUserRedux = async () => {
    try {
      await deletePreProfileImageOnStorage()
      const { downLoadUrl, profilePhotoURLKey } =
        await uploadProfileImageonStorage()
      await updateProfileOnFireBase(downLoadUrl)

      const userDocRef = doc(db, 'users', user.uid)

      await updateDoc(userDocRef, {
        photoURL: downLoadUrl,
        profilePhotoURLKey,
        intro: inputRef.current.intro.value,
        displayName: inputRef.current.displayName.value,
      })

      dispatch(
        userUpdateProfile({
          photoURL: downLoadUrl,
          profilePhotoURLKey,
          intro: inputRef.current.intro.value,
        })
      )

      
      setModal(false)
    } catch (error) {
      console.log(error)
   
    }
  }

 
  useEffect(() => {
    inputRef.current.displayName.focus()
  }, [])

  return (
    <St.Modal>
      <div>
      
        <div>
          <St.ProfileWrap>
            <St.ProfileImage src={previewImg || defaultImg} alt="" />
            <St.ProfileEdit
              src={process.env.PUBLIC_URL + '/asset/img/profile/camera.png'}
              alt="Edit Icon"
              onClick={handleImageClick}
            ></St.ProfileEdit>
          </St.ProfileWrap>

          <input
            type="file"
            ref={imgRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>
      
        <p>이메일 : {user.email}</p>
        <p>
          닉네임 :{' '}
          <St.ModalInput
            type="text"
            ref={(props) => (inputRef.current.displayName = props)}
          />
        </p>
        <p>
          자기소개 :{' '}
          <St.ModalInput
            type="text"
            ref={(props) => (inputRef.current.intro = props)}
          />
        </p>
        <p>UPload is {progress}% </p>
        <St.EditButton onClick={allInOneWithFirebaseAndUserRedux}>
          저장하기
        </St.EditButton>
        <St.EditButton onClick={handleRemovePreviewImage}>
          이미지 취소하기
        </St.EditButton>
        <St.EditButton onClick={() => setModal(false)}>
          모달 지우기
        </St.EditButton>
      </div>
    </St.Modal>
  )
}
