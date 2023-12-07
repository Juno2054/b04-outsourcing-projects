import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

function CarouselCard({ post }) {
  const navigate = useNavigate()
  const goToDetail = () => {
    navigate(`/detail/${post.id}`, { state: post })
  }

  return (
    <CardContainer>
      <div key={post.id} onClick={goToDetail}>
        <Image src={post.postImg} alt="Post" />
        <TextOverlay>
          <Title>{post.title}</Title>
          <Content>{post.content}</Content>
        </TextOverlay>
      </div>
    </CardContainer>
  )
}

export default CarouselCard

const CardContainer = styled.div`
  position: relative;
  padding: 8px;
`

const Image = styled.img`
  width: 450px;
  height: 250px;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
  border: 3px solid #ea3267;

  ${CardContainer}:hover & {
    opacity: 0.7;
  }
`

const TextOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${CardContainer}:hover & {
    opacity: 1;
  }
`

const Title = styled.h2`
  color: #000;
  font-size: 24px;
`

const Content = styled.p`
  color: #000;
  font-size: 16px;
`
