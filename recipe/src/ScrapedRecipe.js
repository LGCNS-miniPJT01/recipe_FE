import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./ScrapedRecipe.css";

export default function ScrapedRecipe() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // 실제 구현 시 백엔드 API를 통해 사용자별 스크랩 레시피 데이터를 가져와야 합니다.
  // 여기서는 더미 데이터를 사용합니다.
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

  useEffect(() => {
    if (user) {
      // 실제로는 user.id 등의 정보를 이용해 API 호출을 수행합니다.
      setScrapedRecipes(dummyScrapedRecipes);
    }
  }, [user]);

  return (
    <div className="scraped-recipe-container">
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
  );
}