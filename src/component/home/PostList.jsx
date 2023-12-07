import React from 'react'
import styled from 'styled-components'

const dummyPosts = [
  {
    id: 1,
    title: '첫 번째 게시물',
    content: '이것은 첫 번째 게시물입니다.',
    postImage:
      'https://cdn.pixabay.com/photo/2016/10/21/14/50/plouzane-1758197_1280.jpg',
  },
  {
    id: 2,
    title: '두 번째 게시물',
    content: '두 번째 게시물의 내용입니다.',
    postImage: 'URL_TO_POST_IMAGE_2',
  },
]

function PostList() {
  return (
    <PostListSection>
      <HotPlaceHeading>Hot Place</HotPlaceHeading>
      {dummyPosts.map((post) => (
        <Post key={post.id}>
          <PostContent>
            <PostTitle>{post.title}</PostTitle>
            <PostText>{post.content}</PostText>
          </PostContent>
          <PostImage src={post.postImage} alt="Post" />
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
`
const HotPlaceHeading = styled.h2`
  font-size: 24px;
  color: #ea3267;
  margin-top: 20px;
  text-align: center;
  margin-bottom: 20px;
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
  margin-bottom: 10px;
  color: #333;
`

const PostText = styled.p`
  color: #666;
`
