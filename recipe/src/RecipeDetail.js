import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./RecipeDetail.css";

// 더미 데이터 (실제 구현 시 API 연동 예정)
const dummyRecipes = [
  {
    id: "1",
    title: "두부 국",
    ingredients: "두부, 국물, 소금",
    steps:
      "1. 두부를 깍둑썰기 합니다.\n2. 국물 재료를 준비합니다.\n3. 모든 재료를 넣고 끓입니다.",
    image: "https://via.placeholder.com/600x400?text=두부+국",
    views: 123,
    likes: 10
  },
  {
    id: "2",
    title: "두부 찜",
    ingredients: "두부, 고추장, 설탕, 참기름",
    steps:
      "1. 두부를 준비합니다.\n2. 양념장을 만듭니다.\n3. 두부 위에 양념장을 얹고 찝니다.",
    image: "https://via.placeholder.com/600x400?text=두부+찜",
    views: 45,
    likes: 5
  }
];

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const recipeData = dummyRecipes.find((r) => r.id === id);
  const [recipe, setRecipe] = useState(recipeData || null);
  const [views, setViews] = useState(recipe ? recipe.views : 0);
  const [likes, setLikes] = useState(recipe ? recipe.likes : 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // 페이지 로드시 조회수 증가 (더미 구현)
  useEffect(() => {
    if (recipe) {
      setViews((prev) => prev + 1);
      // 실제 구현 시 백엔드에 조회수 증가 API 호출
    }
  }, [recipe]);

  const toggleLike = () => {
    if (isLiked) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
    // 실제 구현 시 백엔드에 좋아요 업데이트 API 호출
  };

  const toggleSave = () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      // 현재 경로를 state에 담아 로그인 후 다시 돌아올 수 있게 함
      navigate("/login", { state: { redirectBack: window.location.pathname } });
      return;
    }
    setIsSaved(!isSaved);
    // 실제 구현 시 백엔드에 저장 상태 업데이트 API 호출
  };

  const handleShare = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => alert("게시글 URL이 복사되었습니다."))
      .catch(() => alert("URL 복사에 실패했습니다."));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/login", { state: { redirectBack: window.location.pathname } });
      return;
    }
    if (newComment.trim()) {
      setComments([...comments, newComment.trim()]);
      setNewComment("");
      // 실제 구현 시 백엔드에 댓글 추가 API 호출
    }
  };

  return (
    <div className="recipe-detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        뒤로가기
      </button>
      {recipe ? (
        <>
          <div className="recipe-main">
            <div className="recipe-left">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="recipe-image"
              />
              <div className="recipe-ingredients">
                <h2>재료</h2>
                <p>{recipe.ingredients}</p>
              </div>
            </div>
            <div className="recipe-center">
              <h1 className="recipe-title">{recipe.title}</h1>
              <div className="recipe-steps">
                <pre>{recipe.steps}</pre>
              </div>
            </div>
          </div>
          <div className="recipe-stats">
            <span>조회수: {views}</span>
            <span
              onClick={toggleLike}
              className={`stat-btn ${isLiked ? "active" : ""}`}
            >
              좋아요: {likes}
            </span>
            <span
              onClick={toggleSave}
              className={`stat-btn ${isSaved ? "active" : ""}`}
            >
              {isSaved ? "저장됨" : "저장"}
            </span>
            <span onClick={handleShare} className="stat-btn">
              공유
            </span>
          </div>
          <div className="comments-section">
            <h2>댓글</h2>
            <form onSubmit={handleAddComment} className="comment-form">
              <textarea
                placeholder="댓글을 입력하세요"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              ></textarea>
              <button type="submit" className="comment-btn">
                등록
              </button>
            </form>
            <div className="comments-list">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="comment-item">
                    {comment}
                  </div>
                ))
              ) : (
                <p>댓글이 없습니다.</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="error-message">해당 레시피를 찾을 수 없습니다.</p>
          <button className="back-btn" onClick={() => navigate(-1)}>
            뒤로가기
          </button>
        </>
      )}
    </div>
  );
}