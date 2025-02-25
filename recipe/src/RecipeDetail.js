import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./RecipeDetail.css";
import { MdOutlineRemoveRedEye, MdOutlineFileUpload } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";

// 더미 데이터 (실제 구현 시 API 연동 예정)
const dummyRecipes = [
  {
    id: "1",
    title: "두부 국",
    ingredients: "두부, 국물, 소금",
    steps: [
      { text: "두부를 깍둑썰기 합니다.", image: "https://img-cf.kurly.com/hdims/resize/%3E720x/quality/90/src/shop/data/goodsview/20240720/gv20000944450_1.jpg" },
      { text: "국물 재료를 준비합니다.", image: "https://img-cf.kurly.com/hdims/resize/%3E720x/quality/90/src/shop/data/goodsview/20240720/gv20000944450_1.jpg" },
      { text: "모든 재료를 넣고 끓입니다.", image: "https://img-cf.kurly.com/hdims/resize/%3E720x/quality/90/src/shop/data/goodsview/20240720/gv20000944450_1.jpg" }
    ],
    image: "https://recipe1.ezmember.co.kr/cache/recipe/2016/07/02/cda9c3ad6198f4feddcfbfb0c28f2bc51.jpg",
    views: 123,
    likes: 10
  },
  {
    id: "2",
    title: "두부 찜",
    ingredients: "두부, 고추장, 설탕, 참기름",
    steps: [
      { text: "두부를 준비합니다.", image: "https://via.placeholder.com/600x400?text=Step+1" },
      { text: "양념장을 만듭니다.", image: "https://via.placeholder.com/600x400?text=Step+2" },
      { text: "두부 위에 양념장을 얹고 찝니다.", image: "https://via.placeholder.com/600x400?text=Step+3" }
    ],
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

  // 플래그: 조회수를 한 번만 증가시키기 위해 사용
  const [viewCountIncremented, setViewCountIncremented] = useState(false);

  // 댓글 추가 후 자동 스크롤을 위한 ref
  const commentsEndRef = useRef(null);

  // 페이지 로드시 recipe가 로드되면 한 번만 조회수 증가
  useEffect(() => {
    if (recipe && !viewCountIncremented) {
      setViews((prev) => prev + 1);
      setViewCountIncremented(true);
      // 실제 구현 시 백엔드 조회수 증가 API 호출
    }
  }, [recipe, viewCountIncremented]);

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
      // 댓글 추가 후, 댓글 목록 끝으로 스크롤 이동
      setTimeout(() => {
        commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
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
        <div className="recipe-title-container">
              <h1 className="recipe-title">{recipe.title}</h1>
            </div>
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
            
            <div className="recipe-steps">
              {Array.isArray(recipe.steps)
                ? recipe.steps.map((step, index) => (
                    <div key={index} className="recipe-step">
                      <div className="recipe-step-number">Step {index + 1}</div>
                      <p>{step.text}</p>
                      {step.image && (
                        <img
                          src={step.image}
                          alt={`Step ${index + 1}`}
                          className="step-image"
                        />
                      )}
                    </div>
                  ))
                : recipe.steps.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
            </div>

            </div>
          </div>
          <div className="recipe-stats">
            <span className="stat-btn">
              <MdOutlineRemoveRedEye size={20} /> {views}
            </span>
            <span
              onClick={toggleLike}
              className={`stat-btn ${isLiked ? "active" : ""}`}
            >
              <BiLike size={20} /> {likes}
            </span>
            <span
              onClick={toggleSave}
              className={`stat-btn ${isSaved ? "active" : ""}`}
            >
              <FaRegStar size={20} />
            </span>
            <span onClick={handleShare} className="stat-btn">
              <MdOutlineFileUpload size={20} />
            </span>
          </div>
          <div className="comments-section">
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
              <div ref={commentsEndRef} />
            </div>
            <form onSubmit={handleAddComment} className="comment-form">
              <div className="comment-header">
                <span className="comment-title">댓글</span>
                <button type="submit" className="comment-btn">
                  등록
                </button>
              </div>
              <textarea
                placeholder="댓글을 입력하세요"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              ></textarea>
            </form>
            
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
