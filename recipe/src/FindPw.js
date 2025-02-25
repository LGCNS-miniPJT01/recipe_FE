import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FindPw.css";
import FormGroup from "./FormGroup";

const users = [
  { name: "홍길동", phone: "01012345678", email: "hong@example.com" }
];

const FindPW = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) =>
        u.name === form.name &&
        u.email === form.email &&
        u.phone === form.phone
    );

    if (user) {
      alert("비밀번호를 재설정합니다");
      navigate("/resetPw");
    } else {
      setError("잘못 입력했거나 등록되지 않은 계정입니다.");
    }
  };

  return (
    <div className="findpw-container">
      <h2>비밀번호 찾기</h2>
      <form onSubmit={handleSubmit} className="findpw-form">
        <FormGroup
          label="이름"
          name="name"
          type="text"
          placeholder="이름을 입력하세요"
          value={form.name}
          onChange={handleChange}
          required
        />
        <FormGroup
          label="이메일"
          name="email"
          type="email"
          placeholder="예) abc@gmail.com"
          value={form.email}
          onChange={handleChange}
          required
        />
        <FormGroup
          label="전화번호"
          name="phone"
          type="text"
          placeholder="예) 01012345678"
          value={form.phone}
          onChange={handleChange}
          pattern="\d{11}"
          title="전화번호는 숫자 11자리(01012345678)로 입력해주세요."
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">비밀번호 재설정</button>
      </form>
      <p onClick={() => navigate("/login")} className="back-to-login">
        로그인으로 돌아가기
      </p>
    </div>
  );
};

export default FindPW;