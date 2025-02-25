import React, { useContext } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./Layout.css";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);

  // 로그인, 회원가입, 이메일/비밀번호 찾기 등에서는 사이드바 하단 버튼 숨김
  const hideSidebarBottom = ["/login", "/signUp", "/findEmail", "/findPw", "/resetPw"].includes(location.pathname);

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <div className="sidebar-top-container">
          <div className="logo" onClick={() => navigate("/")}>
            <img src="recipe_logo.png" alt="로고" className="logo-img" />
          </div>
          {/* 일반 회원일 때 */}
          {user && user.role === "member" && !hideSidebarBottom && (
            <div className="sidebar-group-top">
              <button className="sidebar-btn" onClick={() => navigate("/scrapedRecipe")}>
                레시피 저장 목록
              </button>
              <button className="sidebar-btn" onClick={() => navigate("/addRecipe")}>
                레시피 등록
              </button>
              <button className="sidebar-btn" onClick={() => navigate("/profile")}>
                알림
              </button>
            </div>
          )}
          {/* 관리자일 때 */}
          {user && user.role === "admin" && !hideSidebarBottom && (
            <div className="sidebar-group-top">
              <button className="sidebar-btn" onClick={() => navigate("/deleteRecipe")}>
                레시피 삭제
              </button>
              <button className="sidebar-btn" onClick={() => navigate("/reportManagement")}>
                신고 관리
              </button>
              <button className="sidebar-btn" onClick={() => navigate("/userManagement")}>
                사용자 관리
              </button>
            </div>
          )}
        </div>
        {!hideSidebarBottom && (
          <>
            {/* 일반 회원 하단 그룹: 프로필 + 로그아웃 */}
            {user && user.role === "member" ? (
              <div className="sidebar-group-bottom">
                <button className="sidebar-btn" onClick={() => navigate("/profile")}>
                  프로필
                </button>
                <button className="sidebar-btn" onClick={handleLogout}>
                  로그아웃
                </button>
              </div>
            ) :
              /* 관리자 하단 그룹: 로그아웃만 */
              user && user.role === "admin" ? (
                <div className="sidebar-group-bottom">
                  <button className="sidebar-btn" onClick={handleLogout}>
                    로그아웃
                  </button>
                </div>
              ) : (
                <button className="login-btn" onClick={() => navigate("/login")}>
                  로그인
                </button>
              )}
          </>
        )}
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}