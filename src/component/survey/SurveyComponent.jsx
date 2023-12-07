import React from 'react'
import * as St from '../../styled-component/survey/StSurveyl'
function SurveyComponent() {
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
            <St.SurveyProgressBar />
          </St.SurveyProgress>
          <St.SurveyPage>
            <St.SurveyQuestion>
              <p>첫 질문 이에요 </p>
            </St.SurveyQuestion>
            <St.SurveyQuestionItem>
              <input type="radio" id="radio01" />
              <label For="radio01">
                <span></span>
                <p>dddd</p>
              </label>
            </St.SurveyQuestionItem>
            <St.SurveyQuestionItem>
              <input type="radio" id="radio02" />
              <label For="radio02">
                <span></span>
                <p>dddd</p>
              </label>
            </St.SurveyQuestionItem>
            <St.SurveyQuestionItem>
              <input type="radio" id="radio03" />
              <label For="radio03">
                <span></span>
                <p>dddd</p>
              </label>
            </St.SurveyQuestionItem>
            <St.SurveyQuestionItem>
              <input type="radio" id="radio04" />
              <label For="radio04">
                <span></span>
                <p>dddd</p>
              </label>
            </St.SurveyQuestionItem>
          </St.SurveyPage>
        </St.Survey>
        <St.SurveyController>
          <button> 다음 </button>
        </St.SurveyController>
      </St.MediumDiv>
    </St.Container>
  )
}

export default SurveyComponent
