import React, { useState } from "react";
import axios from "axios";

function AssetPage() {
    const [assets, setAssets] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showAssets, setShowAssets] = useState(false);
    const [newAsset, setNewAsset] = useState({ name: "", type: "", amount: 0 });
    const userId = localStorage.getItem('userId');

    // 자산 조회 및 toggle
    const toggleAssets = () => {
        if (!showAssets) {
            axios.get(`http://192.168.0.83:8081/assets?userId=${userId}`)
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

    const enableEditMode = () => {
        setIsEditMode(true);
    };

    const handleAssetChange = (index, field, value) => {
        const updated = [...assets];
        updated[index][field] = field === 'amount' ? Number(value) : value;
        setAssets(updated);
    };

    const saveAssetChanges = (id, asset) => {
        axios.put(`http://192.168.0.83:8081/assets/${id}`, {
            name: asset.name,
            type: asset.type,
            amount: asset.amount
        }).then(() => {
            alert("수정 완료");
            toggleAssets(); // 새로고침
        }).catch(err => console.error("수정 실패:", err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://192.168.0.83:8081/assets/${id}`)
            .then(() => {
                alert("삭제 완료");
                toggleAssets();
            }).catch(err => console.error("삭제 실패:", err));
    };

    const addAsset = () => {
        axios.post('http://192.168.0.83:8081/assets', {
            ...newAsset,
            userId
        }).then(() => {
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
                                        {isEditMode ?
                                            <input value={asset.type} onChange={e => handleAssetChange(idx, 'type', e.target.value)} />
                                            : asset.type}
                                    </td>
                                    <td>
                                        {isEditMode ?
                                            <input type="number" value={asset.amount} onChange={e => handleAssetChange(idx, 'amount', e.target.value)} />
                                            : asset.amount.toLocaleString()}
                                    </td>
                                    {isEditMode &&
                                        <td>
                                            <button className="btn btn-sm btn-success me-1" onClick={() => saveAssetChanges(asset.id, asset)}>저장</button>
                                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(asset.id)}>삭제</button>
                                        </td>
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {isEditMode &&
                        <div className="mt-4">
                            <h4>신규 자산 추가</h4>
                            <input className="form-control mb-2" placeholder="이름" value={newAsset.name} onChange={e => setNewAsset({ ...newAsset, name: e.target.value })} />
                            <input className="form-control mb-2" placeholder="종류" value={newAsset.type} onChange={e => setNewAsset({ ...newAsset, type: e.target.value })} />
                            <input type="number" className="form-control mb-2" placeholder="금액" value={newAsset.amount} onChange={e => setNewAsset({ ...newAsset, amount: Number(e.target.value) })} />
                            <button className="btn btn-primary" onClick={addAsset}>자산 추가</button>
                        </div>
                    }
                </>
            }
        </div>
    );
}

export default AssetPage;