import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiBowlFood } from "react-icons/pi";
import { LuBeef } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import "./Main.css";

// 기존 dummyRecipes 그대로 사용
const dummyRecipes = [
  {
    id: 1,
    title: "두부 국",
    ingredients: "두부, 국물, 소금",
    category: "국",
    //image: "https://via.placeholder.com/300?text=두부+국"
  },
  {
    id: 2,
    title: "두부 찜",
    ingredients: "두부, 고추장, 설탕",
    category: "찜",
    //image: "https://via.placeholder.com/300?text=두부+찜"
  },
  {
    id: 3,
    title: "두부 반찬",
    ingredients: "두부, 간장, 마늘",
    category: "반찬",
    //image: "https://via.placeholder.com/300?text=두부+반찬"
  },
  {
    id: 4,
    title: "두부 메인 요리",
    ingredients: "두부, 야채, 고추",
    category: "메인 요리",
    //image: "https://via.placeholder.com/300?text=두부+메인+요리"
  }
];

// 커스텀 셀렉트 컴포넌트 (검색 옵션용)
function CustomSelect({ options, placeholder, value, onChange }) {
  const [open, setOpen] = useState(false);

  const toggleOpen = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div className="custom-select-container" onClick={toggleOpen}>
      <div className="custom-select-display">
        {value ? (
          <>
            {value === "음식명으로 검색" ? (
              <PiBowlFood size={18} className="option-icon" />
            ) : value === "재료로 검색" ? (
              <LuBeef size={18} className="option-icon" />
            ) : null}
            <span>{value}</span>
          </>
        ) : (
          <span className="placeholder">{placeholder}</span>
        )}
      </div>
      {open && (
        <div className="custom-select-dropdown">
          {options.map((option, idx) => (
            <div
              key={idx}
              className="custom-select-option"
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(option);
              }}
            >
              {option === "음식명으로 검색" ? (
                <PiBowlFood size={18} className="option-icon" />
              ) : option === "재료로 검색" ? (
                <LuBeef size={18} className="option-icon" />
              ) : null}
              <span>{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Main() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // 검색 옵션 상태: 초기값은 빈 문자열("전체 검색"으로 처리)
  const [searchOption, setSearchOption] = useState("");
  // 검색 필터 상태
  const [searchFilter, setSearchFilter] = useState("");

  const filterOptions = ["찜", "조림", "볶음", "구이", "탕"];

  const handleSearch = (e) => {
    e.preventDefault();
    let results = [];
    if (query.trim() === "") {
      results = dummyRecipes;
    } else if (searchOption === "음식명으로 검색") {
      results = dummyRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(query.toLowerCase())
      );
    } else if (searchOption === "재료로 검색") {
      results = dummyRecipes.filter((recipe) => {
        const matchIngredient = recipe.ingredients.toLowerCase().includes(query.toLowerCase());
        if (searchFilter) {
          return matchIngredient && recipe.category === searchFilter;
        }
        return matchIngredient;
      });
    } else {
      // 전체 검색: 옵션 미선택 시
      results = dummyRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.ingredients.toLowerCase().includes(query.toLowerCase())
      );
    }
    console.log("검색 결과:", results);
  };

  return (
    <div className="main-container">
      {/* 검색 옵션 및 필터 영역 */}
      <div className="search-filters">
        <div className="filter-group">
          <CustomSelect
            options={["음식명으로 검색", "재료로 검색"]}
            placeholder="검색 옵션을 선택하세요"
            value={searchOption}
            onChange={setSearchOption}
          />
        </div>
        <div className="filter-group">
          <select
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            disabled={searchOption !== "재료로 검색"}
          >
            <option value="">검색 필터를 선택하세요</option>
            {searchOption === "재료로 검색" &&
              filterOptions.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
          </select>
        </div>
      </div>
      {/* 검색 폼: 입력창 내부에 검색 버튼 포함 */}
      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-input-container">
          <input
            type="text"
            placeholder="레시피를 검색하세요"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            <CiSearch size={24} />
          </button>
        </div>
      </form>
      {/* 결과 또는 인기 레시피 영역 */}
      {query ? (
        <div className="recipes-results">
          {dummyRecipes
            .filter((recipe) => {
              if (searchOption === "음식명으로 검색") {
                return recipe.title.toLowerCase().includes(query.toLowerCase());
              } else if (searchOption === "재료로 검색") {
                const matchIngredient = recipe.ingredients.toLowerCase().includes(query.toLowerCase());
                if (searchFilter) {
                  return matchIngredient && recipe.category === searchFilter;
                }
                return matchIngredient;
              }
              return (
                recipe.title.toLowerCase().includes(query.toLowerCase()) ||
                recipe.ingredients.toLowerCase().includes(query.toLowerCase())
              );
            })
            .map((recipe) => (
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