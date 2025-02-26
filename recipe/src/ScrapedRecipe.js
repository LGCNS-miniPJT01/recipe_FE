import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./ScrapedRecipe.css";
import API_URL from "./config";

export default function ScrapedRecipe() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [scrapedRecipes, setScrapedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setLoading(true);
      // 1. ScrapController의 GET API 호출: 스크랩한 레시피 ID 목록을 가져옴
      fetch(`${API_URL}/api/scrap/${user.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("스크랩한 레시피를 불러오지 못했습니다.");
          }
          return response.json();
        })
        .then((recipeIds) => {
          // recipeIds가 빈 배열이면 바로 상태 업데이트
          if (recipeIds.length === 0) {
            setScrapedRecipes([]);
            setLoading(false);
          } else {
            // 2. 각 레시피 ID에 대해, 레시피 상세 정보를 가져오는 API 호출
            Promise.all(
              recipeIds.map((recipeId) =>
                fetch(`${API_URL}/api/recipes/${recipeId}?userId=${user.id}`)
                  .then((res) => {
                    if (!res.ok) {
                      throw new Error("레시피를 불러오지 못했습니다.");
                    }
                    return res.json();
                  })
              )
            )
              .then((recipeDetailsArray) => {
                // 실제 반환되는 데이터 구조에 맞게 필드를 조정(예: RCP_SEQ, RCP_NM, MANUAL_IMG01)
                setScrapedRecipes(recipeDetailsArray);
                setLoading(false);
              })
              .catch((err) => {
                console.error("레시피 상세 정보 불러오기 에러:", err);
                setError("레시피를 불러오지 못했습니다.");
                setLoading(false);
              });
          }
        })
        .catch((err) => {
          console.error("스크랩한 레시피 불러오기 에러:", err);
          setError("스크랩한 레시피를 불러오지 못했습니다.");
          setLoading(false);
        });
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
              key={recipe.RCP_SEQ}  // 고유 식별자는 RCP_SEQ 사용
              className="recipe-card"
              onClick={() => navigate(`/recipe/${recipe.RCP_SEQ}`)}
            >
              <img
                src={recipe.MANUAL_IMG01 || "https://via.placeholder.com/300"}
                alt={recipe.RCP_NM}
              />
              <h3>{recipe.RCP_NM}</h3>
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