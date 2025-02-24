import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./ScrapedRecipe.css";

export default function ScrapedRecipe() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const dummyScrapedRecipes = [
    {
      id: "1",
      title: "두부 국",
      image: "https://via.placeholder.com/300?text=두부+국"
    },
    {
      id: "2",
      title: "두부 찜",
      image: "https://via.placeholder.com/300?text=두부+찜"
    },
    {
      id: "3",
      title: "두부 반찬",
      image: "https://via.placeholder.com/300?text=두부+반찬"
    }
  ];

  const [scrapedRecipes, setScrapedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setLoading(true);
      // 실제 구현 시 API 호출 (여기서는 1초 후 dummy 데이터를 설정)
      setTimeout(() => {
        try {
          // API 호출 성공 시:
          setScrapedRecipes(dummyScrapedRecipes);
          setLoading(false);
        } catch (err) {
          setError("데이터를 불러오지 못했습니다.");
          setLoading(false);
        }
      }, 1000);
    } else {
      setScrapedRecipes([]);
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="scraped-recipe-container">
      <h2>내가 스크랩한 레시피</h2>
      {loading ? (
        <p className="loading-message">데이터를 불러오는 중입니다...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : scrapedRecipes.length > 0 ? (
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
        <div className="empty-message">
          <p>스크랩한 레시피가 없습니다.</p>
          <button className="find-recipes-btn" onClick={() => navigate("/")}>
            레시피를 찾아보세요
          </button>
        </div>
      )}
    </div>
  );
}