import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DeleteRecipe.css";

export default function DeleteRecipe() {
    const navigate = useNavigate();

    // 더미 데이터: 실제로는 백엔드 API를 통해 모든 레시피 데이터를 받아옴
    const initialRecipes = [
        { id: "1", title: "두부 국" },
        { id: "2", title: "두부 찜" },
        { id: "3", title: "두부 반찬" },
        { id: "4", title: "두부 메인 요리" }
    ];

    const [recipes, setRecipes] = useState(initialRecipes);
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);

    const toggleSelectMode = () => {
        // 토글할 때 선택된 항목 초기화
        setIsSelecting(!isSelecting);
        setSelectedIds([]);
    };

    const handleCheckboxChange = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((item) => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleDeleteSelected = () => {
        if (selectedIds.length === 0) return;
        const confirmDelete = window.confirm("선택하신 레시피를 삭제하시겠습니까까?");
        if (confirmDelete) {
            setRecipes(recipes.filter((recipe) => !selectedIds.includes(recipe.id)));
            // 선택 모드 종료 후 초기화
            setIsSelecting(false);
            setSelectedIds([]);
        }
    };

    return (
        <div className="delete-recipe-container">
            <header className="delete-header">
                <h2>레시피 삭제</h2>
                <button
                    className="select-btn"
                    onClick={() => {
                        if (isSelecting) {
                            handleDeleteSelected();
                        } else {
                            toggleSelectMode();
                        }
                    }}
                >
                    {isSelecting ? "선택 삭제" : "레시피 선택"}
                </button>
            </header>
            <div className="recipe-list">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="recipe-item">
                        {isSelecting && (
                            <input
                                type="checkbox"
                                className="recipe-checkbox"
                                checked={selectedIds.includes(recipe.id)}
                                onChange={() => handleCheckboxChange(recipe.id)}
                            />
                        )}
                        <span className="recipe-title">{recipe.title}</span>
                    </div>
                ))}
            </div>
            <button className="back-btn" onClick={() => navigate(-1)}>
                뒤로가기
            </button>
        </div>
    );
}