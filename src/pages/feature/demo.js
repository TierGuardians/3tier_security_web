import React, { useState } from "react";
import DOMPurify from "dompurify";

function XssDemo() {
  const [input, setInput] = useState("");
  const [rawHtml, setRawHtml] = useState("");
  const [cleanHtml, setCleanHtml] = useState("");

  const handlePreview = () => {
    setRawHtml(input); // 그대로 출력 (위험)
    setCleanHtml(DOMPurify.sanitize(input)); // 정제된 출력 (안전)
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>XSS 테스트 입력</h3>
      <input
        type="text"
        className="form-control"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`<img src="x" onerror="alert('해킹')">`}
        style={{ marginBottom: "10px" }}
      />
      <button className="btn btn-primary" onClick={handlePreview}>
        미리보기 실행
      </button>

      <hr />

      <div>
        <h5>Dompurify 테스트</h5>
        <div
          style={{ border: "1px solid red", padding: "10px" }}
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </div>
  );
}

export default XssDemo;
