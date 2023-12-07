import React from 'react'
import * as St from '../../styled-component/detail/Stdetail'
function DetailComponent() {
  return (
    <St.Container>
      {/* 상단에는 지도에 있는 좌표 이름 과 장소 이미지? */}
      <St.TopDiv>
        <St.TopImg />
        <St.TopFlexDiv>
          <St.TopDiv2>
            <St.Title> 어떤 어떤 맛있는 집인듯? </St.Title>
            <St.FlexDiv>
              <St.FlexDivMenu>
                <St.FlexDivMenuImg
                  src={
                    process.env.PUBLIC_URL + '/asset/img/detaill/ico/지도.png'
                  }
                  alt=""
                />
                <St.P>지도</St.P>
              </St.FlexDivMenu>
              <St.FlexDivMenu>
                <St.FlexDivMenuImg
                  src={
                    process.env.PUBLIC_URL + '/asset/img/detaill/ico/길찾기.png'
                  }
                  alt=""
                />
                <St.P>길찾기</St.P>
              </St.FlexDivMenu>
              <St.FlexDivMenu>
                <St.FlexDivMenuImg
                  src={
                    process.env.PUBLIC_URL + '/asset/img/detaill/ico/공유.png'
                  }
                  alt=""
                />
                <St.P>공유</St.P>
              </St.FlexDivMenu>
            </St.FlexDiv>
          </St.TopDiv2>
        </St.TopFlexDiv>
      </St.TopDiv>

      {/* 중단에는 상세정보 주소 및 영업시간? 대표번호? 시설정보?(동물출입가능,흡연실 등) */}
      <St.MediumDiv>
        <St.H2> 상세정보</St.H2>
        <St.MediumDiv2>
          주소 : 서울 용산구 이태원로 189 1층 (우)04350
        </St.MediumDiv2>
        <St.MediumDiv2>영업시간 : 매일 10:00 ~ 21:30</St.MediumDiv2>
        <St.MediumDiv2>대표번호 : 02-796-1244</St.MediumDiv2>
        <St.MediumDiv2>
          시설정보
          <St.MediumDiv2>동물출입가능</St.MediumDiv2>
          <St.MediumDiv2>흡연실</St.MediumDiv2>
        </St.MediumDiv2>
      </St.MediumDiv>
      {/* 하단에는 리뷰? 별점? 평점? */}
      <St.BottomDiv>
        <form action="">
          <St.ContentListReview>
            <St.ContentList style={{ flex: 1 }}>
              <img
                src={
                  process.env.PUBLIC_URL + '/asset/img/detaill/ico/프로필.png'
                }
                alt=""
              />
            </St.ContentList>

            <St.ContentList style={{ flex: 8, padding: '30px 0 30px 30px' }}>
              <St.ContentList1> ㅇㅇㅇ 님 리뷰를 남겨보세요!! </St.ContentList1>
              <St.ContentList1>⭐⭐⭐⭐</St.ContentList1>
              <St.ContentList1>
                <St.ReviewTeaxtArea />
                <St.Button type="submit">등 록!</St.Button>
              </St.ContentList1>
            </St.ContentList>
          </St.ContentListReview>
        </form>
        <St.ContentDiv>
          <St.ContentList>
            <St.ContentImgBox>
              <St.ContentImg
                src={process.env.PUBLIC_URL + '/asset/img/detaill/1.jpg'}
                alt=""
              />
              <St.ContentImg
                src={process.env.PUBLIC_URL + '/asset/img/detaill/2.jpg'}
                alt=""
              />
              <St.ContentImg
                src={process.env.PUBLIC_URL + '/asset/img/detaill/3.jpg'}
                alt=""
              />
              <St.ContentImg
                src={process.env.PUBLIC_URL + '/asset/img/detaill/4.jpg'}
                alt=""
              />
              <St.ContentImg
                src={process.env.PUBLIC_URL + '/asset/img/detaill/4.jpg'}
                alt=""
              />
              <St.ContentImg
                src={process.env.PUBLIC_URL + '/asset/img/detaill/4.jpg'}
                alt=""
              />
            </St.ContentImgBox>
          </St.ContentList>
          <St.ContentList>
            <p>
              전체 <span style={{ color: 'blue' }}>1</span>
            </p>
          </St.ContentList>
          <St.ContentList>별점 4.3점⭐⭐⭐⭐</St.ContentList>
        </St.ContentDiv>
        <St.ContentListReview>
          <St.ContentList style={{ flex: 1 }}>
            <img
              src={process.env.PUBLIC_URL + '/asset/img/detaill/ico/프로필.png'}
              alt=""
            />
          </St.ContentList>
          <St.ContentList style={{ flex: 8, padding: '30px 0 30px 30px' }}>
            <St.ContentList1>닉네임 날짜</St.ContentList1>
            <St.ContentList1>⭐⭐⭐⭐</St.ContentList1>
            <St.ContentList1>
              블라블라블라블라블라블라블라블라블라블라블라블라블라블라{' '}
            </St.ContentList1>
          </St.ContentList>
        </St.ContentListReview>
      </St.BottomDiv>
    </St.Container>
  )
}

export default DetailComponent
