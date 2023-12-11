import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { db, storage } from '../../../API/firebase/firebase.API'
import PostFormMapSearch from '../map/PostFormMapSearch'

const starRating = [
  '별점을 선택해주세요!',
  '⭐',
  '⭐⭐',
  '⭐⭐⭐',
  '⭐⭐⭐⭐',
  '⭐⭐⭐⭐⭐',
]

function PostFormModal({ closeModal }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [selectedMapPlace, setSelectedMapPlace] = useState('');
  const [clickedLocation, setClickedLocation] = useState(null);
  const [selectedFile, setSelectedFile] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
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

  const handleLocationClick = (location) => {
    setClickedLocation(location)
  }
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
  
      if (allowedFileTypes.includes(file.type)) {
        setSelectedFile(file);
  
        const previewURL = URL.createObjectURL(file);
        setImagePreview(previewURL);
      } else {
        alert('이 파일 형식은 허용되지 않습니다. JPG, PNG, GIF 파일을 선택해주세요.');
        event.target.value = null;
        setSelectedFile('');
        setImagePreview(''); 
      }
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  

    const confirmSubmission = window.confirm('정말 이대로 게시하시겠습니까?');

    if (!confirmSubmission) {
      return; 
    }
  

    if (!title.trim() || !content.trim() || !selectedMapPlace.trim() || rating === 0 || !clickedLocation) {
      alert('제목, 내용, 게시물 항목, 별점, 위치를 전부 입력해주세요.');
      return;
    }
  
    try {
      const selectedPlace = mapPlaces.find((place) => place.mapName === selectedMapPlace);
      const category_group_code = selectedPlace?.category_group_code || '';
  
      let imageUrl = '';
      if (selectedFile) {
        const storageRef = ref(storage, 'postImg/' + selectedFile.name);
        await uploadBytes(storageRef, selectedFile);
        imageUrl = await getDownloadURL(storageRef);
      }
  
      const postId = uuidv4();
  
      await addDoc(collection(db, 'posts'), {
        id: postId,
        title: title,
        content: content,
        rating: rating,
        mapName: selectedMapPlace,
        lng: clickedLocation.position.lng,
        lat: clickedLocation.position.lat,
        category_group_code,
        clickedLocation,
        imageUrl: imageUrl,
        createdAt: serverTimestamp(),
      });
  
      setTitle('');
      setContent('');
      setRating(0);
      setSelectedMapPlace('');
      setSelectedFile('');
      setImageUrl('');
  
 
      window.location.reload();
  
    } catch (error) {
      console.error('문서 추가 중 발생한 오류 입니다.', error);
    }
  };

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
          placeholder="제목을 입력해주세요(20자 제한)"
              maxLength={20}
        />
        <Label htmlFor="content">내용</Label>
        <TextArea
          id="content"
          value={content}
          onChange={handleContentChange}
          placeholder="내용을 입력해주세요(200자 제한)"
              maxLength={200}
        />
        <Label htmlFor="rating">별점</Label>
        <Select id="rating" value={rating} onChange={handleRatingChange}>
          {starRating.map((star, index) => (
            <Option key={index + 1} value={index + 1}>
              {star}
            </Option>
          ))}
        </Select>
        <Label htmlFor="mapPlace">게시물 항목 선택</Label>
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
        <div>
        <FileInputButton htmlFor="file-upload">
            이미지 첨부하기
            <FileInput
              id="file-upload"
              type="file"
              onChange={handleFileSelect}
            />
          </FileInputButton>
          {selectedFile && (
            <FileName>{selectedFile.name}</FileName>
          )}
          {imagePreview && (
            <ImagePreview src={imagePreview} alt="Preview" />
          )}
        </div>
        <PostFormMapSearch onLocationClick={handleLocationClick} />
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color:white;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
  max-height: 60vh;
  overflow-y: auto;
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
    color: #ea3267;
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
  border: none;
  outline: none;
  padding: 8px;
  border-radius: 4px;
  border:1px solid black;
`

const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
  height: 100px;
`

const Select = styled.select`
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 16px;
`

const FileInputButton = styled.label`
display: inline-block;
  background-color:black;
  color: white;
  font-size: 13px;
  font-weight: bold;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align:center;
  width:140px;

  &:hover {
    background-color: #ea3267;
    color:white;
    font-weight: bold;
  }
`;

const FileInput = styled.input`
  display: none;
  border: none;
  outline: none;
`;

const FileName = styled.span`
  margin-left: 10px;
`;


const ImagePreview = styled.img`
  max-width: 100%;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const Option = styled.option``

const SubmitButton = styled.button`
  padding: 8px 16px;
  background-color:black;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  align-self: flex-end;
  font-size:13px;
  font-weight:bold;
  margin-top:20px;

  &:hover {
    background-color: #ea3267;
  }
`
