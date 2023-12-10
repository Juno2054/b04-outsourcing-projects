import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from "../API/firebase/firebase.API";


function Detail() {
    const location = useLocation();
    const [editedTitle, setEditedTitle] = useState("");
    const [editedContent, setEditedContent] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const user = useSelector((state) => state.loginSlice);
    const navigate = useNavigate()
    console.log(user.uid)

    const handleDelete = async () => {
        try {
          if (location.state) {
            const postId = location.state.id;
            const confirmation = window.confirm('정말 이대로 변경 사항을 저장하시겠습니까?');
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

  const handleUpdate = async () => {
    try {
      const postId = location.state.id;
      const docRef = doc(db, "posts", postId);
      const confirmation = window.confirm("게시물을 업데이트하시겠습니까?");
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

  return (
    <div>
      <h2>Detail</h2>
      {location.state ? (
        <div>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <button onClick={handleUpdate}>Update</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <div>
              <h3>Received Data:</h3>
              <p>Title: {location.state.title}</p>
              <p>Content: {location.state.content}</p>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete Post</button>
            </div>
          )}
        </div>
      ) : (
        <p>No data received</p>
      )}
    </div>
  );
}

export default Detail;