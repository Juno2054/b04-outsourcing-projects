import { uuidv4 } from '@firebase/util'
import { updateProfile } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
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
// 로컬스토리지에 저장된 정보 가져오기 - 로그인 할때 저장해줬음

const UrlPhoto = JSON.parse(localStorage.getItem('photoURL'))
const UrlEmail = localStorage.getItem('email')
const UrlDisplayName = localStorage.getItem('displayName')
const UrlIntro = localStorage.getItem('intro')

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
  const currentUser = useSelector((state) => state.loginSlice.currentUser)
  const [userData, setUserData] = useState(null)

  useEffect(()=>{
    const fetchUserData = async ()=>{
      try {
        if (currentUser && currentUser.uid) {
          // 사용자 UID를 기반으로 Firestore에서 데이터 가져오기
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const fetchedUserData = userDocSnapshot.data();
            setUserData(fetchedUserData);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [currentUser]);

  return (
    <St.UserInfo>
      <St.ProfileImageWrap>
        {/* 이미지 리덕스저장소에 없으면 로컬스토리지 이미지 보여줌  */}
        {currentUser.photoURL ? (
          <St.ProfileImage src={currentUser.photoURL} />
        ) : (
          <St.ProfileImage src={UrlPhoto} />
        )}
        <St.Edit
          src={process.env.PUBLIC_URL + '/asset/img/profile/edit.png'}
          alt="Edit Icon"
          onClick={() => setModal(true)}
        ></St.Edit>
      </St.ProfileImageWrap>
      <St.UserWrap>
        {/* //로컬스토리지에 저장된 정보 가져옴 - 로그인 할때 저장해줬음 */}
        {/* <p>{UrlDisplayName}</p>
        <p>{UrlEmail}</p>
        <p>{UrlIntro}</p> */}
        {/* <p>{loginSlice.displayName || '닉네임'}</p>
        <p>{loginSlice.email || '이메일'}</p>
        <p>{loginSlice.intro || '자기소개'}</p> */}
        <p>{currentUser.displayName || '닉네임'}</p>
        <p>{currentUser.email || '이메일'}</p>
        <p>{currentUser.intro || '자기소개'}</p>
      </St.UserWrap>
    </St.UserInfo>
  )
}

const SampleModal = ({ setModal }) => {
  const inputRef = useRef({})
  const loginSlice = useSelector((state) => state.loginSlice)
  const defaultImg =
    loginSlice.photoURL ||
    process.env.PUBLIC_URL + '/asset/img/login/profileDefaultImg.jpg'
  const [previewImg, setPreviewImg] = useState()
  const imgRef = useRef()
  const [uploadImage, setUploadImage] = useState()
  const [progress, setProgress] = useState()
  const dispatch = useDispatch()
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
    if (!loginSlice.profilePhotoURLKey) return
    try {
      const desertRef = ref(
        storage,
        `profileImage/${loginSlice.email}/${loginSlice.profilePhotoURLKey}`
      )
      await deleteObject(desertRef)
      console.log('삭제완료')
    } catch (error) {
      throw new Error('이전 이미지 삭제하다가 나버린', error)
    }
  }

  // 프로필 사진 Storage에 올리기
  // 나머지 코드와 함께 수정된 부분
  const uploadProfileImageonStorage = async () => {
    try {
      const profilePhotoURLKey = uuidv4()
      const metaData = {
        contentType: uploadImage.type,
      }
      const storageRef = ref(
        storage,
        `profileImage/${loginSlice.email}/${profilePhotoURLKey}`
      )
      const UploadTask = uploadBytesResumable(storageRef, uploadImage, metaData)

      // Promise를 사용하여 업로드 완료를 기다림
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

  // profile 수정 함수입니다.
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

  // 이미지 삭제, 이미지 업로드 후 다운받기, profile 수정하기를 통합하고,
  //dispatch로 user Redux에 dispatch 해줍니다.
const currentUser = useSelector((state) => state.loginSlice.currentUser)

  const allInOneWithFirebaseAndUserRedux = async () => {
    try {
      await deletePreProfileImageOnStorage()
      const { downLoadUrl, profilePhotoURLKey } =
        await uploadProfileImageonStorage()
      await updateProfileOnFireBase(downLoadUrl)


      const userDocRef = doc(db, 'users', currentUser.uid)

      await updateDoc(userDocRef, {
        photoURL: downLoadUrl,
        profilePhotoURLKey,
        intro: inputRef.current.intro.value,
      });

      dispatch(
        userUpdateProfile({
          photoURL: downLoadUrl,
          profilePhotoURLKey,
          intro: inputRef.current.intro.value,
        })
      )

      // 컨텐츠 업데이트 후 모달 닫기
      setModal(false)
    } catch (error) {
      console.log(error)
      // 여기서 에러 처리를 해줘야해요
    }
  }

  // modal창 띄우면 자동 포커스 입니다.
  useEffect(() => {
    inputRef.current.displayName.focus()
  }, [])

  return (
    <St.Modal>
      <div>
        {/* 이미지 */}
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
        {/* 이미지 ENd */}
        <p>이메일 : {loginSlice.email}</p>
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
