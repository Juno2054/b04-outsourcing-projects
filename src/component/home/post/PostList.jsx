import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { db } from '../../../API/firebase/firebase.API'
import { selectPosts, setPosts } from '../../../redux/modules/home/postsSlice'

function formatDate(timestamp) {
  if (!timestamp) {
    return 'Not Found'
  }

  const date = timestamp.toDate()
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return date.toLocaleDateString('ko-KR', options)
}

function PostList({ selectedPlace }) {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const posts = useSelector(selectPosts)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'))
        const fetchedPosts = []
        querySnapshot.forEach((doc) => {
          fetchedPosts.push({ id: doc.id, ...doc.data() })
        })
        dispatch(setPosts(fetchedPosts))
      } catch (error) {
        console.error('데이터 가져오기 실패:', error)
      }
    }

    fetchData()
  }, [dispatch])

  return (
    <PostListSection>
      <PlaceHeader>
        {selectedPlace && selectedPlace.mapName} 찾아보기!
      </PlaceHeader>
      {selectedPlace &&
        posts
          .filter((post) => selectedPlace.mapName === post.mapName)
          .map((post) => (
            <Post
              key={post.id}
              onClick={() => navigate(`/detail/${post.id}`, { state: post })}
            >
              {post.imageUrl ? (
                <PostImage src={post.imageUrl} alt="Post" />
              ) : null}
              <PostContent>
                <PostTitle>{post.title}</PostTitle>
                <PostText>{post.content}</PostText>
                <Date>{formatDate(post.createdAt)}</Date>
              </PostContent>
            </Post>
          ))}
    </PostListSection>
  )
}

export default PostList

const PostListSection = styled.section`
  flex-wrap: wrap;
  align-items: flex-start;
  flex-basis: 25%;
  overflow-y: scroll; 
  overflow-x: hidden;
`;

const PlaceHeader = styled.h2`
  margin-bottom: 15px;
  margin-top: 15px;
  font-size: 15px;
  /* text-transform: capitalize; */
  text-align: center;
`
const Post = styled.article`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  margin-bottom: 20px;
  /* margin-right: 10px; */
  height: 200px;
  width: 100%;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`

const PostImage = styled.img`
  width:40%;
  height:100%;
  object-fit: cover;
  border-radius: 10px;
  order: -1;
`

const PostContent = styled.div`
  flex: 1;
  margin-left: 10px;
  margin-top: 13px;
`

const PostTitle = styled.h2`
  margin-bottom: 10px;
  font-size: 16px;
  white-space: nowrap;
  max-width: 200px;
`

const PostText = styled.p`
  overflow: hidden;
  line-height:1.2;
  height:100px;
  font-size:12px;
  margin-bottom:5px;
`

const Date = styled.p`
  font-size:12px;
  font-weight:bold;

`