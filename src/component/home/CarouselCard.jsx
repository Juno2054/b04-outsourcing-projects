import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const defaultImage =
  'https://img.freepik.com/free-photo/background_53876-32170.jpg?w=1380&t=st=1701999181~exp=1701999781~hmac=351261413228d268fdf83add97ac2aec7cd8e00c2ea933fe118536f140349c93'

function CarouselCard({ post }) {
  const navigate = useNavigate()

  const goToDetail = () => {
    navigate(`/detail/${post.id}`, { state: post })
  }

  const imageUrl = post.postImg || defaultImage

  return (
    <CardContainer>
      <div key={post.id} onClick={goToDetail}>
        <Image src={imageUrl} alt="Post" />
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
  width: 100%;
  height: auto;
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
