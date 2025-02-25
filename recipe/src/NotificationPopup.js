import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotificationPopup.css";

export default function NotificationPopup({ notifications, onClose, onMarkAsRead }) {
    const navigate = useNavigate();

    const handleNotificationClick = (notif) => {
        onMarkAsRead(notif.id);
        navigate(`/recipe/${notif.recipeId}`);
        onClose();
    };

    return (
        <div className="notification-popup-overlay" onClick={onClose}>
            <div className="notification-popup" onClick={(e) => e.stopPropagation()}>
                <h3>알림</h3>
                {notifications.length === 0 ? (
                    <p>새로운 알림이 없습니다.</p>
                ) : (
                    <ul>
                        {notifications.map((notif) => (
                            <li key={notif.id} onClick={() => handleNotificationClick(notif)}>
                                {notif.userEmail} 님이 당신의 레시피에 {notif.type}을(를) 남겼습니다.
                            </li>
                        ))}
                    </ul>
                )}
                <button className="close-btn" onClick={onClose}>닫기</button>
            </div>
        </div>
    );
}