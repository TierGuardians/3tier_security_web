import React, { useState } from "react";
import axios from "../config/axiosConfig"; // 인터셉터 axios 사용
import { assetTypes } from "../config/assetTypes";
import DOMPurify from "dompurify";


function AssetPage() {
  const [assets, setAssets] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAssets, setShowAssets] = useState(false);
  const [newAsset, setNewAsset] = useState({ name: "", type: "", amount: 0 });

  const toggleAssets = () => {
    if (!showAssets) {
      axios.get("/assets")
        .then(res => {
          setAssets(res.data.data);
          setIsEditMode(false);
          setShowAssets(true);
        })
        .catch(err => console.error("자산 조회 실패:", err));
    } else {
      setShowAssets(false);
      setIsEditMode(false);
    }
  };

  const enableEditMode = () => setIsEditMode(true);

  const handleAssetChange = (index, field, value) => {
    const updated = [...assets];
    updated[index][field] = field === 'amount' ? Number(value) : value;
    setAssets(updated);
  };

const saveAssetChanges = (id, asset) => {
    const sanitized = {
      name: DOMPurify.sanitize(asset.name),
      type: DOMPurify.sanitize(asset.type),
      amount: asset.amount
    };

    axios.put(`/assets/${id}`, sanitized)
      .then(() => {
        alert("수정 완료");
        toggleAssets();
      })
      .catch(err => console.error("수정 실패:", err));
  };

  const handleDelete = (id) => {
    axios.delete(`/assets/${id}`)
      .then(() => {
        alert("삭제 완료");
        toggleAssets();
      }).catch(err => console.error("삭제 실패:", err));
  };

 const addAsset = () => {
    const sanitized = {
      name: DOMPurify.sanitize(newAsset.name),
      type: DOMPurify.sanitize(newAsset.type),
      amount: newAsset.amount
    };

    axios.post("/assets", sanitized)
      .then(() => {
        alert("추가 완료");
        setNewAsset({ name: "", type: "", amount: 0 });
        toggleAssets();
      }).catch(err => console.error("추가 실패:", err));
  };

  return (
    <div className="container mt-5">
      <h2>자산 관리</h2>

      <div className="mb-3">
        <button className="btn btn-primary me-2" onClick={toggleAssets}>
          {showAssets ? "자산 숨기기" : "자산 조회"}
        </button>
        {showAssets && !isEditMode &&
          <button className="btn btn-secondary" onClick={enableEditMode}>자산 수정</button>
        }
      </div>

      {showAssets &&
        <>
          <table className="table">
            <thead>
              <tr>
                <th>이름</th>
                <th>종류</th>
                <th>금액</th>
                {isEditMode && <th>동작</th>}
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, idx) => (
                <tr key={asset.id}>
                  <td>
                    {isEditMode ?
                      <input value={asset.name} onChange={e => handleAssetChange(idx, 'name', e.target.value)} />
                      : asset.name}
                  </td>
                  <td>
                    {isEditMode ? (
                      <select
                        value={asset.type}
                        onChange={e => handleAssetChange(idx, 'type', e.target.value)}
                      >
                        {assetTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                        {!assetTypes.includes(asset.type) && (
                          <option value={asset.type}>{asset.type}</option>
                        )}
                      </select>
                    ) : (
                      asset.type
                    )}
                  </td>
                  <td>
                    {isEditMode ?
                      <input
                        type="number"
                        value={asset.amount}
                        onChange={e => handleAssetChange(idx, 'amount', e.target.value)}
                      />
                      : asset.amount.toLocaleString()}
                  </td>
                  {isEditMode &&
                    <td>
                      <button className="btn btn-sm btn-success me-1" onClick={() => saveAssetChanges(asset.id, asset)}>저장</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(asset.id)}>삭제</button>
                    </td>}
                </tr>
              ))}
            </tbody>
          </table>

          {isEditMode &&
            <div className="mt-4">
              <h4>신규 자산 추가</h4>

              <input
                className="form-control mb-2"
                placeholder="이름"
                value={newAsset.name}
                onChange={e => setNewAsset({ ...newAsset, name: e.target.value })}
              />

              <div className="mb-2">
                <label className="form-label">자산 종류 (선택 또는 직접 입력)</label>
                <div className="d-flex gap-2">
                  <select
                    className="form-select"
                    value={assetTypes.includes(newAsset.type) ? newAsset.type : ""}
                    onChange={e => setNewAsset({ ...newAsset, type: e.target.value })}
                  >
                    <option value="">-- 자산 종류 선택 --</option>
                    {assetTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="직접 입력"
                    value={newAsset.type}
                    onChange={e => setNewAsset({ ...newAsset, type: e.target.value })}
                  />
                </div>
              </div>

              <input
                type="number"
                className="form-control mb-2"
                placeholder="금액"
                value={newAsset.amount === 0 ? "" : newAsset.amount}
                onFocus={() => {
                  if (newAsset.amount === 0) {
                    setNewAsset({ ...newAsset, amount: "" });
                  }
                }}
                onChange={e => {
                  const val = e.target.value;
                  setNewAsset({ ...newAsset, amount: val === "" ? 0 : Number(val) });
                }}
              />

              <button className="btn btn-primary" onClick={addAsset}>자산 추가</button>
            </div>
          }
        </>
      }
    </div>
  );
}

export default AssetPage;