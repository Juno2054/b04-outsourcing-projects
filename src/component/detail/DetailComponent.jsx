// import {
//   collection,
//   deleteDoc,
//   doc,
//   getDoc,
//   getDocs,
//   orderBy,
//   query,
//   setDoc,
//   updateDoc,
// } from 'firebase/firestore'
// import React, { useEffect, useRef, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'
// import { db } from '../../API/firebase/firebase.API'
// import { setCommentslist } from '../../redux/modules/home/postsSlice'
// import * as St from '../../styled-component/detail/Stdetail'

// function DetailComponent({ post }) {
//   const mainPost = post
//   const { paramsId } = useParams()
//   const inputRef = useRef()
//   const dispatch = useDispatch()
//   const [selectStar, setSelectStar] = useState(null)
//   const [isOpened, setIsOpened] = useState(false)
//   const [addressData, setAddressData] = useState([])
//   const user = useSelector((state) => state.loginSlice) //로그인 유저 정보
//   const handleStarChange = (starValue) => {
//     setSelectStar(starValue)
//     setIsOpened(false)
//   }
//   const dataArray = []
//   console.log('파람스아이디', paramsId)
//   const clickedLocation = addressData.clickedLocation
//   const addressDataSelcted = addressData
//   console.log('머고', addressDataSelcted)

//   // const date = addressDataSelcted.createdAt.toDate()
//   // console.log('머고3', date.toLocaleString)
//   console.log('클릭한 위치', clickedLocation)

//   const [selectedCommentId, setSelectedCommentId] = useState(null)
//   //취소할때 리뷰 임시저장
//   const [originalContent, setOriginalContent] = useState('')
//   //리뷰 id 선택한거 임시저장
//   const selectComment = (id) => {
//     const selectedComment = posts.find((post) => post.id === id)
//     setOriginalContent(selectedComment.content)
//     setSelectedCommentId(id)
//   }
//   const placeUrl = addressDataSelcted.imageUrl
//   console.log('111111111111111placeUrl', placeUrl)
//   const [ConPostEdit, setConPostEdit] = useState(false)
//   // 날짜 함수
//   function formatDate(dateString) {
//     const date = new Date(dateString)

//     const options = {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: 'numeric',
//       minute: 'numeric',
//       hour12: false,
//       timeZone: 'Asia/Seoul',
//     }

//     return date.toLocaleString('ko-KR', options)
//   }
//   // useEffect(() => {
//   //   const loginUser = async (db) => {
//   //     try {
//   //       const docRef = await doc(db, 'users')
//   //       console.log('유저아이디', user)
//   //       const docSnap = await getDoc(docRef)
//   //       if (docSnap.exists()) {
//   //       } else {
//   //         console.log('없음')
//   //       }
//   //     } catch (error) {
//   //       console.log(error)
//   //     }
//   //   }
//   //   loginUser()
//   // }, [user.uid])

//   const [reviewsCommentslist, setReviewsCommentslist] = useState([])
//   //메인페이지 데이터
//   useEffect(() => {
//     async function fetchDataFromFirebase(db) {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'posts'))
//         querySnapshot.forEach((doc) => {
//           const data = doc.data()
//           dataArray.push(data)
//           console.log('데이터배열', dataArray)
//           if (data.id === paramsId) {
//             setAddressData(data)
//             console.log('같은아이디 가져오냐', addressData)
//           }
//         })
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     fetchDataFromFirebase(db)
//   }, [db, paramsId])
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const queryDb = await query(
//           collection(db, 'reviewsCommentslist'),
//           orderBy('timestamp')
//         )
//         const querySnapshot = await getDocs(queryDb)
//         const fetchedPosts = []
//         querySnapshot.forEach((doc) => {
//           fetchedPosts.push({ id: doc.id, ...doc.data() })
//         })
//         await dispatch(setCommentslist(fetchedPosts))
//         setReviewsCommentslist(fetchedPosts)
//         console.log('파이어베이스 데이터 가져오기 성공:', fetchedPosts)
//       } catch (error) {
//         console.error('데이터 가져오기 실패:', error)
//       }
//     }
//     fetchData()
//   }, [dispatch, mainPost])
//   const posts = useSelector((state) => state.postsSlice.reviewsCommentslist)
//   console.log('posts  리덕스 스토어에서 가져온거', posts)
//   const [textArea, setTextArea] = useState('')
//   //코멘트 전송
//   const submitPost = async (e) => {
//     e.preventDefault()
//     if (selectStar === null) {
//       alert('별점을 선택해주세요')
//     }
//     if (!textArea) {
//       alert('리뷰를 작성해주세요')
//       return
//     }
//     try {
//       const docRef = await doc(collection(db, 'reviewsCommentslist'))

//       console.log('파이어베이스db', docRef)
//       await setDoc(docRef, {
//         contentId: mainPost.id, //콘텐트아이디
//         content: textArea, //코멘트
//         rating: selectStar, //별점
//         title: user.displayName ? user.displayName : '기본이름', //이름? 제목?
//         timestamp: formatDate(new Date()), //날짜
//         uid: user.uid, //유저아이디
//         userImage: user.photoURL, // 사용자 이미지 URL
//       })
//       console.log('파이어베이스db', docRef.id)
//       setTextArea('')
//       await doc(collection(db, 'reviewsCommentslist'))
//       setSelectedCommentId(null)
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   //별점 선택
//   const handleToggle = () => setIsOpened(!isOpened)
//   // 댓글수정후 업데이트
//   const handleUpdate = async (id, updatedData) => {
//     console.log('업데이트 함수 작동하냐', id, updatedData)

//     if (selectedCommentId === id) {
//       const docRef = doc(db, 'reviewsCommentslist', id)
//       const docSnap = await getDoc(docRef)
//       //exists()는 해당 문서가 있는지 없는지 확인하는 함수
//       if (docSnap.exists()) {
//         const updatedCommentsList = reviewsCommentslist.map((post) => {
//           if (post.id === id) {
//             return { ...post, ...updatedData }
//           } else {
//             return post
//           }
//         })

//         dispatch(setCommentslist(updatedCommentsList))
//         console.log('업데이트된 코멘트리스트', updatedCommentsList)
//         await updateDoc(docRef, updatedData)
//         console.log('=-----------')
//         console.log('업데이트된 데이터', updatedData)

//         setSelectedCommentId(null)
//       }
//     }
//   }
//   //삭제 함수
//   const handleDelete = async (id, updatedData) => {
//     try {
//       if (selectedCommentId === id) {
//         console.log('삭제함수 작동하냐', id)
//         const docRef = doc(db, 'reviewsCommentslist', id)
//         console.log('삭제함수 작동하냐', docRef)
//         await deleteDoc(docRef)

//         const updatedCommentsList = reviewsCommentslist.filter(
//           (post) => post.id !== id
//         )
//         await dispatch(setCommentslist(updatedCommentsList))
//         console.log('삭제된 코멘트리스트', updatedCommentsList)
//         setSelectedCommentId(null)
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   //수정 취소
//   function handleCancel() {
//     // setTextArea(originalContent)
//     setSelectedCommentId(null)
//   }
//   //지도
//   const handleMapClick = () => {
//     const url = clickedLocation?.place_url
//     const parts = url.split('/')
//     const placeId = parts[parts.length - 1]
//     console.log('placeId', placeId)
//     window.open('url', url)
//   }
//   // 길찾기
//   const handleRodeClick = () => {
//     const place = clickedLocation?.place_name
//     const placePosition = clickedLocation?.position
//     const rodeUrl = `https://map.kakao.com/link/to/${place},${placePosition?.lat},${placePosition?.lng}`
//     window.open(rodeUrl)
//   }
//   const filteredComments = posts.filter(
//     (comment) => comment.contentId === paramsId
//   )
//   return (
//     <St.Container>
//       <St.TopDiv>
//         {/* 이미지없을경우 기본이미지 출력 */}
//         <St.TopImg src={placeUrl} alt="" />
//         <St.TopFlexDiv>
//           <St.TopDiv2>
//             <St.Title>
//               {' '}
//               {clickedLocation?.place_name ||
//                 addressDataSelcted?.title ||
//                 '제목없음'}{' '}
//             </St.Title>

//             <St.FlexDiv>
//               <St.FlexDivMenu>
//                 <St.FlexDivMenuImg
//                   onClick={handleMapClick}
//                   src={
//                     process.env.PUBLIC_URL + '/asset/img/detaill/ico/지도.png'
//                   }
//                   alt=""
//                 />
//                 <St.P>지도</St.P>
//               </St.FlexDivMenu>
//               <St.FlexDivMenu>
//                 <St.FlexDivMenuImg
//                   onClick={handleRodeClick}
//                   src={
//                     process.env.PUBLIC_URL + '/asset/img/detaill/ico/길찾기.png'
//                   }
//                   alt=""
//                 />
//                 <St.P>길찾기</St.P>
//               </St.FlexDivMenu>
//               <St.FlexDivMenu>
//                 <St.FlexDivMenuImg
//                   src={
//                     process.env.PUBLIC_URL + '/asset/img/detaill/ico/공유.png'
//                   }
//                   alt=""
//                 />
//                 <St.P>공유</St.P>
//               </St.FlexDivMenu>
//             </St.FlexDiv>
//           </St.TopDiv2>
//         </St.TopFlexDiv>
//       </St.TopDiv>

//       {/* 중단에는 상세정보 주소 및 영업시간? 대표번호? 시설정보?(동물출입가능,흡연실 등) */}
//       <St.MediumDiv>
//         <St.H2> 상세정보</St.H2>
//         <St.MediumDiv2>
//           {/* <div>{posts.title}</div> */}
//           {/* 일반주소 */}
//           주소 :
//           {clickedLocation?.address_name ||
//             addressDataSelcted?.title ||
//             '주소없음'}
//         </St.MediumDiv2>
//         <St.MediumDiv2>영업시간 : 매일 10:00 ~ 21:30</St.MediumDiv2>
//         <St.MediumDiv2>
//           대표번호 :{' '}
//           {clickedLocation?.phone
//             ? clickedLocation?.phone
//             : '대표 번호가 없네요!'}{' '}
//         </St.MediumDiv2>
//         <St.MediumDiv2>
//           시설정보 : {clickedLocation?.category_group_name}
//           <St.MediumDiv2>동물출입가능</St.MediumDiv2>
//           <St.MediumDiv2>흡연실</St.MediumDiv2>
//           <St.MediumDiv2>최근 수정된 날짜:</St.MediumDiv2>
//         </St.MediumDiv2>
//       </St.MediumDiv>
//       {/* 하단에는 리뷰? 별점? 평점? */}
//       <St.BottomDiv>
//         <form action="">
//           {/* 유저 이름 없으면 리뷰작성 불가하게 가림  */}
//           {user.displayName ? (
//             <St.ContentListReview>
//               <St.ContentListProfile>
//                 {
//                   <>
//                     {console.log(user.photoURL)}
//                     <img
//                       src={
//                         user.photoURL
//                           ? user.photoURL
//                           : process.env.PUBLIC_URL +
//                             '/asset/img/detaill/ico/프로필.png'
//                       }
//                       alt=""
//                     />
//                   </>
//                 }
//               </St.ContentListProfile>

//               <St.ContentListNewReview
//                 style={{ flexGrow: 2, padding: '30px 0 30px 30px' }}
//               >
//                 <St.ContentList1>
//                   <p>
//                     <span>{user.displayName}</span> 님 리뷰를 남겨보세요!!{' '}
//                   </p>
//                 </St.ContentList1>
//                 {
//                   <>
//                     <St.ContentList1 style={{ flexGrow: 6 }}>
//                       <St.selectStarBox onClick={handleToggle}>
//                         <span onClick={handleToggle}>
//                           {selectStar
//                             ? `${selectStar}  ${'⭐'.repeat(selectStar)}`
//                             : '별점선택하세요'}
//                         </span>
//                         <label>{'▾'}</label>
//                       </St.selectStarBox>
//                     </St.ContentList1>
//                     {
//                       <St.ContentList1 isOpen={isOpened}>
//                         <ul>
//                           {[...Array(5)].map((star, index) => {
//                             const starValue = index + 1
//                             return (
//                               <li
//                                 key={index}
//                                 onClick={() => handleStarChange(starValue)}
//                               >
//                                 <label key={index}>
//                                   <option value={starValue}>
//                                     <p>{starValue}</p>
//                                     {[...Array(starValue)].map((n, index) => {
//                                       return <span>⭐</span>
//                                     })}
//                                   </option>
//                                 </label>
//                               </li>
//                             )
//                           })}
//                         </ul>
//                       </St.ContentList1>
//                     }
//                   </>
//                 }
//                 <St.ContentListInput>
//                   <St.ReviewTextArea
//                     value={textArea}
//                     onChange={(e) => setTextArea(e.target.value)}
//                     placeholder="리뷰를 작성해주세요"
//                   />
//                   {console.log(textArea)}
//                   <St.Button type="button" onClick={submitPost}>
//                     등 록!
//                   </St.Button>
//                 </St.ContentListInput>
//               </St.ContentListNewReview>
//             </St.ContentListReview>
//           ) : (
//             ''
//           )}
//         </form>
//         <St.ContentDiv>
//           <St.ContentList>
//             <St.ConPost>
//               {console.log('아이디 비교', user.uid, addressDataSelcted.userId)}
//               {user.uid === addressDataSelcted.userId ? (
//                 <>
//                   {/* 수정버튼 */}
//                   <button
//                     onClick={() => {
//                       setConPostEdit(false)
//                     }}
//                   >
//                     수정완료
//                   </button>
//                   {/* 수정 상태에서 취소 누르면 되돌아감 */}
//                   <button
//                     onClick={() => {
//                       setConPostEdit(false)
//                     }}
//                   >
//                     취소
//                   </button>
//                   <button onClick={() => {}}>삭제</button>
//                 </>
//               ) : (
//                 <button
//                   onClick={() => {
//                     setConPostEdit(true)
//                   }}
//                 >
//                   수정
//                 </button>
//               )}
//             </St.ConPost>
//             별점 {'⭐'.repeat(addressData?.rating - 1)}
//             {addressDataSelcted?.content ||
//               clickedLocation?.content ||
//               '리뷰없음'}
//             {/* <St.ContentImgBox>
//               <St.ContentImg
//                 src={process.env.PUBLIC_URL + '/asset/img/detaill/1.jpg'}
//                 alt=""
//               />
//               <St.ContentImg
//                 src={process.env.PUBLIC_URL + '/asset/img/detaill/2.jpg'}
//                 alt=""
//               />
//               <St.ContentImg
//                 src={process.env.PUBLIC_URL + '/asset/img/detaill/3.jpg'}
//                 alt=""
//               />
//               <St.ContentImg
//                 src={process.env.PUBLIC_URL + '/asset/img/detaill/4.jpg'}
//                 alt=""
//               />
//               <St.ContentImg
//                 src={process.env.PUBLIC_URL + '/asset/img/detaill/4.jpg'}
//                 alt=""
//               />
//               <St.ContentImg
//                 src={process.env.PUBLIC_URL + '/asset/img/detaill/4.jpg'}
//                 alt=""
//               />
//             </St.ContentImgBox> */}
//           </St.ContentList>
//           <St.ContentList>
//             {/* 리뷰 갯수  */}
//             <p>
//               전체{' '}
//               <span style={{ color: 'blue' }}>{filteredComments.length}</span>
//             </p>
//           </St.ContentList>
//           <St.ContentList></St.ContentList>
//         </St.ContentDiv>
//         <St.ContentListReviewComment>
//           {/* 댓글 */}
//           {/* 필터로 게시글아이디와 파람스아이디와 같은지 비교 */}
//           {/* 맞는애들만 맵으로 하나씩 꺼내옴  */}
//           {posts
//             .filter((comment) => {
//               return comment.contentId === paramsId
//             })
//             .map((comment, index) => {
//               return (
//                 <>
//                   <St.ContentCommentList key={comment.id}>
//                     <img
//                       src={
//                         user.photoURL
//                           ? user.photoURL
//                           : process.env.PUBLIC_URL +
//                             '/asset/img/detaill/ico/프로필.png'
//                       }
//                       alt=""
//                     />
//                     <St.FlexDiv1>
//                       <St.ContentList2 style={{ paddingBottom: '2px' }}>
//                         {'⭐'.repeat(comment.rating)}
//                       </St.ContentList2>
//                       <St.ContentList2>
//                         {comment.title} {comment.timestamp}
//                       </St.ContentList2>
//                       {selectedCommentId === comment.id ? (
//                         <St.Input
//                           ref={inputRef}
//                           type="text"
//                           defaultValue={comment.content}
//                           onBlur={(e) =>
//                             handleUpdate({ content: e.target.value })
//                           }
//                         />
//                       ) : (
//                         <St.ContentList2>{comment.content}</St.ContentList2>
//                       )}
//                     </St.FlexDiv1>
//                     {user.uid === comment.uid && (
//                       <div
//                         style={{
//                           flexGrow: '5',
//                           textAlign: 'right',
//                           paddingRight: '30px',
//                         }}
//                       >
//                         {selectedCommentId === comment.id ? (
//                           <>
//                             {/* 수정버튼 */}
//                             <button
//                               onClick={() => {
//                                 const updataedData = {
//                                   content: inputRef.current.value,
//                                 }
//                                 handleUpdate(comment.id, updataedData)
//                               }}
//                             >
//                               수정완료
//                             </button>
//                             {/* 수정 상태에서 취소 누르면 되돌아감 */}
//                             <button
//                               onClick={() => {
//                                 handleCancel(originalContent)
//                               }}
//                             >
//                               취소
//                             </button>
//                             <button
//                               onClick={() => {
//                                 const updataedData = {
//                                   content: inputRef.current.value,
//                                 }
//                                 selectComment(comment.id)
//                                 handleDelete(comment.id, updataedData)
//                               }}
//                             >
//                               삭제
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                             <button
//                               onClick={() => {
//                                 selectComment(comment.id)
//                               }}
//                             >
//                               수정
//                             </button>
//                           </>
//                         )}
//                       </div>
//                     )}
//                   </St.ContentCommentList>
//                 </>
//               )
//             })}
//         </St.ContentListReviewComment>
//       </St.BottomDiv>
//     </St.Container>
//   )
// }

// export default DetailComponent
