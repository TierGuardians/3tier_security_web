import React, { useEffect, useState } from "react";
import axios from "axios";

function Myinfo() {
    const [userInfo, setUserInfo] = useState(null);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!userId) return; 

        axios.get(`http://192.168.0.83:8081/users/mypage/${userId}`)
            .then(response => {
                console.log("내 정보 조회 응답:", response.data);
                const { user } = response.data.data;
                
                setUserInfo(user);
            })
            .catch(error => {
                console.error("내 정보 조회 실패:", error);
            });
    }, [userId]);

    if (!userInfo) return <div className="text-center my-5">📦 데이터 로딩 중...</div>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-primary">내 정보</h2>
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">{userInfo?.name}</h5>
                    <p className="card-text">아이디: {userInfo.userId}</p>
                    <p className="card-text">이메일: {userInfo.email}</p>
                    <p className="card-text">가입일: {userInfo.createdAt}</p>
                </div>
            </div>
        </div>
    );
}

export default Myinfo;