import styled from 'styled-components'

export const Div = styled.div``

export const Container = styled.div`
  margin-top: 50px;
  /* display: flex; */
  flex-direction: column;

  width: 90%;
  margin: 0 auto;
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
  object-fit: cover;
`
export const TopDiv2 = styled.div`
  /* margin: -100px auto 0; */
  padding-top: 45px;
  height: 200px;
  padding-bottom: 4px;
  box-sizing: inherit;
  /* position: relative; */
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
`
export const ContentListReview = styled.div`
  display: flex;
  justify-content: left;
  text-align: left;
`
export const ContentList1 = styled.div`
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
export const ReviewTeaxtArea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #f2f2f2;
  resize: none;
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
  font-size: 16px;
  height: 23px;
  align-items: left;
  color: white;
`
