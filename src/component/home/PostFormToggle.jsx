import React, { useState } from 'react'
import styled from 'styled-components'

const starRating = ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐']

function PostFormToggle() {
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(0)
  const [location, setLocation] = useState('')

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value))
  }

  const handleLocationChange = (e) => {
    setLocation(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('제목:', title)
    console.log('내용:', content)
    console.log('별점:', starRating[rating - 1])
    console.log('지역:', location)
    setTitle('')
    setContent('')
    setRating(0)
    setLocation('')
    setShowForm(false)
  }

  return (
    <FormWrapper>
      <ToggleButton show={showForm} onClick={() => setShowForm(!showForm)}>
        {showForm ? '접어두기' : '작성하기'}
      </ToggleButton>
      <Form show={showForm} onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="title">제목:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="content">내용:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            required
          ></textarea>
        </FormGroup>
        <FormGroup>
          <label htmlFor="rating">별점:</label>
          <select id="rating" value={rating} onChange={handleRatingChange}>
            {starRating.map((star, index) => (
              <option key={index + 1} value={index + 1}>
                {star}
              </option>
            ))}
          </select>
        </FormGroup>
        <FormGroup>
          <label htmlFor="location">지역:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={handleLocationChange}
          />
        </FormGroup>
        <SubmitButton type="submit">등록</SubmitButton>
      </Form>
    </FormWrapper>
  )
}

export default PostFormToggle

const FormWrapper = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ToggleButton = styled.button`
  padding: 15px 50px;
  font-size: 16px;
  background-color: ${({ show }) => (show ? '#dc3545' : '#007bff')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ show }) => (show ? '#c82333' : '#0056b3')};
  }
`

const Form = styled.form`
  display: ${({ show }) => (show ? 'block' : 'none')};
  margin-top: 10px;
`

const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
`

const SubmitButton = styled.button`
  padding: 8px 12px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`
