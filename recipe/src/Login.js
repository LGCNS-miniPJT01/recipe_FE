import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error("로그인 실패. 이메일 또는 비밀번호를 확인하세요.");
      }
  
      const token = await response.text(); // JSON 대신 text() 사용
  
      if (token.startsWith("{")) {
        // 만약 응답이 JSON이면 JSON으로 변환
        const data = JSON.parse(token);
        localStorage.setItem("jwt", data.token);
      } else {
        // 순수한 문자열(JWT)일 경우 바로 저장
        localStorage.setItem("jwt", token);
      }
  
      setUser({ email, role: "member" }); // 사용자 정보 업데이트
      navigate("/"); // 홈으로 이동
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label>이메일</label>
          <input
            type="email"
            placeholder="예) abc@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
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
