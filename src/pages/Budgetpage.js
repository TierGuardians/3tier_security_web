import React, { useState } from "react";
import axios from "../pages/axiosConfig"; // ✅ JWT 인증 인터셉터 적용된 axios 사용

function BudgetPage() {
  const [budgets, setBudgets] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showBudgets, setShowBudgets] = useState(false);
  const [newBudget, setNewBudget] = useState({ month: "", amount: 0 });

  const toggleBudgets = () => {
    if (!showBudgets) {
      axios.get("/budgets")
        .then(res => {
          setBudgets(res.data.data);
          setIsEditMode(false);
          setShowBudgets(true);
        })
        .catch(err => console.error("예산 조회 실패:", err));
    } else {
      setShowBudgets(false);
      setIsEditMode(false);
    }
  };

  const enableEditMode = () => setIsEditMode(true);

  const handleBudgetChange = (index, field, value) => {
    const updated = [...budgets];
    updated[index][field] = field === 'amount' ? Number(value) : value;
    setBudgets(updated);
  };

  const saveBudgetChanges = (id, budget) => {
    axios.put(`/budgets/${id}`, {
      month: budget.month,
      amount: budget.amount
    }).then(() => {
      alert("수정 완료");
      toggleBudgets();
    }).catch(err => console.error("수정 실패:", err));
  };

  const handleDelete = (id) => {
    axios.delete(`/budgets/${id}`)
      .then(() => {
        alert("삭제 완료");
        toggleBudgets();
      }).catch(err => console.error("삭제 실패:", err));
  };

  const addBudget = () => {
    axios.post("/budgets", {
      ...newBudget
      // ✅ userId 생략 (JWT로 인증되므로)
    }).then(() => {
      alert("예산 추가 완료");
      setNewBudget({ month: "", amount: 0 });
      toggleBudgets();
    }).catch(err => console.error("추가 실패:", err));
  };

  return (
    <div className="container mt-5">
      <h2>예산 관리</h2>

      <div className="mb-3">
        <button className="btn btn-primary me-2" onClick={toggleBudgets}>
          {showBudgets ? "예산 숨기기" : "예산 조회"}
        </button>
        {showBudgets && !isEditMode &&
          <button className="btn btn-secondary" onClick={enableEditMode}>예산 수정</button>
        }
      </div>

      {showBudgets &&
        <>
          <table className="table">
            <thead>
              <tr>
                <th>월</th>
                <th>금액</th>
                {isEditMode && <th>동작</th>}
              </tr>
            </thead>
            <tbody>
              {budgets.map((budget, idx) => (
                <tr key={budget.id}>
                  <td>
                    {isEditMode ?
                      <input
                        value={budget.month}
                        onChange={e => handleBudgetChange(idx, 'month', e.target.value)}
                      />
                      : budget.month}
                  </td>
                  <td>
                    {isEditMode ?
                      <input
                        type="number"
                        value={budget.amount}
                        onChange={e => handleBudgetChange(idx, 'amount', e.target.value)}
                      />
                      : budget.amount.toLocaleString()}
                  </td>
                  {isEditMode &&
                    <td>
                      <button className="btn btn-sm btn-success me-1" onClick={() => saveBudgetChanges(budget.id, budget)}>저장</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(budget.id)}>삭제</button>
                    </td>}
                </tr>
              ))}
            </tbody>
          </table>

          {isEditMode &&
            <div className="mt-4">
              <h4>신규 예산 추가</h4>
              <input
                className="form-control mb-2"
                placeholder="월 (예: 2025-08)"
                value={newBudget.month}
                onChange={e => setNewBudget({ ...newBudget, month: e.target.value })}
              />
              <input
                type="number"
                className="form-control mb-2"
                placeholder="금액"
                value={newBudget.amount === 0 ? "" : newBudget.amount}
                onFocus={() => {
                  if (newBudget.amount === 0) {
                    setNewBudget({ ...newBudget, amount: "" });
                  }
                }}
                onChange={e => {
                  const val = e.target.value;
                  setNewBudget({ ...newBudget, amount: val === "" ? 0 : Number(val) });
                }}
              />
              <button className="btn btn-primary" onClick={addBudget}>예산 추가</button>
            </div>
          }
        </>
      }
    </div>
  );
}

export default BudgetPage;