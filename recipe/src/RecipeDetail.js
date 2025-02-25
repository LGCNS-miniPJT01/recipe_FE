import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./RecipeDetail.css";
import { MdOutlineRemoveRedEye, MdOutlineFileUpload } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";

// 더미 데이터 (owner 속성 추가)
const dummyRecipes = [
  {
    id: "1",
    title: "두부 국",
    calorie: "200kcal",
    ingredients: "두부, 국물, 소금",
    steps: [
      { text: "두부를 깍둑썰기 합니다.", image: "https://via.placeholder.com/600x400?text=Step+1" },
      { text: "국물 재료를 준비합니다.", image: "https://via.placeholder.com/600x400?text=Step+2" },
      { text: "모든 재료를 넣고 끓입니다.", image: "https://via.placeholder.com/600x400?text=Step+3" }
    ],
    image: "https://via.placeholder.com/600x400?text=두부+국",
    views: 123,
    likes: 10,
    owner: "hong@example.com"
  },
  {
    id: "2",
    title: "두부 찜",
    calorie: "150kcal",
    ingredients: "두부, 고추장, 설탕, 참기름",
    steps: [
      { text: "두부를 준비합니다.", image: "https://via.placeholder.com/600x400?text=Step+1" },
      { text: "양념장을 만듭니다.", image: "https://via.placeholder.com/600x400?text=Step+2" },
      { text: "두부 위에 양념장을 얹고 찝니다.", image: "https://via.placeholder.com/600x400?text=Step+3" }
    ],
    image: "https://via.placeholder.com/600x400?text=두부+찜",
    views: 45,
    likes: 5,
    owner: "other@example.com"
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

  // 플래그: 조회수 한 번 증가
  const [viewCountIncremented, setViewCountIncremented] = useState(false);
  const commentsEndRef = useRef(null);

  // 모달 관련 state
  const [showRecipeDeleteModal, setShowRecipeDeleteModal] = useState(false);
  const [showRecipeReportModal, setShowRecipeReportModal] = useState(false);
  const [recipeReportTitle, setRecipeReportTitle] = useState("");
  const [recipeReportReason, setRecipeReportReason] = useState("");

  const [showCommentDeleteModal, setShowCommentDeleteModal] = useState(false);
  const [commentToDeleteIndex, setCommentToDeleteIndex] = useState(null);
  const [showCommentReportModal, setShowCommentReportModal] = useState(false);
  const [commentReportText, setCommentReportText] = useState("");
  const [commentReportIndex, setCommentReportIndex] = useState(null);

  useEffect(() => {
    if (recipe && !viewCountIncremented) {
      setViews((prev) => prev + 1);
      setViewCountIncremented(true);
      // 백엔드 조회수 증가 API 호출
    }
  }, [recipe, viewCountIncremented]);

  const toggleLike = () => {
    if (isLiked) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const toggleSave = () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/login", { state: { redirectBack: window.location.pathname } });
      return;
    }
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => alert("게시글 URL이 복사되었습니다."))
      .catch(() => alert("URL 복사에 실패했습니다."));
  };

  // 레시피 삭제: 모달 열기
  const openRecipeDeleteModal = () => {
    setShowRecipeDeleteModal(true);
  };

  const handleRecipeDeleteConfirm = () => {
    setShowRecipeDeleteModal(false);
    alert("삭제되었습니다.");
    // 실제 삭제 API 호출 후 navigate
    navigate(-1);
  };

  // 레시피 신고: 모달 열기
  const openRecipeReportModal = () => {
    setShowRecipeReportModal(true);
  };

  const handleRecipeReportSubmit = () => {
    if (!recipeReportTitle || !recipeReportReason) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    setShowRecipeReportModal(false);
    alert("신고가 완료되었습니다.");
    // 실제 신고 API 호출
    setRecipeReportTitle("");
    setRecipeReportReason("");
  };

  // 댓글 삭제: 모달 열기
  const openCommentDeleteModal = (index) => {
    setCommentToDeleteIndex(index);
    setShowCommentDeleteModal(true);
  };

  const handleCommentDeleteConfirm = () => {
    setComments(comments.filter((_, idx) => idx !== commentToDeleteIndex));
    setShowCommentDeleteModal(false);
    alert("삭제되었습니다.");
  };

  // 댓글 신고: 모달 열기
  const openCommentReportModal = (index) => {
    setCommentReportIndex(index);
    setShowCommentReportModal(true);
  };

  const handleCommentReportSubmit = () => {
    if (!commentReportText) {
      alert("신고 내용을 입력해주세요.");
      return;
    }
    setShowCommentReportModal(false);
    alert("신고가 완료되었습니다.");
    setCommentReportText("");
  };

  // 댓글 추가
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/login", { state: { redirectBack: window.location.pathname } });
      return;
    }
    if (newComment.trim()) {
      const commentObj = { text: newComment.trim(), author: user.email };
      setComments([...comments, commentObj]);
      setNewComment("");
      setTimeout(() => {
        commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
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
              <img src={recipe.image} alt={recipe.title} className="recipe-image" />
              {recipe.calorie && (
                <div className="recipe-calorie">
                  열량: {recipe.calorie}
                </div>
              )}
              <div className="recipe-ingredients">
                <h2>재료</h2>
                <p>{recipe.ingredients}</p>
              </div>
            </div>
            <div className="recipe-center">
              <div className="recipe-header">
                <h1 className="recipe-title">{recipe.title}</h1>
                {user && user.email === recipe.owner ? (
                  <button className="report-delete-btn" onClick={openRecipeDeleteModal}>
                    삭제
                  </button>
                ) : (
                  <button className="report-delete-btn" onClick={openRecipeReportModal}>
                    신고
                  </button>
                )}
              </div>
              <div className="recipe-steps">
                {Array.isArray(recipe.steps)
                  ? recipe.steps.map((step, index) => (
                    <div key={index} className="recipe-step">
                      <p>{step.text}</p>
                      {step.image && (
                        <img src={step.image} alt={`Step ${index + 1}`} className="step-image" />
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
            <span onClick={toggleLike} className={`stat-btn ${isLiked ? "active" : ""}`}>
              <BiLike size={20} /> {likes}
            </span>
            <span onClick={toggleSave} className={`stat-btn ${isSaved ? "active" : ""}`}>
              <FaRegStar size={20} />
            </span>
            <span onClick={handleShare} className="stat-btn">
              <MdOutlineFileUpload size={20} />
            </span>
          </div>
          <div className="comments-section">
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
            <div className="comments-list">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="comment-item">
                    <span>{comment.text}</span>
                    {user && comment.author === user.email ? (
                      <button className="comment-action-btn" onClick={() => openCommentDeleteModal(index)}>
                        삭제
                      </button>
                    ) : (
                      <button className="comment-action-btn" onClick={() => openCommentReportModal(index)}>
                        신고
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p>댓글이 없습니다.</p>
              )}
              <div ref={commentsEndRef} />
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

      {/* 레시피 삭제 모달 */}
      {showRecipeDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowRecipeDeleteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>정말 삭제하시겠습니까?</h3>
            <div className="modal-actions">
              <button onClick={handleRecipeDeleteConfirm}>예</button>
              <button onClick={() => setShowRecipeDeleteModal(false)}>아니오</button>
            </div>
          </div>
        </div>
      )}

      {/* 레시피 신고 모달 */}
      {showRecipeReportModal && (
        <div className="modal-overlay" onClick={() => setShowRecipeReportModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>신고하기</h3>
            <input
              type="text"
              placeholder="신고 제목"
              value={recipeReportTitle}
              onChange={(e) => setRecipeReportTitle(e.target.value)}
            />
            <textarea
              placeholder="신고 이유"
              value={recipeReportReason}
              onChange={(e) => setRecipeReportReason(e.target.value)}
            ></textarea>
            <div className="modal-actions">
              <button onClick={handleRecipeReportSubmit}>신고하기</button>
              <button onClick={() => setShowRecipeReportModal(false)}>취소</button>
            </div>
          </div>
        </div>
      )}

      {/* 댓글 삭제 모달 */}
      {showCommentDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowCommentDeleteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>정말 삭제하시겠습니까?</h3>
            <div className="modal-actions">
              <button onClick={handleCommentDeleteConfirm}>예</button>
              <button onClick={() => setShowCommentDeleteModal(false)}>아니오</button>
            </div>
          </div>
        </div>
      )}

      {/* 댓글 신고 모달 */}
      {showCommentReportModal && (
        <div className="modal-overlay" onClick={() => setShowCommentReportModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>댓글 신고</h3>
            <textarea
              placeholder="신고 내용을 입력하세요"
              value={commentReportText}
              onChange={(e) => setCommentReportText(e.target.value)}
            ></textarea>
            <div className="modal-actions">
              <button onClick={handleCommentReportSubmit}>신고하기</button>
              <button onClick={() => setShowCommentReportModal(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}