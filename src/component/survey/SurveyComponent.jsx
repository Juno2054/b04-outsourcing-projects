import React, { useState } from 'react'
import * as St from '../../styled-component/survey/StSurveyl'
import SurveyData from '../survey/Data/surveyData.json'
function SurveyComponent() {
  const questions = [...SurveyData]
  const [questionNum, setQuestionNum] = useState(0)
  const SurveyComponent = () => {
    if (questionNum < questions.length - 1) {
      setQuestionNum(questionNum + 1)
    }
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
          <St.SurveyProgress>
            <St.SurveyProgressBar
              width={(questionNum / questions.length) * 100}
            />
          </St.SurveyProgress>
          <St.SurveyPage>
            {
              <div key={questionNum}>
                <St.SurveyPage>
                  <St.SurveyQuestion>
                    <p>{`Q${questionNum + 1}.${
                      questions[questionNum].question
                    }`}</p>
                  </St.SurveyQuestion>
                  {questions[questionNum].options.map((option, index1) => (
                    <div key={index1}>
                      <St.SurveyQuestionItem>
                        <input
                          type="radio"
                          id={`radio${index1}${questionNum}`}
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
          <button onClick={SurveyComponent}> 다 음 </button>
        </St.SurveyController>
      </St.MediumDiv>
    </St.Container>
  )
}

export default SurveyComponent
