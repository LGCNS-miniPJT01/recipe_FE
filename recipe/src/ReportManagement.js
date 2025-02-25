import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { HiOutlinePencilSquare } from "react-icons/hi2"; // 필요시 사용
import "./ReportManagement.css";

export default function ReportManagement() {
    const navigate = useNavigate();

    // 더미 신고 데이터: 실제 구현 시 API를 통해 받아옵니다.
    const dummyReports = [
        {
            id: "1",
            type: "레시피 신고",
            reportedUser: { id: "101", name: "사용자1", profilePic: "https://via.placeholder.com/50?text=User1" },
            content: "해당 레시피가 부적절합니다. 내용이..."
        },
        {
            id: "2",
            type: "댓글 신고",
            reportedUser: { id: "102", name: "사용자2", profilePic: "https://via.placeholder.com/50?text=User2" },
            content: "해당 댓글에 욕설이 포함되어 있습니다."
        },
        {
            id: "3",
            type: "계정 신고",
            reportedUser: { id: "103", name: "사용자3", profilePic: "https://via.placeholder.com/50?text=User3" },
            content: "해당 계정이 스팸 활동을 하고 있습니다."
        }
    ];

    const [reports] = useState(dummyReports);
    const [selectedReport, setSelectedReport] = useState(null);

    const openReportModal = (report) => {
        setSelectedReport(report);
    };

    const closeModal = () => {
        setSelectedReport(null);
    };

    const handleProfileClick = (userId) => {
        // 신고된 사용자의 프로필 페이지로 이동 (예: /userProfile/:userId 라우트를 사용)
        navigate(`/userProfile/${userId}`);
    };

    return (
        <div className="report-management-container">
            <h2>신고 관리</h2>
            <div className="report-list">
                {reports.map((report) => (
                    <div key={report.id} className="report-item" onClick={() => openReportModal(report)}>
                        <span className="report-type">{report.type}</span>
                        <span className="report-summary">{report.content.substring(0, 30)}...</span>
                    </div>
                ))}
            </div>

            {selectedReport && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{selectedReport.type}</h3>
                            <div
                                className="reported-user"
                                onClick={() => handleProfileClick(selectedReport.reportedUser.id)}
                            >
                                <img
                                    src={selectedReport.reportedUser.profilePic}
                                    alt={selectedReport.reportedUser.name}
                                />
                                <span>{selectedReport.reportedUser.name}</span>
                            </div>
                        </div>
                        <div className="modal-body">
                            <p>{selectedReport.content}</p>
                        </div>
                        <button className="modal-close-btn" onClick={closeModal}>
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}