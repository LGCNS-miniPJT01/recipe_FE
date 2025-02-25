import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FindEmail.css";
import FormGroup from "./FormGroup";

export default function FindEmail() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // 예제 사용자 데이터 (실제 구현 시 백엔드 연동 필요)
  const users = [
    { name: "홍길동", phone: "01012345678", email: "hong@example.com" }
  ];

  const handleFindEmail = (e) => {
    e.preventDefault();
    const user = users.find(
      (user) => user.name === name && user.phone === phone
    );
    if (user) {
      setMessage(`${user.name}님의 이메일은 ${user.email}입니다`);
    } else {
      setMessage("잘못 입력했거나 등록되지 않은 계정입니다.");
    }
  };

  return (
    <div className="find-email-container">
      <h2>이메일 찾기</h2>
      <form onSubmit={handleFindEmail} className="find-email-form">
        <FormGroup
          label="이름"
          name="name"
          type="text"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <FormGroup
          label="전화번호"
          name="phone"
          type="text"
          placeholder="예) 01012345678"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          pattern="\d{11}"
          title="전화번호는 숫자 11자리(01012345678)로 입력해주세요."
          required
        />
        <button type="submit">이메일 찾기</button>
      </form>
      {message && <p className="message">{message}</p>}
      <p onClick={() => navigate("/login")} className="back-to-login">
        로그인으로 돌아가기
      </p>
    </div>
  );
}