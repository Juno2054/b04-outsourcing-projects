import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import * as St from "../../src/styled-component/detail/Stdetail";
import { db } from "../API/firebase/firebase.API";
function Detail() {
  const location = useLocation();
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((state) => state.loginSlice);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      if (location.state && user.uid === location.state.userId) {
        const postId = location.state.id;
        const confirmation = window.confirm('정말 이게시물을 삭제 하시겠습니까?');
        if (confirmation) {
          const docRef = doc(db, 'posts', postId);
          await deleteDoc(docRef);
          console.log('게시물이 성공적으로 삭제되었습니다!');
          navigate('/');
        }
      }
    } catch (error) {
      console.error('게시물 삭제 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    if (location.state) {
      setEditedTitle(location.state.title);
      setEditedContent(location.state.content);
    }
  }, [location.state]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTitle(location.state.title);
    setEditedContent(location.state.content);
  };
  const handleMapClick = () => {
    const url = location.state.clickedLocation.place_url
    window.open(url,"_blank", "noopener,noreferrer")
  }
  const handleRodeClick = () => {
    const place =  location.state.place_name
    const placePosition = location.state.clickedLocation?.position
    const rodeUrl = `https://map.kakao.com/link/to/${place},${placePosition?.lat},${placePosition?.lng}`
    window.open(rodeUrl)
  }

  const handleUpdate = async () => {
    try {
      const postId = location.state.id;
      const docRef = doc(db, "posts", postId);
      const confirmation = window.confirm("정말 이대로 변경 사항을 저장하시겠습니까?");
      if (confirmation) {
        await updateDoc(docRef, {
          title: editedTitle,
          content: editedContent,
        });
        console.log('게시물 제목과 내용이 성공적으로 업데이트되었습니다!');
        setIsEditing(false); 
        navigate('/');
      }
    } catch (error) {
      console.error('게시물 제목과 내용을 업데이트하는 중 오류 발생:', error);
    }
  };

  const renderEditAndDeleteButtons = () => {
    if (user.uid === location.state?.userId) {
      return (
        //여기서부터
        <div>
          <St.Button onClick={handleEdit}>수정하기</St.Button>
          <St.Button onClick={handleDelete}>삭제하기</St.Button>
        </div>
      );
    }
    return null;
  };
  return (
    <St.Container>
      <St.TopDiv>
        <St.TopImg src={location.state.clickedLocation.place_url}alt=""/>
        <St.TopFlexDiv>
        <St.TopDiv2>
        <St.Title>
          {location.state.clickedLocation.place_name}
        </St.Title>
        <St.FlexDiv>
        <St.FlexDivMenu onClick={handleMapClick}>
                <St.FlexDivMenuImg
                  src={
                    process.env.PUBLIC_URL + '/asset/img/detaill/ico/지도.png'
                  }
                  alt=""
                />
                <St.P>지도</St.P>
              </St.FlexDivMenu>
              <St.FlexDivMenu onClick={handleRodeClick}>
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
      <St.MediumDiv>

        <St.H2> 상세정보</St.H2>
        <St.MediumDiv2>
          {/* <div>{posts.title}</div> */}
          {/* 일반주소 */}
          주소 :
          {location.state.clickedLocation.address_name ||
            '주소없음'}
        </St.MediumDiv2>
        <St.MediumDiv2>영업시간 : 매일 10:00 ~ 21:30</St.MediumDiv2>
        <St.MediumDiv2>
          대표번호 :{' '}
          {location.state.clickedLocation.phone|| '대표 번호가 없네요!'}
        </St.MediumDiv2>
        <St.MediumDiv2>
          시설정보 : {location.state.clickedLocation.category_group_name}

        </St.MediumDiv2>
      </St.MediumDiv>
      {location.state ? (
        <St.MediumDiv2>
          {isEditing ? (
            <St.FlexDiv>
              <div>
              <St.Input
                type="text"
                value={editedTitle} 
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <St.ReviewTextArea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              /></div>
              <St.ConPost>
              <St.Button onClick={handleUpdate}>수정완료!</St.Button>
              <St.Button onClick={handleCancelEdit}>수정 취소</St.Button>
              </St.ConPost>
            </St.FlexDiv>
          ) : (
            <St.ContentList>
             <St.FlexDiv>
             <St.UserDiv>
                <h3>작성 유저</h3>
                <p>닉네임: {location.state.userNickName}</p>
                <p>Email: {location.state.userEmail}</p>
                <p>별점 {'⭐'.repeat(location.state.rating - 1)}</p>
              </St.UserDiv>
              <St.H2>제목: {location.state.title}</St.H2>
              <St.ContentDiv><p>내용: {location.state.content}</p></St.ContentDiv>
              
              </St.FlexDiv>

              <St.ConPost>
              {renderEditAndDeleteButtons()}
              </St.ConPost>
             
              {/* <p>{location.state.clickedLocation.place_name}</p> */}
           

            </St.ContentList>
          )}
        </St.MediumDiv2>
      ) : (
        <p>No data received</p>
      )}
    </St.Container>//여기까지
  );
}

export default Detail;
