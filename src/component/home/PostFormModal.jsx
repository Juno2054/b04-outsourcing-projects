import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../../API/firebase/firebase.API'

const starRating = [
  '별점을 선택해주세요!',
  '⭐',
  '⭐⭐',
  '⭐⭐⭐',
  '⭐⭐⭐⭐',
  '⭐⭐⭐⭐⭐',
]

function PostFormModal({ closeModal }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(0)
  const [selectedMapPlace, setSelectedMapPlace] = useState('')

  const mapPlaces = useSelector((state) => state.mapPlace.mapPlaces)

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  const handleRatingChange = (e) => {
    setRating(Number(e.target.value))
  }

  const handleMapPlaceChange = (e) => {
    setSelectedMapPlace(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const postId = uuidv4()

      await addDoc(collection(db, 'posts'), {
        id: postId,
        title: title,
        content: content,
        rating: rating,
        mapName: selectedMapPlace,
      })

      setTitle('')
      setContent('')
      setRating(0)
      setSelectedMapPlace('')

      closeModal()
      window.location.reload()
    } catch (error) {
      console.error('Error adding document: ', error)
    }
  }

  return (
    <ModalWrapper>
      <CloseButton onClick={closeModal}>Close</CloseButton>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="title">제목</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="제목을 입력하세요"
        />
        <Label htmlFor="content">내용</Label>
        <TextArea
          id="content"
          value={content}
          onChange={handleContentChange}
          placeholder="내용을 입력하세요"
        />
        <Label htmlFor="rating">별점:</Label>
        <Select id="rating" value={rating} onChange={handleRatingChange}>
          {starRating.map((star, index) => (
            <Option key={index + 1} value={index + 1}>
              {star}
            </Option>
          ))}
        </Select>
        <Label htmlFor="mapPlace">장소 선택:</Label>
        <Select
          id="mapPlace"
          value={selectedMapPlace}
          onChange={handleMapPlaceChange}
        >
          <Option value="" disabled hidden>
            게시할 항목을 선택해주세요!
          </Option>
          {mapPlaces.map((place, index) => (
            <Option key={index} value={place.mapName}>
              {place.mapName}
            </Option>
          ))}
        </Select>
        <SubmitButton type="submit">게시</SubmitButton>
      </Form>
    </ModalWrapper>
  )
}

export default PostFormModal

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 3px solid #ea3267;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
  height: auto;
  z-index: 999;
`

const CloseButton = styled.button`
  position: absolute;
  font-weight: bold;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    color: red;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`

const Label = styled.label`
  margin-bottom: 5px;
`

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ea3267;
`

const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ea3267;
  height: 100px;
`

const Select = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ea3267;
  margin-bottom: 10px;
  font-size: 16px;
`

const Option = styled.option``

const SubmitButton = styled.button`
  padding: 8px 16px;
  background-color: #dd88c7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-end;

  &:hover {
    background-color: #e55fc1;
  }
`
