import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import "./Main.css";

const dummyRecipes = [
  {
    id: 1,
    title: "두부 국",
    ingredients: "두부, 국물, 소금",
    category: "국",
    image: "https://via.placeholder.com/300?text=두부+국"
  },
  {
    id: 2,
    title: "두부 찜",
    ingredients: "두부, 고추장, 설탕",
    category: "찜",
    image: "https://via.placeholder.com/300?text=두부+찜"
  },
  {
    id: 3,
    title: "두부 반찬",
    ingredients: "두부, 간장, 마늘",
    category: "반찬",
    image: "https://via.placeholder.com/300?text=두부+반찬"
  },
  {
    id: 4,
    title: "두부 메인 요리",
    ingredients: "두부, 야채, 고추",
    category: "메인 요리",
    image: "https://via.placeholder.com/300?text=두부+메인+요리"
  }
];

export default function Main() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("재료");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    let filtered = [];
    if (filter === "재료") {
      filtered = dummyRecipes.filter((recipe) =>
        recipe.ingredients.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      filtered = dummyRecipes.filter(
        (recipe) =>
          recipe.category === filter &&
          recipe.ingredients.toLowerCase().includes(query.toLowerCase())
      );
    }
    setResults(filtered);
  };

  return (
    <div className="main-container">
      {/* 검색 바 */}
      <form className="search-bar" onSubmit={handleSearch}>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="재료">재료</option>
          <option value="국">국</option>
          <option value="반찬">반찬</option>
          <option value="찜">찜</option>
          <option value="메인 요리">메인 요리</option>
        </select>
        <input
          type="text"
          placeholder="레시피를 검색하세요"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">
          <CiSearch size={24} />
        </button>
      </form>

      {/* 검색 결과 또는 인기 레시피 */}
      {query ? (
        results.length > 0 ? (
          <div className="recipes-results">
            {results.map((recipe) => (
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
          <p className="no-results">검색 결과가 없습니다.</p>
        )
      ) : (
        <>
          <h2 className="popular-title">인기 레시피</h2>
          <div className="popular-recipes">
            {dummyRecipes.slice(0, 3).map((recipe) => (
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
        </>
      )}
    </div>
  );
}