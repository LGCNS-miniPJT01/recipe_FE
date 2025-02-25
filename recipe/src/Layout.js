import React, { useContext, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";
import NotificationPopup from "./NotificationPopup";
import "./Layout.css";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);
  const [showNotifications, setShowNotifications] = useState(false);

  // 더미 알림 데이터: userEmail과 type을 포함 (예: "좋아요", "댓글")
  const [notifications, setNotifications] = useState([
    { id: "n1", userEmail: "userA@example.com", type: "좋아요", recipeId: "1", read: false },
    { id: "n2", userEmail: "userB@example.com", type: "댓글", recipeId: "2", read: false }
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const hideSidebarBottom = ["/login", "/signUp", "/findEmail", "/findPw", "/resetPw"].includes(location.pathname);

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const handleMarkAsRead = (notifId) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notifId));
  };

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <div className="sidebar-top-container">
          <div className="logo" onClick={() => navigate("/")}>
            <img src="/images/logo-placeholder.png" alt="로고" className="logo-img" />
          </div>
          {user && user.role === "member" && !hideSidebarBottom && (
            <div className="sidebar-group-top">
              <button className="sidebar-btn" onClick={() => navigate("/scrapedRecipe")}>
                레시피 저장 목록
              </button>
              <button className="sidebar-btn" onClick={() => navigate("/addRecipe")}>
                레시피 등록
              </button>
              <button className="sidebar-btn" onClick={() => setShowNotifications(true)}>
                알림 {unreadCount > 0 && <span className="notification-dot"></span>}
              </button>
            </div>
          )}
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
            {user && user.role === "member" ? (
              <div className="sidebar-group-bottom">
                <button className="sidebar-btn" onClick={() => navigate("/profile")}>
                  프로필
                </button>
                <button className="sidebar-btn" onClick={handleLogout}>
                  로그아웃
                </button>
              </div>
            ) : user && user.role === "admin" ? (
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
      {showNotifications && (
        <NotificationPopup
          notifications={notifications.sort((a, b) => b.id.localeCompare(a.id))} // 최신순 정렬 예시
          onClose={() => setShowNotifications(false)}
          onMarkAsRead={handleMarkAsRead}
        />
      )}
    </div>
  );
}