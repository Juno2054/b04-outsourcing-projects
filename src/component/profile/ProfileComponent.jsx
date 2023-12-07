import React, { useState } from 'react'
import * as St from '../../styled-component/profile/Stprofile'

function ProfileComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [nickname, setNickname] = useState('닉네임')
  const [tempNickname, setTempNickname] = useState('')
  const [profileImage, setProfileImage] = useState(null)
  const [tempProfileImage, setTempProfileImage] = useState(null)
  const [bio, setBio] = useState('자기소개를 입력하세요')
  const [tempBio, setTempBio] = useState('')

  const openModal = () => {
    setIsModalOpen(true)
    setTempNickname(nickname)
    setTempProfileImage(profileImage)
    setTempBio(bio)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleNicknameChange = (e) => {
    setTempNickname(e.target.value)
  }

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]
    setTempProfileImage(URL.createObjectURL(selectedImage))
  }

  const handleBioChange = (e) => {
    setTempBio(e.target.value)
  }

  const handleUpdate = () => {
    setNickname(tempNickname)
    setProfileImage(tempProfileImage)
    setBio(tempBio)
    setIsModalOpen(false)
  }

  return (
    <St.MyPageContainer>
      <St.Edit
        onClick={openModal}
        src={process.env.PUBLIC_URL + '/asset/img/profile/edit.png'}
        alt="Edit Icon"
      ></St.Edit>
      <St.UserInfo>
        <St.ProfileImage
          src={
            tempProfileImage ||
            process.env.PUBLIC_URL + '/asset/img/profile/Golde33443.jpeg'
          }
          alt="프로필 이미지"
        />
        <St.BioWrap>
          <St.Nickname onClick={openModal}>{nickname}</St.Nickname>
          <St.Bio>{bio}</St.Bio>
        </St.BioWrap>
      </St.UserInfo>

      {isModalOpen && (
        <St.ModalOverlay>
          <St.Modal>
            <St.ModalContent>
              <St.ModalInput>
                <St.Span>프로필</St.Span>
                <St.EditInput
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </St.ModalInput>
              <St.ModalInput>
                <St.Span>닉네임</St.Span>
                <St.EditInput
                  type="text"
                  value={tempNickname}
                  onChange={handleNicknameChange}
                />
              </St.ModalInput>
              <St.ModalInput>
                <St.Span>소개</St.Span>
                <St.EditInput
                  type="text"
                  value={tempBio}
                  onChange={handleBioChange}
                />
              </St.ModalInput>

              <St.EditButton onClick={handleUpdate}>수정 완료</St.EditButton>
            </St.ModalContent>
          </St.Modal>
        </St.ModalOverlay>
      )}
    </St.MyPageContainer>
  )
}

export default ProfileComponent
