# 💻 3tier_security_WEB

## 🛠️ 1. WEB 환경구성

### 📍 1-1. 로컬 환경구성

1. **Node.js 설치**
   - 자바스크립트 실행환경  
   - [Node.js 설치 링크](https://nodejs.org/en/blog/release/v22.17.1)

2. **REACT 설치**
   - UI 구축용 JavaScript 라이브러리
   - SPA(Single Page Application) 기반
   - JSX 문법 사용, Virtual DOM 적용

3. **React 프로젝트 생성**
   ```bash
   npx create-react-app frontend
   cd frontend
   npm start
   ```

4. **React Router 설치**
   ```bash
   npm install react-router-dom
   ```

5. **UI 구현 - Bootstrap 사용**
   ```bash
   npm install react-bootstrap bootstrap
   ```

6. **환경변수 세팅**
   ```bash
   npm install cross-env --save-dev
   ```

   ```json
   // package.json
   "scripts": {
     "start": "cross-env HOST=3tier.prod PORT=3000 react-scripts start",
     "build": "react-scripts build",
     "test": "react-scripts test",
     "eject": "react-scripts eject"
   }
   ```

---

### 📍 1-2. 운영 환경구성

1. 구조: Linux(VM) + Nginx + React → Spring API 서버
2. Nginx 설정:
   ```nginx
   server {
       listen 80;
       server_name _;

       root /home/gihyun506/myapp;
       index index.html;

       location / {
           try_files $uri /index.html;
       }
   }
   ```

3. React 배포:
   ```bash
   npm run build
   scp -r build/. gihyun506@192.168.1.23:/home/gihyun506/myapp/
   chmod -R 755 /home/gihyun506/myapp
   chown -R www-data:www-data /home/gihyun506/myapp
   sudo systemctl restart nginx
   ```

4. 프록시 설정 예시:
   ```nginx
   server {
       listen 80;
       server_name 3tier.prod;

       root /home/gihyun506/myapp;
       index index.html;

       location /api/ {
           proxy_pass http://api.3tier.prod/;
           proxy_http_version 1.1;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;

           add_header Access-Control-Allow-Origin $http_origin always;
           add_header Access-Control-Allow-Credentials true always;
       }

       location / {
           try_files $uri /index.html;
       }
   }
   ```

---

## 🧩 2. WEB 개발

### 📁 2-1. 프로젝트 구조

```
3tier_security_web/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
│
├── src/
│   ├── config/
│   │   ├── assetTypes.js
│   │   └── axiosConfig.js
│   ├── pages/
│   │   ├── Assetpage.js
│   │   ├── Budgetpage.js
│   │   ├── Expensepage.js
│   │   ├── LoginSignupUI.js
│   │   ├── LoginSignupUI.module.css
│   │   ├── MainDashboardUI.js
│   │   ├── MainDashboardUI.module.css
│   │   ├── Myinfopage.js
│   │   └── Signuppage.js
│   └── App.js
```

---

## 🔐 3. WEB 보안

### 🔧 3-1. 환경변수 사용

- 민감 정보 보호 및 유지보수 편의성
- `.env` 예시:
  ```env
  REACT_APP_API_URL=http://192.168.x.x:x
  REACT_APP_ENV=development
  ```
- `.gitignore`에 `.env` 포함 필수

### ✍️ 3-2. 유효성 검사

- `yup` 사용으로 사용자 입력 검증
- 예시:
  ```js
  import * as yup from "yup";

  const loginSchema = yup.object({
    userId: yup.string().trim().required("아이디를 입력하세요"),
    password: yup.string().trim().required("비밀번호를 입력하세요"),
  });
  ```

### 💣 3-3. XSS 공격 방지

- DOMPurify를 통해 스크립트 제거
- 예시:
  ```js
  import DOMPurify from "dompurify";
  const cleanHtml = DOMPurify.sanitize(userInput);
  ```

### 🍪 3-4. HttpOnly 쿠키 사용

- JavaScript로 쿠키 접근 불가 → 쿠키 탈취 방지
- axios 설정 예시:
  ```js
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
  });
  ```

### 🛡️ 3-5. CSRF 방어

- CSRF 토큰을 세션에 저장하고 요청 시 헤더에 포함
- 예시:
  ```js
  sessionStorage.setItem("csrfToken", data.csrfToken);

  instance.interceptors.request.use((config) => {
    const csrfToken = sessionStorage.getItem("csrfToken");
    if (csrfToken) {
      config.headers["X-CSRF-TOKEN"] = csrfToken;
    }
    return config;
  });
  ```

### 🔄 3-6. 리버스 프록시

- React와 Spring API 도메인 통합
- 인증/보안 문제 해결 (CORS, SameSite 등)
- Nginx 설정은 위 "운영 환경구성" 참고
