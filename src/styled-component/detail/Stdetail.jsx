import styled from 'styled-components'

export const Div = styled.div``

export const Container = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  max-width: 1200px;
  margin-bottom: 300px;
  /* md 768 */
  ${({ theme }) => theme.mediaQuery.md`
        max-width: 768px
      `}

  ${({ theme }) => theme.mediaQuery.lg`
        max-width: 1200px
      `};
`
/*  lg 1200 */

export const TopDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid black;
  margin-top: 10px;
  padding-bottom: 30px;
`
export const TopImg = styled.img`
  width: 100%;
  height: 300px;
  background-image: url('/asset/img/detaill/background.jpg');
  background-size: cover;
  background-position: center;
  text-align: center;
  align-items: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`
export const TopDiv2 = styled.div`
  margin: -100px auto 0;
  padding-top: 45px;
  height: 200px;
  padding-bottom: 4px;
  box-sizing: inherit;
  position: relative;
  text-align: center;
  width: 100%;
  /* z-index: 10; */
  background-color: #ea3267;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  /* ${({ theme }) => theme.mediaQuery.md`
        width: 900px

      `}
  ${({ theme }) => theme.mediaQuery.lg`
      width: 1200px
      `}; */
`
export const TopFlexDiv = styled.div`
  border-radius: 20px;
  align-items: stretch;
  display: flex;
  flex-wrap: wrap;
`

export const Title = styled.div`
  font-size: 32px;
  letter-spacing: -2px;
  line-height: 50px;
  padding: 2px 33px 0;
  color: white;
  margin-top: -20px;
  font-weight: bold;
`
export const MediumDiv = styled.div`
  align-items: center;
  padding: 40px;
  width: 100%;
  border-bottom: 1px solid black;
  margin-top: 10px;
`
export const MediumDiv2 = styled.div`
  margin-top: 15px;
`
export const BottomDiv = styled.div`
  text-align: center;
  align-items: center;
  width: 100%;

  margin-top: 10px;
`
export const FlexDiv = styled.div`
  display: flex;
  padding-top: 15px;
  justify-content: center;
  flex-wrap: wrap;
`
export const FlexDivMenu = styled.div`
  padding-left: 10px;
  padding-right: 30px;
  border-right: 1px solid #f2f2f2;
  margin: 10px;
  background-color: #ea3267;
  text-align: center;
  align-items: center;

  flex-wrap: wrap;
`
export const FlexDivMenuImg = styled.img`
  width: 30px;
  height: 30px;
`
export const H2 = styled.h2`
  font-size: 20px;
  height: 23px;
  align-items: left;
`
export const ContentDiv = styled.div`
  font-size: 16px;

  align-items: left;
  text-align: left;
`
export const ContentList = styled.div`
  border-bottom: 1px solid black;
  min-height: 52px;
  padding: 40px 40px 40px 40px;
  position: relative;
  img {
    flex: 1;
    object-fit: contain;
    width: 50px;
  }
`
export const ContentListNewReview = styled.div`
  border-bottom: 1px solid black;
  min-height: 52px;
  padding: 40px 40px 40px 40px;
  flex-direction: row;

  img {
    flex: 1;
    width: 50px;
  }
`
export const ContentListProfile = styled.div`
  border-bottom: 1px solid black;
  min-height: 52px;
  padding: 40px 0px 0px 0px;
  position: relative;
  img {
    width: 50%;
    max-width: 200px;
    text-align: center;
    align-items: center;
    border-radius: 50%;
  }
`
export const ContentListReview = styled.div`
  display: flex;
  justify-content: left;
`
export const ContentListReviewComment = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: column;
`
export const ContentCommentList = styled.div`
  display: flex;
  justify-content: left;
  border-bottom: 1px solid black;
  padding: 20px 0px 20px 0px;
  img {
    width: 100%;
    max-width: 120px;
    text-align: center;
    align-items: center;
    margin-right: 20px;
    border-radius: 50%;
  }
  button {
    background-color: #ea3267;
    border-radius: 10px;
    text-align: center;
    color: white;
    margin: 0px 10px 10px;
    padding: 5px;
    font-size: 16px;
    transition: 1ms all;
    &:hover {
      background-color: #9f113a;
    }
    &:active {
      background-color: #330411;
    }
  }
`
export const ContentList2 = styled.div`
  padding: 10px 0px 10px 0px;
  text-align: left;
  margin: 10px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
`
export const ContentList1 = styled.div`
  text-align: left;
  margin: 10px;
  display: flex;

  align-items: center;
  span {
    display: flex;
    font-weight: 400;
    padding: 12px;
    text-align: left;
    cursor: pointer;
    position: relative;
    display: inline-block;
  }
  ul {
    display: ${(props) => (props.isOpen ? 'block' : 'none')};
    background-color: #fff;
    border-left: 1px solid #ea3267;
    border-right: 1px solid #ea3267;
    border-bottom: 1px solid #ea3267;
    position: absolute;
    text-decoration: none;
    color: rgb(37, 37, 37);
    width: 200px;
    font-size: 14px;
    bottom: -5px;
    border-radius: 4px;
    z-index: 1;
  }
  li {
    padding-left: 10px;
    padding-top: 15px;
    align-items: center;
    text-align: left;
    &:hover {
      background-color: #f5f5f5;
    }
  }
  label {
    font-size: 20px;
    height: 23px;
    align-items: left;
    padding-right: 10px;
  }
`
export const selectStarBox = styled.div`
  border: 1px solid #ea3267;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 400;
  cursor: pointer;
  width: 200px;
  align-items: center;
`
export const ContentListInput = styled.div`
  text-align: left;
  margin: 10px;
`
export const ContentImgBox = styled.div`
  display: flex;
  justify-content: left;
  text-align: center;
  flex-wrap: wrap;
`
export const ContentImg = styled.img`
  flex: 1;
  width: 100%;
  height: 300px;
`
export const ReviewTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #f2f2f2;
  resize: none;
  font-size: 20px;
`
export const Button = styled.button`
  width: 100px;
  height: 40px;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #f2f2f2;
  resize: none;
  text-align: center;
  background-color: #ea3267;
  border-radius: 10px;
  font-size: 30px;
  color: white;
`
export const P = styled.p`
  padding-top: 10px;
  font-size: 20px;
  height: 23px;
  align-items: left;
  color: white;
`
export const Input = styled.input`
  width: 100%;
  height: 50px;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #f2f2f2;
  resize: none;
  font-size: 20px;
`
export const FlexDiv1 = styled.div`
  flex: 0 0 65%;
`
