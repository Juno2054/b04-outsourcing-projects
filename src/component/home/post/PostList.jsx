import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { db } from '../../../API/firebase/firebase.API'
import { selectPosts, setPosts } from '../../../redux/modules/home/postsSlice'

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
              {post.postImg ? (
                <PostImage src={post.postImg} alt="Post" />
              ) : null}
              <PostContent>
                <PostTitle>{post.title}</PostTitle>
                <PostText>{post.content}</PostText>
              </PostContent>
            </Post>
          ))}
    </PostListSection>
  )
}

export default PostList

const PostListSection = styled.section`
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  margin: 5px;
  flex-basis: 25%;
  overflow-y: scroll; 
  height: 100%; 
  max-height: 1100px;
  overflow-x: hidden;
`;

const PlaceHeader = styled.h2`
  margin-bottom: 20px;
  margin-top: 10px;
  font-size: 24px;
  color: #333;
  text-transform: capitalize;
  text-align: center;
  border-bottom: 2px solid #ea3267;
  padding-bottom: 5px;
`
const Post = styled.article`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  border: 3px solid #ea3267;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  margin-bottom: 20px;
  margin-right: 10px;
  height: 125px;
  width: 100%;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`

const PostImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  order: -1;
`

const PostContent = styled.div`
  flex: 1;
  margin-left: 20px;
  margin-top: 13px;
`

const PostTitle = styled.h2`
  margin-bottom: 20px;
  margin-top: 8px;
  color: #333;
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
`

const PostText = styled.p`
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 250px;
`
