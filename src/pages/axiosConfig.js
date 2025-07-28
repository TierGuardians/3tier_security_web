// src/api/axiosConfig.js
import axios from "axios";

// 기본 설정
const instance = axios.create({
  baseURL: "http://192.168.1.167:8081", // 필요 시 다른 도메인도 가능
  headers: {
    "Content-Type": "application/json"
  }
});

// 요청 인터셉터: accessToken 자동 추가
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;