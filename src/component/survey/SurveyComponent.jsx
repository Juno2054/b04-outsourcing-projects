import React, { useState } from 'react'
import * as St from '../../styled-component/survey/StSurveyl'
import SurveyData from '../survey/Data/surveyData.json'
function SurveyComponent() {
  const questions = [...SurveyData]
  const [selectedOption, setSelectedOption] = useState(null)
  const [questionNum, setQuestionNum] = useState(0)
  //   인풋벨류 바뀌는거 확인해주는 함수
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value)
  }
  //   다음버튼 누르면 다음 질문으로 넘어가는 함수 만약 선택안하고 넘어가면 alert창 띄워주기
  const nextQuestion = () => {
    if (selectedOption === null) {
      alert('답변을 선택해주세요')
      return
    }
    if (questionNum < questions.length - 1) {
      setQuestionNum(questionNum + 1)
    }
    setSelectedOption(null)
  }
  console.log((questionNum / questions.length) * 100)
  return (
    <St.Container>
      <St.TopDiv>
        <St.TopImg />
        <St.TopDiv2>
          <St.H2>회원 성향 설문조사</St.H2>
          <St.H4>간단한 설문조사에 참여하여 성향을 알아보세요!</St.H4>
        </St.TopDiv2>
      </St.TopDiv>
      <St.MediumDiv>
        {/* 진행상황 */}
        <St.Survey>
          <St.H4>진행상황</St.H4>
          <St.SurveyProgress>
            {/* 진행상황 ui로 보여주는 바 */}
            <St.SurveyProgressBar
              width={(questionNum / questions.length) * 100}
            />
          </St.SurveyProgress>
          <St.SurveyPage>
            {
              <div key={questionNum}>
                <St.SurveyPage>
                  <St.SurveyQuestion>
                    {/* 문제 번호와 질문 */}
                    <p>{`Q${questionNum + 1}.${
                      questions[questionNum].question
                    }`}</p>
                  </St.SurveyQuestion>
                  {/* 문제의 선택지 */}
                  {questions[questionNum].options.map((option, index1) => (
                    <div key={index1}>
                      <St.SurveyQuestionItem>
                        <input
                          type="radio"
                          name={`question${questionNum}`}
                          id={`radio${index1}${questionNum}`}
                          value={option}
                          onChange={handleOptionChange}
                        />
                        <label htmlFor={`radio${index1}${questionNum}`}>
                          <span></span>
                          <p>{`${index1 + 1}.${option}`}</p>
                        </label>
                      </St.SurveyQuestionItem>
                    </div>
                  ))}
                </St.SurveyPage>
              </div>
            }
            {/* <St.SurveyQuestion>
              <p>Q1. 가장 선호하는 계절은? </p>
            </St.SurveyQuestion>
            <St.SurveyQuestionItem>
              <input type="radio" id="radio01" />
              <label For="radio01">
                <span></span>
                <p>1. 봄</p>
              </label>
            </St.SurveyQuestionItem> */}
            {/* <St.SurveyQuestionItem>
              <input type="radio" id="radio02" />
              <label For="radio02">
                <span></span>
                <p>2. 여름</p>
              </label>
            </St.SurveyQuestionItem>
            <St.SurveyQuestionItem>
              <input type="radio" id="radio03" />
              <label For="radio03">
                <span></span>
                <p>3. 가을</p>
              </label>
            </St.SurveyQuestionItem> */}
            {/* <St.SurveyQuestionItem>
              <input type="radio" id="radio04" />
              <label For="radio04">
                <span></span>
                <p>4. 겨울</p>
              </label>
            </St.SurveyQuestionItem> */}
          </St.SurveyPage>
        </St.Survey>
        <St.SurveyController>
          <button onClick={nextQuestion}> 다 음 </button>
        </St.SurveyController>
      </St.MediumDiv>
    </St.Container>
  )
}

export default SurveyComponent
