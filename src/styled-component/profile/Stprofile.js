import styled from 'styled-components'

export const MyPageContainer = styled.div`
  max-width: 70%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  margin-top: 50px;
  position: relative;
`

export const UserInfo = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`

export const Nickname = styled.span`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: bold;
  margin-left: 15px;
`

export const Edit = styled.img`
  width: 20px;
  height: 20px;
  object-fit: cover;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
`
export const Modal = styled.div`
  /* 모달 스타일 */
  width: 70%;
  background-color: #ffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: none;
`

export const ModalOverlay = styled.div`
  /* 모달을 화면 중앙에 위치시키기 위한 스타일 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 페이지와 동일한 반투명한 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ModalContent = styled.div`
  /* ModalContent 스타일 */
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const EditButton = styled.button`
  background-color: #ea3267;
  color: white;
  width: 70px;
  height: 30px;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-top: 20px;
  font-weight: bold;
`

export const EditInput = styled.input`
  border: none;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
  width: 80%;
  padding: 8px;
  text-align: left; /* 좌측 정렬 설정 */
  &:focus {
    outline: none;
  }
`

export const Span = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  flex: 1;
  text-align: left;
  font-weight: 600;
  line-height: 2.2;
`

export const BioWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: stretch;
  justify-content: space-evenly;
  align-items: baseline;
`
export const Bio = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  margin-top: 10px;
`

export const ModalInput = styled.div`
  display: flex;
  width: 80%;
`
