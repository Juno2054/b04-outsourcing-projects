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
      <St.MediumDiv>설문조사 어쩌고 들어가야함</St.MediumDiv>
    </St.Container>
  )
}

export default SurveyComponent
