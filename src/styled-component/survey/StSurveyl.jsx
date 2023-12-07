import styled from 'styled-components'

export const Div = styled.div``

export const Container = styled.div`
  margin-top: 50px;
  display: flex;
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

  background-image: url('/asset/img/survey/surveyBg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center bottom;
  text-align: center;
  align-items: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  object-fit: cover;
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
  color: white;

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
  font-size: 30px;
  font-weight: bold;
`
export const H4 = styled.h4`
  font-size: 20px;
  height: 23px;
  align-items: left;
  margin-top: 30px;
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

export const Survey = styled.form`
  margin-top: 75px;
  margin-bottom: 50px;
  background-color: #fafafa;
  H4 {
    padding: 10px;
    font-size: 30px;
    height: 23px;
    align-items: left;
    margin-top: 30px;
    margin-bottom: 30px;
  }
`

export const SurveyProgress = styled.div`
  width: 100%;
  height: 30px;
  background: #f5f5f5;
  border: #f5f5f5 2px solid;
  overflow: hidden;
`
export const SurveyProgressBar = styled.div`
  height: 30px;
  width: ${(props) => props.width}%;
  background: linear-gradient(to left, #4cb8c4, #3cd3ad);
  transition: all 0.4s;
  text-align: center;
`
export const SurveyPage = styled.div`
  font-weight: 100;
  padding: 0px 40px 40px 40px;
`
export const SurveyQuestion = styled.div`
  font-weight: 100;
  height: 100px;
  padding: 40px;
  margin-bottom: 20px;
  p {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
    line-height: 40px;
  }
`
export const SurveyQuestionItem = styled.div`
  background: #fff;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(33, 33, 33, 0.15);
  border-radius: 0px 0px 4px 4px;

  padding: 20px;
  input {
    display: none;
  }
  input[type='radio'] + label {
    color: #292321;
    font-weight: 300;
    font-size: 20px;
  }
  input[type='radio'] + label span {
    display: inline-block;
    border: 2px solid #3dd2af;
    width: 40px;
    height: 40px;
    margin: 2px 4px 0 0;
    vertical-align: middle;
    cursor: pointer;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  label p {
    display: inline-block;
    position: relative;
    top: 2px;
    left: 5px;
    margin: 0px;
    font-weight: bold;
  }
  input[type='radio'] + label span,
  input[type='radio']:checked + label span {
    -webkit-transition: background-color 0.2s ease-in-out;
    -o-transition: background-color 0.2s ease-in-out;
    -moz-transition: background-color 0.2s ease-in-out;
    transition: background-color 0.2s ease-in-out;
  }
  input[type='radio']:checked + label span {
    border: 2px solid #3dd2af;
    background-color: #ea3267;
    /* background: transparent; */
  }
  input {
  }
`
export const SurveyController = styled.div`
  position: relative;
  height: 60px;
  background: #ea3267;
  padding: 12px 14px;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  button {
    background: #fff;
    border: none;
    padding: 8px 18px;
    font-size: 20px;
    font-weight: 300;
    width: 100px;
    text-align: center;
  }
  button:hover {
    cursor: pointer;
    background: #f2f2f2;
  }
`
