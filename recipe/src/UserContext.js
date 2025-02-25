import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  // 초기값을 localStorage에서 불러오기
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // blocked 속성이 없으면 기본값 false 설정
        if (parsedUser.blocked === undefined) {
          parsedUser.blocked = false;
        }
        return parsedUser;
      } catch (error) {
        console.error("UserContext 초기화 에러:", error);
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // 다른 탭 등에서 localStorage 변경 감지
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "user") {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch (error) {
          console.error("UserContext storage 이벤트 에러:", error);
          setUser(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}