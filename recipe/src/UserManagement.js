import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserManagement.css";

export default function UserManagement() {
    const navigate = useNavigate();

    // 더미 사용자 데이터: 실제 구현 시 API를 통해 데이터를 받아옵니다.
    const dummyUsers = [
        { id: "101", name: "사용자1", email: "user1@example.com", profilePic: "https://via.placeholder.com/50?text=User1" },
        { id: "102", name: "사용자2", email: "user2@example.com", profilePic: "https://via.placeholder.com/50?text=User2" },
        { id: "103", name: "사용자3", email: "user3@example.com", profilePic: "https://via.placeholder.com/50?text=User3" }
    ];

    const [users, setUsers] = useState(dummyUsers);

    const handleUserClick = (userId) => {
        // 신고된 사용자의 프로필 페이지가 아니라, 해당 사용자의 프로필 페이지로 이동
        navigate(`/userProfile/${userId}`);
    };

    return (
        <div className="user-management-container">
            <h2>사용자 관리</h2>
            <div className="user-list">
                {users.map((user) => (
                    <div key={user.id} className="user-item" onClick={() => handleUserClick(user.id)}>
                        <span className="user-name">{user.name}</span>
                        <span className="user-email">{user.email}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}