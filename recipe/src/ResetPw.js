import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // 📌 useLocation 추가
import "./ResetPw.css";
import FormGroup from "./FormGroup";

const ResetPw = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 📌 현재 페이지의 전달된 데이터 가져오기
  const email = location.state?.email || ""; // 📌 전달된 email이 없으면 빈 문자열

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("비밀번호를 입력해주세요.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email, // 📌 전달받은 email을 사용
          newPassword,
          confirmPassword,
        }),
      });

      const responseText = await response.text();

      if (response.ok) {
        alert(responseText);
        navigate("/login");
      } else {
        setError(responseText || "비밀번호 재설정에 실패했습니다.");
      }
    } catch (error) {
      console.error("비밀번호 재설정 요청 실패:", error);
      setError("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="reset-container">
      <h2>비밀번호를 재설정하세요</h2>
      <p>이메일: {email}</p> {/* 📌 이메일이 잘 넘어오는지 확인용 */}
      <form onSubmit={handleSubmit} className="resetpw-form">
        <FormGroup
          label="새 비밀번호"
          name="newPassword"
          type="password"
          placeholder="새 비밀번호를 입력하세요"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <FormGroup
          label="비밀번호 확인"
          name="confirmPassword"
          type="password"
          placeholder="비밀번호를 한 번 더 입력하세요"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">확인</button>
      </form>
      <p onClick={() => navigate("/login")} className="back-to-login">
        로그인으로 돌아가기
      </p>
    </div>
  );
};

export default ResetPw;
