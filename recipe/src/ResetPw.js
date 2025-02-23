import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ResetPw.css";

const ResetPw = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      alert("비밀번호를 입력해주세요");
      return;
    }
    if (password !== confirmPassword) {
      alert("비밀번호를 다시 확인해주세요");
      return;
    }
    alert("비밀번호를 재설정했습니다");
    navigate("/login");
  };

  return (
    <div className="reset-container">
      <h2>비밀번호를 재설정하세요</h2>
      <form onSubmit={handleSubmit} className="resetpw-form">
        <div className="form-group">
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>
        <div className="form-group">
          <label>비밀번호 확인</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 한 번 더 입력하세요"
            required
          />
        </div>
        <button type="submit">확인</button>
      </form>
      <p onClick={() => navigate("/login")} className="back-to-login">
        로그인으로 돌아가기
      </p>
    </div>
  );
};

export default ResetPw;