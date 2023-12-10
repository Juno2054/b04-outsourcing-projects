import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const defaultImage =
  'https://img.freepik.com/free-photo/background_53876-32170.jpg?w=1380&t=st=1701999181~exp=1701999781~hmac=351261413228d268fdf83add97ac2aec7cd8e00c2ea933fe118536f140349c93'

function CarouselCard({ post }) {
  const navigate = useNavigate()

  const goToDetail = () => {
    navigate(`/detail/${post.id}`, { state: post })
  }

  const imageUrl = post.imageUrl || defaultImage

  return (
    <CardContainer>
      <div key={post.id} onClick={goToDetail}>
        <Imagewrap>
        <Image src={imageUrl} alt="Post" />
        <TextOverlay>
           <Title>{post.title}</Title>
          </TextOverlay>
        </Imagewrap>
        
          <Content>{post.content}</Content>
      </div>
    </CardContainer>
  )
}

export default CarouselCard

const CardContainer = styled.div`
  width:100%;
  
`

const Imagewrap = styled.div`
position:relative;
width:90%;
margin:0 auto;
margin-top:10px;`

const Image = styled.img`
  /* transition: opacity 0.3s ease-in-out; */
  border-radius: 10px;
  height:300px;
`

const TextOverlay = styled.div`
  position: absolute; 
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* transition: opacity 0.3s ease-in-out; */
`

const Title = styled.h2`
  font-size: 16px;
  color: white;
  padding:5px;
  text-shadow: 0px 0px 10px grey;
`

const Content = styled.p`
font-size: 14px;
line-height:1.2;
height:100px;
overflow: hidden;
text-overflow:ellipsis;
width:90%;
margin:0 auto;
margin-top:10px;
margin-bottom:10px;
`
