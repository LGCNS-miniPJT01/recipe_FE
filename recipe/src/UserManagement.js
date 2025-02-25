import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserManagement.css";

export default function UserManagement() {
    const navigate = useNavigate();

    // 더미 사용자 데이터에 blocked 속성 추가 (초기 상태: 모두 차단 안 됨)
    const dummyUsers = [
        { id: "101", name: "사용자1", email: "user1@example.com", blocked: false, profilePic: "https://via.placeholder.com/50?text=User1" },
        { id: "102", name: "사용자2", email: "user2@example.com", blocked: false, profilePic: "https://via.placeholder.com/50?text=User2" },
        { id: "103", name: "사용자3", email: "user3@example.com", blocked: false, profilePic: "https://via.placeholder.com/50?text=User3" }
    ];

    const [users, setUsers] = useState(dummyUsers);

    // 토글 함수: 차단 상태 전환
    const toggleBlockStatus = (userId) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === userId ? { ...user, blocked: !user.blocked } : user
            )
        );
    };

    const handleUserClick = (userId) => {
        // 차단된 사용자여도 프로필 페이지로 이동은 가능하게 할 수 있음 (관리자가 확인하기 위함)
        navigate(`/userProfile/${userId}`);
    };

    return (
        <div className="user-management-container">
            <h2>사용자 관리</h2>
            <div className="user-list">
                {users.map((user) => (
                    <div key={user.id} className="user-item">
                        <div className="user-info" onClick={() => handleUserClick(user.id)}>
                            <span className={`user-name ${user.blocked ? "blocked" : ""}`}>
                                {user.name}
                            </span>
                            <span className="user-email">{user.email}</span>
                        </div>
                        <div className="user-actions">
                            {user.blocked ? (
                                <button
                                    className="unblock-btn"
                                    onClick={() => toggleBlockStatus(user.id)}
                                >
                                    해제
                                </button>
                            ) : (
                                <button
                                    className="block-btn"
                                    onClick={() => toggleBlockStatus(user.id)}
                                >
                                    차단
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}