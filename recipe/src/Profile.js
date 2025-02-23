import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // 백엔드 연동 전 임시 dummy 데이터
  const dummyUser = {
    name: "홍길동",
    email: "hong@example.com",
    phone: "01012345678",
    profilePic: "https://via.placeholder.com/150?text=Profile"
  };

  const currentUser = user || dummyUser;

  // 더미 데이터: 실제로는 백엔드 API를 통해 받아올 데이터
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
    // 실제 구현 시 사용자 ID 등을 이용해 API 호출
    setScrapedRecipes(dummyScrapedRecipes);
    setAddedRecipes(dummyAddedRecipes);
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <img
          src={currentUser.profilePic}
          alt="프로필"
          className="profile-pic"
        />
        <div className="profile-info">
          <p><strong>이름:</strong> {currentUser.name}</p>
          <p><strong>이메일:</strong> {currentUser.email}</p>
          <p><strong>전화번호:</strong> {currentUser.phone}</p>
        </div>
        <button
          className="edit-btn"
          onClick={() => navigate("/editProfile")}
        >
          프로필 수정
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