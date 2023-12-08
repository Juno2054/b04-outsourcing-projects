import styled from 'styled-components'

export const MyPageContainer = styled.div`
  width: 50%;
  margin: 0 auto;
  border-radius: 8px;
  text-align: center;
  position: relative;
  margin-top: 50px;
  border: 1px solid #ccc;
  padding: 20px;
  overflow: auto;
`
export const UserInfo = styled.div`
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  div {
    width: 100%;
    font-size: 12px;
    text-align: left;
    padding: 10px;
    font-weight: bold;
  }
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  display: flex;
`
export const ProfileImageWrap = styled.div`
  width: 30%;
`
export const UserWrap = styled.div`
  p {
    padding: 5px;
  }
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

/* 모달 스타일 */
export const Modal = styled.div`
  width: 100%;
  border-radius: 8px;
  padding: 20px;
  box-shadow: none;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    width: 100%;
    font-size: 12px;
    text-align: left;
    padding: 10px;
    font-weight: bold;
  }
`
export const ProfileWrap = styled.div`
  position: relative;
`

export const ProfileEdit = styled.img`
  width: 20px;
  height: 20px;
  object-fit: cover;
  cursor: pointer;
  position: absolute;
  top: 50px;
  right: 50px;
`

export const EditButton = styled.button`
  background-color: #ea3267;
  color: white;
  width: 100%;
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

export const P = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  width: 100%;
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

export const ModalInput = styled.input`
  border: none;
  &:focus {
    outline: none;
  }
`
