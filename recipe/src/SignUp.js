import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 확인
    if (form.password !== form.confirmPassword) {
      setError("비밀번호를 다시 확인해주세요");
      return;
    }

    // 회원가입 요청 데이터
    const userData = {
      username: form.username,
      phone: form.phone,
      email: form.email,
      password: form.password
    };

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        alert("회원가입이 완료되었습니다");
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.message || "회원가입에 실패했습니다");
      }
    } catch (error) {
      setError("서버와의 통신 중 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>이름</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="이름을 입력하세요"
            required
          />
        </div>
        <div className="form-group">
          <label>전화번호</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="예) 01012345678"
            pattern="\d{11}"
            title="전화번호는 숫자 11자리(01012345678)로 입력해주세요."
            required
          />
        </div>
        <div className="form-group">
          <label>이메일</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="예) abc@gmail.com"
            required
          />
        </div>
        <div className="form-group">
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>
        <div className="form-group">
          <label>비밀번호 확인</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호를 한 번 더 입력하세요"
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "회원가입 중..." : "회원가입"}
        </button>
      </form>
      <p onClick={() => navigate("/login")} className="back-to-login">
        로그인으로 돌아가기
      </p>
    </div>
  );
};

export default SignUp;
