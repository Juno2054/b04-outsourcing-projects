import styled from 'styled-components'

const PostListSection = styled.section`
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  margin: 5px;
  flex-basis: 25%;
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
`

const PostText = styled.p`
  color: #666;
`
export { Post, PostContent, PostImage, PostListSection, PostText, PostTitle }
