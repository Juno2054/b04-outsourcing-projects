import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { db } from '../../API/firebase/firebase.API'
import { selectPosts, setPosts } from '../../redux/modules/home/postsSlice'
import {
  Post,
  PostContent,
  PostImage,
  PostListSection,
  PostText,
  PostTitle,
} from '../../styled-component/home/postListStyles'

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
