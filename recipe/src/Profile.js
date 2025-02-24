import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import "./Profile.css";

export default function Profile() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // 기존 dummy 데이터
  const dummyUser = {
    name: "홍길동",
    email: "hong@example.com",
    phone: "01012345678",
    profilePic: "https://via.placeholder.com/150?text=Profile"
  };

  const currentUser = user || dummyUser;

  // 프로필 수정 관련 상태
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(currentUser.name);
  const [editedEmail, setEditedEmail] = useState(currentUser.email);
  const [editedPhone, setEditedPhone] = useState(currentUser.phone);
  // 각 항목의 개별 편집 모드
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPhone, setEditPhone] = useState(false);

  // 더미 데이터: 스크랩, 등록 레시피 (이전과 동일)
  const dummyScrapedRecipes = [
    { id: "1", title: "두부 국", image: "https://via.placeholder.com/300?text=두부+국" },
    { id: "2", title: "두부 찜", image: "https://via.placeholder.com/300?text=두부+찜" }
  ];
  const dummyAddedRecipes = [
    { id: "3", title: "두부 반찬", image: "https://via.placeholder.com/300?text=두부+반찬" },
    { id: "4", title: "두부 메인 요리", image: "https://via.placeholder.com/300?text=두부+메인+요리" }
  ];

  const [scrapedRecipes, setScrapedRecipes] = useState([]);
  const [addedRecipes, setAddedRecipes] = useState([]);

  useEffect(() => {
    setScrapedRecipes(dummyScrapedRecipes);
    setAddedRecipes(dummyAddedRecipes);
  }, []);

  const toggleEditing = () => {
    // 수정 모드를 토글하면서 개별 편집 모드도 초기화
    setIsEditing(!isEditing);
    setEditName(false);
    setEditEmail(false);
    setEditPhone(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <img
          src={currentUser.profilePic}
          alt="프로필"
          className="profile-pic"
        />
        <div className="profile-info">
          <p>
            <strong>이름:</strong>{" "}
            {isEditing && editName ? (
              <input
                className="inline-input"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onBlur={() => setEditName(false)}
                autoFocus
              />
            ) : (
              <>
                <span>{editedName}</span>
                {isEditing && (
                  <button
                    className="edit-icon-btn"
                    onClick={() => setEditName(true)}
                  >
                    <HiOutlinePencilSquare size={18} />
                  </button>
                )}
              </>
            )}
          </p>
          <p>
            <strong>이메일:</strong>{" "}
            {isEditing && editEmail ? (
              <input
                className="inline-input"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                onBlur={() => setEditEmail(false)}
                autoFocus
              />
            ) : (
              <>
                <span>{editedEmail}</span>
                {isEditing && (
                  <button
                    className="edit-icon-btn"
                    onClick={() => setEditEmail(true)}
                  >
                    <HiOutlinePencilSquare size={18} />
                  </button>
                )}
              </>
            )}
          </p>
          <p>
            <strong>전화번호:</strong>{" "}
            {isEditing && editPhone ? (
              <input
                className="inline-input"
                value={editedPhone}
                onChange={(e) => setEditedPhone(e.target.value)}
                onBlur={() => setEditPhone(false)}
                autoFocus
              />
            ) : (
              <>
                <span>{editedPhone}</span>
                {isEditing && (
                  <button
                    className="edit-icon-btn"
                    onClick={() => setEditPhone(true)}
                  >
                    <HiOutlinePencilSquare size={18} />
                  </button>
                )}
              </>
            )}
          </p>
        </div>
        <button className="edit-btn" onClick={toggleEditing}>
          {isEditing ? "프로필 저장" : "프로필 수정"}
        </button>
      </div>
      <div className="profile-main">
        <div className="recipes-section">
          <h2>내가 스크랩한 레시피</h2>
          {scrapedRecipes.length > 0 ? (
            <div className="recipes-grid">
              {scrapedRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="recipe-card"
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                >
                  <img src={recipe.image} alt={recipe.title} />
                  <h3>{recipe.title}</h3>
                </div>
              ))}
            </div>
          ) : (
            <p>스크랩한 레시피가 없습니다.</p>
          )}
        </div>
        <div className="recipes-section">
          <h2>내가 등록한 레시피</h2>
          {addedRecipes.length > 0 ? (
            <div className="recipes-grid">
              {addedRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="recipe-card"
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                >
                  <img src={recipe.image} alt={recipe.title} />
                  <h3>{recipe.title}</h3>
                </div>
              ))}
            </div>
          ) : (
            <p>등록한 레시피가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}