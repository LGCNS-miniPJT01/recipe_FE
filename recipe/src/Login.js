import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./Login.css";
import FormGroup from "./FormGroup";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // 간단한 로그인 검증 (추후 백엔드 연동 필요)
    if (email === "hong@example.com" && password === "hong123") {
      setUser({ email: email, role: "member" });
      // 이전 페이지가 있다면 그곳으로, 없으면 기본 경로("/")로 이동
      const redirectTo = location.state?.redirectBack || "/";
      navigate(redirectTo);
    } else {
      setError("아이디 또는 비밀번호를 잘못입력하셨습니다");
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <FormGroup
          label="이메일"
          name="email"
          type="email"
          placeholder="예) abc@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormGroup
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit">로그인</button>
      </form>
      <div className="login-links">
        <p onClick={() => navigate("/findEmail")}>이메일 찾기</p>
        <p onClick={() => navigate("/findPw")}>비밀번호 찾기</p>
        <p onClick={() => navigate("/signUp")}>회원가입</p>
      </div>
    </div>
  );
}