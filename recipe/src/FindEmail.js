import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FindEmail.css";
import FormGroup from "./FormGroup";

export default function FindEmail() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleFindEmail = async (e) => {
    e.preventDefault();

    // 요청 데이터 구성
    const requestData = {
      username: name,
      phone: phone
    };

    try {
      // fetch로 POST 요청 보내기
      const response = await fetch("http://localhost:8080/api/users/findemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      // 서버 응답이 정상인지 확인
      if (response.ok) {
        const data = await response.text();
        setMessage(`이메일은 ${data}입니다.`);
      } else {
        setMessage("잘못 입력했거나 등록되지 않은 계정입니다.");
      }
    } catch (error) {
      // 에러 처리
      console.log(error);
      setMessage("서버와의 연결에 문제가 발생했습니다.");
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
