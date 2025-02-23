import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddRecipe.css";

export default function AddRecipe() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  // 이미지 파일과 미리보기 URL 상태 추가
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // FileReader를 이용하여 이미지 미리보기 URL 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !ingredients || !steps) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }
    // 파일 업로드 처리는 실제 구현 시 FormData와 백엔드 API 연동으로 구현할 수 있습니다.
    // 예: const formData = new FormData();
    // formData.append('title', title);
    // formData.append('ingredients', ingredients);
    // formData.append('steps', steps);
    // formData.append('image', imageFile);
    alert("레시피가 등록되었습니다!");
    navigate("/");
  };

  return (
    <div className="add-recipe-container">
      <h2>레시피 등록</h2>
      <form onSubmit={handleSubmit} className="add-recipe-form">
        <div className="form-group">
          <label>레시피 제목</label>
          <input
            type="text"
            placeholder="레시피 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>재료</label>
          <textarea
            placeholder="사용된 재료들을 입력하세요 (쉼표로 구분)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>만드는 방법</label>
          <textarea
            placeholder="레시피 상세 방법을 입력하세요"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>이미지 업로드</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <img src={imagePreview} alt="미리보기" className="image-preview" />
          )}
        </div>
        <div className="form-actions">
          <button type="submit">등록</button>
          <button type="button" onClick={() => navigate(-1)}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
}