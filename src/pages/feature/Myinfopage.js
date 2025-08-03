import React, { useEffect, useState } from "react";
import axios from "../../config/axiosConfig";

function Myinfo() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    axios
      .get("/users/mypage")
      .then((response) => {
        console.log("내 정보 조회 응답:", response.data);
        const { user } = response.data.data;
        setUserInfo(user);
      })
      .catch((error) => {
        console.error("내 정보 조회 실패:", error);
      });
  }, []);

  if (!userInfo)
    return <div className="text-center my-5">📦 데이터 로딩 중...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">내 정보</h2>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{userInfo?.name}</h5>
          <p className="card-text">아이디: {userInfo.userId}</p>
          <p className="card-text">이메일: {userInfo.email}</p>
          <p className="card-text">
            가입일: {userInfo.createdAt?.split("T")[0]}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Myinfo;
